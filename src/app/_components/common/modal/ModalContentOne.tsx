import ModalButtonOne from './ModatlButtonOne'
import Image from 'next/image'
import yetMatch from 'public/illustration/female/modal/yetmatch.png'

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
      <Image src={yetMatch} alt="yetMatch" className="w-[155px] h-[193px]" />
      <ModalButtonOne onClose={onClose} closeText={CLOSE} />
    </section>
  )
}

export default ModalContentOne
