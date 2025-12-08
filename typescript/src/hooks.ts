import type { AfterEditUserStatusInput } from '@wirechunk/schemas/hooks/after-edit-user-status/input';
import afterEditUserStatusInputSchema from '@wirechunk/schemas/hooks/after-edit-user-status/input.json' with { type: 'json' };
import type { AfterEditUserStatusResult } from '@wirechunk/schemas/hooks/after-edit-user-status/result';
import afterEditUserStatusResultSchema from '@wirechunk/schemas/hooks/after-edit-user-status/result.json' with { type: 'json' };
import type { AuthorizeCreateSiteInput } from '@wirechunk/schemas/hooks/authorize-create-site/input';
import authorizeCreateSiteInputSchema from '@wirechunk/schemas/hooks/authorize-create-site/input.json' with { type: 'json' };
import type { AuthorizeCreateSiteResult } from '@wirechunk/schemas/hooks/authorize-create-site/result';
import authorizeCreateSiteResultSchema from '@wirechunk/schemas/hooks/authorize-create-site/result.json' with { type: 'json' };
import type { AuthorizeEditSiteInput } from '@wirechunk/schemas/hooks/authorize-edit-site/input';
import authorizeEditSiteInputSchema from '@wirechunk/schemas/hooks/authorize-edit-site/input.json' with { type: 'json' };
import type { AuthorizeEditSiteResult } from '@wirechunk/schemas/hooks/authorize-edit-site/result';
import authorizeEditSiteResultSchema from '@wirechunk/schemas/hooks/authorize-edit-site/result.json' with { type: 'json' };
import type { AuthorizeEditSiteDomainInput } from '@wirechunk/schemas/hooks/authorize-edit-site-domain/input';
import authorizeEditSiteDomainInputSchema from '@wirechunk/schemas/hooks/authorize-edit-site-domain/input.json' with { type: 'json' };
import type { AuthorizeEditSiteDomainResult } from '@wirechunk/schemas/hooks/authorize-edit-site-domain/result';
import authorizeEditSiteDomainResultSchema from '@wirechunk/schemas/hooks/authorize-edit-site-domain/result.json' with { type: 'json' };
import type { BeforeCreateSiteInput } from '@wirechunk/schemas/hooks/before-create-site/input';
import beforeCreateSiteInputSchema from '@wirechunk/schemas/hooks/before-create-site/input.json' with { type: 'json' };
import type { BeforeCreateSiteResult } from '@wirechunk/schemas/hooks/before-create-site/result';
import beforeCreateSiteResultSchema from '@wirechunk/schemas/hooks/before-create-site/result.json' with { type: 'json' };
import type { BeforeCreateUserInput } from '@wirechunk/schemas/hooks/before-create-user/input';
import beforeCreateUserInputSchema from '@wirechunk/schemas/hooks/before-create-user/input.json' with { type: 'json' };
import type { BeforeCreateUserResult } from '@wirechunk/schemas/hooks/before-create-user/result';
import beforeCreateUserResultSchema from '@wirechunk/schemas/hooks/before-create-user/result.json' with { type: 'json' };
import type { BeforeEditSiteInput } from '@wirechunk/schemas/hooks/before-edit-site/input';
import beforeEditSiteInputSchema from '@wirechunk/schemas/hooks/before-edit-site/input.json' with { type: 'json' };
import type { BeforeEditSiteResult } from '@wirechunk/schemas/hooks/before-edit-site/result';
import beforeEditSiteResultSchema from '@wirechunk/schemas/hooks/before-edit-site/result.json' with { type: 'json' };
import type { BeforeSubmitFormInput } from '@wirechunk/schemas/hooks/before-submit-form/input';
import beforeSubmitFormInputSchema from '@wirechunk/schemas/hooks/before-submit-form/input.json' with { type: 'json' };
import type { BeforeSubmitFormResult } from '@wirechunk/schemas/hooks/before-submit-form/result';
import beforeSubmitFormResultSchema from '@wirechunk/schemas/hooks/before-submit-form/result.json' with { type: 'json' };
import type { BeforeSubmitFormWebhookInput } from '@wirechunk/schemas/hooks/before-submit-form-webhook/input';
import beforeSubmitFormWebhookInputSchema from '@wirechunk/schemas/hooks/before-submit-form-webhook/input.json' with { type: 'json' };
import type { BeforeSubmitFormWebhookResult } from '@wirechunk/schemas/hooks/before-submit-form-webhook/result';
import beforeSubmitFormWebhookResultSchema from '@wirechunk/schemas/hooks/before-submit-form-webhook/result.json' with { type: 'json' };
import type { InitialFormDataInput } from '@wirechunk/schemas/hooks/initial-form-data/input';
import initialFormDataInputSchema from '@wirechunk/schemas/hooks/initial-form-data/input.json' with { type: 'json' };
import type { InitialFormDataResult } from '@wirechunk/schemas/hooks/initial-form-data/result';
import initialFormDataResultSchema from '@wirechunk/schemas/hooks/initial-form-data/result.json' with { type: 'json' };
import type { FastifyReply, FastifyRequest } from 'fastify';
import { server } from './start.js';

