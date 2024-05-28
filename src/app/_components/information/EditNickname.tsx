'use client'

import { useEffect, useState } from 'react'
import Input from '../common/Input'
import { INPUT_NICKNAME, NICK_NAME_PAGE } from '@/_constants/info'
import { useRecoilState } from 'recoil'
import { editUserNickname } from '@/_atom/userinfo'
import { useMutation } from '@tanstack/react-query'
import { postCheckNickname } from '@/_service/mypage'
import { putUserNickname } from '@/_service/userinfo'
import Icons from '../common/Icons'
import { exit } from '@/_ui/IconsPath'

interface EditNicknameProps {
  userNickname: string
  preferMood: string
  userGender: string
}

const EditNickname = ({
  userNickname,
  preferMood,
  userGender,
}: EditNicknameProps) => {
  const [inputValue, setInputValue] = useState(userNickname)
  const [inputCount, setinputCount] = useState(`${userNickname.length}/5`)
  const [editUserInfo, setEditUserInfoState] = useRecoilState(editUserNickname)
  const [canUseNickname, setCanUseNickname] = useState(false)

  useEffect(() => {
    setInputValue(userNickname)
    setEditUserInfoState({ ...editUserInfo, userNickname: userNickname })
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.slice(0, INPUT_NICKNAME.MAX)
    const koeranOnly = /^[ㄱ-ㅎㅏ-ㅣ가-힣]*$/g
    if (!koeranOnly.test(newValue)) {
      alert('한글만 입력 가능합니다.')
    } else {
      setCanUseNickname(false)
      setInputValue(newValue)
      setEditUserInfoState({ ...editUserInfo, userNickname: newValue })
      setinputCount(`${newValue.length}/${INPUT_NICKNAME.MAX}`)
    }
  }

  const inputStyles = {
    defaultStyles: 'bg-lightgray',
    activeStyles: 'bg-primary',
  }

  const postUserDataMutation = useMutation({
    mutationFn: () =>
      postCheckNickname(editUserInfo.userNickname, preferMood, userGender),
    onSuccess: (data) => {
      if (data.isDuplicate) {
        setCanUseNickname(false)
        alert('이미 사용중인 닉네임입니다.')
      } else {
        setCanUseNickname(true)
        alert('사용 가능한 닉네임입니다!')
      }
    },
    onError: () => {
      setCanUseNickname(false)
      alert('다시 시도해 주세요.')
    },
  })

  const putUserNicknameMutation = useMutation({
    mutationFn: () => putUserNickname(editUserInfo.userNickname),
    onSuccess: (data) => {
      window.location.reload()
    },
    onError: () => alert('다시 시도해 주세요.'),
  })

  const checkCanUseNickname = () => {
    postUserDataMutation.mutate()
  }

  const changeNickname = () => {
    putUserNicknameMutation.mutate()
  }

  return (
    <div className="w-[100%] mt-4 flex-col">
      <div className="w-full flex justify-between items-center px-2">
        <Input
          sort="info"
          textValue={inputValue}
          placeholder={NICK_NAME_PAGE.INPUTBOX}
          onChange={handleInputChange}
          className="w-[73%] text-sm placeholder:text-secondary placeholder:text-xs placeholder:leading-[174%] focus:outline-none"
        />
        <span className="block text-sm w-7 relative text-secondary">
          {inputCount}
        </span>
      </div>
      <div
        className={`w-full h-[2px] mt-[3px] rounded-[2.415px] ${
          inputValue.length > 0
            ? inputStyles.activeStyles
            : inputStyles.defaultStyles
        }`}
      />
      <div className="w-full text-xs px-2 text-black flex items-center justify-between mt-4">
        <button
          type="button"
          className="w-[40%] py-1 rounded-md bg-gray-200"
          onClick={() => checkCanUseNickname()}
        >
          중복확인
        </button>
        <button
          type="button"
          className={`w-[40%] py-1 rounded-md ${
            canUseNickname ? 'text-primary bg-onepink' : 'bg-gray-200'
          }`}
          onClick={() => changeNickname()}
          disabled={!canUseNickname}
        >
          수정하기
        </button>
        <div className="cursor-pointer">
          <Icons
            name={exit}
            className="w-3 h-3"
            onClick={() =>
              setEditUserInfoState({ ...editUserInfo, isNicknameEdit: false })
            }
          />
        </div>
      </div>
    </div>
  )
}

export default EditNickname
