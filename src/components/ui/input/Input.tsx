import type { ChangeEvent } from 'react'

type InputProps = {
  type: 'text'
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  name?: string
  placeholder?: string
  className?: string
}

export default function Input({ type, placeholder, value, name, onChange, className }: InputProps) {
  return (
    <input
      className={`px-3 py-2 border-2 border-dim-gray-600 focus:border-2 focus:border-steel-blue-600 focus:outline-none rounded-sm transition-colors duration-3 00 ease-linear ${className}`}
      type={type}
      value={value}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
    />
  )
}
