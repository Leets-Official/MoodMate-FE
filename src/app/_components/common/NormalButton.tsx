import { MouseEvent } from 'react'
import { useRecoilState } from 'recoil'
import { inputValueState } from '@/_atom/input'

interface NormalButtonProps {
  buttonText: string
  onClick: () => void
}

const NormalButton = ({ onClick, buttonText }: NormalButtonProps) => {
  const inputValue = useRecoilState(inputValueState)

  const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick()
    }
  }

  return (
    <button
      type="button"
      className={`w-full h-full ${
        inputValue ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-300'
      } text-white font-bold py-2 px-4 rounded`}
      onClick={handleButtonClick}
    >
      {buttonText}
    </button>
  )
}

export default NormalButton
