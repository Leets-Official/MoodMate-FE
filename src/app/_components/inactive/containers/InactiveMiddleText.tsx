'use client'

import React, { useState } from 'react'
import NormalButton from '@/_components/common/NormalButton'
import { useRouter } from 'next/navigation'
import { CHAT_MODAL, INACTIVE_BUTTON, INACTIVE_CHAT_MODAL } from '@/_constants'
import { useMutation } from '@tanstack/react-query'
import { patchInactiveMain } from '@/_service/main'
import ModalPortal from '@/_components/common/modal/ModalPortal'
import ModalOutside from '@/_components/common/modal/ModalOutside'
import ModalContentOne from '@/_components/common/modal/ModalContentOne'

interface ChatProps {
  roomId: number
  userId: number
  roomActive: boolean
  gender: 'MALE' | 'FEMALE'
}
const InactiveFirstText = ({
  roomId,
  userId,
  roomActive,
  gender,
}: ChatProps) => {
  const route = useRouter()
  const [chatModal, setChatModal] = useState<boolean>(false)
  const inactiveMutation = useMutation({
    mutationFn: patchInactiveMain,
    onSuccess: () => {
      window.location.reload()
    },
  })
  const onChatCloseModal = () => {
    setChatModal((prev) => !prev)
    // document.body.style.overflow = 'unset'
  }
  const moveToMypage = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    roomActive ? route.push(`/chat/${userId}/${roomId}`) : setChatModal(true)
  }
  return (
    <div className="flex flex-col items-center">
      <NormalButton
        buttonText={INACTIVE_BUTTON.REMATCH}
        onClick={() => inactiveMutation.mutate()}
        buttonType="large"
        className="bg-[#FC4F59] text-white text-[14px] w-[312px] h-[48px] rounded-[8px] mt-7"
        isActive
      />
      <NormalButton
        buttonText={INACTIVE_BUTTON.GOMAIN}
        onClick={moveToMypage}
        buttonType="large"
        className="bg-[#D6D6D6] text-[14px] w-[312px] h-[48px] rounded-[8px] mt-3"
        isActive
      />
      {chatModal && (
        <ModalPortal nodeName="mainPortal">
          <ModalOutside
            onClose={() => setChatModal(false)}
            className="max-w-md scroll overflow-hidden bg-white w-[260px] h-[467px] px-7 rounded-[25px] shadow-sm"
          >
            <ModalContentOne
              onClose={onChatCloseModal}
              subject={INACTIVE_CHAT_MODAL}
              gender={gender}
            />
          </ModalOutside>
        </ModalPortal>
      )}
    </div>
  )
}

export default InactiveFirstText
