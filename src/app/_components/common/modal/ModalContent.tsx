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
    <section className=" w-full h-full flex flex-col justify-center items-center gap-[40px]">
      <div>
        <h1 className="text-[#333] text-[18px] font-bold ">{TITLE}</h1>
        <h5 className="text-[#999] w-full text-center text-xs">
          {SUB_TITLE || ''}
        </h5>
      </div>
      <div className="w-[169px] h-[193px] bg-neutral-300">
        {/* 나중에 dynamic으로 가져오기?, 크기 조정 */}
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