'use client'
import Link from 'next/link'

interface NormalButtonProps {
  buttonText: string
  onClick: () => void
  buttonType: 'large' | 'small'
  className: string
  isActive: boolean
  to?: string
  useLink?: boolean
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

// 'use client' and imports...

const NormalButton = ({
  onClick,
  buttonText,
  buttonType,
  className,
  isActive,
  to,
  useLink,
}: NormalButtonProps) => {
  const buttonStyles = getButtonStyles(buttonType, className)

  const ButtonComponent = (
    <button
      type="button"
      className={`${buttonStyles.button}`}
      onClick={useLink ? undefined : onClick}
      disabled={!isActive}
    >
      {buttonText}
    </button>
  )

  return useLink && to ? (
    <Link href={to}>{ButtonComponent}</Link>
  ) : (
    ButtonComponent
  )
}

export default NormalButton
