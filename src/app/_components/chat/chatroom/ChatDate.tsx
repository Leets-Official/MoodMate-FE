interface ChatDateProps {
  date: string
}

const ChatDate = ({ date }: ChatDateProps) => {
  return (
    <div className="w-full text-center mb-5 text-xs text-[#B0B0B0]">{date}</div>
  )
}

export default ChatDate
