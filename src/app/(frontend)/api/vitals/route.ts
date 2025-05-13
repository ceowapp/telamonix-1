import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const metric = await req.json();
  console.log('Web Vitals:', metric); 

  return NextResponse.json({ success: true });
}
