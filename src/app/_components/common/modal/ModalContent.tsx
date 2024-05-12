import Image from 'next/image'
import inactiveFemale from 'public/illustration/female/modal/inactive.png'
import inactiveMale from 'public/illustration/male/modal/inactive.png'
import logoutFemale from 'public/illustration/female/modal/logout.png'
import logoutMale from 'public/illustration/male/modal/logout.png'
import ModalButtons from './ModalButtons'

interface ModalContentProps {
  subject: ModalContent
  onMyPage?: boolean
  onConfirm: () => void
  onCancel: () => void
  gender?: string
}

const ModalContent = ({
  subject,
  onConfirm,
  onCancel,
  onMyPage,
  gender,
}: ModalContentProps) => {
  const { TITLE, SUB_TITLE, CONFIRM, CANCEL } = subject
  const inactive = gender === 'MALE' ? inactiveMale : inactiveFemale
  const logout = gender === 'MALE' ? logoutMale : logoutFemale
  return (
    <section className="w-full h-full flex flex-col justify-center items-center gap-6">
      <div>
        <h1 className="text-[#333] text-[18px] font-bold ">{TITLE}</h1>
        <h5 className="text-[#999] w-full text-center text-xs">
          {SUB_TITLE || ''}
        </h5>
      </div>
      {/* 나중에 dynamic으로 가져오기?, 크기 조정 */}
      {onMyPage ? (
        <Image
          src={logout}
          alt="logout"
          className="w-[197px] h-[227px] -mt-5"
        />
      ) : (
        <Image src={inactive} alt="inactive" className="w-[187px] h-[192px]" />
      )}
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
