import { extractTimeFromDate } from '@/utils/date'
import Bio from '@/_components/common/Bio'
import Message from './Message'

interface ChatItemProps {
  user: SimpleUser
  newSender?: boolean
  newMinutes?: boolean
  type: 'YOU' | 'ME'
  chat: ChatMessageFromServer
}

const ChatItem = ({
  newSender,
  newMinutes,
  type,
  chat: { content, createdAt, isRead },
  user,
}: ChatItemProps) => {
  return (
    <>
      {type === 'YOU' && (
        <div className="flex gap-3 mb-1 ">
          {newSender ? (
            <div className="flex gap-3 mt-2 ">
              <Bio
                gender={user.gender === 'FEMALE' ? 'MALE' : 'FEMALE'}
                size="SMALL"
              />
              <div className=" flex flex-col max-w-[200px] ">
                <div className="text-[13px] h-[17px] font-semibold text-darkgray line-clamp-1 mb-2 ">
                  <p>{user?.nickname}</p>
                </div>
                <Message
                  newSender={newSender}
                  newMinutes={newMinutes}
                  msg={content}
                  type={type}
                  time={extractTimeFromDate(createdAt)}
                  isRead={isRead}
                />
              </div>
            </div>
          ) : (
            <>
              <div className="w-[40px] mt-2" />
              <div className="flex flex-col gap-1 max-w-[200px]">
                <Message
                  newMinutes={newMinutes}
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
        <div className="flex gap-2 justify-end mb-1">
          <div className="flex flex-col gap-1 max-w-[200px]">
            <Message
              newSender={newSender}
              newMinutes={newMinutes}
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
