export * from './contexts.ts';

/**
 * This value should be passed to an AbortController's abort method when cancelling a request that is meant to be
 * ignored instead of surfacing to the error handling logic as an error.
 *
 * This is an Error object because, for requests managed by ApolloClient, an Error is expected for the reason value.
 */
export const ignoredRequestCanceledToken = new Error('Request canceled');
