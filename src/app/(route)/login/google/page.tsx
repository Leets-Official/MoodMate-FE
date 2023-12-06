'use client'

import { useLoginQuery } from '@/_hooks/useLoginQuery'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

const OauthPage = () => {
  const { isLoading, isError, data } = useLoginQuery()
  const [token, setToken] = useState<string>('')
  const route = useRouter()
  useEffect(() => {
    const accessToken = Cookies.get('accessToken')
    const refreshToken = Cookies.get('refreshToken')

    console.log('access2', accessToken)
    console.log('refresh2', refreshToken)
    setToken(accessToken || '')
    console.log('access4', accessToken)
    console.log('refresh4', refreshToken)
    route.push('/main')
  }, [])

  useEffect(() => {
    console.log('token:::', token)
  }, [token])

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError || !data) {
    return <div>Error...</div>
  }
  return (
    <div>
      <p>{token}</p>
    </div>
  )
}

export default OauthPage
