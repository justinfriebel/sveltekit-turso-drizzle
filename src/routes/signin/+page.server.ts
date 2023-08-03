import { auth } from '$lib/server/lucia';
import { LuciaError } from 'lucia';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  const session = await locals.auth.validate();
  if (session) throw redirect(302, '/');
  return {};
};

export const actions: Actions = {
  signIn: async ({ request, locals }) => {
    const formData = await request.formData();
    const username = formData.get('username');
    const password = formData.get('password');
    // basic check
    if (typeof username !== 'string' || username.length < 1 || username.length > 31) {
      return fail(400, {
        message: 'Invalid username'
      });
    }
    if (typeof password !== 'string' || password.length < 1 || password.length > 255) {
      return fail(400, {
        message: 'Invalid password'
      });
    }
    try {
      // find user by key
      // and validate password
      const user = await auth.useKey('username', username.toLowerCase(), password);
      console.log('🚀 ~ file: +page.server.ts:32 ~ signIn: ~ user:', user);
      const session = await auth.createSession({
        userId: user.userId,
        attributes: {}
      });
      console.log('🚀 ~ file: +page.server.ts:37 ~ signIn: ~ session:', session);
      locals.auth.setSession(session); // set session cookie
      console.log('🚀 ~ file: +page.server.ts:39 ~ signIn: ~ locals:', locals);
    } catch (e) {
      if (
        e instanceof LuciaError &&
        (e.message === 'AUTH_INVALID_KEY_ID' || e.message === 'AUTH_INVALID_PASSWORD')
      ) {
        // user does not exist
        // or invalid password
        return fail(400, {
          message: 'Incorrect username of password'
        });
      }

      if (e) {
        console.log('🚀 ~ file: +page.server.ts:52 ~ signIn: ~ e:', e);
      }

      return fail(500, {
        message: 'An unknown error occurred'
      });
    }
    // redirect to
    // make sure you don't throw inside a try/catch block!
    throw redirect(302, '/');
  }
};
