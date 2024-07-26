import fastify from 'fastify';
import * as process from 'node:process';
import formSubmissionValueSchema from '@wirechunk/schemas/hooks/form-submission/value.json' with { type: 'json' };
import contextDataSchema from '@wirechunk/schemas/context-data/context-data.json' with { type: 'json' };
import { Ajv2020 as Ajv } from 'ajv/dist/2020.js';
import { HookResult } from '@wirechunk/schemas/hook-result';
import type { Schema } from 'ajv';

const ajv = new Ajv({
  strict: true,
  removeAdditional: true,
  coerceTypes: false,
  allErrors: false,
  allowUnionTypes: true,
});

const port = process.env.PORT;
if (!port) {
  console.error(
    'The required PORT environment variable is missing, needs to be set like PORT=8100',
  );
  process.exit(1);
}

const portNumber = Number(port);
if (isNaN(portNumber)) {
  console.error('The PORT environment variable is not a number, needs to be set like PORT=8100');
  process.exit(1);
}

const server = fastify({
  logger: true,
});

ajv.addSchema([contextDataSchema, formSubmissionValueSchema]);

server.setValidatorCompiler(({ schema }) => ajv.compile(schema));

// No validation on serializing because the client should validate.
server.setSerializerCompiler(() => (data) => JSON.stringify(data));

server.get('/health', (_request, reply) => {
  return 'OK';
});

/**
 * Start the extension server, responding to hooks and API requests. This function should be called
 * only after all hook handlers and API request handlers have been registered.
 */
export const start = async () => {
  try {
    await server.listen({ port: portNumber });
    console.log(`Server listening on port ${portNumber}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

/**
 * A hook handler the specified event and returns either a result to modify the event or null to
 * indicate that it is ignoring the event (i.e., no effect).
 */
export type HookHandler<TValue, TStopAction> = (
  value: TValue,
) => Promise<HookResult<TValue, TStopAction> | null> | null;

/**
 * Registers a handler function for the specified hook.
 * This function should be called before starting the server.
 */
export const registerHookHandler = <TValue, TStopAction>(
  hookName: string,
  valueSchema: Schema,
  handler: HookHandler<TValue, TStopAction>,
): void => {
  server.post<{
    Body: TValue;
    Reply: HookResult<TValue, TStopAction>;
  }>(
    `/hooks/${hookName}`,
    {
      schema: {
        body: valueSchema,
      },
    },
    async ({ body }, reply) => {
      const res = await handler(body as never);
      if (!res) {
        reply.statusCode = 204;
        return;
      }
      return res;
    },
  );
};
