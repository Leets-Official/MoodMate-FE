import Bio from '@/_components/common/Bio'
import Message from './Message'
import { extractTimeFromDate } from '@/utils/date'

interface ChatItemProps {
  user?: SimpleUser
  newSender?: boolean
  type: 'YOU' | 'ME'
  chat: ChatMessageFromServer
}

const ChatItem = ({ newSender, type, chat, user }: ChatItemProps) => {
  const { content, createdAt, isRead } = chat
  return (
    <>
      {type === 'YOU' && (
        <div className="flex gap-3 mb-2">
          {newSender ? (
            <>
              {user?.gender && <Bio gender={user.gender} size="SMALL" />}
              <div className=" flex flex-col max-w-[200px] ">
                <div className="text-xs line-clamp-1 ">
                  <p>{user?.nickname}</p>
                </div>
                <Message
                  msg={content}
                  type={type}
                  time={extractTimeFromDate(createdAt)}
                  isRead={isRead}
                />
              </div>
            </>
          ) : (
            <>
              <div className="w-[40px] mt-2" />
              <div className="flex flex-col gap-1 max-w-[200px]">
                <Message
                  msg={content}
                  type={type}
                  time={extractTimeFromDate(createdAt)}
                  isRead={isRead}
                />
              </div>
            </>
          )}
        </div>
      )}
      {type === 'ME' && (
        <div className="flex gap-2 justify-end">
          <div className="flex flex-col gap-1 max-w-[200px]">
            <Message
              msg={content}
              type={type}
              time={extractTimeFromDate(createdAt)}
              isRead={isRead}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default ChatItem
