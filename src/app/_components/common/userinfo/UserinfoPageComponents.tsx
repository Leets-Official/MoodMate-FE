'use client'

import NotFound from '@/(route)/not-found'
import UserNickname from './UserNickname'
import UserGender from './UserGender'
import UserMyage from './UserMyage'
import UserDepartment from './UserDepartment'
import UserKeyword from './UserKeyword'
import UserMoodyAge from './UserMoodyAge'
import UserSameDept from './UserSameDept'
import UserMood from './UserMood'
import { useSearchParams } from 'next/navigation'

interface UserinfoPageComponentsProps {
  slug: string
}

const UserinfoPageComponents = ({ slug }: UserinfoPageComponentsProps) => {
  const pageNum = slug[0]
  const queryParam = useSearchParams().get('edit') === 'true' ? true : false

  switch (pageNum) {
    case '1':
      return <UserNickname pageNum={pageNum} isEdit={queryParam} />
    case '2':
      return <UserGender pageNum={pageNum} isEdit={queryParam} />
    case '3':
      return <UserMyage pageNum={pageNum} isEdit={queryParam} />
    case '4':
      return <UserDepartment pageNum={pageNum} isEdit={queryParam} />
    case '5':
      return <UserKeyword pageNum={pageNum} isEdit={queryParam} />
    case '6':
      return <UserMoodyAge pageNum={pageNum} isEdit={queryParam} />
    case '7':
      return <UserSameDept pageNum={pageNum} isEdit={queryParam} />
    case '8':
      return <UserMood isEdit={queryParam} />
    default:
      return <NotFound />
  }
}

export default UserinfoPageComponents
