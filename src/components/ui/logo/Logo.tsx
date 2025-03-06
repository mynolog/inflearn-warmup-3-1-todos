'use client'

import { Righteous } from 'next/font/google'

const righteous = Righteous({
  weight: '400',
  subsets: ['latin'],
})

type LogoProps = {
  textColor?: string
  fontSize?: 'text-3xl' | 'text-5xl'
  className?: string
}

export default function Logo({
  textColor = 'text-soft-blue-900',
  fontSize = 'text-5xl',
  className = '',
}: LogoProps) {
  return (
    <div className={`${righteous.className} flex justify-center items-center ${className}`}>
      <span className={`${textColor} ${fontSize}`}>next todo.</span>
    </div>
  )
}
