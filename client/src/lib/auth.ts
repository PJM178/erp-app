import { cookies } from 'next/headers';

export async function fetchCurrentUser() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refresh_token')?.value;

  if (!refreshToken) return null;

  try {
    const res = await fetch('http://localhost:8000/api/auth/refresh', {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: 'no-store',
    });

    if (!res.ok) return null;

    const user = await res.json();
    console.log(user);
    return user;
  } catch (err) {
    console.error('Error fetching current user:', err);
    return null;
  }
}