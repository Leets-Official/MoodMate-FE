'use client'

import ErrorpageFirstContainer from '@/_components/errorpage/containers/ErrorpageFirstContainer'
import ErrorpageSecondContainer from '@/_components/errorpage/containers/ErrorpageSecondContainer'
import Image from 'next/image'
import errorImage from 'public/illustration/common/error/network.png'

const Error = () => {
  return (
    <section className="w-full h-screen flex flex-col items-center justify-center">
      <Image src={errorImage} alt="image" className="w-[296px] h-[170px]" />
      <ErrorpageFirstContainer />
      <ErrorpageSecondContainer />
    </section>
  )
}

export default Error
