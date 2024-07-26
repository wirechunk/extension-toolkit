import type { FormSubmissionValue } from '@wirechunk/schemas/hooks/form-submission/value';
import type { FormSubmissionStopAction } from '@wirechunk/schemas/hooks/form-submission/stop-action';
import formSubmissionValueSchema from '@wirechunk/schemas/hooks/form-submission/value.json' with { type: 'json' };
import { HookHandler, registerHookHandler } from './start.js';

/**
 * Handle the form-submission hook.
 * This hook is fired before the submission is saved.
 */
export const handleFormSubmission = (
  handler: HookHandler<FormSubmissionValue, FormSubmissionStopAction>,
): void => registerHookHandler('form-submission', formSubmissionValueSchema, handler);
