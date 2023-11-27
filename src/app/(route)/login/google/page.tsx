'use client'

import { useEffect, useState } from 'react'
import { getToken } from '@/_service/oauth'

const OauthPage = () => {
  const [code, setCode] = useState(null)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const codeURL = new URL(window.location.href).searchParams.get('code')
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setCode(codeURL)
    }
  }, [])
  useEffect(() => {
    if (code) {
      try {
        getToken(code)
      } catch (error) {
        console.error('getToken 함수 호출 중 오류 발생', error)
      }
    }
  }, [code])
  return <div>{code && <p>{code}</p>}</div>
}

export default OauthPage
