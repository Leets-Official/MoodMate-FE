interface MessageProps {
  msg: string
  type: 'YOU' | 'ME'
  time: string
  isRead: boolean
  newSender?: boolean
  newMinutes?: boolean
}

const getMessageStyle = (type: string) => {
  switch (type) {
    case 'YOU':
      return {
        box: 'bg-white border-primary border',
        tail: 'left-[-4.725px] rotate-45 bg-white border-l border-b border-primary',
        time: 'right-[-65px]',
        read: '',
      }
    case 'ME':
      return {
        box: 'bg-onepink ',
        tail: 'bg-onepink right-[-3.3px] rotate-45 ',
        time: 'left-[-60px] ',
        read: '',
      }
    default:
      return {
        box: '',
        tail: '',
        time: '',
        read: '',
      }
  }
}

const Message = ({
  msg,
  type,
  time,
  isRead,
  newSender,
  newMinutes,
}: MessageProps) => {
  return (
    <div
      className={`${
        getMessageStyle(type).box
      } relative px-[8px] py-[7px] rounded-lg mb-1 `}
    >
      <p className="text-black text-[16px]">{msg}</p>
      {newSender && (
        <div
          className={`absolute top-1.5 w-[8px] h-[8px] ${
            getMessageStyle(type).tail
          } `}
        />
      )}
      <div>
        {newMinutes && (
          <div
            className={`absolute text-xs text-[#B0B0B0] bottom-0 leading-[0.7]  ${
              getMessageStyle(type).time
            }`}
          >
            <p className="text-xs text-[#7C7C7C]">{isRead === false && 1}</p>
            <p>{time}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Message
