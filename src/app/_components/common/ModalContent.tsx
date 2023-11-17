import ModalButtons from './ModalButtons'

interface ModalContentProps {
  subject: ModalContent
  onMyPage?: boolean
  onConfirm: () => void
  onCancel: () => void
}

const ModalContent = ({
  subject,
  onConfirm,
  onCancel,
  onMyPage,
}: ModalContentProps) => {
  const { TITLE, SUB_TITLE, CONFIRM, CANCEL } = subject

  return (
    <section className=" w-full h-full">
      <div>
        <h1>{TITLE}</h1>
        <h5>{SUB_TITLE || ''}</h5>
      </div>
      <div>
        {/* 나중에 dynamic으로 가져오기? */}
        {onMyPage ? <p>씩씩한 무디 이미지</p> : <p>울고있는 무디 이미지</p>}
      </div>
      <ModalButtons
        onConfirm={onConfirm}
        onCancel={onCancel}
        confirmText={CONFIRM}
        cancelText={CANCEL}
      />
    </section>
  )
}

export default ModalContent
