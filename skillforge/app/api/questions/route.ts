import { NextRequest, NextResponse } from 'next/server'

const questions = [
  {
    id: 'q1',
    question: 'Explain the difference between let, const, and var in JavaScript.',
    difficulty: 'Easy',
    category: 'JavaScript',
  },
  {
    id: 'q2',
    question: 'How does Prisma handle relational data in PostgreSQL?',
    difficulty: 'Medium',
    category: 'Database',
  },
  {
    id: 'q3',
    question: 'Design a URL shortener service with scalability in mind.',
    difficulty: 'Hard',
    category: 'System Design',
  },
]

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const category = searchParams.get('category')
  const difficulty = searchParams.get('difficulty')

  const filtered = questions.filter((item) => {
    if (category && item.category !== category) return false
    if (difficulty && item.difficulty !== difficulty) return false
    return true
  })

  return NextResponse.json({ questions: filtered.length ? filtered : questions })
}
