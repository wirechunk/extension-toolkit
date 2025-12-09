import afterEditUserStatusContextSchema from '@wirechunk/schemas/hooks/after-edit-user-status/context.json' with { type: 'json' };
import afterEditUserStatusInputSchema from '@wirechunk/schemas/hooks/after-edit-user-status/input.json' with { type: 'json' };
import afterEditUserStatusResultSchema from '@wirechunk/schemas/hooks/after-edit-user-status/result.json' with { type: 'json' };
import afterEditUserStatusValueSchema from '@wirechunk/schemas/hooks/after-edit-user-status/value.json' with { type: 'json' };
import authorizeCreateSiteContextSchema from '@wirechunk/schemas/hooks/authorize-create-site/context.json' with { type: 'json' };
import authorizeCreateSiteInputSchema from '@wirechunk/schemas/hooks/authorize-create-site/input.json' with { type: 'json' };
import authorizeCreateSiteResultSchema from '@wirechunk/schemas/hooks/authorize-create-site/result.json' with { type: 'json' };
import authorizeCreateSiteValueSchema from '@wirechunk/schemas/hooks/authorize-create-site/value.json' with { type: 'json' };
import authorizeEditSiteContextSchema from '@wirechunk/schemas/hooks/authorize-edit-site/context.json' with { type: 'json' };
import authorizeEditSiteInputSchema from '@wirechunk/schemas/hooks/authorize-edit-site/input.json' with { type: 'json' };
import authorizeEditSiteResultSchema from '@wirechunk/schemas/hooks/authorize-edit-site/result.json' with { type: 'json' };
import authorizeEditSiteValueSchema from '@wirechunk/schemas/hooks/authorize-edit-site/value.json' with { type: 'json' };
import authorizeEditSiteDomainContextSchema from '@wirechunk/schemas/hooks/authorize-edit-site-domain/context.json' with { type: 'json' };
import authorizeEditSiteDomainInputSchema from '@wirechunk/schemas/hooks/authorize-edit-site-domain/input.json' with { type: 'json' };
import authorizeEditSiteDomainResultSchema from '@wirechunk/schemas/hooks/authorize-edit-site-domain/result.json' with { type: 'json' };
import authorizeEditSiteDomainValueSchema from '@wirechunk/schemas/hooks/authorize-edit-site-domain/value.json' with { type: 'json' };
import beforeCreateSiteContextSchema from '@wirechunk/schemas/hooks/before-create-site/context.json' with { type: 'json' };
import beforeCreateSiteInputSchema from '@wirechunk/schemas/hooks/before-create-site/input.json' with { type: 'json' };
import beforeCreateSiteResultSchema from '@wirechunk/schemas/hooks/before-create-site/result.json' with { type: 'json' };
import beforeCreateSiteValueSchema from '@wirechunk/schemas/hooks/before-create-site/value.json' with { type: 'json' };
import beforeCreateUserContextSchema from '@wirechunk/schemas/hooks/before-create-user/context.json' with { type: 'json' };
import beforeCreateUserInputSchema from '@wirechunk/schemas/hooks/before-create-user/input.json' with { type: 'json' };
import beforeCreateUserResultSchema from '@wirechunk/schemas/hooks/before-create-user/result.json' with { type: 'json' };
import beforeCreateUserValueSchema from '@wirechunk/schemas/hooks/before-create-user/value.json' with { type: 'json' };
import beforeEditSiteContextSchema from '@wirechunk/schemas/hooks/before-edit-site/context.json' with { type: 'json' };
import beforeEditSiteInputSchema from '@wirechunk/schemas/hooks/before-edit-site/input.json' with { type: 'json' };
import beforeEditSiteResultSchema from '@wirechunk/schemas/hooks/before-edit-site/result.json' with { type: 'json' };
import beforeEditSiteValueSchema from '@wirechunk/schemas/hooks/before-edit-site/value.json' with { type: 'json' };
import beforeSubmitFormContextSchema from '@wirechunk/schemas/hooks/before-submit-form/context.json' with { type: 'json' };
import beforeSubmitFormInputSchema from '@wirechunk/schemas/hooks/before-submit-form/input.json' with { type: 'json' };
import beforeSubmitFormResultSchema from '@wirechunk/schemas/hooks/before-submit-form/result.json' with { type: 'json' };
import beforeSubmitFormValueSchema from '@wirechunk/schemas/hooks/before-submit-form/value.json' with { type: 'json' };
import beforeSubmitFormWebhookContextSchema from '@wirechunk/schemas/hooks/before-submit-form-webhook/context.json' with { type: 'json' };
import beforeSubmitFormWebhookInputSchema from '@wirechunk/schemas/hooks/before-submit-form-webhook/input.json' with { type: 'json' };
import beforeSubmitFormWebhookResultSchema from '@wirechunk/schemas/hooks/before-submit-form-webhook/result.json' with { type: 'json' };
import beforeSubmitFormWebhookValueSchema from '@wirechunk/schemas/hooks/before-submit-form-webhook/value.json' with { type: 'json' };
import initialFormDataContextSchema from '@wirechunk/schemas/hooks/initial-form-data/context.json' with { type: 'json' };
import initialFormDataInputSchema from '@wirechunk/schemas/hooks/initial-form-data/input.json' with { type: 'json' };
import initialFormDataResultSchema from '@wirechunk/schemas/hooks/initial-form-data/result.json' with { type: 'json' };
import initialFormDataValueSchema from '@wirechunk/schemas/hooks/initial-form-data/value.json' with { type: 'json' };
import requestContextPrincipalSchema from '@wirechunk/schemas/request-context/principal.json' with { type: 'json' };
import requestContextSiteSchema from '@wirechunk/schemas/request-context/site.json' with { type: 'json' };
import hookRejectResultHookRejectResultSchema from '@wirechunk/schemas/hook-reject-result/hook-reject-result.json' with { type: 'json' };
import expressionsExpressionSchema from '@wirechunk/schemas/expressions/expression.json' with { type: 'json' };
import contextDataContextDataSchema from '@wirechunk/schemas/context-data/context-data.json' with { type: 'json' };
import authorizeHookResultAuthorizeHookResultSchema from '@wirechunk/schemas/authorize-hook-result/authorize-hook-result.json' with { type: 'json' };
import customFieldCustomFieldSchema from '@wirechunk/schemas/custom-field/custom-field.json' with { type: 'json' };
import customFieldRichTextSchema from '@wirechunk/schemas/custom-field/rich-text.json' with { type: 'json' };
import type { SchemaObject } from 'ajv';
import type { SetRequired } from 'type-fest';

