import { useRecoilState } from 'recoil'
import { selectedValueState } from '@/_atom/button'
import Image from 'next/image'

interface SelectedButtonProps {
  buttonText: string
  buttonType: 'gender' | 'keyword' | 'major' | 'mood'
}

interface ButtonStyles {
  button: string
  span: string
  icon?: {
    width: string
    height: string
  }
}

const getButtonStyles = (
  buttonType: 'gender' | 'keyword' | 'major' | 'mood',
  isSelected: boolean,
): ButtonStyles => {
  switch (buttonType) {
    case 'gender':
      return {
        button: isSelected
          ? 'bg-gray-700 rounded-md p-2'
          : 'bg-gray-400 hover:bg-gray-700 rounded-md p-2',
        span: 'text-black',
        icon: {
          width: '16px',
          height: '16px',
        },
      }
    case 'keyword':
      return {
        button: isSelected
          ? 'bg-gray-700 rounded-md p-2'
          : 'bg-gray-400 hover:bg-gray-700 rounded-md p-2',
        span: 'text-black',
        icon: {
          width: '16px',
          height: '16px',
        },
      }
    case 'major':
      return {
        button: isSelected
          ? 'bg-gray-700 rounded-md p-2'
          : 'bg-gray-400 hover:bg-gray-700 rounded-md p-2',
        span: 'text-black',
        icon: {
          width: '16px',
          height: '16px',
        },
      }
    case 'mood':
      return {
        button: isSelected
          ? 'bg-gray-700 rounded-md p-2'
          : 'bg-gray-400 hover:bg-gray-700 rounded-md p-2',
        span: 'text-black',
        icon: {
          width: '16px',
          height: '16px',
        },
      }
    default:
      return {
        button: 'bg-gray-300 rounded-md p-2',
        span: 'text-black-500',
      }
  }
}

const SelectedButton = ({ buttonText, buttonType }: SelectedButtonProps) => {
  const [isSelected, setSelected] = useRecoilState(selectedValueState)

  const handleButtonClick = () => {
    setSelected(!isSelected)
  }

  const buttonStyles = getButtonStyles(buttonType, isSelected)

  return (
    <button
      type="button"
      className={buttonStyles.button}
      onClick={handleButtonClick}
    >
      {buttonType === 'gender' && buttonStyles.icon && (
        <div className="relative inline-block">
          <Image
            src={
              isSelected
                ? '/images/icons/selected.svg'
                : '/images/icons/unselected.svg'
            }
            alt={buttonText}
            width={parseInt(buttonStyles.icon.width, 10)}
            height={parseInt(buttonStyles.icon.height, 10)}
          />
        </div>
      )}
      <span className={buttonStyles.span}>{buttonText}</span>
    </button>
  )
}

export default SelectedButton
