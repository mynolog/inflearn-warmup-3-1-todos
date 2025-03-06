import type { ChangeEvent } from 'react'
import { forwardRef } from 'react'

type InputProps = {
  type: 'text'
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  name?: string
  placeholder?: string
  className?: string
}

const ForwardedInput = forwardRef<HTMLInputElement, InputProps>(
  ({ type, placeholder, value, name, onChange, className }, ref) => {
    return (
      <input
        ref={ref}
        className={`px-3 py-2 border-2 border-dim-gray-600 focus:border-2 focus:border-steel-blue-600 focus:outline-none rounded-sm transition-colors duration-300 ease-linear ${className}`}
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
      />
    )
  }
)

export default ForwardedInput
