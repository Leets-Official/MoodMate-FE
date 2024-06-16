'use client'

import Image from 'next/image'
import errorImage from 'public/illustration/common/error/network.png'

const Error = () => {
  return (
    <section className="w-full h-screen flex flex-col items-center justify-center z-50">
      <Image src={errorImage} alt="image" className="w-[296px] h-[170px]" />
      <div className="flex flex-col gap-2 mt-5 text-sm text-gray-500 w-full text-center">
        <p>서비스가 종료되었습니다.</p>
        <p>무드메이트를 사랑해주셔서 감사합니다 💗</p>
      </div>
    </section>
  )
}

export default Error
