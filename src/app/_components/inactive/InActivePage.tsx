import InactiveFirstText from '@/_components/inactive/containers/InactiveFirstText'
import InactiveMiddleText from '@/_components/inactive/containers/InactiveMiddleText'
import React from 'react'
import Image from 'next/image'
import logo from 'public/illustration/common/logo/graylogo.png'
import inactive from 'public/illustration/female/main/inactive.png'

export default function InactivePage() {
  return (
    <section className="flex flex-col h-screen">
      <Image
        src={logo}
        alt="graylogo"
        className="w-[85px] h-[13px] mt-5 mb-13 mx-auto"
      />
      <InactiveFirstText />
      <Image
        src={inactive}
        alt="inactive"
        className="mx-auto w-[150px] h-[220px] mt-13 mb-13"
      />
      <InactiveMiddleText />
    </section>
  )
}
