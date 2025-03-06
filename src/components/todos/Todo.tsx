'use client'

import type { ChangeEvent } from 'react'
import { useState } from 'react'
import Button from '../ui/button/Button'
import Checkbox from '../ui/checkbox/Checkbox'
import Input from '../ui/input/Input'
import { useMutation } from '@tanstack/react-query'
import { deleteTodo, TodoRow, updateTodo } from '@/actions/todo-actions'
import { queryClient } from '@/providers/ReactQueryClientProvider'
import Spinner from '../ui/spinner/Spinner'

type TodoProps = {
  todo: TodoRow
}

export default function Todo({ todo }: TodoProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [completed, setCompleted] = useState(todo.completed)
  const [title, setTitle] = useState(todo.title)

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

  const handleUpdateCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target
    setCompleted(checked)
    updateTodoMutation.mutate()
  }

  const handleUpdateTitle = () => {
    updateTodoMutation.mutate()
  }

  const handleDeleteTodo = () => {
    deleteTodoMutation.mutate()
  }

  return (
    <div className="w-full flex items-center gap-2">
      <Checkbox checked={completed} onChange={handleUpdateCheckbox} />
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
        <Button width="w-12" height="h-10" onClick={handleUpdateTitle}>
          {updateTodoMutation.isPending ? <Spinner /> : <i className="fas fa-check"></i>}
        </Button>
      ) : (
        <Button width="w-12" height="h-10" onClick={() => setIsEditing(true)}>
          <i className="fas fa-pen"></i>
        </Button>
      )}
      <Button width="w-12" height="h-10" onClick={handleDeleteTodo}>
        {deleteTodoMutation.isPending ? <Spinner /> : <i className="fas fa-trash"></i>}
      </Button>
    </div>
  )
}
