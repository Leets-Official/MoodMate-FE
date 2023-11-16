import { MouseEvent } from 'react'
import { inputValueState } from '@/_atom/input'
import { useRecoilValue } from 'recoil'

interface NormalButtonProps {
  buttonText: string
  onClick: () => void
  buttonType: 'large' | 'small'
  className: string
  isDisabled?: boolean
}

const getButtonStyles = (buttonType: 'large' | 'small', isEnabled: boolean) => {
  const baseStyles = isEnabled ? 'bg-orange-500' : 'bg-gray-400'
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
  isDisabled,
}: NormalButtonProps) => {
  const inputValue = useRecoilValue(inputValueState)
  const isButtonDisabled =
    isDisabled !== undefined ? isDisabled : inputValue === null

  const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (onClick && !isButtonDisabled) {
      onClick()
    }
  }

  const buttonStyles = getButtonStyles(buttonType, !isButtonDisabled)

  return (
    <button
      type="button"
      className={`${buttonStyles.button} ${className}`}
      onClick={handleButtonClick}
      disabled={isButtonDisabled}
    >
      {buttonText}
    </button>
  )
}

export default NormalButton
