import React, { FC, MouseEvent } from 'react'

interface NormalButtonProps {
  buttonText: string
  onClick?: () => void
}

const NormalButton: FC<NormalButtonProps> = ({ onClick, buttonText }) => {
  const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick()
    }
  }

  return (
    <button
      type="button"
      className="w-full h-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleButtonClick}
    >
      {buttonText}
    </button>
  )
}

NormalButton.defaultProps = {
  onClick: () => {},
}

export default NormalButton
