import { sendFCMNotification } from '@/_service/fcm'
import { NextResponse } from 'next/server'

export async function POST(request: Request): Promise<NextResponse> {
  const { res } = await request.json()
  const data = await sendFCMNotification(res)
  return NextResponse.json(data)
}
