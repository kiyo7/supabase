import { FormEvent } from 'react'
import { supabase } from '../utils/supabase'
import useStore from '../store'
import { useMutateTask } from '../hooks/useMutateTask'

import React from 'react'

export const TaskForm: React.FC = () => {
  const { editedTask } = useStore()

  const update = useStore((state) => state.updateEditedTask)

  const { createTaskMutation, updateTaskMutation } = useMutateTask()

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedTask.id === '')
      createTaskMutation.mutate({
        title: editedTask.title,
        user_id: supabase.auth.user()?.id,
      })
    else {
      updateTaskMutation.mutate({
        id: editedTask.id,
        title: editedTask.title,
      })
    }
  }
  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        className="focus: my-2 rounded border border-gray-300 border-indigo-500 px-3 py-2 text-sm placeholder-gray-500 focus:outline-none"
        placeholder="New task ?"
        value={editedTask.title}
        onChange={(e) => update({ ...editedTask, title: e.target.value })}
      />
      <button className="ml-2 rounded bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700">
        {editedTask.id ? 'Update' : 'Create'}
      </button>
    </form>
  )
}
