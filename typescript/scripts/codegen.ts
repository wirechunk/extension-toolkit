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

  const hasStopValueSchema = existsSync(`${hooksDirPath}/${hookName}/stop-value.json`);

  const imports = `${
    hasStopValueSchema
      ? `import type { ${hookNamePascal}StopValue } from '@wirechunk/schemas/hooks/${hookName}/stop-value';
`
      : ''
  }import type { ${hookNamePascal}Value } from '@wirechunk/schemas/hooks/${hookName}/value';
import ${hookNameCamel}ValueSchema from '@wirechunk/schemas/hooks/${hookName}/value.json' with { type: 'json' };`;

  let description;
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
 * Handle the ${hookName} hook.${description ? `\n${description}` : ''}
 */
export const handle${hookNamePascal} = (
  handler: HookHandler<${hookNamePascal}Value, ${hasStopValueSchema ? `${hookNamePascal}StopValue` : `${hookNamePascal}Value`}>,
): void => {
  registerHookHandler('${hookName}', ${hookNameCamel}ValueSchema, handler);
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
import { HookHandler, registerHookHandler } from './start.js';

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
