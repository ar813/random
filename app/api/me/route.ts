import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = cookies();
  const userData = cookieStore.get('user'); // You must store `user` cookie after login/register

  if (!userData) {
    return NextResponse.json({ message: 'Not logged in' }, { status: 401 });
  }

  const user = JSON.parse(userData.value); // assuming cookie contains JSON string
  return NextResponse.json({ user });
}
