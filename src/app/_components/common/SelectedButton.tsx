import Image from 'next/image'
import { BUTTON_TYPE, BUTTON_STYLE } from '@/_constants'

interface SelectedButtonProps {
  buttonText: string
  buttonType: keyof typeof BUTTON_TYPE
  isActive: boolean
  className: string
  onClick: () => void
  imgSrc?: string
  imgSize?: string
}

const SelectedButton = ({
  buttonText,
  buttonType = 'DEFAULT',
  isActive,
  className,
  onClick,
  imgSrc,
  imgSize,
}: SelectedButtonProps) => {
  const buttonStyles = BUTTON_STYLE[buttonType](className)
  const textLines = buttonText.split('\n')
  return (
    <button
      type="button"
      className={buttonStyles}
      onClick={onClick}
      disabled={!isActive}
    >
      {imgSrc && <Image src={imgSrc} alt="" className={imgSize} />}
      {textLines.map((text, index) => (
        // eslint-disable-next-line react/jsx-key
        <div key={index}>
          {index > 0 && <br />}
          {text}
        </div>
      ))}
    </button>
  )
}

export default SelectedButton
