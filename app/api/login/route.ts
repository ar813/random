import { NextRequest, NextResponse } from 'next/server';
import { getDB } from '@/lib/db';
import { serialize } from 'cookie';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    const db = await getDB();
    const [rows]: any = await db.execute(
      'SELECT id, name, email FROM users WHERE email = ? AND password = ?',
      [email, password]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const user = rows[0];

    // Set user_token cookie (accessible by middleware)
    const cookie = serialize('user_token', String(user.id), {
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
      httpOnly: false,      // Allow reading in middleware
    });

    const res = NextResponse.json(
      { message: 'Login successful', user },
      { status: 200 }
    );

    res.headers.set('Set-Cookie', cookie);

    return res;
  } catch (err: any) {
    return NextResponse.json(
      { message: 'Database error', error: err.message },
      { status: 500 }
    );
  }
}
