import { registerApiRoutes } from '@wirechunk/extension-toolkit/server';
import { PrismaClient } from '@prisma/client';
import formBody from '@fastify/formbody';

export const registerApi = (prisma: PrismaClient) =>
  registerApiRoutes((server) => {
    server.register(formBody);

    // Example API endpoint at GET /_api/ext/<name>
    server.get('/', () => {
      return { message: 'Hello' };
    });

    // Example API endpoint at POST /_api/ext/<name>/test
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
