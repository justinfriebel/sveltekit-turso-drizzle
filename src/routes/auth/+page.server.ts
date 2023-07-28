import bcrypt from 'bcrypt';
import { db } from '$lib/server/database';
import { users } from '$lib/server/schema';
import { redirect } from '@sveltejs/kit';
import { createAuthJWT } from '$lib/server/jwt.js';
import { eq } from 'drizzle-orm';

export const config = {
  runtime: 'nodejs18.x'
};

// Select a user from the database by email
const selectUserByEmail = async (email: FormDataEntryValue) => {
  const user = await db.select().from(users).where(eq(users.email, email.toString())).limit(1);

  return user.prepare().get();
};

export const load = async (event) => {
  const token = event.cookies.get('auth_token');

  if (token) {
    throw redirect(301, '/');
  }
};

export const actions = {
  signUp: async (event) => {
    const formData = await event.request.formData();
    const email = formData.get('email');
    const password = formData.get('password');

    if (!email || !password) {
      return { success: false, error: true, message: 'Must provide email and password.' };
    }

    const user = await selectUserByEmail(email);

    if (user) {
      return { success: false, error: true, message: 'User already exists.' };
    }

    const hashedPassword = bcrypt.hashSync(password?.toString(), 10);

    const newUser = await db
      .insert(users)
      .values({
        email: email.toString(),
        password: hashedPassword
      })
      .returning()
      .get();

    const token = await createAuthJWT({
      firstName: newUser?.firstName?.toString(),
      lastName: newUser?.lastName?.toString(),
      email: email.toString(),
      id: newUser.id
    });

    event.cookies.set('auth_token', token, {
      path: '/'
    });

    throw redirect(301, '/');
  },
  signIn: async (event) => {
    const formData = await event.request.formData();
    const email = formData.get('email') || '';
    const password = formData.get('password') || '';

    if (!email || !password) {
      return { success: false, error: true, message: 'Must provide email and password.' };
    }

    const user = await selectUserByEmail(email);

    if (!user) {
      return { success: false, error: true, message: 'User does not exist.' };
    }

    const passwordIsRight = await bcrypt.compare(password.toString(), user.password);

    if (!passwordIsRight) {
      return { success: false, error: true, message: 'Password is incorrect.' };
    }

    const token = await createAuthJWT({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      id: user.id
    });

    event.cookies.set('auth_token', token, {
      path: '/'
    });

    throw redirect(301, '/');
  },
  signOut: async (event) => {
    event.cookies.set('auth_token', '', {
      path: '/'
    });

    throw redirect(301, '/');
  }
};
