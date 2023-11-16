'use client'

import { useEffect, useState } from 'react'

const LoginHandler = () => {
  const [code, setCode] = useState(null)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const codeURL = new URL(window.location.href).searchParams.get('code')
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setCode(codeURL)
    }
  }, [])
  return <div>{code && <p>{code}</p>}</div>
}

export default LoginHandler
