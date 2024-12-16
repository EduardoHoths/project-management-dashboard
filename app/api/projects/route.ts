import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import * as z from "zod";
import { auth } from "@/auth";

const prisma = new PrismaClient();

const projectSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid start date",
  }),
  endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid end date",
  }),
});

export async function POST(request: Request) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const json = await request.json();
    const body = projectSchema.parse(json);

    // Convert strings to Date objects
    const startDate = new Date(body.startDate);
    const endDate = new Date(body.endDate);

    // Validar se a data de fim não é anterior à data de início
    if (endDate < startDate) {
      return NextResponse.json(
        { error: "End date cannot be earlier than start date" },
        { status: 400 }
      );
    }

    // Definir o status do projeto com base nas datas
    const currentDate = new Date();
    const status = endDate < currentDate ? "overdue" : "active";

    // Criar o projeto no banco de dados
    const project = await prisma.project.create({
      data: {
        name: body.name,
        description: body.description,
        startDate,
        endDate,
        status,
        progress: 0, // Inicializa com 0%
        userId: session.user.id,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Error creating project" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET() {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const projects = await prisma.project.findMany({
      where: {
        userId: session.user.id,
      },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error fetching projects" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
