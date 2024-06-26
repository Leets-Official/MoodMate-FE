'use client'

import Icons from '@/_components/common/Icons'
import { bio, chat, deactivation, whitechat } from '@/_ui/IconsPath'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import ModalPortal from '@/_components/common/modal/ModalPortal'
import ModalOutside from '@/_components/common/modal/ModalOutside'
import ModalContent from '@/_components/common/modal/ModalContent'
import { CHAT_MODAL, INACTIVE_MODAL } from '@/_constants'
import { useMutation } from '@tanstack/react-query'
import { patchInactiveMain } from '@/_service/main'
import ModalContentOne from '@/_components/common/modal/ModalContentOne'

interface TextProps {
  type: 'BEFORE' | 'AFTER'
  roomId: number
  userId: number
  roomActive: boolean
  gender: 'MALE' | 'FEMALE'
}

const getTextStyle = (type: string) => {
  switch (type) {
    case 'BEFORE':
      return {
        box: 'bg-[#E6E6E6]',
        chat: 'bg-[#FEB3B8]',
        chating: chat,
      }
    case 'AFTER':
      return {
        box: 'bg-[#FFFFFF]',
        chat: 'bg-[#FEB3B8]',
        chating: whitechat,
      }
    default:
      return {
        box: '',
        chat: '',
        chating: chat,
      }
  }
}
const NavBar = ({ type, userId, roomId, roomActive, gender }: TextProps) => {
  const route = useRouter()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [chatModal, setChatModal] = useState<boolean>(false)
  const inactiveMutation = useMutation({
    mutationFn: patchInactiveMain,
    onSuccess: () => {
      document.location.reload()
    },
  })
  const onOpenModal = () => {
    setOpenModal((prev) => !prev)
  }
  const onCloseModal = () => {
    setOpenModal(false)
    inactiveMutation.mutate()
  }
  const onChatCloseModal = () => {
    setChatModal((prev) => !prev)
  }
  return (
    <div className="fixed translate-y-[43px] bottom-0 left-1/2 -translate-x-1/2 desktop:w-[378px] w-full">
      <div
        className={`${
          getTextStyle(type).box
        } pt-11 h-[223px] rounded-[88px] translate-y-1/3 flex justify-between`}
      >
        <div className="ml-16 cursor-pointer">
          <Icons name={deactivation} onClick={() => setOpenModal(true)} />
        </div>
        <div
          className={`${
            getTextStyle(type).chat
          } rounded-full w-[72px] h-[72px] -mt-16 cursor-pointer`}
          onClick={() => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            roomActive
              ? route.push(`/chat/${userId}/${roomId}`)
              : setChatModal(true)
            setChatModal(true)
          }}
        >
          <Icons name={getTextStyle(type).chating} className="ml-6 mt-6" />
        </div>
        <div className="mr-16 cursor-pointer">
          <Icons name={bio} onClick={() => route.push('/mypage')} />
        </div>
      </div>

      {openModal && (
        <ModalPortal nodeName="mainPortal">
          <ModalOutside
            onClose={() => setOpenModal(false)}
            className="max-w-md scroll overflow-hidden bg-white w-[260px] h-[400px] px-10 rounded-[25px] shadow-sm py-10"
          >
            <ModalContent
              subject={INACTIVE_MODAL}
              onConfirm={onOpenModal}
              onCancel={onCloseModal}
              gender={gender}
            />
          </ModalOutside>
        </ModalPortal>
      )}
      {chatModal && (
        <ModalPortal nodeName="mainPortal">
          <ModalOutside
            onClose={() => setChatModal(false)}
            className="max-w-md scroll overflow-hidden bg-white w-[260px] h-[400px] px-7 rounded-[25px] shadow-sm"
          >
            <ModalContentOne
              onClose={onChatCloseModal}
              subject={CHAT_MODAL}
              gender={gender}
            />
          </ModalOutside>
        </ModalPortal>
      )}
    </div>
  )
}

export default NavBar