type HookHandler<Body, Reply> = (input: Body) => Promise<Reply | null> | Reply | null;

type HookRequest<Body, Reply> = FastifyRequest<{ Body: Body; Reply: Reply }> & {
  body: Body;
};

const wrap =
  <Body, Reply>(handler: HookHandler<Body, Reply>) =>
  async ({ body }: HookRequest<Body, Reply>, reply: FastifyReply) => {
    const res = await handler(body);
    if (!res) {
      reply.statusCode = 204;
      return;
    }
    return res;
  };

/**
 * Register a handler for the after-edit-user-status hook.
 * This hook is fired after a user's status is changed.
 * This hook is not used when an admin user's status is changed.
 * This function should be called before starting the server.
 */
export const handleAfterEditUserStatus = (
  handler: HookHandler<AfterEditUserStatusInput, AfterEditUserStatusResult>,
): void => {
  server.post<{
    Body: AfterEditUserStatusInput;
    Reply: AfterEditUserStatusResult;
  }>(
    '/hooks/after-edit-user-status',
    {
      schema: {
        body: afterEditUserStatusInputSchema,
        response: { 200: afterEditUserStatusResultSchema },
      },
    },
    wrap(handler),
  );
};

/**
 * Register a handler for the authorize-create-site hook.
 * This hook is used to check if a user is permitted to create a site.
 * It is fired before the before-create-site hook.
 * This function should be called before starting the server.
 */
export const handleAuthorizeCreateSite = (
  handler: HookHandler<AuthorizeCreateSiteInput, AuthorizeCreateSiteResult>,
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
    },
    wrap(handler),
  );
};

/**
 * Register a handler for the authorize-edit-site hook.
 * This hook is used to check if a user is permitted to edit a site.
 * It is fired before the before-edit-site hook.
 * Note that the authorize-edit-site-domain hook is used to check if a user is permitted to edit a site's domain.
 * This function should be called before starting the server.
 */
export const handleAuthorizeEditSite = (
  handler: HookHandler<AuthorizeEditSiteInput, AuthorizeEditSiteResult>,
): void => {
  server.post<{
    Body: AuthorizeEditSiteInput;
    Reply: AuthorizeEditSiteResult;
  }>(
    '/hooks/authorize-edit-site',
    {
      schema: {
        body: authorizeEditSiteInputSchema,
        response: { 200: authorizeEditSiteResultSchema },
      },
    },
    wrap(handler),
  );
};

/**
 * Register a handler for the authorize-edit-site-domain hook.
 * This hook is used to check if a user is permitted to edit a site’s domain.
 * It is fired before the before-edit-site hook.
 * This function should be called before starting the server.
 */
