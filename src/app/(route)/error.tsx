'use client'

import ErrorpageFirstContainer from '@/_components/errorpage/containers/ErrorpageFirstContainer'
import ErrorpageSecondContainer from '@/_components/errorpage/containers/ErrorpageSecondContainer'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import errorImage from 'public/illustration/common/error/network.png'
import { useEffect } from 'react'

const Error = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('/login')
  }, [])
  return (
    <section className="w-full h-screen flex flex-col items-center justify-center z-50">
      <Image src={errorImage} alt="image" className="w-[296px] h-[170px]" />
      <ErrorpageFirstContainer />
      <ErrorpageSecondContainer />
    </section>
  )
}

export default Error
