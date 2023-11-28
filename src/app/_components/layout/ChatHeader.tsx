'use client'

import { back, hamburger, quit } from '@/_ui/IconsPath'
import { useState } from 'react'
import { END_CHAT_MODAL, NEW_MATCHING_MODAL } from '@/_constants/chat'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ModalPortal from '../common/modal/ModalPortal'
import ModalOutside from '../common/modal/ModalOutside'
import ModalContent from '../common/modal/ModalContent'
import Icons from '../common/Icons'
import { patchQuitChat } from '@/_service/chat'

interface ChatHeaderProps {
  userId: number
}

const ChatHeader = ({ userId }: ChatHeaderProps) => {
  const [openExitModal, setOpenExitModal] = useState<boolean>(false)
  const [openMatchModal, setOpenMatchModal] = useState<boolean>(false)
  const router = useRouter()

  const onOpenMatchModal = () => {
    setOpenExitModal((prev) => !prev)
    setOpenMatchModal((prev) => !prev)
    document.body.style.overflow = 'hidden'
  }

  const onCloseExitModal = () => {
    setOpenExitModal(false)
    document.body.style.overflow = 'unset'
  }

  const onConfirmNewMatch = async () => {
    console.log('채팅 종료 & 재매칭 ')
    await patchQuitChat(userId)
    // 예외처리
    router.push('/main') //메인 렌더링 되면서 채팅방 안 들어가지는지 확인
  }

  const onCancelNewMatch = async () => {
    console.log('채팅종료만. 재매칭은 x')
    await patchQuitChat(userId)
    //비활성화 코드 추가
  }

  return (
    <section className="flex items-center justify-between w-full h-[47px] px-[26px]">
      <Icons name={back} onClick={() => router.back()} />
      <div className="flex flex-row items-center justify-center gap-3 cursor-pointer">
        <Icons name={quit} onClick={() => setOpenExitModal(true)} />
        <Link href={`/chat/partner-info/${userId}`}>
          <Icons name={hamburger} />
        </Link>
      </div>
      {(openExitModal || openMatchModal) && (
        <ModalPortal nodeName="exitPortal">
          <ModalOutside
            onClose={onCloseExitModal}
            className="max-w-md scroll overflow-hidden bg-white w-[260px] h-[467px] px-10 rounded-[25px] shadow-sm py-10"
          >
            <ModalContent
              subject={openExitModal ? END_CHAT_MODAL : NEW_MATCHING_MODAL}
              onConfirm={openExitModal ? onOpenMatchModal : onConfirmNewMatch}
              onCancel={openExitModal ? onCloseExitModal : onCancelNewMatch}
            />
          </ModalOutside>
        </ModalPortal>
      )}
    </section>
  )
}

export default ChatHeader
