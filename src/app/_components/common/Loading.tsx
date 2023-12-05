import loading from '@/_ui/illustration/common/logo/loading.png'
import Image from 'next/image'

const Loading = () => {
  return (
    <div className="bg-primary w-full h-full">
      <Image src={loading} alt="로딩아이콘" />
    </div>
  )
}

export default Loading
