import Icons from '@/_components/common/Icons'
import { logout } from '@/_ui/IconsPath'
import { useState } from 'react'
import ModalOutside from '@/_components/common/modal/ModalOutside'
import ModalContent from '@/_components/common/modal/ModalContent'
import { INACTIVE_MODAL, MY_MODAL } from '@/_constants'
import ModalPortal from '@/_components/common/modal/ModalPortal'

const MypageThirdBoxContainer = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [chatModal, setChatModal] = useState<boolean>(false)
  const onOpenModal = () => {
    setOpenModal((prev) => !prev)
    // document.body.style.overflow = 'hidden'
  }
  const onCloseModal = () => {
    setOpenModal(false)
    // document.body.style.overflow = 'unset'
  }
  return (
    <section className="ml-6 mt-4">
      <p className="text-[12px] text-[#808080]">로그인</p>
      <div className="mt-4 flex">
        <Icons name={logout} onClick={() => setOpenModal(true)} />
        <p className="text-[16px] ml-2.5">로그아웃</p>
      </div>
      {openModal && (
        <ModalPortal nodeName="mainPortal">
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
