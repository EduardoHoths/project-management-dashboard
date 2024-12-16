import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";
import { calculateProgress } from "@/lib/utils";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  const { id } = await params;

  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const tasks = await prisma.task.findMany({
      where: { projectId: id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Erro ao buscar tarefas:", error);
    return NextResponse.json(
      { error: "Erro ao buscar tarefas" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  const { id } = await params;

  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const { name } = await request.json();
    const task = await prisma.task.create({
      data: {
        name,
        projectId: id,
      },
    });

    await calculateProgress(id);

    return NextResponse.json(task);
  } catch (error) {
    console.error("Erro ao adicionar tarefa:", error);
    return NextResponse.json(
      { error: "Erro ao adicionar tarefa" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
