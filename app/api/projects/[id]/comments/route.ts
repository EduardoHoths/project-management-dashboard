import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";

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
    const comments = await prisma.comment.findMany({
      where: { projectId: id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(comments);
  } catch (error) {
    console.error("Erro ao buscar comentários:", error);
    return NextResponse.json(
      { error: "Erro ao buscar comentários" },
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
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const { content } = await request.json();
    const comment = await prisma.comment.create({
      data: {
        content,
        projectId: params.id,
      },
    });

    return NextResponse.json(comment);
  } catch (error) {
    console.error("Erro ao adicionar comentário:", error);
    return NextResponse.json(
      { error: "Erro ao adicionar comentário" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
