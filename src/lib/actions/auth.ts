'use server';

import { auth, signIn, signOut } from '@/auth';
import { redirect } from 'next/navigation';

/**
 * Get the current authenticated user session
 */
export async function getCurrentUser() {
  const session = await auth();
  return session?.user || null;
}

/**
 * Get the current session with tokens
 */
export async function getSession() {
  return await auth();
}

/**
 * Sign in with a social provider (Google or GitHub)
 */
export async function signInWithProvider(provider: 'google' | 'github') {
  try {
    await signIn(provider, { redirectTo: '/app' });
  } catch (error) {
    console.error(`Error signing in with ${provider}:`, error);
    throw error;
  }
}

/**
 * Sign out the current user
 */
export async function logout() {
  await signOut({ redirectTo: '/login' });
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated() {
  const session = await auth();
  return !!session?.user;
}

/**
 * Get access token for API calls
 */
export async function getAccessToken() {
  const session = await auth();
  return session?.access_token || null;
}
