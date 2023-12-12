'use client'

import Icons from '@/_components/common/Icons'
import { bio, chat, deactivation, whitechat } from '@/_ui/IconsPath'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
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
        chat: 'bg-[#FC4F59]',
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
const NavBar = ({ type, userId, roomId, roomActive }: TextProps) => {
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
    // document.body.style.overflow = 'hidden'
  }
  const onCloseModal = () => {
    setOpenModal(false)
    // document.body.style.overflow = 'unset'
    inactiveMutation.mutate()
  }
  const onChatCloseModal = () => {
    setChatModal((prev) => !prev)
    // document.body.style.overflow = 'unset'
  }
  console.log('roomActive', roomActive)
  return (
    <div className="translate-y-[30px] fixed bottom-0 left-1/2 -translate-x-1/2 desktop:w-[378px] w-full">
      <div
        className={`${
          getTextStyle(type).box
        } pt-11 rounded-[88px] flex justify-between`}
      >
        <div className="ml-16">
          <Icons name={deactivation} onClick={() => setOpenModal(true)} />
        </div>
        <div
          className={`${
            getTextStyle(type).chat
          } rounded-full w-[72px] h-[72px] -mt-16`}
        >
          <Icons
            name={getTextStyle(type).chating}
            className="ml-6 mt-6"
            onClick={() => {
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              roomActive
                ? route.push(`/chat/${userId}/${roomId}`)
                : setChatModal(true)
            }}
          />
        </div>
        <div className="mr-16">
          <Icons name={bio} onClick={() => route.push('/mypage')} />
        </div>
      </div>
      {openModal && (
        <ModalPortal nodeName="mainPortal">
          <ModalOutside
            onClose={() => setOpenModal(false)}
            className="max-w-md scroll overflow-hidden bg-white w-[260px] h-[467px] px-10 rounded-[25px] shadow-sm py-10"
          >
            <ModalContent
              subject={INACTIVE_MODAL}
              onConfirm={onOpenModal}
              onCancel={onCloseModal}
            />
          </ModalOutside>
        </ModalPortal>
      )}
      {chatModal && (
        <ModalPortal nodeName="mainPortal">
          <ModalOutside
            onClose={() => setChatModal(false)}
            className="max-w-md scroll overflow-hidden bg-white w-[260px] h-[467px] px-10 rounded-[25px] shadow-sm py-10"
          >
            <ModalContentOne onClose={onChatCloseModal} subject={CHAT_MODAL} />
          </ModalOutside>
        </ModalPortal>
      )}
    </div>
  )
}

export default NavBar
