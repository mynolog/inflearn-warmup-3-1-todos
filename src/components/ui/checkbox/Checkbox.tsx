import type { ChangeEvent } from 'react'

const Checkbox = ({
  checked,
  onChange,
}: {
  checked: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer ">
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only " />
      <span
        className={`w-5 h-5 rounded-sm flex items-center justify-center border-2 transition-all hover:rounded-lg duration-50 ease-linear
            ${checked ? 'bg-soft-blue-900 border-soft-blue-900' : 'bg-white border-soft-blue-900'}
            `}
      >
        {checked && <i className="fas fa-check text-white text-xs"></i>}
      </span>
    </label>
  )
}

export default Checkbox
