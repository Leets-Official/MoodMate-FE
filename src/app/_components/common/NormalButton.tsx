import { MouseEvent } from 'react'
import { inputValueState } from '@/_atom/input'
import { useRecoilValue, useRecoilCallback } from 'recoil'

interface NormalButtonProps {
  buttonText: string
  onClick: () => void
  buttonType: 'large' | 'small'
  className: string
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
}: NormalButtonProps) => {
  const inputValue = useRecoilValue(inputValueState)
  const isButtonDisabled = inputValue === null

  const handleButtonClick = useRecoilCallback(
    ({ snapshot }) =>
      async (event: MouseEvent<HTMLButtonElement>) => {
        const inputValueSnapshot = snapshot.getLoadable(inputValueState)
        if (
          onClick &&
          !isButtonDisabled &&
          inputValueSnapshot.state === 'hasValue' &&
          inputValueSnapshot.contents !== null
        ) {
          onClick()
        }
      },
  )

  const buttonStyles = getButtonStyles(buttonType, !isButtonDisabled)

  return (
    <button
      type="button"
      className={`w-full h-full ${buttonStyles.button} ${className}`}
      onClick={handleButtonClick}
      disabled={isButtonDisabled}
    >
      {buttonText}
    </button>
  )
}

export default NormalButton
