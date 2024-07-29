import type { FormSubmissionStopAction } from '@wirechunk/schemas/hooks/form-submission/stop-action';
import type { FormSubmissionValue } from '@wirechunk/schemas/hooks/form-submission/value';
import formSubmissionValueSchema from '@wirechunk/schemas/hooks/form-submission/value.json' with { type: 'json' };
import type { InitialFormDataStopAction } from '@wirechunk/schemas/hooks/initial-form-data/stop-action';
import type { InitialFormDataValue } from '@wirechunk/schemas/hooks/initial-form-data/value';
import initialFormDataValueSchema from '@wirechunk/schemas/hooks/initial-form-data/value.json' with { type: 'json' };
import { HookHandler, registerHookHandler } from './start.js';

/**
 * Handle the form-submission hook.
 * This hook is fired before the submission is saved.
 */
export const handleFormSubmission = (
  handler: HookHandler<FormSubmissionValue, FormSubmissionStopAction>,
): void => registerHookHandler('form-submission', formSubmissionValueSchema, handler);

/**
 * Handle the initial-form-data hook.
 * This hook allows customizing the data with which a form is initialized. For example, it can return different
 * results depending on the user (if any) who is viewing the form and any data that the user has previously submitted.
 */
export const handleInitialFormData = (
  handler: HookHandler<InitialFormDataValue, InitialFormDataStopAction>,
): void => registerHookHandler('initial-form-data', initialFormDataValueSchema, handler);
