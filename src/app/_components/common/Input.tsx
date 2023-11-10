import React from 'react'

interface InputProps {
  textValue: string
  placeholder: string
  onFocus: () => void
  onClick: () => void
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className: string
  onSubmit: () => void
}

const Input = ({
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
          className={className}
        />
      </form>
    </section>
  )
}

export default Input
