import { NextRequest, NextResponse } from 'next/server';
import { getDB } from '@/lib/db';
import { ResultSetHeader } from 'mysql2';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
  }

  try {
    const db = await getDB();
    const [result] = await db.execute<ResultSetHeader>(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, password]
    );

    // ✅ Set cookie with user info (you can also fetch user id if needed)
    cookies().set('user', JSON.stringify({ name, email }), {
      httpOnly: false, // so it can be read by client side
      path: '/',
    });

    return NextResponse.json({ message: 'Account created successfully', success: true });
  } catch (err: any) {
    if (err.code === 'ER_DUP_ENTRY') {
      return NextResponse.json({ message: 'Email already exists', success: false }, { status: 409 });
    }

    return NextResponse.json({ message: 'Database error', success: false, error: err.message }, { status: 500 });
  }
}
