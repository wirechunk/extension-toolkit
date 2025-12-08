import afterEditUserStatusContextSchema from '@wirechunk/schemas/hooks/after-edit-user-status/context.json' with { type: 'json' };
import afterEditUserStatusInputSchema from '@wirechunk/schemas/hooks/after-edit-user-status/input.json' with { type: 'json' };
import afterEditUserStatusResultSchema from '@wirechunk/schemas/hooks/after-edit-user-status/result.json' with { type: 'json' };
import afterEditUserStatusValueSchema from '@wirechunk/schemas/hooks/after-edit-user-status/value.json' with { type: 'json' };
import authorizeCreateSiteContextSchema from '@wirechunk/schemas/hooks/authorize-create-site/context.json' with { type: 'json' };
import authorizeCreateSiteInputSchema from '@wirechunk/schemas/hooks/authorize-create-site/input.json' with { type: 'json' };
import authorizeCreateSitePropertiesSchema from '@wirechunk/schemas/hooks/authorize-create-site/properties.json' with { type: 'json' };
import authorizeCreateSiteResultSchema from '@wirechunk/schemas/hooks/authorize-create-site/result.json' with { type: 'json' };
import authorizeCreateSiteValueSchema from '@wirechunk/schemas/hooks/authorize-create-site/value.json' with { type: 'json' };
import authorizeEditSiteContextSchema from '@wirechunk/schemas/hooks/authorize-edit-site/context.json' with { type: 'json' };
import authorizeEditSiteInputSchema from '@wirechunk/schemas/hooks/authorize-edit-site/input.json' with { type: 'json' };
import authorizeEditSitePropertiesSchema from '@wirechunk/schemas/hooks/authorize-edit-site/properties.json' with { type: 'json' };
import authorizeEditSiteResultSchema from '@wirechunk/schemas/hooks/authorize-edit-site/result.json' with { type: 'json' };
import authorizeEditSiteValueSchema from '@wirechunk/schemas/hooks/authorize-edit-site/value.json' with { type: 'json' };
import authorizeEditSiteDomainContextSchema from '@wirechunk/schemas/hooks/authorize-edit-site-domain/context.json' with { type: 'json' };
import authorizeEditSiteDomainInputSchema from '@wirechunk/schemas/hooks/authorize-edit-site-domain/input.json' with { type: 'json' };
import authorizeEditSiteDomainPropertiesSchema from '@wirechunk/schemas/hooks/authorize-edit-site-domain/properties.json' with { type: 'json' };
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
import type { AnySchema } from 'ajv';

type SchemaEntry = { schema: AnySchema; key: string };

