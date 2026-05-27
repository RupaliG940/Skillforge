import { NextRequest, NextResponse } from 'next/server'
import { SKILLS_SAMPLE } from '@/lib/phaseConstants'

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const category = searchParams.get('category')

  const skills = category
    ? SKILLS_SAMPLE.filter((skill) => skill.category === category)
    : SKILLS_SAMPLE

  return NextResponse.json({ skills })
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)

  if (!body?.name || !body?.category) {
    return NextResponse.json({ error: 'Missing skill data' }, { status: 400 })
  }

  return NextResponse.json({
    message: 'Skill saved',
    skill: {
      id: `skill-${Date.now()}`,
      name: body.name,
      category: body.category,
      level: body.level || 0,
      status: body.status || 'Learning',
      lastUpdated: 'Just now',
    },
  })
}
