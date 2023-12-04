import UserNickname from './UserNickname'
import UserGender from './UserGender'
import UserMyage from './UserMyage'
import UserDepartment from './UserDepartment'
import UserKeyword from './UserKeyword'
import UserMoodyAge from './UserMoodyAge'
import UserSameDept from './UserSameDept'
import UserMood from './UserMood'
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
      return <UserNickname pageNum={pageNum} />
    case '2':
      return <UserGender />
    case '3':
      return <UserMyage />
    case '4':
      return <UserDepartment />
    case '5':
      return <UserKeyword />
    case '6':
      return <UserMoodyAge />
    case '7':
      return <UserSameDept />
    case '8':
      return <UserMood />
    default:
      return <NotFound />
  }
}
