import React from 'react'

interface InputProps {
  sort: string
  textValue: string
  placeholder: string
  onFocus: () => void
  onClick: () => void
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className: string
  onSubmit: () => void
}

const inputSort = (sort: string) => {
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
  onSubmit,
}: InputProps) => {
  return (
    <section>
      <form onSubmit={onSubmit}>
        <input
          value={textValue}
          placeholder={placeholder}
          onFocus={onFocus}
          onClick={onClick}
          onChange={onChange}
          className={`${className} ${inputSort(sort).input}`}
        />
      </form>
    </section>
  )
}

export default Input