export const schemas: Array<SetRequired<SchemaObject, '$id'>> = [
  afterEditUserStatusContextSchema,
  afterEditUserStatusInputSchema,
  afterEditUserStatusResultSchema,
  afterEditUserStatusValueSchema,
  authorizeCreateSiteContextSchema,
  authorizeCreateSiteInputSchema,
  authorizeCreateSiteResultSchema,
  authorizeCreateSiteValueSchema,
  authorizeEditSiteContextSchema,
  authorizeEditSiteInputSchema,
  authorizeEditSiteResultSchema,
  authorizeEditSiteValueSchema,
  authorizeEditSiteDomainContextSchema,
  authorizeEditSiteDomainInputSchema,
  authorizeEditSiteDomainResultSchema,
  authorizeEditSiteDomainValueSchema,
  beforeCreateSiteContextSchema,
  beforeCreateSiteInputSchema,
  beforeCreateSiteResultSchema,
  beforeCreateSiteValueSchema,
  beforeCreateUserContextSchema,
  beforeCreateUserInputSchema,
  beforeCreateUserResultSchema,
  beforeCreateUserValueSchema,
  beforeEditSiteContextSchema,
  beforeEditSiteInputSchema,
  beforeEditSiteResultSchema,
  beforeEditSiteValueSchema,
  beforeSubmitFormContextSchema,
  beforeSubmitFormInputSchema,
  beforeSubmitFormResultSchema,
  beforeSubmitFormValueSchema,
  beforeSubmitFormWebhookContextSchema,
  beforeSubmitFormWebhookInputSchema,
  beforeSubmitFormWebhookResultSchema,
  beforeSubmitFormWebhookValueSchema,
  initialFormDataContextSchema,
  initialFormDataInputSchema,
  initialFormDataResultSchema,
  initialFormDataValueSchema,
  requestContextPrincipalSchema,
  requestContextSiteSchema,
  hookRejectResultHookRejectResultSchema,
  expressionsExpressionSchema,
  contextDataContextDataSchema,
  authorizeHookResultAuthorizeHookResultSchema,
  customFieldCustomFieldSchema,
  customFieldRichTextSchema,
];
