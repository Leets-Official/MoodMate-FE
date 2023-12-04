'use client'

import { useLoginQuery } from '@/_hooks/useLoginQuery'
import React, { useEffect } from 'react'

const OauthPage = () => {
  const { isLoading, isError, data } = useLoginQuery()
  useEffect(() => {
    console.log(data)
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
