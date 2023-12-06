'use client'

import { useLoginQuery } from '@/_hooks/useLoginQuery'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

const OauthPage = () => {
  const accessToken = Cookies.get('accessToken')
  const refreshToken = Cookies.get('refreshToken')

  console.log('access2', accessToken)
  console.log('refresh2', refreshToken)
  console.log('docum2', document.cookie)
  const { isLoading, isError, data } = useLoginQuery()
  const route = useRouter()
  useEffect(() => {
    console.log(data)
    route.push('/main')
  })
  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError || !data) {
    return <div>Error...</div>
  }
  return (
    <div>
      <p>{accessToken}</p>
      <p>{refreshToken}</p>
    </div>
  )
}

export default OauthPage
