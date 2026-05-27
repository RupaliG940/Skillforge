import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)
  if (!body?.description) {
    return NextResponse.json({ error: 'Missing job description' }, { status: 400 })
  }

  return NextResponse.json({
    matchScore: 74,
    recommendation: 'Almost ready! Apply with confidence and keep improving TypeScript.',
    hasSkills: ['React', 'JavaScript', 'Node.js', 'Git'],
    missingSkills: ['TypeScript', 'AWS', 'Docker'],
    timeToReady: '3 weeks',
    strategy: 'Apply now with the right keywords and keep learning TypeScript and cloud fundamentals.',
  })
}
