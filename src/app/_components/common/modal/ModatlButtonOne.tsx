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
    <div className="flex flex-row">
      <NormalButton
        buttonText={closeText}
        buttonType="small"
        className="w-[146px] mx-auto rounded-lg bg-onepink px-5 h-[36px] text-center text-[14px]"
        onClick={onCloseHandler}
        isActive
      />
    </div>
  )
}

export default ModalButtonOne
