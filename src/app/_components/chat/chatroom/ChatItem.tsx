import Bio from '@/_components/common/Bio'
import Message from './Message'

interface ChatItemProps {
  newSender?: boolean
  type: 'YOU' | 'ME'
  chat: ChatMessageGet
}

const ChatItem = ({ newSender, type, chat }: ChatItemProps) => {
  return (
    <>
      {type === 'YOU' && (
        <div className="flex gap-2 mb-3">
          {newSender ? (
            <>
              <Bio />
              <div className="flex flex-col gap-1">
                <p className="text-[12px]">사랑스러운 무디</p>
                <Message msg={chat.content} type={type} />
              </div>
            </>
          ) : (
            <>
              <div className="w-[40px] mt-2" />
              <div className="flex flex-col gap-1 ">
                <Message msg={chat.content} type={type} />
              </div>
            </>
          )}
        </div>
      )}
      {type === 'ME' && (
        <div className=" flex flex-row gap-2 justify-end">
          <div className="flex flex-col gap-1 ">
            <Message type={type} msg={chat.content} />
          </div>
        </div>
      )}
    </>
  )
}

export default ChatItem
