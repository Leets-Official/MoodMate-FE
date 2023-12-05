import loading from '@/_ui/illustration/common/logo/loading.png'
import Image from 'next/image'

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
