import { registerApiRoutes } from '@wirechunk/extension-toolkit';
import { PrismaClient } from '@prisma/client';
import formBody from '@fastify/formbody';
import type { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';

export const registerApi = (prisma: PrismaClient) =>
  registerApiRoutes((origServer) => {
    const server = origServer.withTypeProvider<JsonSchemaToTsProvider>();

    server.register(formBody);

    // Example API endpoint at GET /_api/ext/missed-call-text-back
    server.get('/', () => {
      return { message: 'Hello' };
    });

    // Example API endpoint at POST /_api/ext/missed-call-text-back/test
    server.post(
      '/test',
      {
        schema: {
          body: {
            type: 'object',
            properties: {
              userId: { type: 'string' },
            },
            required: ['userId'],
          },
        },
      },
      async (req) => {
        const user = await prisma.user.findUnique({
          where: {
            id: req.body.userId,
          },
        });
        return { user };
      },
    );
  });
