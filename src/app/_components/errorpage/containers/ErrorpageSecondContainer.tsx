'use client'

import { useRouter } from 'next/navigation'

const ErrorpageSecondContainer = () => {
  const router = useRouter()
  const refreshPage = () => {
    router.push('/login')
  }
  return (
    <div className="flex text-center">
      {/* eslint-disable-next-line react/button-has-type */}
      <button
        onClick={refreshPage}
        className="mt-12 px-auto bg-[#FFE5E7] w-[146px] h-[40px] rounded-[8px] text-[#666666]"
      >
        재로그인
      </button>
    </div>
  )
}

export default ErrorpageSecondContainer
