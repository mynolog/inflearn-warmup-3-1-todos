'use server'

import { PostgrestError } from '@supabase/supabase-js'
import { createServerSupabaseClient } from '@/utils/supabase/server'
import { Database } from 'types_db'

export type TodoRow = Database['public']['Tables']['todos']['Row']
export type TodoRowInsert = Database['public']['Tables']['todos']['Insert']
export type TodoRowUpdate = Database['public']['Tables']['todos']['Update']

function handleError(error: unknown) {
  if (typeof error === 'object' && error !== null && 'message' in error && 'code' in error) {
    console.error('PostgrestError 발생:', error)
    throw new Error((error as PostgrestError).message)
  } else if (error instanceof Error) {
    console.error('일반 Error 발생:', error)
    throw new Error(error.message)
  } else {
    console.error('알 수 없는 에러 발생:', error)
    throw new Error('예기치 않은 오류가 발생했습니다.')
  }
}
// Read
export async function getTodos({ searchInput = '' }): Promise<TodoRow[]> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .like('title', `%${searchInput}%`)
    .order('created_at', { ascending: true })

  if (error) {
    handleError(error)
  }

  return data ?? []
}
// Create
export async function createTodo(todo: TodoRowInsert) {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase.from('todos').insert({
    ...todo,
    created_at: new Date().toISOString(),
  })

  if (error) {
    handleError(error)
  }

  return data
}
// Update
export async function updateTodo(todo: TodoRowUpdate) {
  if (!todo.id) {
    throw new Error('id가 없습니다.')
  }
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('todos')
    .update({
      ...todo,
      updated_at: new Date().toISOString(),
    })
    .eq('id', todo.id)

  if (error) {
    handleError(error)
  }

  return data
}

export async function updateTodoComplete(todo: TodoRowUpdate) {
  if (!todo.id) {
    throw new Error('id가 없습니다.')
  }
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('todos')
    .update({
      ...todo,
      completed_at: new Date().toISOString(),
    })
    .eq('id', todo.id)
  if (error) {
    handleError(error)
  }
  return data
}
// Delete
export async function deleteTodo(id: TodoRow['id']) {
  const supabase = await createServerSupabaseClient()

  const { data, error } = await supabase.from('todos').delete().eq('id', id)

  if (error) {
    handleError(error)
  }

  return data
}
