import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, route }) => {
  const session = await locals.auth.validate();

  if (!session) {
    if (route.id === '/signin' || route.id === '/signup') return;

    throw redirect(302, '/signin');
  }

  return {
    userId: session.user.userId,
    username: session.user.username
  };
};
