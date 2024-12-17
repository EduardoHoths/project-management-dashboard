"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { Project } from "@prisma/client";

export function ProjectList() {
  const { data: projects, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await fetch("/api/projects");
      if (!res.ok) throw new Error("Failed to fetch projects");
      return res.json();
    },
  });

  if (isLoading) return <div>Carregando...</div>;

  const projectStatus = {
    overdue: "text-red-500",
    active: "text-green-500",
    completed: "text-blue-500",
  };

  return (
    <div className="grid gap-4">
      {projects &&
        projects.map((project: Project) => (
          <Link href={`/projects/${project.id}`} key={project.id}>
            <Card>
              <CardHeader>
                <CardTitle>{project.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Status:{" "}
                  <span
                    className={`${
                      projectStatus[
                        project.status as keyof typeof projectStatus
                      ]
                    }`}
                  >
                    {project.status}
                  </span>
                </p>
                <Progress value={project.progress} className="mt-2" />
              </CardContent>
            </Card>
          </Link>
        ))}
    </div>
  );
}
