import Image from 'next/image'
import loading from '../../../../public/illustration/common/logo/loading.png'

const Loading = () => {
  return (
    <div className="bg-primary w-full h-screen flex">
      <Image
        src={loading}
        alt="로딩아이콘"
        className="w-[142px] h-[108px] my-auto mx-auto"
      />
    </div>
  )
}

export default Loading
