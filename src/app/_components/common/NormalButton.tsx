import { MouseEvent } from 'react'
import { inputValueState } from '@/_atom/input'
import { useRecoilValue, useRecoilCallback } from 'recoil'

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
        button: 'w-full h-full bg-gray-400',
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

  // 버튼 비동기 작업을 위해 비동기로 처리
  const handleButtonClick = useRecoilCallback(
    () => async (event: MouseEvent<HTMLButtonElement>) => {
      if (onClick && !isButtonDisabled) {
        onClick()
      }
    },
  )

  const buttonStyles = getButtonStyles(buttonType, !isButtonDisabled)

  return (
    <button
      type="button"
<<<<<<< HEAD
      className={`${buttonStyles.button} ${className}`}
=======
      className={`w-full h-full ${buttonStyles.button} ${className}`}
>>>>>>> develop
      onClick={handleButtonClick}
      disabled={isButtonDisabled}
    >
      {buttonText}
    </button>
  )
}

export default NormalButton
