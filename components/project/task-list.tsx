"use client"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function TaskList({ projectId }: { projectId: string }) {
  const [newTaskName, setNewTaskName] = useState("")
  const queryClient = useQueryClient()

  const { data: tasks, isLoading } = useQuery({
    queryKey: ['tasks', projectId],
    queryFn: async () => {
      const res = await fetch(`/api/projects/${projectId}/tasks`)
      if (!res.ok) throw new Error('Failed to fetch tasks')
      return res.json()
    }
  })

  const addTaskMutation = useMutation({
    mutationFn: async (name: string) => {
      const res = await fetch(`/api/projects/${projectId}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      })
      if (!res.ok) throw new Error('Failed to add task')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', projectId] })
      queryClient.invalidateQueries({ queryKey: ['project', projectId] })
      setNewTaskName("")
    },
  })

  const updateTaskMutation = useMutation({
    mutationFn: async ({ id, completed }: { id: string, completed: boolean }) => {
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed }),
      })
      if (!res.ok) throw new Error('Failed to update task')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', projectId] })
      queryClient.invalidateQueries({ queryKey: ['project', projectId] })
    },
  })

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTaskName.trim()) {
      addTaskMutation.mutate(newTaskName)
    }
  }

  if (isLoading) return <div>Loading tasks...</div>

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddTask} className="flex items-center space-x-2 mb-4">
          <Input
            type="text"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            placeholder="New task"
            className="flex-grow"
          />
          <Button type="submit" disabled={addTaskMutation.isPending}>
            {addTaskMutation.isPending ? "Adding..." : "Add"}
          </Button>
        </form>
        {tasks.map((task: any) => (
          <div key={task.id} className="flex items-center space-x-2 mb-2">
            <Checkbox
              checked={task.completed}
              onCheckedChange={(checked) => updateTaskMutation.mutate({ id: task.id, completed: checked as boolean })}
            />
            <span className={task.completed ? "line-through" : ""}>{task.name}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
