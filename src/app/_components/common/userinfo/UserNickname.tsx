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

interface UserNicknameProps {
  pageNum: string
  isEdit?: boolean
}

const UserNickname = ({ pageNum, isEdit }: UserNicknameProps) => {
  const [editUserInfo, setEditUserInfoState] = useRecoilState(editUserInfoState)
  const route = useRouter()
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
    if (!koeranOnly.test(newValue)) {
      alert('한글만 입력 가능합니다.')
    } else {
      setInputValue(newValue)
      setinputCount(`${newValue.length}/${INPUT_NICKNAME.MAX}`)
    }
  }

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

  const inputStyles = {
    defaultStyles: 'bg-lightgray',
    activeStyles: 'bg-primary',
  }

  const buttonStyles = {
    defaultStyles: 'bg-secondary',
    activeStyles: 'text-white bg-primary',
  }

  return (
    <div className="relative h-[560px] w-[312px]">
      <div className="mt-[35px] mb-[168px]">
        <div className="text-darkgray font-bold text-xl font-sans">
          <div>{NICK_NAME_PAGE.GREETINGS1}</div>
          <div>{NICK_NAME_PAGE.GREETINGS2}</div>
        </div>
        <div className="mt-[10px] text-secondary font-normal text-base font-sans">
          {NICK_NAME_PAGE.WARNINGS}
        </div>
      </div>
      <div className="w-[312px] h-[55px]">
        <Input
          sort="info"
          textValue={inputValue}
          placeholder={NICK_NAME_PAGE.INPUTBOX}
          onChange={handleInputChange}
          readOnly={isEdit}
          className="w-[230px] placeholder:text-secondary placeholder:text-base placeholder:leading-[174%] focus:outline-none ml-[22px] mr-[30px]"
        />
        <span className="text-[12px] text-secondary">{inputCount}</span>
        <div
          className={`w-full h-[2px] mt-[3px] rounded-[2.415px] ${
            inputValue.length > 0
              ? inputStyles.activeStyles
              : inputStyles.defaultStyles
          }`}
        />
        <div className="text-secondary font-normal text-xs font-notosans mt-[8px] text-right">
          {NICK_NAME_PAGE.GUIDE}
        </div>
      </div>

      <NormalButton
        buttonText="다음"
        onClick={nextRoute}
        buttonType="large"
        className={`mb-7 absolute bottom-0 rounded-md text-darkgray ${
          inputValue.length > 0
            ? buttonStyles.activeStyles
            : buttonStyles.defaultStyles
        }`}
        isActive={inputValue.trim() !== ''}
      />
    </div>
  )
}

export default UserNickname