export const handleAuthorizeEditSiteDomain = (
  handler: HookHandler<AuthorizeEditSiteDomainInput, AuthorizeEditSiteDomainResult>,
): void => {
  server.post<{
    Body: AuthorizeEditSiteDomainInput;
    Reply: AuthorizeEditSiteDomainResult;
  }>(
    '/hooks/authorize-edit-site-domain',
    {
      schema: {
        body: authorizeEditSiteDomainInputSchema,
        response: { 200: authorizeEditSiteDomainResultSchema },
      },
    },
    wrap(handler),
  );
};

/**
 * Register a handler for the before-create-site hook.
 * This hook is fired before a site is created. It can be used to modify the input data or to prevent the request with an error message.
 * This function should be called before starting the server.
 */
export const handleBeforeCreateSite = (
  handler: HookHandler<BeforeCreateSiteInput, BeforeCreateSiteResult>,
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
    },
    wrap(handler),
  );
};

/**
 * Register a handler for the before-create-user hook.
 * This hook is fired before a user is created. It can be used to modify the input data or to prevent the request with an error message.
 * This hook is not used when creating an admin user.
 * This function should be called before starting the server.
 */
export const handleBeforeCreateUser = (
  handler: HookHandler<BeforeCreateUserInput, BeforeCreateUserResult>,
): void => {
  server.post<{
    Body: BeforeCreateUserInput;
    Reply: BeforeCreateUserResult;
  }>(
    '/hooks/before-create-user',
    {
      schema: {
        body: beforeCreateUserInputSchema,
        response: { 200: beforeCreateUserResultSchema },
      },
    },
    wrap(handler),
  );
};

/**
 * Register a handler for the before-edit-site hook.
 * This hook is fired before a site is edited. It can be used to modify the input data or to prevent the request with an error message.
 * This function should be called before starting the server.
 */
export const handleBeforeEditSite = (
  handler: HookHandler<BeforeEditSiteInput, BeforeEditSiteResult>,
): void => {
  server.post<{
    Body: BeforeEditSiteInput;
    Reply: BeforeEditSiteResult;
  }>(
    '/hooks/before-edit-site',
    {
      schema: {
        body: beforeEditSiteInputSchema,
        response: { 200: beforeEditSiteResultSchema },
      },
    },
    wrap(handler),
  );
};

/**
 * Register a handler for the before-submit-form hook.
 * This hook is fired before a form submission is saved.
 * This function should be called before starting the server.
 */
export const handleBeforeSubmitForm = (
  handler: HookHandler<BeforeSubmitFormInput, BeforeSubmitFormResult>,
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
    },
    wrap(handler),
  );
};

/**
 * Register a handler for the before-submit-form-webhook hook.
 * This hook is fired after a form submission is processed successfully, before a webhook for a form submission is sent.
 * It can be used to modify the webhook payload, including adding additional fields to the payload.
 * The hook is invoked asynchronously by the Wirechunk job worker, so there is no site or principal field in the context object.
 * This function should be called before starting the server.
 */
export const handleBeforeSubmitFormWebhook = (
  handler: HookHandler<BeforeSubmitFormWebhookInput, BeforeSubmitFormWebhookResult>,
): void => {
  server.post<{
    Body: BeforeSubmitFormWebhookInput;
    Reply: BeforeSubmitFormWebhookResult;
  }>(
    '/hooks/before-submit-form-webhook',
    {
      schema: {
        body: beforeSubmitFormWebhookInputSchema,
        response: { 200: beforeSubmitFormWebhookResultSchema },
      },
    },
    wrap(handler),
  );
};

/**
 * Register a handler for the initial-form-data hook.
 * This hook allows customizing the data with which a form is initialized. For example, it can return different
 * results depending on the user (if any) who is viewing the form and any data that the user has previously submitted.
 * This function should be called before starting the server.
 */
export const handleInitialFormData = (
  handler: HookHandler<InitialFormDataInput, InitialFormDataResult>,
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
    },
    wrap(handler),
  );
};
