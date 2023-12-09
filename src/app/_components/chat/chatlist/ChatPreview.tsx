import Bio from '@/_components/common/Bio'
import Link from 'next/link'

interface ChatPreviewProps {
  roomId: number
  userId: number
  nickname: string
  lastMessage?: string | null
  isRead?: boolean
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
    <section className="bg-white h-[80px] w-[80%] rounded-2xl ">
      <Link href={`/chat/room/${userId}/${roomId}`}>
        <div className="flex justify-center items-center flex-row gap-4 h-full">
          <Bio gender={gender} size="SMALL" />
          <div className="flex flex-col w-[180px]  bg-white">
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
    </section>
  )
}

export default ChatPreview
