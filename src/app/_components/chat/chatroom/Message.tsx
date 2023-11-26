import { extractTimeFromDate } from '@/utils/date'

interface MessageProps {
  msg: string
  type: 'YOU' | 'ME'
  time: string
  isRead: number
}

const getMessageStyle = (type: string) => {
  switch (type) {
    case 'YOU':
      return {
        box: 'bg-white',
        tail: 'left-0 ml-[-10px] mb-1 w-0 h-0 border-t-[4px] border-t-transparent border-r-[14px] border-r-white',
        time: 'right-[-60px]',
        read: '',
      }
    case 'ME':
      return {
        box: 'bg-[#D6D6D6] ',
        tail: 'right-0 mr-[-10px] mb-1 w-0 h-0 border-t-[4px] border-t-transparent border-l-[14px] border-l-[#D6D6D6]',
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

const Message = ({ msg, type, time, isRead }: MessageProps) => {
  return (
    <div
      className={`${
        getMessageStyle(type).box
      } relative bg-white border border-black px-[8px] py-[7px] rounded-lg mb-1.5`}
    >
      <p className={`text-black text-xs`}>{msg}</p>
      <div
        className={`absolute bottom-0 border-black border-b-[5px] border-b-transparent ${
          getMessageStyle(type).tail
        }`}
      />
      <div>
        <div
          className={`absolute text-xs text-[#B0B0B0] bottom-0 leading-[0.8] ${
            getMessageStyle(type).time
          }`}
        >
          <p className="text-xs text-[#7C7C7C] ">{isRead === 0 && '1'}</p>
          <p>{extractTimeFromDate(time)}</p>
        </div>
      </div>
    </div>
  )
}

export default Message
