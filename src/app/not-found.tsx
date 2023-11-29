import NotfoundpageFirstContainer from '@/_components/notfoundpage/containers/NotfoundpageFirstContainer'
import NotfoundpageSecondContainer from '@/_components/notfoundpage/containers/NotfoundpageSecondContainer'

export default function NotFound() {
  return (
    <div>
      {/* 에러 캐릭터 필요! */}
      <NotfoundpageFirstContainer />
      <NotfoundpageSecondContainer />
    </div>
  )
}