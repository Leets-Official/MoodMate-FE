import Link from 'next/link'

const NotfoundpageSecondContainer = () => {
  return (
    <div className="flex text-center">
      <Link
        href="/main"
        className="mt-24 mx-auto pt-1.5 bg-[#FFE5E7] w-[146px] h-[36px] rounded-[8px] text-[#666666]"
      >
        닫기
      </Link>
    </div>
  )
}

export default NotfoundpageSecondContainer
