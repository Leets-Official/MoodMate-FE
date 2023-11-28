interface DateMoodProps {
  mood: string
}

const DateMood = ({ mood }: DateMoodProps) => {
  return (
    <div className="flex text-[14px] ml-3 my-2">
      <p className="px-5 py-1.5 rounded-[18px] mr-2 text-[#FC4F59] border border-[#FC4F59] bg-[#FFE5E7]">
        {mood}
      </p>
    </div>
  )
}

export default DateMood
