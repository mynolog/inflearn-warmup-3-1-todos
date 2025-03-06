'use client'

import type { ChangeEvent } from 'react'
import Image from 'next/image'
import Todo from '@/components/todos/Todo'
import Button from '@/components/ui/button/Button'
import Input from '@/components/ui/input/Input'
import { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createTodo, getTodos } from '@/actions/todo-actions'
import Spinner from '@/components/ui/spinner/Spinner'
import Skeleton from '@/components/ui/skeleton/Skeleton'
import Logo from '@/components/ui/logo/Logo'
import { getCurrentDate } from '@/utils/\bformat/format'
import muyaho from '../assets/images/muyaho.webp'
import noSearchResult from '../assets/images/no-search-result.jpeg'

export default function UI() {
  const [searchInput, setSearchInput] = useState('')
  const [debouncedSearchInput, setDebouncedSearchInput] = useState('')
  const currentDate = getCurrentDate()

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
        title: `새로운 목표`,
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
      <Logo />

      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-full flex justify-center items-center gap-2">
          <p className="my-3 text-xl">{currentDate.date}</p>
          <p
            className={`my-3 text-xl ${
              currentDate.dayOfWeek === '일요일' ? 'text-red-400' : 'text-black'
            }`}
          >
            {currentDate.dayOfWeek}
          </p>
        </div>
        <p className="my-3 text-sm text-mint-700">{currentDate.message}</p>
      </div>

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
        <span>목표 추가</span>
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
        <div className="w-full flex flex-col items-center gap-2">
          <div className="w-full flex flex-col items-center gap-4 transition-all duration-300 ease-in-out animate-slideUp font-bold text-lg">
            <span>🧐 무야호~ 오늘의 목표를 모두 달성하셨군요! 새로운 목표가 있나요?</span>
            <Image src={muyaho} alt="무야호" width="220" className="rounded-xl shadow-xl" />
          </div>
        </div>
      )}

      {/* 검색어가 있고, 검색 결과가 없을 때 */}
      {filteredTodos && filteredTodos.length === 0 && searchInput !== '' && (
        <div className="w-full flex flex-col items-center gap-2">
          <div className="w-full flex flex-col items-center gap-4 transition-all duration-300 ease-in-out animate-slideUp font-bold text-lg">
            <span>💦 결과를 찾지 못했어요! 다른 키워드로 시도해 볼까요?</span>
            <Image src={noSearchResult} alt="없어요" width="220" className="rounded-xl shadow-xl" />
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
