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
  bgColor = 'bg-soft-blue-900',
  textColor = 'text-white',
  width = 'w-16',
  height = 'h-12',
  disabled = false,
  className = '',
}: ButtonProps) {
  return (
    <button
      className={`${
        disabled ? 'bg-[#6b7280] cursor-not-allowed' : `${bgColor} cursor-pointer`
      } ${textColor} ${width} ${height} rounded-sm flex justify-center items-center gap-2 font-bold opacity-85 transition-all ease-in-out duration-150 hover:opacity-100 hover:rounded-xl ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
