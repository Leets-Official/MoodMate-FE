interface MessageProps {
  msg: string
  type: 'YOU' | 'ME'
}

const Message = ({ msg, type }: MessageProps) => {
  return (
    <div className="relative bg-[#666] px-[5px] py-[7px] rounded-lg">
      {type === 'YOU' && (
        <>
          <p className="text-white text-xs">{msg}</p>
          <div className="absolute bottom-0 left-0 ml-[-10px] mb-1 w-0 h-0 border-t-[4px] border-t-transparent border-r-[14px] border-r-[#666] border-b-[5px] border-b-transparent" />
          <p className="absolute text-xs text-[#666] right-[-60px] bottom-0">
            오전 12:29
          </p>
        </>
      )}
      {type === 'ME' && (
        <>
          <p className="text-white text-xs">{msg}</p>
          <div className="absolute bottom-0 right-0 mr-[-10px] mb-1 w-0 h-0 border-t-[4px] border-t-transparent border-l-[14px] border-l-[#666] border-b-[5px] border-b-transparent" />
          <p className="absolute text-xs text-[#666] left-[-60px] bottom-0">
            오전 12:29
          </p>
        </>
      )}
    </div>
  )
}

export default Message
