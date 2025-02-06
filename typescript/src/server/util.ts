import { parse as parseCookies } from 'cookie';
import type { FastifyRequest } from 'fastify';

const authCookieName = 'session';

/** Returns the authentication token from the request headers. Does not do any validation. */
export const authTokenFromRequest = ({
  headers,
}: Pick<FastifyRequest, 'headers'>): string | null => {
  if (headers.authorization) {
    const [scheme, token] = headers.authorization.split(' ');
    if (scheme === 'Bearer' && token) {
      return token;
    }
  }
  const cookieToken = headers.cookie && parseCookies(headers.cookie)[authCookieName];
  if (cookieToken) {
    return cookieToken;
  }
  return null;
};
