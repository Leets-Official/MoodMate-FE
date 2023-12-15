'use client'

import ErrorpageFirstContainer from '@/_components/errorpage/containers/ErrorpageFirstContainer'
import ErrorpageSecondContainer from '@/_components/errorpage/containers/ErrorpageSecondContainer'
import Image from 'next/image'
import errorImage from 'public/illustration/common/error/network.png'

const Error = () => {
  return (
    <section className="w-full h-screen flex items-center justify-center">
      <Image src={errorImage} alt="image" />
      <ErrorpageFirstContainer />
      <ErrorpageSecondContainer />
    </section>
  )
}

export default Error
