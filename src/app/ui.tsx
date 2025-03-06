'use client'

import type { ChangeEvent } from 'react'
import Todo from '@/components/todos/Todo'
import Button from '@/components/ui/button/Button'
import Input from '@/components/ui/input/Input'
import { useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createTodo, getTodos } from '@/actions/todo-actions'
import Spinner from '@/components/ui/spinner/Spinner'
import Skeleton from '@/components/ui/skeleton/Skeleton'

export default function UI() {
  const [searchInput, setSearchInput] = useState('')

  const todosQuery = useQuery({
    queryKey: ['todos'],
    queryFn: () => getTodos({ searchInput }),
  })

  const createTodoMutation = useMutation({
    mutationFn: () =>
      createTodo({
        title: '새로운 할 일',
        completed: false,
        created_at: new Date().toISOString(),
      }),
    onSuccess: () => {
      todosQuery.refetch()
    },
  })

  const handleChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (value.length === 1 && value.trim() === '') {
      return
    }
    setSearchInput(value)
  }

  return (
    <div className="w-2/3 mx-auto flex flex-col items-center gap-3 py-10">
      <h2 className="text-xl font-bold">Next Todos</h2>

      <div className="w-full flex gap-1">
        <Input
          type="text"
          placeholder="키워드를 입력하세요"
          className="w-full"
          value={searchInput}
          onChange={handleChangeSearchInput}
        />
        <Button>
          <i className="fa-solid fa-magnifying-glass"></i>
        </Button>
      </div>

      <Button
        width="w-36"
        onClick={createTodoMutation.mutate}
        disabled={createTodoMutation.isPending}
      >
        {createTodoMutation.isPending ? <Spinner /> : <i className="fas fa-plus"></i>}
        <span>ADD TODO</span>
      </Button>

      {todosQuery.isPending &&
        Array(17)
          .fill(null)
          .map((_, index) => <Skeleton key={index + 'qwer'} />)}
      {todosQuery.data && todosQuery.data.map((todo) => <Todo key={todo.id} todo={todo} />)}
    </div>
  )
}
