'use client'

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
  imgClassName?: string
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
  imgClassName,
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
        <div className={`${imgClassName} flex justify-center items-center`}>
          <Image src={imgSrc} alt="" width={imgSizeW} height={imgSizeH} />
        </div>
      )}
      {textLines.map((text) => (
        <div key={text + 1} className="leading-none mb-1">
          {text}
        </div>
      ))}
    </button>
  )
}

export default SelectedButton
