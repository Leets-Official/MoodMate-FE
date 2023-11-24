'use client'

import { MouseEvent } from 'react'

interface NormalButtonProps {
  buttonText: string
  onClick: () => void
  buttonType: 'large' | 'small'
  className: string
  isActive: boolean
  color: string
}

const getButtonStyles = (buttonType: 'large' | 'small', color: string) => {
  const baseStyles = `bg-${color}`
  switch (buttonType) {
    case 'large':
      return {
        button: `w-[312px] h-[48px] ${baseStyles}`,
      }
    case 'small':
      return {
        button: `w-[96px] h-[36px] ${baseStyles}`,
      }
    default:
      return {
        button: 'w-full h-full',
      }
  }
}

const NormalButton = ({
  onClick,
  buttonText,
  buttonType,
  className,
  isActive,
  color,
}: NormalButtonProps) => {
  const buttonStyles = getButtonStyles(buttonType, color)

  return (
    <button
      type="button"
      className={`${buttonStyles.button} ${className}`}
      onClick={onClick}
      disabled={!isActive}
    >
      {buttonText}
    </button>
  )
}

export default NormalButton
