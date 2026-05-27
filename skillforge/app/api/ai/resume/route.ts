import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    let user = null
    const session = await auth()

    if (session?.user?.email) {
      user = await prisma.user.findUnique({ where: { email: session.user.email } })
    }

    const { resumeText } = await req.json().catch(() => ({}))

    if (!resumeText) {
      return NextResponse.json({ error: 'Missing resume text' }, { status: 400 })
    }

    const analysis = analyzeResume(resumeText, user)
    return NextResponse.json(analysis)
  } catch (error) {
    console.error('Error analyzing resume:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

function analyzeResume(text: string, user: any) {
  const keywords = ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker']
  const missingKeywords = keywords.filter((k) => !text.includes(k))

  return {
    atsScore: Math.min(95, 60 + (text.length / 100) * 2),
    impactScore: Math.max(1, Math.min(10, 9 - missingKeywords.length * 0.8)),
    missingKeywords,
    feedback: `Your resume is ${text.length > 1000 ? 'detailed' : 'brief'}. Consider adding: ${missingKeywords.slice(0, 3).join(', ')}.`,
    suggestedHeadline: user ? `Experienced developer with ${user.email} profile focus` : 'Experienced software developer focused on modern JS stacks',
  }
}
