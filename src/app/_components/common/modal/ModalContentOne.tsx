import Image from 'next/image'
import yetMatchFemale from 'public/illustration/female/modal/yetmatch.png'
import yetMatchMale from 'public/illustration/male/modal/yetmatch.png'
import ModalButtonOne from './ModatlButtonOne'

interface ModalContentOneProps {
  subject: ModalContentOne
  onClose: () => void
  gender: string
}

const ModalContentOne = ({
  subject,
  onClose,
  gender,
}: ModalContentOneProps) => {
  const { TITLE, SUB_TITLE, TITLE2, SUB_TITLE2, CLOSE } = subject
  const yetMatch = gender === 'MALE' ? yetMatchMale : yetMatchFemale
  return (
    <section className=" w-full h-full flex flex-col justify-center items-center gap-[40px]">
      <div>
        <h1 className="text-[#333] text-[18px] font-bold ">{TITLE}</h1>
        <h1 className="text-[#333] text-[18px] font-bold ">{TITLE2}</h1>
        <h5 className="text-[#999] w-full text-center text-xs">{SUB_TITLE}</h5>
        <h5 className="text-[#999] w-full text-center text-xs">{SUB_TITLE2}</h5>
      </div>
      <Image src={yetMatch} alt="yetMatch" className="w-[155px] h-[193px]" />
      <ModalButtonOne onClose={onClose} closeText={CLOSE} />
    </section>
  )
}

export default ModalContentOne
