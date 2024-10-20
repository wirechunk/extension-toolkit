import { handleBeforeSubmitForm, start } from '@wirechunk/extension-toolkit';
import { PrismaClient } from '@prisma/client';
import { registerApi } from './api.ts';

const prisma = new PrismaClient();

handleBeforeSubmitForm(async ({ value, context }) => {
  // Query from the database, check config, etc.
  return {
    value,
  };
});

registerApi(prisma);

await start();
