import NotFound from '@/not-found'
import UserNickname from './UserNickname'
import UserGender from './UserGender'
import UserMyage from './UserMyage'
import UserDepartment from './UserDepartment'
import UserKeyword from './UserKeyword'
import UserMoodyAge from './UserMoodyAge'
import UserSameDept from './UserSameDept'
import UserMood from './UserMood'

interface UserinfoPageComponentsProps {
  slug: string
}

const UserinfoPageComponents = ({ slug }: UserinfoPageComponentsProps) => {
  const pageNum = slug[0]
  switch (pageNum) {
    case '1':
      return <UserNickname pageNum={pageNum} />
    case '2':
      return <UserGender pageNum={pageNum} />
    case '3':
      return <UserMyage pageNum={pageNum} />
    case '4':
      return <UserDepartment pageNum={pageNum} />
    case '5':
      return <UserKeyword pageNum={pageNum} />
    case '6':
      return <UserMoodyAge pageNum={pageNum} />
    case '7':
      return <UserSameDept pageNum={pageNum} />
    case '8':
      return <UserMood />
    default:
      return <NotFound />
  }
}

export default UserinfoPageComponents
