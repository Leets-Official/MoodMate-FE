import Image from 'next/image'

interface SelectedButtonProps {
  buttonText: string
  buttonType: 'gender' | 'keyword' | 'major' | 'mood'
  isActive: boolean
  color: string
  onClick: () => void
  imgSrc: string
  imgSize?: string
}

interface ButtonStyles {
  buttontype: string
  color: string
}

const getButtonStyles = ({ buttontype, color }: ButtonStyles) => {
  const baseStyles = `bg-${color}-500`
  switch (buttontype) {
    case 'gender':
      return {
        button: `w-[148px] h-[166px] ${baseStyles}`,
      }
    case 'keyword':
      return {
        button: `${baseStyles}`,
      }
    case 'mood':
      return {
        button: `w-[148px] h-[166px] ${baseStyles}`,
      }
    default:
      return {
        button: 'w-full h-full',
      }
  }
}

const SelectedButton = ({
  buttonText,
  buttonType,
  isActive,
  color,
  onClick,
  imgSrc,
  imgSize,
}: SelectedButtonProps) => {
  const handleButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (onClick && !isActive) {
      onClick()
    }
  }

  const buttonStyles = getButtonStyles({ buttontype: buttonType, color })

  return (
    <button
      type="button"
      className={buttonStyles.button}
      onClick={handleButtonClick}
      disabled={!isActive}
    >
      {(buttonType === 'gender' || buttonType === 'mood') && (
        <Image src={imgSrc} alt="" className={imgSize} />
      )}
      {buttonText}
    </button>
  )
}

export default SelectedButton
