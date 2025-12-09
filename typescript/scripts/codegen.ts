import { lstat, readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { existsSync } from 'node:fs';

const kebabToPascal = (kebab) =>
  kebab
    .split('-')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join('');

const kebabToCamel = (kebab) =>
  kebab
    .split('-')
    .map((word, index) => (index === 0 ? word : word[0].toUpperCase() + word.slice(1)))
    .join('');

type HookHandlerTemplate = {
  inputType: string;
  imports: string;
  handleFn: string;
};

const hookHandlerTemplate = async (hooksDirPath, hookName): Promise<HookHandlerTemplate> => {
  const hookNamePascal = kebabToPascal(hookName);
  const hookNameCamel = kebabToCamel(hookName);
  const inputType = `${hookNamePascal}Input`;
  const resultType = `${hookNamePascal}Result`;
  const inputSchema = `${hookNameCamel}InputSchema`;
  const resultSchema = `${hookNameCamel}ResultSchema`;

  const imports = `import type { ${inputType} } from '@wirechunk/schemas/hooks/${hookName}/input.d.ts';
import ${inputSchema} from '@wirechunk/schemas/hooks/${hookName}/input.json' with { type: 'json' };
import type { ${resultType} } from '@wirechunk/schemas/hooks/${hookName}/result.d.ts';
import ${resultSchema} from '@wirechunk/schemas/hooks/${hookName}/result.json' with { type: 'json' };`;

  let description: string | undefined;
  const descriptionFilePath = `${hooksDirPath}/${hookName}/description.txt`;
  if (existsSync(descriptionFilePath)) {
    const descriptionFileStat = await lstat(descriptionFilePath);
    if (descriptionFileStat.isFile()) {
      const rawDescription = await readFile(descriptionFilePath, 'utf8');
      description = rawDescription
        .trim()
        .split('\n')
        .map((line) => ` * ${line.trim()}`)
        .join('\n');
    } else {
      console.error(`Unexpected non-file for description at ${descriptionFilePath}`);
    }
  }

  const handleFn = `/**
 * Register a handler for the ${hookName} hook.${description ? `\n${description}` : ''}
 * This function should be called before starting the server.
 */
export const handle${hookNamePascal} = (
  handler: HookHandler<${inputType}, ${resultType}>,
): void => {
  server.post<{
    Body: ${inputType};
    Reply: ${resultType};
  }>(
    '/hooks/${hookName}',
    {
      schema: {
        body: ${inputSchema},
        response: { 200: ${resultSchema} },
      },
    },
    wrap(handler),
  );
};`;

  return {
    inputType,
    imports,
    handleFn,
  };
};

const hooksFileTemplate = async (hooksDirPath, hookNames) => {
  const templates = await Promise.all(
    hookNames.sort().map((hookName) => hookHandlerTemplate(hooksDirPath, hookName)),
  );

  return `${templates.map((t) => t.imports).join('\n')}
import type { FastifyReply, FastifyRequest } from 'fastify';
import { server } from './start.js';

type HookHandler<Body, Reply> = (input: Body) => Promise<Reply | null> | Reply | null;

type HookRequest<Body, Reply> = FastifyRequest<{ Body: Body; Reply: Reply }> & {
  body: Body;
};

const wrap =
  <Body, Reply>(handler: HookHandler<Body, Reply>) =>
  async ({ body }: HookRequest<Body, Reply>, reply: FastifyReply) => {
    const res = await handler(body);
    if (!res) {
      reply.statusCode = 204;
      return;
    }
    return res;
  };

${templates.map((t) => t.handleFn).join('\n\n')}
`;
};

const codegenHooks = async (hooksDirPath: string) => {
  const files = await readdir(hooksDirPath);
  const hookNames: string[] = [];
  for (const file of files) {
    const filePath = `${hooksDirPath}/${file}`;
    const stat = await lstat(filePath);
    if (stat.isDirectory()) {
      hookNames.push(file);
    } else {
      console.error(`Unexpected file in the hooks directory: ${filePath}`);
    }
  }

  const fileContents = await hooksFileTemplate(hooksDirPath, hookNames);
  await writeFile('src/hooks.ts', fileContents);
};

const schemaVarName = (hookName: string, schemaName: string) =>
  `${kebabToCamel(hookName)}${kebabToPascal(schemaName)}Schema`;

type SchemaImport = { varName: string; importPath: string };

const collectJsonFiles = async (dir: string): Promise<string[]> => {
  const entries = await readdir(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const entryPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectJsonFiles(entryPath)));
    } else if (entry.isFile() && entry.name.endsWith('.json')) {
      files.push(entryPath);
    }
  }
  return files;
};

