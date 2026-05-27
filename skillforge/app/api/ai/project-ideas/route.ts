import { NextRequest, NextResponse } from 'next/server'

const ideas = [
  {
    title: 'Real-time Study Buddy',
    stack: ['React', 'Node.js', 'Socket.io'],
    difficulty: 'Medium',
    buildTime: '3-4 weeks',
    impactScore: 9.0,
    description: 'A collaborative study app with flashcards, streaks, and live sessions.',
  },
  {
    title: 'Portfolio Launchpad',
    stack: ['Next.js', 'Tailwind', 'Framer Motion'],
    difficulty: 'Easy',
    buildTime: '2-3 weeks',
    impactScore: 8.7,
    description: 'A polished portfolio site that automatically generates case studies and badges.',
  },
  {
    title: 'Recruiter Match Dashboard',
    stack: ['React', 'Prisma', 'PostgreSQL'],
    difficulty: 'Hard',
    buildTime: '4-5 weeks',
    impactScore: 9.3,
    description: 'A tool that rates your projects and recommends improvements for recruiters.',
  },
]

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)
  if (!body?.skills) {
    return NextResponse.json({ error: 'Missing skills data' }, { status: 400 })
  }

  return NextResponse.json({ ideas })
}
