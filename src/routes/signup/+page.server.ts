import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  const session = await locals.auth.validate();
  if (session) throw redirect(302, '/');
  return {};
};

export const actions: Actions = {
  signUp: async ({ request, locals }) => {
    const formData = await request.formData();
    const email = formData.get('email');
    const username = formData.get('username');
    const password = formData.get('password');
    // basic check
    if (typeof email !== 'string' || email.length < 6 || email.length > 60) {
      return fail(400, {
        message: 'Invalid email'
      });
    }
    if (typeof username !== 'string' || username.length < 4 || username.length > 60) {
      return fail(400, {
        message: 'Invalid username'
      });
    }
    if (typeof password !== 'string' || password.length < 6 || password.length > 255) {
      return fail(400, {
        message: 'Invalid password'
      });
    }
    try {
      const user = await auth.createUser({
        key: {
          providerId: 'username', // auth method
          providerUserId: username.toLowerCase(), // unique id when using "username" auth method
          password // hashed by Lucia
        },
        attributes: {
          username,
          email
        }
      });
      const session = await auth.createSession({
        userId: user.userId,
        attributes: {}
      });
      locals.auth.setSession(session); // set session cookie
    } catch (e) {
      // this part depends on the database you're using
      // check for unique constraint error in user table
      const USER_TABLE_UNIQUE_CONSTRAINT_ERROR =
        'LibsqlError: SQLITE_CONSTRAINT: SQLite error: UNIQUE constraint failed: user.username';

      if (e === USER_TABLE_UNIQUE_CONSTRAINT_ERROR) {
        return fail(400, {
          message: 'Username already taken'
        });
      }

      if (e) {
        console.log(e);
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
