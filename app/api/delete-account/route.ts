import { NextRequest, NextResponse } from 'next/server';
import { getDB } from '@/lib/db';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  const cookie = cookies().get('user');
  if (!cookie) {
    return NextResponse.json({ message: 'Not logged in' }, { status: 401 });
  }

  const user = JSON.parse(cookie.value);
  const db = await getDB();

  try {
    await db.execute('DELETE FROM users WHERE email = ?', [user.email]);
    cookies().delete('user'); // Delete session after removing user
    return NextResponse.json({ message: 'Account deleted' });
  } catch (err) {
    return NextResponse.json({ message: 'Failed to delete account' }, { status: 500 });
  }
}
