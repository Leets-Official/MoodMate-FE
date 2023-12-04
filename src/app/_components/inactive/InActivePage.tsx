import InactiveFirstText from '@/_components/inactive/containers/InactiveFirstText'
import InactiveMiddleText from '@/_components/inactive/containers/InactiveMiddleText'
import { useMainQuery } from '@/_hooks/useMainQuery'
import React from 'react'

export default function InactivePage() {
  return (
    <section className="flex flex-col">
      <p className="p-10 mx-auto text-center text-[#B3B3B3]">moodmate</p>
      <InactiveFirstText />
      <InactiveMiddleText />
    </section>
  )
}
