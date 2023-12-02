import Nickname from './Nickname'
import Gender from './Gender'
import Myage from './Myage'
import Department from './Department'
import Keyword from './Keyword'
import MoodyAge from './MoodyAge'
import SameDept from './SameDept'
import Mood from './Mood'
import NotFound from '@/not-found'

interface UserinfoPageComponentsProps {
  slug: string
}

export default function UserinfoPageComponents({
  slug,
}: UserinfoPageComponentsProps) {
  const pageNum = slug[0]
  switch (pageNum) {
    case '1':
      return <Nickname pageNum={pageNum} />
    case '2':
      return <Gender />
    case '3':
      return <Myage />
    case '4':
      return <Department />
    case '5':
      return <Keyword />
    case '6':
      return <MoodyAge />
    case '7':
      return <SameDept />
    case '8':
      return <Mood />
    default:
      return <NotFound />
  }
}
