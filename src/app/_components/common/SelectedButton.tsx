import Image from 'next/image'
import { BUTTON_TYPE, BUTTON_STYLE } from '@/_constants'

interface SelectedButtonProps {
  buttonText: string
  buttonType: keyof typeof BUTTON_TYPE
  isActive: boolean
  className: string
  onClick: () => void
  imgSrc?: string
  imgSizeW?: number
  imgSizeH?: number
}

const SelectedButton = ({
  buttonText,
  buttonType = 'DEFAULT',
  isActive,
  className,
  onClick,
  imgSrc,
  imgSizeW,
  imgSizeH,
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
      {imgSrc && (
        <div className="flex justify-center items-center mb-1">
          <Image src={imgSrc} alt="" width={imgSizeW} height={imgSizeH} />
        </div>
      )}
      {textLines.map((text, index) => (
        // eslint-disable-next-line react/jsx-key
        <div>
          {index > 0 && <br />}
          {text}
        </div>
      ))}
    </button>
  )
}

export default SelectedButton
