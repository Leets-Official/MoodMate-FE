import Bio from '@/_components/common/Bio'
import Link from 'next/link'

interface ChatPreviewProps {
  roomId: number
  userId: number
  nickname: string
  lastMessage?: string | null
  isRead?: boolean | null
  count?: number
  gender: 'MALE' | 'FEMALE'
}

const ChatPreview = ({
  roomId,
  userId,
  nickname,
  lastMessage,
  isRead,
  count,
  gender,
}: ChatPreviewProps) => {
  return (
    <div className="bg-white h-[86px] w-[85%] rounded-2xl border-[1px] border-primary mx-5">
      <Link href={`/chat/room/${userId}/${roomId}`}>
        <div className="flex justify-center items-center flex-row gap-3 h-full w-full ">
          <div className="w-[18%]">
            <Bio gender={gender} size="MEDIUM" />
          </div>
          <div className="flex flex-col w-[72%] bg-white">
            <p className="font-bold text-[16px] line-clamp-1 ">{nickname}</p>
            {lastMessage ? (
              <div className="text-[14px] w-[181px] line-clamp-2 leading-[1.3]">
                {lastMessage}
              </div>
            ) : (
              <p className="text-xs text-neutral-600">
                새로운 채팅을 시작해보세요!
              </p>
            )}
          </div>
          {!isRead && (
            <div className="flex justify-center items-center bg-neutral-500 text-white w-[16px] h-[16px] rounded-full text-[10px]">
              {count}
            </div>
          )}
        </div>
      </Link>
    </div>
  )
}

export default ChatPreview
