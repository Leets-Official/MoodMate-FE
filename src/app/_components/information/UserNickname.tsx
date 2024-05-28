'use cleint'

import { useRecoilState } from 'recoil'
import EditNickname from './EditNickname'
import { editUserNickname } from '@/_atom/userinfo'
import Icons from '../common/Icons'
import { pencile } from '@/_ui/IconsPath'
import { useEffect } from 'react'

interface UserNicknameProps {
  userNickname: string
}

const UserNickname = ({ userNickname }: UserNicknameProps) => {
  const [editUserInfo, setEditUserInfoState] = useRecoilState(editUserNickname)
  useEffect(() => {
    setEditUserInfoState({ ...editUserInfo, isNicknameEdit: false })
  }, [])
  return (
    <>
      {!editUserInfo.isNicknameEdit ? (
        <div className="w-full flex items-center justify-center">
          <p className="mt-4 text-[18px] font-bold">{userNickname}</p>
          <div className="flex flex-row mt-4 ml-2 items-center justify-center gap-3 cursor-pointer">
            <Icons
              name={pencile}
              className="w-3 h-3"
              onClick={() =>
                setEditUserInfoState({ ...editUserInfo, isNicknameEdit: true })
              }
            />
          </div>
        </div>
      ) : (
        <EditNickname userNickname={userNickname} />
      )}
    </>
  )
}

export default UserNickname
