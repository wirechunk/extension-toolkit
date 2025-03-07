import type { CodegenConfig } from '@graphql-codegen/cli';

export default {
  schema: 'https://wirechunk.com/api',
  overwrite: true,
  generates: {
    'src/web/queries/queries.generated.ts': {
      documents: './src/web/queries/*.graphql',
      plugins: ['typescript', 'typescript-operations', 'typed-document-node'],
      config: {
        avoidOptionals: false,
        inputMaybeValue: 'T | null | undefined',
        nonOptionalTypename: true,
        skipTypeNameForRoot: true,
        strictScalars: true,
        scalars: {
          Date: 'unknown',
        },
        enumsAsConst: true,
        namingConvention: {
          enumValues: 'keep',
        },
        useTypeImports: true,
      },
    },
  },
  emitLegacyCommonJSImports: false,
} satisfies CodegenConfig;
