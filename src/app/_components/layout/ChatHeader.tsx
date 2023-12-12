'use client'

import { back, hamburger, quit } from '@/_ui/IconsPath'
import { useState } from 'react'
import { END_CHAT_MODAL, NEW_MATCHING_MODAL } from '@/_constants/chat'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { patchQuitChat } from '@/_service/chat'
import { useMutation } from '@tanstack/react-query'
import ModalPortal from '../common/modal/ModalPortal'
import ModalOutside from '../common/modal/ModalOutside'
import ModalContent from '../common/modal/ModalContent'
import Icons from '../common/Icons'

interface ChatHeaderProps {
  userId: number
}

const ChatHeader = ({ userId }: ChatHeaderProps) => {
  const router = useRouter()
  const [openExitModal, setOpenExitModal] = useState<boolean>(false)
  const [openMatchModal, setOpenMatchModal] = useState<boolean>(false)
  const newMatchMutation = useMutation({
    mutationFn: patchQuitChat,
    onSuccess: () => {
      router.push('/main') // 메인 렌더링 되면서 채팅방 안 들어가지는지 확인
    },
  })
  const noMatchMutation = useMutation({
    mutationFn: patchQuitChat,
    onSuccess: () => {
      // 비활성화 api 추가
    },
  })

  const onOpenMatchModal = () => {
    setOpenExitModal((prev) => !prev)
    setOpenMatchModal((prev) => !prev)
    // document.body.style.overflow = 'hidden'
  }

  const onCloseExitModal = () => {
    setOpenExitModal(false)
    // document.body.style.overflow = 'unset'
  }

  const onConfirmNewMatch = async () => {
    console.log('채팅 종료 & 재매칭 ')
    newMatchMutation.mutate()
  }

  const onCancelNewMatch = async () => {
    console.log('채팅종료만. 재매칭은 x')
    noMatchMutation.mutate()
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
              gender=""
            />
          </ModalOutside>
        </ModalPortal>
      )}
    </section>
  )
}

export default ChatHeader
