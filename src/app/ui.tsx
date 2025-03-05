'use client'

import Todo from '@/components/todos/Todo'
import Button from '@/components/ui/button/Button'
import Input from '@/components/ui/input/Input'

export default function UI() {
  return (
    <div className="w-2/3 mx-auto flex flex-col items-center gap-3 py-10">
      <h2 className="text-xl font-bold">Next Todos</h2>

      <div className="w-full flex gap-1">
        <Input
          type="text"
          placeholder="Search Todo"
          className="w-full"
          value={''}
          onChange={() => {}}
        />
        <Button>
          <i className="fa-solid fa-magnifying-glass"></i>
        </Button>
      </div>

      <Todo />

      <Button width="w-36">
        <i className="fas fa-plus"></i>
        ADD TODO
      </Button>
    </div>
  )
}
