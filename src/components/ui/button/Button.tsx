import { MouseEvent } from 'react'

export type ButtonProps = {
  children: React.ReactNode
  onClick?: (() => void) | ((e: MouseEvent<HTMLButtonElement>) => void)
  bgColor?: string
  textColor?: string
  width?: 'w-10' | 'w-12' | 'w-16' | 'w-28' | 'w-36' | 'w-44' | 'w-64'
  height?: 'h-8' | 'h-10' | 'h-12'
  disabled?: boolean
  className?: string
}

export default function Button({
  children,
  onClick = () => {},
  bgColor = 'black',
  textColor = 'text-white',
  width = 'w-16',
  height = 'h-12',
  disabled = false,
  className = '',
}: ButtonProps) {
  return (
    <button
      style={{
        backgroundColor: disabled ? '#6b7280' : bgColor,
      }}
      className={`${textColor} ${width} ${height} rounded-sm flex justify-center items-center gap-2 font-bold opacity-85 transition-all ease-in-out duration-300 hover:opacity-100 ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
