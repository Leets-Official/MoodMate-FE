import { sendFCMNotification } from '@/_service/fcm'
import { NextResponse } from 'next/server'

export async function POST(request: Request): Promise<NextResponse> {
  const { res } = await request.json()
  console.log('res::', res)
  const data = await sendFCMNotification(res)
  console.log(data)
  return NextResponse.json(data)
}
