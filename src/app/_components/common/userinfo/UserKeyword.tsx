import { useRouter } from 'next/navigation'
import { MY_KEYWORD_PAGE } from '@/_constants'
import { useRecoilState } from 'recoil'
import { userInfoState } from '@/_atom/userinfo'
import { editPreferInfoState } from '@/_atom/editinfo'
import { useEffect, useState } from 'react'
import NormalButton from '../NormalButton'
import SelectedButton from '../SelectedButton'

interface UserKeywordProps {
  pageNum: string
  userKeywords?: string[]
}

export default function UserKeyword({
  pageNum,
  userKeywords,
}: UserKeywordProps) {
  const route = useRouter()

  const [userInfo, setUserInfoState] = useRecoilState(userInfoState)
  const [editInfo, setEditInfoState] = useRecoilState(editPreferInfoState)
  const [selectedButtons, setSelectedButtons] = useState<string[]>(
    userKeywords ? userKeywords : userInfo.keywords,
  )

  const buttonStyles = {
    defaultStyles: 'bg-secondary',
    activeStyles: 'text-white bg-primary',
  }

  const nextRoute = () => {
    setUserInfoState((prevUserInfo) => ({
      ...prevUserInfo,
      keywords: selectedButtons,
    }))
    setEditInfoState((prevEditInfo) => ({
      ...prevEditInfo,
      keywords: selectedButtons,
    }))
    const routeUrl = userKeywords ? '/mypage/edit' : '/userinfo'
    route.push(`${routeUrl}/${parseInt(pageNum, 10) + 1}`)
  }

  const handlerButtonclick = (keyword: string) => {
    const isSelected = selectedButtons.includes(keyword)
    const updatedSelection = isSelected
      ? selectedButtons.filter((selected) => selected !== keyword)
      : [...selectedButtons, keyword]

    if (updatedSelection.length <= 3) {
      setSelectedButtons(updatedSelection)
    }
  }

  useEffect(() => {
    setSelectedButtons(userInfo.keywords)
  }, [userInfo.keywords])

  return (
    <div className="relative h-[560px] w-[312px]">
      <div className="mt-[35px] mb-[88px]">
        <div>
          <div className="leading-normal text-darkgray font-bold text-xl font-sans">
            {MY_KEYWORD_PAGE.GREETINGS}
          </div>
          <div className="mt-[10px] text-secondary font-normal text-base font-sans">
            <div>{MY_KEYWORD_PAGE.WARNINGS1}</div>
            <div>{MY_KEYWORD_PAGE.WARNINGS2}</div>
          </div>
        </div>
      </div>
      <div>
        <div className="absolute bottom-[100px]">
          {MY_KEYWORD_PAGE.KEYWORD_LIST.map((keyword) => (
            // eslint-disable-next-line react/jsx-key
            <SelectedButton
              key={keyword}
              buttonText={keyword}
              buttonType="KEYWORD"
              isActive
              onClick={() => {
                handlerButtonclick(keyword)
              }}
              className={`py-2 px-5 mr-[7px] mb-[10px] ${
                selectedButtons.includes(keyword)
                  ? 'border-[1px] border-primary text-primary'
                  : 'border-[1px] border-zeropink'
              } bg-zeropink text-darkgray font-sans text-[14px] font-normal justify-end items-center gap-[10px] rounded-3xl`}
            />
          ))}
        </div>
        <NormalButton
          buttonText="다음"
          onClick={nextRoute}
          buttonType="large"
          className={`font-sans absolute bottom-0 text-darkgray rounded-md ${
            selectedButtons.length === 3
              ? buttonStyles.activeStyles
              : buttonStyles.defaultStyles
          }`}
          isActive={selectedButtons.length === 3}
        />
      </div>
    </div>
  )
}