const schemas: SchemaEntry[] = [
  {
    schema: afterEditUserStatusContextSchema,
    key: '@wirechunk/schemas/hooks/after-edit-user-status/context.json',
  },
  {
    schema: afterEditUserStatusInputSchema,
    key: '@wirechunk/schemas/hooks/after-edit-user-status/input.json',
  },
  {
    schema: afterEditUserStatusResultSchema,
    key: '@wirechunk/schemas/hooks/after-edit-user-status/result.json',
  },
  {
    schema: afterEditUserStatusValueSchema,
    key: '@wirechunk/schemas/hooks/after-edit-user-status/value.json',
  },
  {
    schema: authorizeCreateSiteContextSchema,
    key: '@wirechunk/schemas/hooks/authorize-create-site/context.json',
  },
  {
    schema: authorizeCreateSiteInputSchema,
    key: '@wirechunk/schemas/hooks/authorize-create-site/input.json',
  },
  {
    schema: authorizeCreateSitePropertiesSchema,
    key: '@wirechunk/schemas/hooks/authorize-create-site/properties.json',
  },
  {
    schema: authorizeCreateSiteResultSchema,
    key: '@wirechunk/schemas/hooks/authorize-create-site/result.json',
  },
  {
    schema: authorizeCreateSiteValueSchema,
    key: '@wirechunk/schemas/hooks/authorize-create-site/value.json',
  },
  {
    schema: authorizeEditSiteContextSchema,
    key: '@wirechunk/schemas/hooks/authorize-edit-site/context.json',
  },
  {
    schema: authorizeEditSiteInputSchema,
    key: '@wirechunk/schemas/hooks/authorize-edit-site/input.json',
  },
  {
    schema: authorizeEditSitePropertiesSchema,
    key: '@wirechunk/schemas/hooks/authorize-edit-site/properties.json',
  },
  {
    schema: authorizeEditSiteResultSchema,
    key: '@wirechunk/schemas/hooks/authorize-edit-site/result.json',
  },
  {
    schema: authorizeEditSiteValueSchema,
    key: '@wirechunk/schemas/hooks/authorize-edit-site/value.json',
  },
  {
    schema: authorizeEditSiteDomainContextSchema,
    key: '@wirechunk/schemas/hooks/authorize-edit-site-domain/context.json',
  },
  {
    schema: authorizeEditSiteDomainInputSchema,
    key: '@wirechunk/schemas/hooks/authorize-edit-site-domain/input.json',
  },
  {
    schema: authorizeEditSiteDomainPropertiesSchema,
    key: '@wirechunk/schemas/hooks/authorize-edit-site-domain/properties.json',
  },
  {
    schema: authorizeEditSiteDomainResultSchema,
    key: '@wirechunk/schemas/hooks/authorize-edit-site-domain/result.json',
  },
  {
    schema: authorizeEditSiteDomainValueSchema,
    key: '@wirechunk/schemas/hooks/authorize-edit-site-domain/value.json',
  },
  {
    schema: beforeCreateSiteContextSchema,
    key: '@wirechunk/schemas/hooks/before-create-site/context.json',
  },
  {
    schema: beforeCreateSiteInputSchema,
    key: '@wirechunk/schemas/hooks/before-create-site/input.json',
  },
  {
    schema: beforeCreateSiteResultSchema,
    key: '@wirechunk/schemas/hooks/before-create-site/result.json',
  },
  {
    schema: beforeCreateSiteValueSchema,
    key: '@wirechunk/schemas/hooks/before-create-site/value.json',
  },
  {
    schema: beforeCreateUserContextSchema,
    key: '@wirechunk/schemas/hooks/before-create-user/context.json',
  },
  {
    schema: beforeCreateUserInputSchema,
    key: '@wirechunk/schemas/hooks/before-create-user/input.json',
  },
  {
    schema: beforeCreateUserResultSchema,
    key: '@wirechunk/schemas/hooks/before-create-user/result.json',
  },
  {
    schema: beforeCreateUserValueSchema,
    key: '@wirechunk/schemas/hooks/before-create-user/value.json',
  },
  {
    schema: beforeEditSiteContextSchema,
    key: '@wirechunk/schemas/hooks/before-edit-site/context.json',
  },
  {
    schema: beforeEditSiteInputSchema,
    key: '@wirechunk/schemas/hooks/before-edit-site/input.json',
  },
  {
    schema: beforeEditSiteResultSchema,
    key: '@wirechunk/schemas/hooks/before-edit-site/result.json',
  },
  {
    schema: beforeEditSiteValueSchema,
    key: '@wirechunk/schemas/hooks/before-edit-site/value.json',
  },
  {
    schema: beforeSubmitFormContextSchema,
    key: '@wirechunk/schemas/hooks/before-submit-form/context.json',
  },
  {
    schema: beforeSubmitFormInputSchema,
    key: '@wirechunk/schemas/hooks/before-submit-form/input.json',
  },
  {
    schema: beforeSubmitFormResultSchema,
    key: '@wirechunk/schemas/hooks/before-submit-form/result.json',
  },
  {
    schema: beforeSubmitFormValueSchema,
    key: '@wirechunk/schemas/hooks/before-submit-form/value.json',
  },
  {
    schema: beforeSubmitFormWebhookContextSchema,
    key: '@wirechunk/schemas/hooks/before-submit-form-webhook/context.json',
  },
  {
    schema: beforeSubmitFormWebhookInputSchema,
    key: '@wirechunk/schemas/hooks/before-submit-form-webhook/input.json',
  },
  {
    schema: beforeSubmitFormWebhookResultSchema,
    key: '@wirechunk/schemas/hooks/before-submit-form-webhook/result.json',
  },
  {
    schema: beforeSubmitFormWebhookValueSchema,
    key: '@wirechunk/schemas/hooks/before-submit-form-webhook/value.json',
  },
  {
    schema: initialFormDataContextSchema,
    key: '@wirechunk/schemas/hooks/initial-form-data/context.json',
  },
  {
    schema: initialFormDataInputSchema,
    key: '@wirechunk/schemas/hooks/initial-form-data/input.json',
  },
  {
    schema: initialFormDataResultSchema,
    key: '@wirechunk/schemas/hooks/initial-form-data/result.json',
  },
  {
    schema: initialFormDataValueSchema,
    key: '@wirechunk/schemas/hooks/initial-form-data/value.json',
  },
  {
    schema: requestContextPrincipalSchema,
    key: '@wirechunk/schemas/request-context/principal.json',
  },
  { schema: requestContextSiteSchema, key: '@wirechunk/schemas/request-context/site.json' },
];

type AjvSchemaRegistrar = { addSchema: (schema: AnySchema, key?: string) => unknown };

export const registerSchemas = (ajv: AjvSchemaRegistrar): void => {
  const seen = new Set<string>();
  schemas.forEach(({ schema, key }) => {
    const idFromSchema = typeof schema === 'boolean' ? undefined : schema.$id;
    const id = typeof idFromSchema === 'string' && idFromSchema.length > 0 ? idFromSchema : key;
    if (seen.has(id)) {
      return;
    }
    seen.add(id);
    ajv.addSchema(schema, id);
  });
};
