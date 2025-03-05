'use client'

import { useState } from 'react'
import Button from '../ui/button/Button'
import Checkbox from '../ui/checkbox/Checkbox'
import Input from '../ui/input/Input'

// type TodoProps = {
//   id: string
//   value: string
//   completed: boolean
// }

export default function Todo({}) {
  const [isEditing, setIsEditing] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [title, setTitle] = useState<string>('')

  return (
    <div className="w-full flex items-center gap-2">
      <Checkbox checked={completed} onChange={(e) => setCompleted(e.target.checked)} />
      {isEditing ? (
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full flex-1 border-b-black border-b-2 border-t-0 border-l-0 border-r-0 focus:border-t-0 focus:border-l-0 focus:border-r-0"
        />
      ) : (
        <p className={`flex-1 ${completed ? 'line-through' : ''}`}>{title}</p>
      )}

      {isEditing ? (
        <Button width="w-12" height="h-10" onClick={() => setIsEditing(false)}>
          <i className="fas fa-check"></i>
        </Button>
      ) : (
        <Button width="w-12" height="h-10" onClick={() => setIsEditing(true)}>
          <i className="fas fa-pen"></i>
        </Button>
      )}
      <Button width="w-12" height="h-10">
        <i className="fas fa-trash"></i>
      </Button>
    </div>
  )
}
