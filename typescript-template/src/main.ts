import { handleBeforeSubmitForm, start } from '@wirechunk/extension-toolkit';
import { PrismaClient } from '@prisma/client';
import { registerApi } from './api.ts';

const prisma = new PrismaClient();

handleBeforeSubmitForm(async (value) => {
  // Query from the database, check config, etc.
  return {
    continue: value,
  };
});

registerApi(prisma);

await start();
