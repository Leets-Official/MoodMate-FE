import { useRouter } from 'next/navigation'
import { MY_KEYWORD_PAGE } from '@/_constants'
import { useRecoilState } from 'recoil'
import { editUserInfoState, userInfoState } from '@/_atom/userinfo'
import { useEffect, useState } from 'react'
import NormalButton from '../NormalButton'
import SelectedButton from '../SelectedButton'
import { mapKeywordToEmojiKeyword } from '@/utils/keywordmapping'

interface UserKeywordProps {
  pageNum: string
  isEdit?: boolean
}

export default function UserKeyword({ pageNum, isEdit }: UserKeywordProps) {
  const route = useRouter()

  const [editUserInfo, setEditUserInfoState] = useRecoilState(editUserInfoState)
  const [userInfo, setUserInfoState] = useRecoilState(userInfoState)
  const keywordData = isEdit
    ? editUserInfo.userKeywords.map(mapKeywordToEmojiKeyword)
    : userInfo.keywords.map(mapKeywordToEmojiKeyword)
  const [selectedButtons, setSelectedButtons] = useState<string[]>(keywordData)

  const buttonStyles = {
    defaultStyles: 'bg-secondary',
    activeStyles: 'text-white bg-primary',
  }

  const nextRoute = () => {
    const slicedKeywords = selectedButtons.map((keyword) => keyword.slice(3))
    isEdit
      ? setEditUserInfoState((prev) => ({
          ...prev,
          userKeywords: slicedKeywords,
        }))
      : setUserInfoState((prevUserInfo) => ({
          ...prevUserInfo,
          keywords: slicedKeywords,
        }))

    const params = isEdit ? '?edit=true' : ''
    route.push(`/userinfo/${parseInt(pageNum, 10) + 1}${params}`)
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
    setSelectedButtons(keywordData)
  }, [])

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between">
      <div className="relative w-full flex flex-col items-start mt-[35px] mb-7">
        <div className="leading-normal text-darkgray font-bold text-xl font-sans">
          {MY_KEYWORD_PAGE.GREETINGS}
        </div>
        <div className="mt-[10px] text-secondary font-normal text-base font-sans">
          <div>{MY_KEYWORD_PAGE.WARNINGS1}</div>
          <div>{MY_KEYWORD_PAGE.WARNINGS2}</div>
        </div>
      </div>
      <div className="w-full h-full flex flex-col justify-between items-center ">
        <div className="relative w-full mb-2">
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
              } bg-zeropink text-darkgray text-[14px] font-normal justify-end items-center gap-[10px] rounded-3xl`}
            />
          ))}
        </div>
        <NormalButton
          buttonText="다음"
          onClick={nextRoute}
          buttonType="userinfo"
          className={`relative mb-7 rounded-md text-darkgray ${
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
