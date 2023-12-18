'use client'

interface NormalButtonProps {
  buttonText: string
  onClick: () => void
  buttonType: 'large' | 'small'
  className: string
  isActive: boolean
}

const getButtonStyles = (buttonType: 'large' | 'small', className: string) => {
  switch (buttonType) {
    case 'large':
      return {
        button: `w-[312px] h-[48px] ${className}`,
      }
    case 'small':
      return {
        button: `w-[96px] h-[36px] ${className}`,
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
}: NormalButtonProps) => {
  const buttonStyles = getButtonStyles(buttonType, className)

  return (
    <button
      type="button"
      className={`${buttonStyles.button}`}
      onClick={onClick}
      disabled={!isActive}
    >
      {buttonText}
    </button>
  )
}

export default NormalButton
