import type { CollectionSlug, PayloadRequest } from 'payload'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import configPromise from '@payload-config'

export async function GET(
  req: {
    cookies: {
      get: (name: string) => {
        value: string
      }
    }
  } & Request,
): Promise<Response> {
  try {
    const payload = await getPayload({ config: configPromise })
    const { searchParams } = new URL(req.url)
    const path = searchParams.get('path')
    const collection = searchParams.get('collection') as CollectionSlug | null
    const slug = searchParams.get('slug')
    const previewSecret = searchParams.get('previewSecret')
    const token = searchParams.get('token')
    if (!previewSecret || previewSecret !== process.env.PREVIEW_SECRET) {
      return new Response('You are not allowed to preview this page', { status: 403 })
    }
    if (!path || !collection || !slug) {
      return new Response('Insufficient search params', { status: 404 })
    }
    if (!path.startsWith('/')) {
      return new Response('This endpoint can only be used for relative previews', { status: 500 })
    }
    let user
    try {
      const headers = new Headers(req.headers)
      if (token) {
        headers.set('Authorization', `JWT ${token}`)
      }
      user = await payload.auth({
        req: req as unknown as PayloadRequest,
        headers: headers,
      })
    } catch (error) {
      payload.logger.error({ err: error }, 'Error verifying token for live preview')
      return new Response('You are not allowed to preview this page', { status: 403 })
    }
    const draft = await draftMode()
    if (!user) {
      draft.disable()
      return new Response('You are not allowed to preview this page', { status: 403 })
    }
    draft.enable()
    const redirectUrl = new URL(`${process.env.NEXT_PUBLIC_SERVER_URL}${path}`);
    if (token) {
      redirectUrl.searchParams.append('token', token);
    }
    return NextResponse.redirect(redirectUrl.toString());
  } catch (error) {
    console.error('Error processing preview request:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}