import Icons from '@/_components/common/Icons'
import { logout } from '@/_ui/IconsPath'
import { useState } from 'react'
import ModalOutside from '@/_components/common/modal/ModalOutside'
import ModalContent from '@/_components/common/modal/ModalContent'
import { MY_MODAL } from '@/_constants'
import ModalPortal from '@/_components/common/modal/ModalPortal'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

const MypageThirdBoxContainer = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const route = useRouter()
  const onOpenModal = () => {
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')
    route.push('/login')
  }
  const onCloseModal = () => {
    setOpenModal((prev) => !prev)
  }
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
      {openModal && (
        <ModalPortal nodeName="myPortal">
          <ModalOutside
            onClose={() => setOpenModal(false)}
            className="max-w-md scroll overflow-hidden bg-white w-[260px] h-[467px] px-10 rounded-[25px] shadow-sm py-10"
          >
            <ModalContent
              onMyPage
              subject={MY_MODAL}
              onConfirm={onOpenModal}
              onCancel={onCloseModal}
            />
          </ModalOutside>
        </ModalPortal>
      )}
    </section>
  )
}

export default MypageThirdBoxContainer
