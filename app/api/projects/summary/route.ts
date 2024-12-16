import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { auth } from '@/auth'

const prisma = new PrismaClient()

export async function GET() {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  try {
    const activeProjects = await prisma.project.count({
      where: {
        userId: session.user.id,
        status: 'active'
      }
    })

    const completedProjects = await prisma.project.count({
      where: {
        userId: session.user.id,
        status: 'completed'
      }
    })

    return NextResponse.json({
      activeProjects,
      completedProjects
    })
  } catch (error) {
    console.error('Erro ao buscar resumo dos projetos:', error)
    return NextResponse.json({ error: 'Erro ao buscar resumo dos projetos' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

