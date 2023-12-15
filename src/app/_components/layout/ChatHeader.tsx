'use client'

import { back, hamburger, quit } from '@/_ui/IconsPath'
import { useState } from 'react'
import { END_CHAT_MODAL, NEW_MATCHING_MODAL } from '@/_constants/chat'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { patchQuitChat } from '@/_service/chat'
import { useMutation } from '@tanstack/react-query'
import { patchInactiveMain } from '@/_service/main'
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
      router.push('/main')
    },
  })
  const noMatchMutation = useMutation({
    mutationFn: patchQuitChat,
    onSuccess: async () => {
      await patchInactiveMain()
      router.push('/main')
    },
  })

  const onOpenMatchModal = () => {
    setOpenExitModal((prev) => !prev)
    setOpenMatchModal((prev) => !prev)
  }

  const onCloseExitModal = () => {
    setOpenExitModal(false)
  }

  const onConfirmNewMatch = async () => {
    newMatchMutation.mutate()
  }

  const onCancelNewMatch = async () => {
    noMatchMutation.mutate()
  }

  return (
    <section className="fixed top-0 flex items-center bg-black justify-between w-full h-[10%] px-[26px] z-10">
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
