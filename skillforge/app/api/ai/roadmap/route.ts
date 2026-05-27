import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    let user = null
    const session = await auth()

    if (session?.user?.email) {
      user = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: { skills: true, projects: true },
      })
    }

    const { duration } = await req.json().catch(() => ({}))
    const roadmapContent = generateRoadmap(duration?.toString() || '30', user)

    return NextResponse.json(roadmapContent)
  } catch (error) {
    console.error('Error generating roadmap:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

function generateRoadmap(duration: string, user: any) {
  const weeks = Math.max(1, Math.min(4, Math.floor(parseInt(duration) / 7)))

  const topics = [
    {
      week: 1,
      title: 'TypeScript Fundamentals',
      tasks: [
        'Complete TypeScript crash course',
        'Convert one React project to TypeScript',
        'Build: Todo app in TypeScript',
      ],
    },
    {
      week: 2,
      title: 'Node.js + Express Advanced',
      tasks: [
        'REST API best practices',
        'Authentication with JWT',
        'Build: REST API with TypeScript',
      ],
    },
    {
      week: 3,
      title: 'PostgreSQL + Prisma',
      tasks: [
        'Learn Prisma ORM',
        'Database schema design',
        'Build: Full-stack project',
      ],
    },
    {
      week: 4,
      title: 'Deploy + Portfolio Update',
      tasks: [
        'Deploy to Vercel/Render',
        'Update portfolio with projects',
        'Write technical blogs',
      ],
    },
  ]

  return { roadmap: topics.slice(0, weeks), userProfile: user ? { email: user.email } : null }
}
