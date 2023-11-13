import { MouseEvent } from 'react'
import { useRecoilState } from 'recoil'
import { inputValueState } from '@/_atom/input'

interface NormalButtonProps {
  buttonText: string
  onClick: () => void
  buttonType: 'next' | 'yes' | 'no'
}

const getButtonStyles = (
  buttonType: 'next' | 'yes' | 'no',
  inputValue: string | null,
) => {
  switch (buttonType) {
    case 'next':
      return {
        button: inputValue
          ? 'bg-orange-500 hover:bg-orange-700 rounded-md p-2'
          : 'bg-gray-300',
        span: 'text-white',
      }
    case 'yes':
      return {
        button: inputValue
          ? 'bg-orange-500 hover:bg-orange-700 rounded-md p-2'
          : 'bg-gray-300',
        span: 'text-white',
      }
    case 'no':
      return {
        button: inputValue
          ? 'bg-orange-500 hover:bg-orange-700 rounded-md p-2'
          : 'bg-gray-300',
        span: 'text-white',
      }
    default:
      return {
        button: 'bg-gray-300 rounded-md p-2',
        span: 'text-white-500',
      }
  }
}

const NormalButton = ({
  onClick,
  buttonText,
  buttonType,
}: NormalButtonProps) => {
  const [inputValue] = useRecoilState(inputValueState)

  const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (onClick && inputValue) {
      onClick()
    }
  }

  const buttonStyles = getButtonStyles(buttonType, inputValue)

  return (
    <button
      type="button"
      className={`w-full h-full ${buttonStyles.button} ${buttonStyles.span}`}
      onClick={handleButtonClick}
      disabled={!inputValue}
    >
      {buttonText}
    </button>
  )
}

export default NormalButton
