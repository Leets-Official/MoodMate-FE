import Nickname from './Nickname'
import Gender from './Gender'
import Myage from './Myage'
import Department from './Department'
import Keyword from './Keyword'
import MoodyAge from '@/_components/information/MoodyAge'
import SameDept from './SameDept'
import Mood from './Mood'

interface MyinfoPageComponentsProps {
  slug: string
}

export default function MyinfoPageComponents({
  slug,
}: MyinfoPageComponentsProps) {
  switch (slug) {
    case '1':
      return <Nickname />
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
      return <div>notfound</div>
  }
}
