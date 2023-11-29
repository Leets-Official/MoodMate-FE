'use client'

import ErrorpageFirstContainer from '@/_components/errorpage/containers/ErrorpageFirstContainer'
import ErrorpageSecondContainer from '@/_components/errorpage/containers/ErrorpageSecondContainer'

const error = () => {
  return (
    <div>
      <div className="w-full h-screen flex items-center justify-center" />
      {/* 에러 캐릭터 필요! */}
      <ErrorpageFirstContainer />
      <ErrorpageSecondContainer />
    </div>
  )
}

export default error
