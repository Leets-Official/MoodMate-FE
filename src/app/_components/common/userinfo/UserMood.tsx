'use client'

/* eslint-disable no-nested-ternary */
import { useRouter } from 'next/navigation'
import { DATE_MOOD_PAGE } from '@/_constants'
import { useRecoilState } from 'recoil'
import {
  editUserInfoState,
  preferInfoState,
  userInfoState,
} from '@/_atom/userinfo'
import { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { postEditUserData, postUserData } from '@/_service/userinfo'
import Cookies from 'js-cookie'
import NormalButton from '../NormalButton'
import SelectedButton from '../SelectedButton'

interface ButtonSelectedState {
  [key: string]: {
    selected: boolean
    imgSrc: string
  }
}

interface UserMoodProps {
  isEdit?: boolean
}

const UserMood = ({ isEdit }: UserMoodProps) => {
  const route = useRouter()

  const [editUserInfo, setEditUserInfoState] = useRecoilState(editUserInfoState)
  const [usersInfo, setUsersInfoState] = useRecoilState(userInfoState)
  const [userInfo, setUserInfoState] = useRecoilState(preferInfoState)
  const moodData = isEdit ? editUserInfo.preferMood : userInfo.preferMood
  const [buttonSelected, setButtonSelected] = useState<ButtonSelectedState>({
    뜨거운: {
      selected: moodData === '뜨거운',
      imgSrc: '/illustration/common/datemood/active.png',
    },
    편안한: {
      selected: moodData === '편안한',
      imgSrc: '/illustration/common/datemood/emotional.png',
    },
    설레는: {
      selected: moodData === '설레는',
      imgSrc: '/illustration/common/datemood/unusual.png',
    },
    재밌는: {
      selected: moodData === '재밌는',
      imgSrc: '/illustration/common/datemood/funny.png',
    },
  })

  const buttonStyles = {
    defaultStyles: 'bg-secondary',
    activeStyles: 'text-white bg-primary',
  }

  const handleError = () => {
    const errorMsg = isEdit
      ? '정보 수정에 실패했습니다. 처음부터 다시 입력해주세요!'
      : '정보 저장에 실패했습니다. 재로그인 후 이용해주세요!'
    alert(errorMsg)
    clearCookiesAndRedirect()
  }

  const postUserDataMutation = useMutation({
    mutationFn: () => postUserData(usersInfo, userInfo),
    onSuccess: () => {},
    onError: handleError,
  })

  const postEditUserDataMutation = useMutation({
    mutationFn: () => postEditUserData(editUserInfo),
    onSuccess: () => {},
    onError: handleError,
  })

  const clearCookiesAndRedirect = () => {
    if (isEdit) {
      route.push('/userinfo/1?edit=true')
    } else {
      Cookies.remove('accessToken')
      Cookies.remove('refreshToken')
      route.push('/login')
    }
  }

  const nextRoute = async () => {
    try {
      const isEditUserData = isEdit ? editUserInfo : userInfo
      if (
        Object.values(isEditUserData).some((value) => value === '') ||
        (isEdit
          ? editUserInfo.userKeywords.length
          : usersInfo.keywords.length) === 0
      ) {
        const failNextRouteMsg = isEdit
          ? '정보 입력이 잘못되었습니다. 처음부터 다시 입력해주세요.'
          : '정보 입력이 잘못되었습니다. 로그인 페이지로 이동합니다. 재로그인 해주세요.'
        alert(failNextRouteMsg)
        clearCookiesAndRedirect()
        return
      }

      if (isEdit) {
        await postEditUserDataMutation.mutateAsync()
      } else {
        await postUserDataMutation.mutateAsync()
      }

      const routeUrl = isEdit ? '/mypage' : '/main'
      route.push(routeUrl)
    } catch (error) {
      handleError()
      throw error
    }
  }

  const handleButtonClick = (mood: keyof ButtonSelectedState) => {
    setButtonSelected((prev) => {
      const updatedState = { ...prev }
      Object.keys(updatedState).forEach((key) => {
        updatedState[key].selected = key === mood && !prev[key].selected
      })
      return updatedState
    })

    isEdit
      ? setEditUserInfoState((prev) => ({
          ...prev,
          preferMood:
            prev.preferMood === mood.toString() ? '' : mood.toString(),
        }))
      : setUserInfoState((prev) => ({
          ...prev,
          preferMood:
            prev.preferMood === mood.toString() ? '' : mood.toString(),
        }))
  }

  useEffect(() => {
    setButtonSelected((prev) => {
      const updatedState = { ...prev }
      Object.keys(updatedState).forEach((key) => {
        updatedState[key].selected = key === moodData
      })
      return updatedState
    })
  }, [userInfo, editUserInfo])

  return (
    <div className="relative h-[560px] w-[312px]">
      <div className="mt-[35px] mb-[88px]">
        <div className="leading-normal text-darkgray font-bold text-xl font-sans">
          <div>{DATE_MOOD_PAGE.GREETINGS}</div>
        </div>
      </div>
      <div className="absolute flex top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 justify-center items-center flex-wrap ">
        {Object.entries(buttonSelected).map(
          ([mood, { selected, imgSrc }], index) => (
            <SelectedButton
              key={mood}
              buttonText={`${mood} ${DATE_MOOD_PAGE.DATE}`}
              buttonType="MOOD"
              isActive={true}
              onClick={() =>
                handleButtonClick(mood as keyof ButtonSelectedState)
              }
              imgSrc={imgSrc}
              imgSizeW={75}
              imgSizeH={85}
              imgClassName="mb-5"
              className={`mx-2 my-2 text-[14px] font-bold leading-none justify-end items-center rounded-3xl ${
                selected
                  ? `border-[1px] ${
                      index === 0 || index === 3 ? 'bg-yellow' : 'bg-onepink'
                    } border-primary text-primary`
                  : `${
                      index === 0 || index === 3
                        ? 'bg-zeroyellow'
                        : 'bg-zeropink'
                    } text-darkgray`
              }`}
            />
          ),
        )}
      </div>
      <NormalButton
        buttonText={isEdit ? '수정하기' : '매칭 시작'}
        onClick={nextRoute}
        buttonType="large"
        className={`absolute bottom-0 mb-7 text-darkgray rounded-md ${
          Object.values(buttonSelected).some(({ selected }) => selected)
            ? buttonStyles.activeStyles
            : buttonStyles.defaultStyles
        }`}
        isActive={Object.values(buttonSelected).some(
          ({ selected }) => selected,
        )}
      />
    </div>
  )
}

export default UserMood
