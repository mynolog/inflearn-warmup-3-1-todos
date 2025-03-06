'use client'

import type { ChangeEvent } from 'react'
import Todo from '@/components/todos/Todo'
import Button from '@/components/ui/button/Button'
import Input from '@/components/ui/input/Input'
import { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createTodo, getTodos } from '@/actions/todo-actions'
import Spinner from '@/components/ui/spinner/Spinner'
import Skeleton from '@/components/ui/skeleton/Skeleton'

export default function UI() {
  const [searchInput, setSearchInput] = useState('')
  const [debouncedSearchInput, setDebouncedSearchInput] = useState('')

  // 검색어 입력 디바운스
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchInput(searchInput)
    }, 600)

    return () => clearTimeout(timer)
  }, [searchInput])

  const todosQuery = useQuery({
    queryKey: ['todos'],
    queryFn: () => getTodos(),
  })

  const createTodoMutation = useMutation({
    mutationFn: () =>
      createTodo({
        title: `새로운 할 일`,
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

  const filteredTodos = todosQuery.data?.filter((todo) =>
    todo.title.toLowerCase().includes(debouncedSearchInput.toLowerCase())
  )

  return (
    <div className="max-w-[768px] w-2/3 mx-auto flex flex-col items-center gap-3 py-10">
      <h2 className="text-2xl font-bold text-soft-blue-900">Next Todos</h2>

      <div className="relative w-full flex gap-1">
        <Input
          type="text"
          placeholder="키워드를 입력하세요"
          className="w-full"
          value={searchInput}
          onChange={handleChangeSearchInput}
        />

        <i className="absolute right-3 top-4 text-gray-400 fa-solid fa-magnifying-glass"></i>
      </div>

      <Button
        width="w-36"
        onClick={createTodoMutation.mutate}
        disabled={createTodoMutation.isPending}
        className="my-5"
      >
        {createTodoMutation.isPending ? <Spinner /> : <i className="fas fa-plus"></i>}
        <span>ADD TODO</span>
      </Button>
      {/* 초기 렌더링 시, 스켈레톤 UI 렌더링 */}
      {todosQuery.isLoading && (
        <div className="w-full flex flex-col gap-2">
          {Array(5)
            .fill(null)
            .map((_, index) => (
              <Skeleton key={index + 'skeleton'} />
            ))}
        </div>
      )}
      {/* 초기 렌더링 시, 검색어 없이 데이터가 없을 때 */}
      {todosQuery.isSuccess && todosQuery.data.length === 0 && searchInput === '' && (
        <div className="w-full flex flex-col gap-2">
          <div className="transition-all duration-300 ease-in-out animate-slideUp font-bold text-lg">
            🥲 할 일이 없습니다. 새로운 할 일을 추가해 보세요.
          </div>
        </div>
      )}

      {/* 검색어가 있고, 검색 결과가 없을 때 */}
      {filteredTodos && filteredTodos.length === 0 && searchInput !== '' && (
        <div className="w-full flex flex-col gap-2">
          <div className="transition-all duration-300 ease-in-out animate-slideUp font-bold text-lg">
            🥲 검색 결과가 없습니다. 다른 검색어를 입력해보세요.
          </div>
        </div>
      )}
      {/* 검색어의 검색 결과가 존재하거나 Todos가 존재할 때 */}
      {filteredTodos && filteredTodos.length > 0 && (
        <div className="w-full flex flex-col gap-2">
          {filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className="transition-all duration-300 ease-in-out animate-slideDown"
            >
              <Todo todo={todo} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
