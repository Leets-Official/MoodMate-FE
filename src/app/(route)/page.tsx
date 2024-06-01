'use client'

import { useEffect } from 'react'

export default function Root() {
  useEffect(() => {
    throw Error // 서비스 종료
  }, [])
  return <main></main>
}
