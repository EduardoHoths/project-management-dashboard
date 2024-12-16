"use client"

import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

export function ProjectList() {
  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const res = await fetch('/api/projects')
      if (!res.ok) throw new Error('Failed to fetch projects')
      return res.json()
    }
  })

  if (isLoading) return <div>Carregando...</div>

  return (
    <div className="grid gap-4">
      {projects && projects.map((project: any) => (
        <Card key={project.id}>
          <CardHeader>
            <CardTitle>
              <Link href={`/projects/${project.id}`}>{project.name}</Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Status: {project.status}</p>
            <Progress value={project.progress} className="mt-2" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

