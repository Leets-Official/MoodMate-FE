import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { NICK_NAME_PAGE, INPUT_NICKNAME } from '@/_constants'
import { useRecoilState, useRecoilValue } from 'recoil'
import { userInfoState, editUserInfoState } from '@/_atom/userinfo'
import NormalButton from '../NormalButton'
import Input from '../Input'
import Loading from '../Loading'
import ErrorPage from '@/(route)/error'
import { useMyPageQuery } from '@/_hooks/useMypageQuery'
import { useMutation } from '@tanstack/react-query'
import { postCheckNickname } from '@/_service/mypage'

interface UserNicknameProps {
  pageNum: string
  isEdit?: boolean
}

const UserNickname = ({ pageNum, isEdit }: UserNicknameProps) => {
  const [editUserInfo, setEditUserInfoState] = useRecoilState(editUserInfoState)
  const route = useRouter()
  const [canUseNickname, setCanUseNickname] = useState(false)
  const [canNext, setCanNext] = useState(false)
  const [nickname, setNickname] = useRecoilState(userInfoState)
  const userInfo = useRecoilValue(userInfoState)
  const [inputValue, setInputValue] = useState(
    isEdit ? editUserInfo.userNickname : userInfo.nickname || '',
  )
  const [inputCount, setinputCount] = useState(`${inputValue.length}/5`)
  const { isLoading, isError, data } = useMyPageQuery()

  useEffect(() => {
    if (isEdit) fetchData()
  }, [isEdit])

  const fetchData = async () => {
    try {
      if (isLoading) {
        return <Loading />
      }
      if (isError || !data) {
        return <ErrorPage />
      }

      setEditUserInfoState({
        userGender: data.myPageResponse.userGender,
        userNickname: data.myPageResponse.userNickname,
        year: data.myPageResponse.year,
        userDepartment: data.myPageResponse.userDepartment,
        userKeywords: data.myPageResponse.userKeywords,
        preferYearMax: data.myPageResponse.preferYearMax,
        preferYearMin: data.myPageResponse.preferYearMin,
        preferDepartmentPossible: data.myPageResponse.preferDepartmentPossible,
        preferMood: data.myPageResponse.preferMood,
      })
      setInputValue(data.myPageResponse.userNickname)
      setinputCount(`${data.myPageResponse.userNickname.length}/5`)
      route.push(`/userinfo/${parseInt(pageNum, 10) + 1}?edit=true`)
    } catch (error) {
      console.error('Error fetching data:', error)
      route.push('/login')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.slice(0, INPUT_NICKNAME.MAX)
    const koeranOnly = /^[ㄱ-ㅎㅏ-ㅣ가-힣]*$/g
    setCanUseNickname(false)
    if (!koeranOnly.test(newValue)) {
      alert('한글만 입력 가능합니다.')
    } else {
      setInputValue(newValue)
      setinputCount(`${newValue.length}/${INPUT_NICKNAME.MAX}`)
    }
  }

  useEffect(() => {
    if (canUseNickname && inputValue.length > 0) {
      setCanNext(true)
    } else {
      setCanNext(false)
    }
  }, [inputValue, canUseNickname])

  const nextRoute = () => {
    if (inputValue.trim() === '') {
      alert('닉네임을 입력해주세요.')
    } else {
      isEdit
        ? setEditUserInfoState((prev) => ({
            ...prev,
            userNickname: inputValue.trim(),
          }))
        : setNickname((prevNickname) => ({
            ...prevNickname,
            nickname: inputValue.trim(),
          }))
      const params = isEdit ? '?edit=true' : ''
      route.push(`/userinfo/${parseInt(pageNum, 10) + 1}${params}`)
    }
  }

  const postUserDataMutation = useMutation({
    mutationFn: () => postCheckNickname(inputValue.trim()),
    onSuccess: (data) => {
      if (data.isDuplicate) {
        setCanUseNickname(false)
        alert('이미 사용중인 닉네임입니다.')
      } else {
        setCanUseNickname(true)
        if (inputValue.length > 0) {
          setCanNext(true)
        }
        alert('사용 가능한 닉네임입니다!')
      }
    },
    onError: () => {
      setCanUseNickname(false)
      alert('다시 시도해 주세요.')
    },
  })

  const checkCanUseNickname = () => {
    if (inputValue.trim().length !== 0) {
      postUserDataMutation.mutate()
    } else {
      alert('닉네임을 입력해주세요.')
    }
  }

  const inputStyles = {
    defaultStyles: 'bg-lightgray',
    activeStyles: 'bg-primary',
  }

  const buttonStyles = {
    defaultStyles: 'bg-secondary',
    activeStyles: 'text-white bg-primary',
  }

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between">
      <div className="relative w-full flex flex-col items-start mt-[35px] mb-[168px]">
        <div className="text-darkgray font-bold text-xl font-sans">
          <div>{NICK_NAME_PAGE.GREETINGS1}</div>
          <div>{NICK_NAME_PAGE.GREETINGS2}</div>
        </div>
        <div className="mt-[10px] text-secondary font-normal text-base font-sans">
          {NICK_NAME_PAGE.WARNINGS}
        </div>
      </div>
      <div className="w-full">
        <Input
          sort="info"
          textValue={inputValue}
          placeholder={NICK_NAME_PAGE.INPUTBOX}
          onChange={handleInputChange}
          readOnly={isEdit}
          className="w-[73%] placeholder:text-secondary placeholder:text-base placeholder:leading-[174%] focus:outline-none ml-[22px] mr-[30px]"
        />
        <span className="text-[12px] text-secondary">{inputCount}</span>
        <div
          className={`w-full h-[2px] mt-[3px] rounded-[2.415px] ${
            inputValue.length > 0
              ? inputStyles.activeStyles
              : inputStyles.defaultStyles
          }`}
        />
        <div className="w-full flex relative justify-between">
          <button
            type="button"
            className="w-[30%] mt-2 text-sm py-1 rounded-md bg-gray-200"
            onClick={() => checkCanUseNickname()}
          >
            중복확인
          </button>
          <div className="text-secondary font-normal text-xs font-notosans mt-[8px] text-right">
            {NICK_NAME_PAGE.GUIDE}
          </div>
        </div>
      </div>

      <NormalButton
        buttonText="다음"
        onClick={nextRoute}
        buttonType="userinfo"
        className={`relative mb-7 rounded-md text-darkgray ${
          canNext ? buttonStyles.activeStyles : buttonStyles.defaultStyles
        }`}
        isActive={canNext}
      />
    </div>
  )
}

export default UserNickname
