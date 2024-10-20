import type { BeforeCreateSiteStopValue } from '@wirechunk/schemas/hooks/before-create-site/stop-value';
import type { BeforeCreateSiteValue } from '@wirechunk/schemas/hooks/before-create-site/value';
import beforeCreateSiteValueSchema from '@wirechunk/schemas/hooks/before-create-site/value.json' with { type: 'json' };
import type { BeforeSubmitFormStopValue } from '@wirechunk/schemas/hooks/before-submit-form/stop-value';
import type { BeforeSubmitFormValue } from '@wirechunk/schemas/hooks/before-submit-form/value';
import beforeSubmitFormValueSchema from '@wirechunk/schemas/hooks/before-submit-form/value.json' with { type: 'json' };
import type { InitialFormDataValue } from '@wirechunk/schemas/hooks/initial-form-data/value';
import initialFormDataValueSchema from '@wirechunk/schemas/hooks/initial-form-data/value.json' with { type: 'json' };
import { HookHandler, registerHookHandler } from './start.js';

/**
 * Handle the before-create-site hook.
 * This hook is fired before a site is created. It can be used to modify the input data or to prevent the request with an error message.
 */
export const handleBeforeCreateSite = (
  handler: HookHandler<BeforeCreateSiteValue, BeforeCreateSiteStopValue>,
): void => {
  registerHookHandler('before-create-site', beforeCreateSiteValueSchema, handler);
};

/**
 * Handle the before-submit-form hook.
 * This hook is fired before a form submission is saved.
 */
export const handleBeforeSubmitForm = (
  handler: HookHandler<BeforeSubmitFormValue, BeforeSubmitFormStopValue>,
): void => {
  registerHookHandler('before-submit-form', beforeSubmitFormValueSchema, handler);
};

/**
 * Handle the initial-form-data hook.
 * This hook allows customizing the data with which a form is initialized. For example, it can return different
 * results depending on the user (if any) who is viewing the form and any data that the user has previously submitted.
 */
export const handleInitialFormData = (
  handler: HookHandler<InitialFormDataValue, InitialFormDataValue>,
): void => {
  registerHookHandler('initial-form-data', initialFormDataValueSchema, handler);
};
