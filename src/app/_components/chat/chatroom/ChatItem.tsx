import Bio from '@/_components/common/Bio'
import Message from './Message'

interface ChatItemProps {
  type: 'YOU' | 'ME'
}

const ex = [
  'ㅋㅋㅌㅋㅋㅋㅋㅋㅋㅋ?',
  'ㅋㅋㅊㅋㅋㅋㅋㅋㅋㅋ',
  'ㅎㅎㅎ...ㅎㅎ.ㅎ..ㅎ....',
]

const ChatItem = ({ type }: ChatItemProps) => {
  return (
    <>
      {type === 'YOU' && (
        <div className="flex gap-2 mb-3">
          <Bio />
          <div className="flex flex-col gap-1">
            {/* 닉네임 */}
            <p className="text-[12px]">사랑스러운 무디</p>
            <Message msg="하이루방가방가" type={type} />
            <Message msg="ㅎㅇㅎㅇ" type={type} />
            <Message msg="반갑습니다....." type={type} />
          </div>
        </div>
      )}
      {type === 'ME' && (
        <div className=" flex flex-row gap-2 justify-end">
          <div className="flex flex-col gap-1 ">
            {ex.map((e, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <Message type="ME" key={i} msg={e} />
            ))}
          </div>
          <Bio />
        </div>
      )}
    </>
  )
}

export default ChatItem
