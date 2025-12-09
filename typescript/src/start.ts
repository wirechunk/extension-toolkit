import process from 'node:process';
import type { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';
import type { FastifyBaseLogger, FastifyInstance, RawServerDefault } from 'fastify';
import fastify from 'fastify';
import { Ajv2020 } from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { schemas } from './schemas.js';

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

const extConfigFile = 'extension.json';

if (!existsSync(extConfigFile)) {
  console.error(
    `The extension configuration file ${extConfigFile} is missing in the current working directory (${process.cwd()})`,
  );
  process.exit(1);
}

const extConfig: unknown = JSON.parse(await readFile(extConfigFile, 'utf8'));
if (!extConfig || typeof extConfig !== 'object') {
  console.error(
    `The extension configuration file ${extConfigFile} is invalid, must be a JSON object`,
  );
  process.exit(1);
}
if (!(extConfig as Record<string, unknown>).name) {
  console.error(
    `The extension configuration file ${extConfigFile} is missing the required "name" property`,
  );
  process.exit(1);
}

const extensionName: unknown = (extConfig as { name: unknown }).name;
if (typeof extensionName !== 'string') {
  console.error(
    `The extension configuration file ${extConfigFile} has an invalid "name" property, must be a string`,
  );
  process.exit(1);
}

export const server = fastify({
  logger: true,
}).withTypeProvider<JsonSchemaToTsProvider>();

const ajv = new Ajv2020({ strict: false, allErrors: true });
// @ts-expect-error - addFormats is not typed correctly.
addFormats(ajv);

schemas.forEach((schema) => {
  ajv.addSchema(schema, schema.$id);
  server.addSchema(schema);
});

server.setValidatorCompiler(({ schema }) => ajv.compile(schema));

// No validation on serializing because the client should validate.
server.setSerializerCompiler(() => (data) => JSON.stringify(data));

let healthCheck: () => 'OK' | Promise<'OK'> = () => 'OK';

/**
 * Set a custom function to use as the health check for the server. The function should verify that all of the
 * server's dependencies (like connecting to the database) are healthy. This function should return a promise that
 * resolves to 'OK' if the check passes, or reject the promise (throw an exception) otherwise.
 */
export const setHealthCheck = (fn: () => 'OK' | Promise<'OK'>) => {
  healthCheck = fn;
};

// This wrapper function is needed so that we can update the healthCheck reference after this module is evaluated.
server.get('/health', () => healthCheck());

/**
 * Start the extension server, responding to hooks and API requests. This function should be called
 * only after all hook handlers and API request handlers have been registered.
 */
export const start = async () => {
  try {
    await server.listen({ host: '0.0.0.0', port: portNumber });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

/**
 * Register an API route handler for any type of custom API. The path provided will be appended to "/_api/ext/{this-extension-name}".
 * For example, if you register an API route with the path "/foo" and your extension's name is "my-great-extension", the API will
 * be accessible at "/_api/ext/my-great-extension/foo".
 *
 * This function provides full access to a Fastify server instance. Call this before calling start.
 */
export const registerApiRoutes = (
  registerFn: (
    server: FastifyInstance<
      RawServerDefault,
      IncomingMessage,
      ServerResponse,
      FastifyBaseLogger,
      JsonSchemaToTsProvider
    >,
  ) => void,
) =>
  server.register(
    (server, _, done) => {
      registerFn(server);
      done();
    },
    { prefix: `/_api/ext/${extensionName}` },
  );
