"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TaskList } from "@/components/project/task-list";
import { CommentList } from "@/components/project/comment-list";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export function ProjectDetails({ id }: { id: string }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch project details
  const { data: project, isLoading } = useQuery({
    queryKey: ["project", id],
    queryFn: async () => {
      const res = await fetch(`/api/projects/${id}`);
      if (!res.ok) throw new Error("Failed to fetch project details");
      return res.json();
    },
  });

  // Mutation for updating the project status
  const updateStatusMutation = useMutation({
    mutationFn: async (newStatus: string) => {
      const res = await fetch(`/api/projects/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update project status");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project", id] });
      toast({ title: "Status updated successfully!", variant: "success" });
    },
    onError: () => {
      toast({ title: "Failed to update status.", variant: "destructive" });
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-sm text-muted-foreground">
          Loading project details...
        </p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4">
        <p className="text-xl text-red-500">Project not found</p>
        <Link
          href="/projects"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors"
        >
          Back to projects
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-card shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-primary">
            {project.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">{project.description}</p>
          <div className="flex justify-between items-center text-sm">
            <p>Status:</p>
            <div className="flex items-center space-x-2">
              <Select
                onValueChange={(value) => updateStatusMutation.mutate(value)}
                defaultValue={project.status}
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Progress
            value={project.progress}
            className="mt-4 h-4 bg-muted rounded-lg"
          >
            <div
              className="h-full bg-primary rounded-lg"
              style={{ width: `${project.progress}%` }}
            />
          </Progress>
          <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
            <div>
              <p className="text-muted-foreground">Start Date</p>
              <p className="font-medium">
                {new Date(project.startDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">End Date</p>
              <p className="font-medium">
                {new Date(project.endDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <TaskList projectId={id} />

      <CommentList projectId={id} />
    </div>
  );
}
