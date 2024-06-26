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
    <section className=" w-full h-full flex flex-col justify-center items-center gap-[10px]">
      <div className="text-center">
        <h1 className="text-darkgray text-[18px] font-bold ">{TITLE}</h1>
        <h1 className="text-darkgray -mt-0.5 text-[18px] font-bold ">
          {TITLE2}
        </h1>
        <h5 className="text-secondary text-[12px]">{SUB_TITLE}</h5>
        <h5 className="text-secondary text-[12px]">{SUB_TITLE2}</h5>
      </div>
      <Image src={yetMatch} alt="yetMatch" className="w-[230px] h-[223px]" />
      <ModalButtonOne onClose={onClose} closeText={CLOSE} />
    </section>
  )
}

export default ModalContentOne
