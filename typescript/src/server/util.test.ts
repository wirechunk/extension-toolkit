import assert from 'node:assert';
import { describe, it } from 'node:test';
import { authTokenFromRequest } from './util.ts';

describe('authTokenFromRequest', () => {
  it('returns the token from the authorization header', () => {
    const request = { headers: { authorization: 'Bearer token123' } };
    assert.equal(authTokenFromRequest(request), 'token123');
  });

  it('returns the token from the session cookie', () => {
    const request = { headers: { cookie: 'session=token123' } };
    assert.equal(authTokenFromRequest(request), 'token123');
  });

  it('prefers the token from the authorization header', () => {
    const request = { headers: { authorization: 'Bearer token123', cookie: 'session=token456' } };
    assert.equal(authTokenFromRequest(request), 'token123');
  });

  it('returns null if no token is present', () => {
    const request = { headers: {} };
    assert.equal(authTokenFromRequest(request), null);
  });
});
