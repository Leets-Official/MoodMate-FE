import NotfoundpageFirstContainer from '@/_components/notfoundpage/containers/NotfoundpageFirstContainer'
import NotfoundpageSecondContainer from '@/_components/notfoundpage/containers/NotfoundpageSecondContainer'
import Image from 'next/image'
import errorImage from 'public/illustration/common/error/notfound.png'

export default function NotFound() {
  return (
    <section className="w-full h-screen flex items-center justify-center">
      <Image src={errorImage} alt="image" />
      <NotfoundpageFirstContainer />
      <NotfoundpageSecondContainer />
    </section>
  )
}
