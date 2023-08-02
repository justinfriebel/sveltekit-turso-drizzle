import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';
import { dev } from '$app/environment';
import { libsql } from '@lucia-auth/adapter-sqlite';
import { client } from './database';

// expect error
export const auth = lucia({
  env: dev ? 'DEV' : 'PROD',
  middleware: sveltekit(),
  adapter: libsql(client, {
    user: 'user',
    key: 'user_key',
    session: 'user_session'
  }),
  getUserAttributes: (data) => {
    return {
      username: data.username
    };
  }
});

export type Auth = typeof auth;
