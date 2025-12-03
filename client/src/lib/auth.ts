import { cookies } from 'next/headers';

export async function fetchCurrentUser() {
  const cookieStore = cookies();
  const refreshToken = (await cookieStore).get('refresh_token')?.value;

  if (!refreshToken) return null;

  try {
    const res = await fetch('http://localhost:8000/api/auth/refresh', {
      headers: {
        cookie: `refresh_token=${refreshToken}`,
      },
      cache: 'no-store',
    });

    if (!res.ok) return null;

    const user = await res.json();
    
    return user;
  } catch (err) {
    console.error('Error fetching current user:', err);
    return null;
  }
}