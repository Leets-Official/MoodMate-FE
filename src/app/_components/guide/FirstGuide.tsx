import Image from 'next/image'
import rabbitImage from 'public/illustration/common/logo/rabbit.png'
import chatImage from 'public/illustration/common/guide/chat.png'
import inactiveImage from 'public/illustration/common/guide/inactive.png'

const FirstGuide = ({ onNext }: any) => {
  return (
    <div className="relative flex flex-col items-center pt-[18%]">
      <button
        onClick={onNext}
        className=" text-[14px] mr-5 mt-5 text-white text-center absolute top-0 right-0 rounded-3xl px-4  h-8 bg-[#E87775]"
      >
        다음
      </button>
      <Image className="w-[37px] h-[26px]" src={rabbitImage} alt="rabbit" />
      <div className="font-bold text-[22px] text-center mt-6 mb-3">
        <p>무드메이트는</p>
        <div className="flex">
          <p className="text-[#E87775] mr-1">매일 매칭</p>
          <p>받을 수 있는</p>
        </div>
        <p>서비스예요!</p>
      </div>
      <div className="mb-7 text-[11px] rounded-xl px-2 py-0.5 text-gray-500 bg-[#D8D8D8]">
        당신의 무드와 같은 무디를 매일 만나보세요
      </div>
      <div className="relative flex flex-col px-6 pt-5 mb-4 rounded-3xl text-sm w-[315px] h-[165px] bg-[#FEB7B3] text-[#A75551] font-semibold">
        <div className="mb-2 rounded-xl text-center text-[#FEB7B3] w-[32px] bg-white">
          #1
        </div>
        <div className="flex">
          <p className="mr-1">매칭이 완료된 후</p>
          <p className="px-1 text-[#A75551] bg-white">채팅을 보내지 않으면</p>
        </div>
        <p>다음날 자동 매칭을 받을 수 없어요!</p>
        <p className="text-xs mt-3">1개 이상의 채팅 기록이 있으면 괜찮아요</p>
        <Image
          className="w-[58px] h-[48px] right-0 mr-5 mt-[85px] absolute"
          src={chatImage}
          alt="chat"
        />
      </div>
      <div className="relative flex flex-col px-6 pt-5 mb-4 rounded-3xl text-sm w-[315px] h-[165px] bg-[#FEB7B3] text-[#A75551] font-semibold">
        <div className="mb-2 rounded-xl text-center text-[#FEB7B3] w-[32px] bg-white">
          #2
        </div>
        <p>더이상 매칭을 받고 싶지 않으면 홈 화면의</p>
        <div className="flex">
          <p className="px-1 mr-1 text-[#A75551] bg-white">매칭 비활성화</p>
          <p>버튼을 눌러주세요!</p>
        </div>
        <p className="text-xs mt-3">
          홈화면의 하단 버튼을 누르면
          <br />
          다음날 매칭이 다시 시작돼요!
        </p>
        <Image
          className="w-[53px] h-[56px] right-0 mr-5 mt-20 absolute"
          src={inactiveImage}
          alt="chat"
        />
      </div>
    </div>
  )
}

export default FirstGuide
