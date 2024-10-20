import { lstat, readdir, readFile, writeFile } from 'node:fs/promises';
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

const hookHandlerTemplate = async (hooksDirPath, hookName) => {
  const hookNamePascal = kebabToPascal(hookName);
  const hookNameCamel = kebabToCamel(hookName);
  const inputType = `${hookNamePascal}Input`;
  const resultType = `${hookNamePascal}Result`;
  const inputSchema = `${hookNameCamel}InputSchema`;
  const resultSchema = `${hookNameCamel}ResultSchema`;

  const imports = `import type { ${inputType} } from '@wirechunk/schemas/hooks/${hookName}/input';
import ${inputSchema} from '@wirechunk/schemas/hooks/${hookName}/input.json' with { type: 'json' };
import type { ${resultType} } from '@wirechunk/schemas/hooks/${hookName}/result';
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
  handler: (input: ${inputType}) => Promise<${resultType} | null> | ${resultType} | null,
): void => {
  server.post<{
    Body: ${inputType};
    Reply: ${resultType};
  }>(
    '/hooks/${hookName}',
    {
      schema: {
        body: ${inputSchema},
        response: ${resultSchema},
      },
    },
    async ({ body }, reply) => {
      const res = await handler(body);
      if (!res) {
        reply.statusCode = 204;
        return;
      }
      return res;
    },
  );
};`;

  return {
    imports,
    handleFn,
  };
};

const hooksFileTemplate = async (hooksDirPath, hookNames) => {
  const templates = await Promise.all(
    hookNames.sort().map((hookName) => hookHandlerTemplate(hooksDirPath, hookName)),
  );

  return `${templates.map((t) => t.imports).join('\n')}
import { server } from './start.js';

${templates.map((t) => t.handleFn).join('\n\n')}
`;
};

const codegenHooks = async (hooksDirPath) => {
  const files = await readdir(hooksDirPath);
  const hookNames = [];
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

await codegenHooks('node_modules/@wirechunk/schemas/src/hooks');
