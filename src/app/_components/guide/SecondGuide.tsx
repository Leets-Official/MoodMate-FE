import Image from 'next/image'
import logoImage from 'public/illustration/common/guide/logo.png'
import shareImage from 'public/illustration/common/guide/share.png'
import appImage from 'public/illustration/common/guide/app.png'
import addImage from 'public/illustration/common/guide/add.png'
import { useRouter } from 'next/navigation'

interface guideProps {
  btn: '다음' | '닫기'
  onClose: () => void
}
const SecondGuide = ({ btn, onClose }: guideProps) => {
  const route = useRouter()
  const handleClick = () => {
    if (btn === '다음') {
      route.push('/userinfo/1')
    } else {
      onClose()
    }
  }

  return (
    <div className="bg-white relative flex flex-col items-center pt-[18%]">
      <button
        onClick={handleClick}
        className=" text-[14px] mr-5 mt-5 text-white text-center absolute top-0 right-0 rounded-3xl px-4 h-8 bg-[#E87775]"
      >
        {btn}
      </button>
      <Image className="w-[120px] h-[112px]" src={logoImage} alt="rabbit" />
      <div className="mb-7 text-[17px] text-center mt-6">
        <p>홈화면에 앱을 추가하세요!</p>
        <div className="-mt-0.5 flex font-semibold">
          <p className="mr-1">상대 무디의</p>
          <p className="text-[#E87775]">연락 알림</p>
          <p>을 받을 수 있어요</p>
        </div>
      </div>
      <div className="relative mb-4 flex flex-col px-6 pt-4 rounded-3xl text-[13px] w-[310px] h-[112px] bg-[#FFFAD7] text-[#A75551] font-semibold">
        <div className="flex">
          <div className="mb-2 mr-1.5 rounded-xl text-center text-white w-[28px] bg-[#FEB7B3]">
            #1
          </div>
          <div className="flex">
            <p className="mr-1">브라우저 하단</p>
            <p className="px-1 mr-1 h-5 text-[#FFFAD7] bg-[#FEB7B3]">
              공유 버튼
            </p>
            <p>탭</p>
          </div>
        </div>
        <Image
          className="w-[242px] h-[46px] ml-3 mt-1.5 justify-center"
          src={shareImage}
          alt="chat"
        />
      </div>
      <div className="relative mb-4 flex flex-col px-6 pt-4 rounded-3xl text-[13px] w-[310px] h-[112px] bg-white text-[#A75551] font-semibold">
        <div className="flex">
          <div className="mb-2 mr-1.5 rounded-xl text-center text-white w-[28px] bg-[#FEB7B3]">
            #2
          </div>
          <div className="flex">
            <p className="px-1 mr-1 h-5 text-[#A75551] bg-[#FFFDEB]">
              홈 화면의 추가
            </p>
            <p>선택</p>
          </div>
        </div>
        <Image
          className="w-[242px] h-[46px] ml-3 mt-1.5 justify-center"
          src={addImage}
          alt="chat"
        />
      </div>
      <div className="relative mb-3 flex flex-col px-6 pt-4 rounded-3xl text-[13px] w-[310px] h-[112px] bg-[#FFFAD7] text-[#A75551] font-semibold">
        <div className="flex">
          <div className="mb-2 mr-1.5 rounded-xl text-center text-white w-[28px] bg-[#FEB7B3]">
            #3
          </div>
          <div className="flex">
            <p className="mr-1">추가된</p>
            <p className="px-1 mr-1 h-5 text-[#FFFAD7] bg-[#FEB7B3]">앱 실행</p>
          </div>
        </div>
        <Image
          className="w-[242px] h-[46px] ml-3 mt-1.5 justify-center"
          src={appImage}
          alt="chat"
        />
      </div>
    </div>
  )
}

export default SecondGuide
