import { verifyAuthJWT } from '$lib/server/jwt.js';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ cookies, route }) => {
  const token = cookies.get('auth_token');

  if (!token || token === '') {
    if (route.id !== '/auth') {
      throw redirect(301, '/auth');
    }

    return;
  }

  return verifyAuthJWT(token || '');
}) satisfies LayoutServerLoad;
