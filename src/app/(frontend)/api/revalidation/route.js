import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(request) {
  const body = await request.json();
  const requestHeaders = new Headers(request.headers);
  //const { secret } = new URL(request.url).searchParams;
  const secret = requestHeaders.get("x-vercel-reval-key");
  if (secret !== process.env.CONTENTFUL_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }
  try {
    const { sys } = body;
    const contentType = sys.contentType?.sys?.id;
    if (contentType === 'page') {
      const slug = body.fields.slug['en-US'];
      revalidatePath(`/${slug}`);
      revalidateTag(`page-${sys.id}`);
    } else {
      revalidatePath('/', 'layout');
    }
    return new Response(JSON.stringify({ revalidated: true }), {
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}