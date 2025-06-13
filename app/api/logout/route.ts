import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  cookies().delete('user'); // Remove user cookie
  return NextResponse.json({ message: 'Logged out' });
}
