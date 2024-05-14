'use client'

import { RefObject } from 'react'

interface InputProps {
  sort: string
  textValue: string
  placeholder: string
  ref?: RefObject<HTMLInputElement>
  onFocus?: () => void
  onClick?: () => void
  onEnterPress?: () => void
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className: string
}

const getInputSort = (sort: string) => {
  switch (sort) {
    case 'info':
      return {
        input: 'w-[141px] h-[28px]',
      }
    case 'chat':
      return {
        input: 'w-[88%] h-[45px] pr-[45px]',
      }
    default:
      return {
        input: 'w-full h-full',
      }
  }
}

const Input = ({
  sort = 'default',
  textValue,
  placeholder,
  ref,
  onFocus,
  onClick,
  onEnterPress,
  onChange,
  className,
}: InputProps) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onEnterPress) {
      onEnterPress()
    }
  }

  return (
    <input
      ref={ref}
      value={textValue}
      placeholder={placeholder}
      onFocus={onFocus}
      onClick={onClick}
      onKeyPress={handleKeyPress}
      onChange={onChange}
      className={`${className} ${getInputSort(sort).input}`}
    />
  )
}

export default Input
