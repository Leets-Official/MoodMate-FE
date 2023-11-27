import { useState } from 'react'
import NormalButton from '../NormalButton'

interface ModalButtonsProps {
  onConfirm: () => void
  onCancel: () => void
  confirmText: string
  cancelText: string
}

const ModalButtons = ({
  onConfirm,
  onCancel,
  confirmText,
  cancelText,
}: ModalButtonsProps) => {
  const [isSelected, setIsSelected] = useState<boolean>(false)

  const onConfirmHandler = () => {
    setIsSelected((prev) => !prev)
    onConfirm()
  }

  const onCancelHandler = () => {
    setIsSelected((prev) => !prev)
    onCancel()
  }
  return (
    <div className="flex flex-row w-full gap-2">
      <NormalButton
        buttonText={cancelText}
        buttonType="small"
        className="rounded-lg text-[14px]"
        color="neutral-500"
        onClick={onCancel}
        isActive
      />
      <NormalButton
        buttonText={confirmText}
        buttonType="small"
        className="rounded-lg  text-[14px]"
        color="neutral-300"
        onClick={onConfirm}
        isActive
      />
    </div>
  )
}

export default ModalButtons