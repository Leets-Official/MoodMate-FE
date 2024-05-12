interface DateMoodProps {
  partner?: boolean
  mood: string
}

const DateMood = ({ mood, partner }: DateMoodProps) => {
  return (
    <div
      className={`flex text-[14px] ${
        partner ? ' w-full justify-center mt-[20px]' : 'ml-3 my-2'
      } `}
    >
      <p
        className={` px-5 py-1.5 rounded-[18px] mr-2  ${
          partner
            ? ' w-[68%] text-center text-white bg-[#FFB39C]'
            : ' text-primary border border-primary bg-onepink'
        }`}
      >
        {mood} 데이트
      </p>
    </div>
  )
}

export default DateMood
