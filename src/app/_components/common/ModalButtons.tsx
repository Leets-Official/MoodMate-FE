import NormalButton from './NormalButton'

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
  return (
    <div className="flex flex-row w-full gap-2">
      <NormalButton
        buttonText={cancelText}
        buttonType="small"
        className="rounded-lg"
        color=""
        onClick={onCancel}
        isActive
      />
      <NormalButton
        buttonText={confirmText}
        buttonType="small"
        className="rounded-lg"
        color=""
        onClick={onConfirm}
        isActive
      />
    </div>
  )
}

export default ModalButtons
