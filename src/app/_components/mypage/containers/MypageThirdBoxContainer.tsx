import Icons from '@/_components/common/Icons'
import { logout } from '@/_ui/IconsPath'
import { useState } from 'react'
import ModalOutside from '@/_components/common/modal/ModalOutside'
import ModalContent from '@/_components/common/modal/ModalContent'
import { MY_MODAL, DELETE_MODAL } from '@/_constants'
import ModalPortal from '@/_components/common/modal/ModalPortal'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { useMutation } from '@tanstack/react-query'
import { deleteUser } from '@/_service/mypage'

const MypageThirdBoxContainer = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const route = useRouter()
  const onOpenModal = () => {
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')
    route.push('/login')
  }
  const onCloseModal = (type: string) => {
    if (type === 'delete') {
      setOpenDeleteModal((prev) => !prev)
    } else if (type === 'logout') {
      setOpenModal((prev) => !prev)
    }
  }
  const deleteUserProfile = useMutation({
    mutationFn: () => deleteUser(),
    onSuccess: () => {
      Cookies.remove('accessToken')
      Cookies.remove('refreshToken')
      route.push('/login')
    },
    onError: () => {
      alert('다시 시도해 주세요.')
    },
  })
  return (
    <section className="ml-6 mt-4">
      <p className="text-[12px] text-[#808080]">로그인</p>
      <div className="mt-4 flex mb-4">
        <Icons name={logout} />
        <p
          className="text-[16px] ml-2.5 cursor-pointer"
          onClick={() => setOpenModal(true)}
        >
          로그아웃
        </p>
      </div>
      <div className="mt-4 flex mb-4">
        <Icons name={logout} />
        <p
          className="text-[16px] ml-2.5 cursor-pointer"
          onClick={() => setOpenDeleteModal(true)}
        >
          회원탈퇴
        </p>
      </div>
      {openModal && (
        <ModalPortal nodeName="myPortal">
          <ModalOutside
            onClose={() => setOpenModal(false)}
            className="max-w-md scroll overflow-hidden bg-white w-[260px] h-[400px] px-10 rounded-[25px] shadow-sm py-10"
          >
            <ModalContent
              onMyPage
              subject={MY_MODAL}
              onConfirm={onOpenModal}
              onCancel={() => onCloseModal('logout')}
            />
          </ModalOutside>
        </ModalPortal>
      )}
      {openDeleteModal && (
        <ModalPortal nodeName="myPortal">
          <ModalOutside
            onClose={() => setOpenDeleteModal(false)}
            className="max-w-md scroll overflow-hidden bg-white w-[260px] h-[400px] px-10 rounded-[25px] shadow-sm py-10"
          >
            <ModalContent
              subject={DELETE_MODAL}
              onConfirm={() => deleteUserProfile.mutate()}
              onCancel={() => onCloseModal('delete')}
            />
          </ModalOutside>
        </ModalPortal>
      )}
    </section>
  )
}

export default MypageThirdBoxContainer
