'use client'

import NotFound from '@/(route)/not-found'
import UserKeyword from '../common/userinfo/UserKeyword'
import UserMood from '../common/userinfo/UserMood'
import UserMoodyAge from '../common/userinfo/UserMoodyAge'
import UserSameDept from '../common/userinfo/UserSameDept'

interface EditPageComponentsProps {
  slug: string
  userKeywords: string[]
  preferYearMax: number
  preferYearMin: number
  preferMood: string
}

const EditComponents = ({
  slug,
  userKeywords,
  preferYearMax,
  preferYearMin,
  preferMood,
}: EditPageComponentsProps) => {
  const pageNum = slug[0]
  switch (pageNum) {
    case '1':
      return <UserKeyword pageNum={pageNum} userKeywords={userKeywords} />
    case '2':
      return <UserMoodyAge pageNum={pageNum} />
    case '3':
      return <UserSameDept pageNum={pageNum} />
    case '4':
      return <UserMood />
    default:
      return <NotFound />
  }
}

export default EditComponents
