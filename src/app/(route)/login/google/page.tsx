'use client'

import { useLoginQuery } from '@/_hooks/useLoginQuery'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const OauthPage = () => {
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
      <p>dd</p>
    </div>
  )
}

export default OauthPage
