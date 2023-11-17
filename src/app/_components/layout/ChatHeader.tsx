'use client'

import { back, deactivation, hamburger } from '@/_ui/IconsPath'
import { useState } from 'react'
import { END_CHAT_MODAL, NEW_MATCHING_MODAL } from '@/_constants/chat'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ModalPortal from '../common/ModalPortal'
import ModalOutside from '../common/ModalOutside'
import ModalContent from '../common/ModalContent'
import Icons from '../common/Icons'

const ChatHeader = () => {
  const [openExitModal, setOpenExitModal] = useState<boolean>(false)
  const [openMatchModal, setOpenMatchModal] = useState<boolean>(false)
  const router = useRouter()

  const onOpenMatchModal = () => {
    setOpenExitModal((prev) => !prev)
    setOpenMatchModal((prev) => !prev)
  }

  const onConfirmNewMatch = () => {
    console.log('채팅 종료 & 재매칭 ')
  }

  const onCancelNewMatch = () => {
    console.log('채팅종료만. 재매칭은 x')
  }

  return (
    <section className="flex items-center justify-between w-full h-[47px] px-[26px]">
      <Icons name={back} onClick={() => router.back()} />
      <div className="flex flex-row items-center justify-center gap-3 cursor-pointer">
        <Icons name={deactivation} onClick={() => setOpenExitModal(true)} />
        {/* 상대방 id 가져오기. 임시 1 */}
        <Link href={`/chat/partner-info/${1}`}>
          <Icons name={hamburger} />
        </Link>
      </div>
      {openExitModal && (
        <ModalPortal nodeName="exitPortal">
          <ModalOutside
            onClose={() => setOpenExitModal(false)}
            className="max-w-md scroll overflow-hidden bg-white w-[260px] h-[467px] px-10 rounded-lg shadow-sm py-10"
          >
            <ModalContent
              subject={END_CHAT_MODAL}
              onConfirm={onOpenMatchModal}
              onCancel={() => setOpenExitModal(false)}
            />
          </ModalOutside>
        </ModalPortal>
      )}
      {openMatchModal && (
        <ModalPortal nodeName="exitPortal">
          <ModalOutside
            onClose={() => setOpenExitModal(false)}
            className="max-w-md scroll overflow-hidden bg-white w-[260px] h-[467px] px-10 rounded-lg shadow-sm py-10"
          >
            <ModalContent
              subject={NEW_MATCHING_MODAL}
              onConfirm={onConfirmNewMatch}
              onCancel={onCancelNewMatch}
            />
          </ModalOutside>
        </ModalPortal>
      )}
    </section>
  )
}

export default ChatHeader
