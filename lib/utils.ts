import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import prisma from "./prisma";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export async function calculateProgress(projectId: string) {
  const tasks = await prisma.task.count({
    where: { projectId: projectId },
  });

  const tasksCompleted = await prisma.task.count({
    where: { projectId: projectId, completed: true },
  });

  await prisma.project.update({
    where: { id: projectId },
    data: {
      progress: (tasksCompleted / tasks) * 100,
    },
  });
}