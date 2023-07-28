import { error } from '@sveltejs/kit';
import * as jose from 'jose';
import { env } from '$env/dynamic/private';

type JWTPayload = {
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  id: number;
};

export const createAuthJWT = async (data: JWTPayload) => {
  const jwt = await new jose.SignJWT(data)
    .setProtectedHeader({ alg: 'HS256' })
    .sign(new TextEncoder().encode(env.JWT_SECRET));
  return jwt;
};

export const verifyAuthJWT = async (token: string) => {
  try {
    const { payload } = await jose.jwtVerify(token, new TextEncoder().encode(env.JWT_SECRET));
    return payload as JWTPayload;
  } catch {
    throw error(401, 'invalid or missing JWT, you are not logged in');
  }
};
