import ModalButtonOne from './ModatlButtonOne'

interface ModalContentOneProps {
  subject: ModalContentOne
  onMyPage?: boolean
  onClose: () => void
}

const ModalContentOne = ({
  subject,
  onClose,
  onMyPage,
}: ModalContentOneProps) => {
  const { TITLE, SUB_TITLE, CLOSE } = subject

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
      <ModalButtonOne onClose={onClose} closeText={CLOSE} />
    </section>
  )
}

export default ModalContentOne
