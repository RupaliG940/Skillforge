import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)
  const { answer, question } = body ?? {}

  if (!answer || !question) {
    return NextResponse.json({ error: 'Missing question or answer' }, { status: 400 })
  }

  return NextResponse.json({
    review: {
      score: 88,
      highlights: ['Clear structure', 'Strong examples', 'Concise explanation'],
      suggestions: ['Add more details about edge cases', 'Mention time complexity', 'Use a concrete code snippet'],
      improvedAnswer: `When designing for scalability, I would focus on a modular architecture that separates read and write paths...`,
    },
  })
}
