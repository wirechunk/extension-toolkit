import assert from 'node:assert';
import { describe, test } from 'node:test';
import { authTokenFromRequest } from './util.ts';

await describe('authTokenFromRequest', async () => {
  await test('returns the token from the authorization header', () => {
    const request = { headers: { authorization: 'Bearer token123' } };
    assert.equal(authTokenFromRequest(request), 'token123');
  });

  await test('returns the token from the session cookie', () => {
    const request = { headers: { cookie: 'session=token123' } };
    assert.equal(authTokenFromRequest(request), 'token123');
  });

  await test('prefers the token from the authorization header', () => {
    const request = { headers: { authorization: 'Bearer token123', cookie: 'session=token456' } };
    assert.equal(authTokenFromRequest(request), 'token123');
  });

  await test('returns null if no token is present', () => {
    const request = { headers: {} };
    assert.equal(authTokenFromRequest(request), null);
  });
});
