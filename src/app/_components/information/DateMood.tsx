interface DateMoodProps {
  mood: string
}

const DateMood = ({ mood }: DateMoodProps) => {
  return (
    <div className="flex justify-center mt-[20px] text-[14px] w-full ">
      <p className="text-center px-5 py-1.5 rounded-[18px] mr-2 text-white bg-threepink w-[80%]">
        {mood}
      </p>
    </div>
  )
}

export default DateMood
