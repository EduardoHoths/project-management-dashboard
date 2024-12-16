"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query"

export function ProjectSummary() {
  const { data, isLoading } = useQuery({
    queryKey: ['projectSummary'],
    queryFn: async () => {
      const res = await fetch('/api/projects/summary')
      if (!res.ok) throw new Error('Failed to fetch project summary')
      return res.json()
    }
  })

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Active Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{data?.activeProjects}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Completed Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{data?.completedProjects}</p>
        </CardContent>
      </Card>
    </div>
  )
}

