import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { auth } from '@/auth'

const prisma = new PrismaClient()

export async function GET() {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
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
    console.error('Error fetching project summary:', error)
    return NextResponse.json({ error: 'Error fetching project summary' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
