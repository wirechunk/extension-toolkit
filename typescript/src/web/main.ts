export * from './contexts.ts';

/**
 * This value should be passed to an AbortController's abort method when cancelling a request that is meant to be
 * ignored instead of surfacing to the error handling logic as an error.
 */
export const ignoredRequestCanceledToken = Symbol('Request canceled');
