import type { AuthorizeCreateSiteInput } from '@wirechunk/schemas/hooks/authorize-create-site/input';
import authorizeCreateSiteInputSchema from '@wirechunk/schemas/hooks/authorize-create-site/input.json' with { type: 'json' };
import type { AuthorizeCreateSiteResult } from '@wirechunk/schemas/hooks/authorize-create-site/result';
import authorizeCreateSiteResultSchema from '@wirechunk/schemas/hooks/authorize-create-site/result.json' with { type: 'json' };
import type { BeforeCreateSiteInput } from '@wirechunk/schemas/hooks/before-create-site/input';
import beforeCreateSiteInputSchema from '@wirechunk/schemas/hooks/before-create-site/input.json' with { type: 'json' };
import type { BeforeCreateSiteResult } from '@wirechunk/schemas/hooks/before-create-site/result';
import beforeCreateSiteResultSchema from '@wirechunk/schemas/hooks/before-create-site/result.json' with { type: 'json' };
import type { BeforeSubmitFormInput } from '@wirechunk/schemas/hooks/before-submit-form/input';
import beforeSubmitFormInputSchema from '@wirechunk/schemas/hooks/before-submit-form/input.json' with { type: 'json' };
import type { BeforeSubmitFormResult } from '@wirechunk/schemas/hooks/before-submit-form/result';
import beforeSubmitFormResultSchema from '@wirechunk/schemas/hooks/before-submit-form/result.json' with { type: 'json' };
import type { InitialFormDataInput } from '@wirechunk/schemas/hooks/initial-form-data/input';
import initialFormDataInputSchema from '@wirechunk/schemas/hooks/initial-form-data/input.json' with { type: 'json' };
import type { InitialFormDataResult } from '@wirechunk/schemas/hooks/initial-form-data/result';
import initialFormDataResultSchema from '@wirechunk/schemas/hooks/initial-form-data/result.json' with { type: 'json' };
import {
  validateAuthorizeCreateSiteInput,
  validateBeforeCreateSiteInput,
  validateBeforeSubmitFormInput,
  validateInitialFormDataInput,
} from '@wirechunk/schemas/validate';
import { server } from './start.js';

/**
 * Register a handler for the authorize-create-site hook.
 * This hook is used to check if a user is permitted to create a site.
 * It is fired before the before-create-site hook.
 * This function should be called before starting the server.
 */
export const handleAuthorizeCreateSite = (
  handler: (
    input: AuthorizeCreateSiteInput,
  ) => Promise<AuthorizeCreateSiteResult | null> | AuthorizeCreateSiteResult | null,
): void => {
  server.post<{
    Body: AuthorizeCreateSiteInput;
    Reply: AuthorizeCreateSiteResult;
  }>(
    '/hooks/authorize-create-site',
    {
      schema: {
        body: authorizeCreateSiteInputSchema,
        response: { 200: authorizeCreateSiteResultSchema },
      },
      validatorCompiler: () => validateAuthorizeCreateSiteInput,
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
};

/**
 * Register a handler for the before-create-site hook.
 * This hook is fired before a site is created. It can be used to modify the input data or to prevent the request with an error message.
 * This function should be called before starting the server.
 */
export const handleBeforeCreateSite = (
  handler: (
    input: BeforeCreateSiteInput,
  ) => Promise<BeforeCreateSiteResult | null> | BeforeCreateSiteResult | null,
): void => {
  server.post<{
    Body: BeforeCreateSiteInput;
    Reply: BeforeCreateSiteResult;
  }>(
    '/hooks/before-create-site',
    {
      schema: {
        body: beforeCreateSiteInputSchema,
        response: { 200: beforeCreateSiteResultSchema },
      },
      validatorCompiler: () => validateBeforeCreateSiteInput,
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
};

/**
 * Register a handler for the before-submit-form hook.
 * This hook is fired before a form submission is saved.
 * This function should be called before starting the server.
 */
export const handleBeforeSubmitForm = (
  handler: (
    input: BeforeSubmitFormInput,
  ) => Promise<BeforeSubmitFormResult | null> | BeforeSubmitFormResult | null,
): void => {
  server.post<{
    Body: BeforeSubmitFormInput;
    Reply: BeforeSubmitFormResult;
  }>(
    '/hooks/before-submit-form',
    {
      schema: {
        body: beforeSubmitFormInputSchema,
        response: { 200: beforeSubmitFormResultSchema },
      },
      validatorCompiler: () => validateBeforeSubmitFormInput,
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
};

/**
 * Register a handler for the initial-form-data hook.
 * This hook allows customizing the data with which a form is initialized. For example, it can return different
 * results depending on the user (if any) who is viewing the form and any data that the user has previously submitted.
 * This function should be called before starting the server.
 */
export const handleInitialFormData = (
  handler: (
    input: InitialFormDataInput,
  ) => Promise<InitialFormDataResult | null> | InitialFormDataResult | null,
): void => {
  server.post<{
    Body: InitialFormDataInput;
    Reply: InitialFormDataResult;
  }>(
    '/hooks/initial-form-data',
    {
      schema: {
        body: initialFormDataInputSchema,
        response: { 200: initialFormDataResultSchema },
      },
      validatorCompiler: () => validateInitialFormDataInput,
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
};
