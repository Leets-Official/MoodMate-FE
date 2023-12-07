import { useState } from 'react'
import NormalButton from '../NormalButton'

interface ModalButtonOneProps {
  onClose: () => void
  closeText: string
}

const ModalButtonOne = ({ onClose, closeText }: ModalButtonOneProps) => {
  const [isSelected, setIsSelected] = useState<boolean>(false)

  const onCloseHandler = () => {
    setIsSelected((prev) => !prev)
    onClose()
  }
  return (
    <div className="flex flex-row w-full gap-2">
      <NormalButton
        buttonText={closeText}
        buttonType="small"
        className="rounded-lg bg-onepink w-[146px] h-[36px] text-center text-[14px]"
        onClick={onClose}
        isActive
      />
    </div>
  )
}

export default ModalButtonOne
