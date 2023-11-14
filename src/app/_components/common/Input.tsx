'use-client'

import React from 'react'

interface InputProps {
  sort: string
  textValue: string
  placeholder: string
  onFocus?: () => void
  onClick?: () => void
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  className: string
}

const getInputSort = (sort: string) => {
  switch (sort) {
    case 'info':
      return {
        input: 'w-[312px] h-[39px]',
      }
    case 'chat':
      return {
        input: 'w-[312px] h-[45px]',
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
  onFocus,
  onClick,
  onChange,
  className,
}: InputProps) => {
  return (
    <input
      value={textValue}
      placeholder={placeholder}
      onFocus={onFocus}
      onClick={onClick}
      onChange={onChange}
      className={`${className} ${getInputSort(sort).input}`}
    />
  )
}

export default Input
