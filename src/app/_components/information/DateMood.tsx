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
            ? ' w-[80%] text-center text-white bg-threepink'
            : ' text-primary border border-primary bg-onepink'
        }`}
      >
        {mood}
      </p>
    </div>
  )
}

export default DateMood
