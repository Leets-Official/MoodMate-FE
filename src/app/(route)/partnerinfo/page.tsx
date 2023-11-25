import profile from '@/_components/information/Profile'
import Keyword from '@/_components/information/Keyword'
import DateMood from '@/_components/information/DateMood'

export default function PartnerInfo() {
  return (
    <div>
      <div className="flex flex-col fixed rounded-[52px] bg-[#FFE5E7] h-[520px] bottom-0 w-screen translate-y-10">
        <p className="text-center font-bold text-[20px] mt-8">
          사랑스러운 무디
        </p>
        <div className="mt-3 justify-center px-4 pt-[4px] h-[30px] text-[14px] text-[#999999] flex mx-auto border border-[#999999] rounded-[25px]">
          <p className="mr-3">나이</p>
          <p className="mr-3 ">|</p>
          <p>학과</p>
        </div>
        <div className="flex items-center flex-col mt-10">
          <Keyword />
          <DateMood />
        </div>
      </div>
    </div>
  )
}
