'use client'

import type { ChangeEvent } from 'react'
import { useEffect, useRef, useState } from 'react'
import Button from '../ui/button/Button'
import Checkbox from '../ui/checkbox/Checkbox'
import { useMutation } from '@tanstack/react-query'
import { deleteTodo, TodoRow, updateTodo } from '@/actions/todo-actions'
import { queryClient } from '@/providers/ReactQueryClientProvider'
import Spinner from '../ui/spinner/Spinner'
import { getLocalTime } from '@/utils/\bformat/format'
import ForwardedInput from '../ui/input/ForwardedInput'

type TodoProps = {
  todo: TodoRow
}

type ValidationErorr = {
  message: string
  hasError: boolean
}

export default function Todo({ todo }: TodoProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [completed, setCompleted] = useState(todo.completed)
  const [title, setTitle] = useState(todo.title)
  const [validateError, setValidateError] = useState<ValidationErorr>({
    message: '',
    hasError: false,
  })
  const titleRef = useRef<HTMLInputElement | null>(null)
  const localTimeCreateAt = getLocalTime(todo.created_at)

  useEffect(() => {
    if (isEditing && titleRef.current) {
      titleRef.current.focus()
    }
  }, [isEditing])

  const updateTodoMutation = useMutation({
    mutationFn: () =>
      updateTodo({
        id: todo.id,
        title,
        completed,
      }),
    onSuccess: () => {
      setIsEditing(false)
      queryClient.invalidateQueries({
        queryKey: ['todos'],
      })
    },
  })

  const deleteTodoMutation = useMutation({
    mutationFn: () => deleteTodo(todo.id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todos'],
      })
    },
  })

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setValidateError({
      message: '',
      hasError: false,
    })
    const { value } = e.target
    setTitle(value)
  }

  const handleUpdateCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target
    setCompleted(checked)
    updateTodoMutation.mutate()
  }

  const handleUpdateTitle = () => {
    if (title === '' || title.trim() === '') {
      setValidateError({
        message: '할 일을 입력해주세요.',
        hasError: true,
      })
      return
    }
    updateTodoMutation.mutate()
  }

  const handleDeleteTodo = () => {
    deleteTodoMutation.mutate()
  }

  const handleActivateEditMode = () => {
    setIsEditing(true)
  }

  return (
    <div className="w-full flex items-center gap-2">
      <Checkbox checked={completed} onChange={handleUpdateCheckbox} />
      {isEditing ? (
        <div className="w-full flex-1 relative">
          <ForwardedInput
            ref={titleRef}
            type="text"
            value={title}
            onChange={handleChangeTitle}
            className={`w-full flex-1 border-b-black border-b-2 border-t-0 border-l-0 border-r-0 focus:border-t-0 focus:border-l-0 focus:border-r-0 ${
              validateError.hasError && 'border-b-red-400 animate-shake'
            } px-0`}
          />
          {validateError.hasError && (
            <p className="absolute text-red-400 font-semibold text-xs animate-shake">
              {validateError.message}
            </p>
          )}
        </div>
      ) : (
        <p className={`flex-1 ${completed ? 'line-through' : ''}`}>{title}</p>
      )}

      <div className="text-xs font-semibold text-gray-500 flex items-center gap-2">
        {todo.updated_at && <i className="fa fa-clock"></i>}
        <span>{localTimeCreateAt}</span>
      </div>

      {isEditing ? (
        <Button width="w-12" height="h-10" onClick={handleUpdateTitle}>
          {updateTodoMutation.isPending ? <Spinner /> : <i className="fas fa-check"></i>}
        </Button>
      ) : (
        <Button width="w-12" height="h-10" onClick={handleActivateEditMode}>
          <i className="fas fa-pen"></i>
        </Button>
      )}
      <Button width="w-12" height="h-10" onClick={handleDeleteTodo}>
        {deleteTodoMutation.isPending ? <Spinner /> : <i className="fas fa-trash"></i>}
      </Button>
    </div>
  )
}