const toImportPath = (absPath: string, schemasRoot: string) =>
  `@wirechunk/schemas/${absPath.slice(schemasRoot.length + 1).replace(/\\/g, '/')}`;

const toExtraSchemaVarName = (relativePath: string) => {
  const withoutExt = relativePath.replace(/\.json$/, '');
  const parts = withoutExt
    .split(/[\\/]/)
    .flatMap((segment) => segment.split(/[^a-zA-Z0-9]+/))
    .filter(Boolean);
  if (parts.length === 0) return 'schema';
  const [first, ...rest] = parts;
  return `${first}${rest.map((p) => p[0].toUpperCase() + p.slice(1)).join('')}Schema`;
};

const schemasFileTemplate = async (hooksDirPath: string, hookNames: string[]) => {
  const imports: SchemaImport[] = [];
  const importsSeen = new Set<string>();
  const schemasRoot = join(hooksDirPath, '..');

  for (const hookName of hookNames.sort()) {
    const hookDirPath = join(hooksDirPath, hookName);
    const files = await readdir(hookDirPath);
    for (const fileName of files.sort()) {
      if (!fileName.endsWith('.json')) continue;
      if (fileName === 'properties.json') continue;
      const schemaName = fileName.replace(/\.json$/, '');
      const importPath = `@wirechunk/schemas/hooks/${hookName}/${fileName}`;
      if (importsSeen.has(importPath)) continue;
      importsSeen.add(importPath);
      imports.push({
        varName: schemaVarName(hookName, schemaName),
        importPath,
      });
    }
  }

  const extraDirs = [
    'request-context',
    'hook-reject-result',
    'expressions',
    'context-data',
    'authorize-hook-result',
    'custom-field',
  ];
  for (const extra of extraDirs) {
    const extraDirPath = join(schemasRoot, extra);
    if (!existsSync(extraDirPath)) continue;
    const files = await collectJsonFiles(extraDirPath);
    for (const absPath of files.sort()) {
      if (absPath.endsWith('/properties.json')) continue;
      const importPath = toImportPath(absPath, schemasRoot);
      if (importsSeen.has(importPath)) continue;
      importsSeen.add(importPath);
      const relativePath = absPath.slice(schemasRoot.length + 1);
      imports.push({
        varName: toExtraSchemaVarName(relativePath),
        importPath,
      });
    }
  }

  return `${imports
    .map(
      ({ varName, importPath }) => `import ${varName} from '${importPath}' with { type: 'json' };`,
    )
    .join('\n')}
import type { SchemaObject } from 'ajv';
import type { SetRequired } from 'type-fest';

export const schemas: Array<SetRequired<SchemaObject, '$id'>> = [
${imports.map(({ varName }) => `  ${varName},`).join('\n')}
];
`;
};

const codegenSchemas = async (hooksDirPath: string) => {
  const files = await readdir(hooksDirPath);
  const hookNames: string[] = [];
  for (const file of files) {
    const filePath = `${hooksDirPath}/${file}`;
    const stat = await lstat(filePath);
    if (stat.isDirectory()) {
      hookNames.push(file);
    } else {
      console.error(`Unexpected file in the hooks directory: ${filePath}`);
    }
  }

  const schemasContents = await schemasFileTemplate(hooksDirPath, hookNames);
  await writeFile('src/schemas.ts', schemasContents);
};

await codegenHooks('node_modules/@wirechunk/schemas/src/hooks');
await codegenSchemas('node_modules/@wirechunk/schemas/src/hooks');
