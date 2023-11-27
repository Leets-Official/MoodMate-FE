import Image from 'next/image'
import { BUTTON_TYPE, BUTTON_STYLE } from '@/_constants'

interface SelectedButtonProps {
  buttonText: string
  buttonType: keyof typeof BUTTON_TYPE
  isActive: boolean
  color: string
  onClick: () => void
  imgSrc?: string
  imgSize?: string
}

const SelectedButton = ({
  buttonText,
  buttonType = 'DEFAULT',
  isActive,
  color,
  onClick,
  imgSrc,
  imgSize,
}: SelectedButtonProps) => {
  const buttonStyles = BUTTON_STYLE[buttonType](color)

  return (
    <button
      type="button"
      className={buttonStyles}
      onClick={onClick}
      disabled={!isActive}
    >
      {imgSrc && <Image src={imgSrc} alt="" className={imgSize} />}
      {buttonText}
    </button>
  )
}

export default SelectedButton
