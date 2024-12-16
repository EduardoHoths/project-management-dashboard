"use client"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export function CommentList({ projectId }: { projectId: string }) {
  const [newComment, setNewComment] = useState("")
  const queryClient = useQueryClient()

  const { data: comments, isLoading } = useQuery({
    queryKey: ['comments', projectId],
    queryFn: async () => {
      const res = await fetch(`/api/projects/${projectId}/comments`)
      if (!res.ok) throw new Error('Failed to fetch comments')
      return res.json()
    }
  })

  const mutation = useMutation({
    mutationFn: async (content: string) => {
      const res = await fetch(`/api/projects/${projectId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      })
      if (!res.ok) throw new Error('Failed to add comment')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', projectId] })
      setNewComment("")
    },
  })

  if (isLoading) return <div>Loading comments...</div>

  return (
    <Card>
      <CardHeader>
        <CardTitle>Comments</CardTitle>
      </CardHeader>
      <CardContent>
        {comments.map((comment: any) => (
          <div key={comment.id} className="mb-4">
            <p>{comment.content}</p>
            <small className="text-sm text-gray-500">
              {new Date(comment.createdAt).toLocaleString()}
            </small>
          </div>
        ))}
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="mt-4"
        />
        <Button
          onClick={() => mutation.mutate(newComment)}
          disabled={!newComment.trim() || mutation.isPending}
          className="mt-2"
        >
          {mutation.isPending ? "Adding..." : "Add Comment"}
        </Button>
      </CardContent>
    </Card>
  )
}
