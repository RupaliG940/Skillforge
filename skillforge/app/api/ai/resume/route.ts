import { Anthropic } from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

async function analyzeResumeWithClaude(
  resumeText: string,
  user: any,
  targetRole?: string
): Promise<any> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    console.error('Missing ANTHROPIC_API_KEY')
    return null
  }

  try {
    const client = new Anthropic({ apiKey })

    const systemPrompt = `You are an expert resume reviewer and career coach. Analyze the provided resume thoroughly and provide detailed, actionable feedback.

Provide analysis in JSON format:
{
  "atsScore": 0-100,
  "impactScore": 0-100,
  "summary": "Overall assessment",
  "strengths": ["Strength 1", "Strength 2"],
  "weaknesses": ["Weakness 1", "Weakness 2"],
  "keywords": {
    "present": ["Keyword 1"],
    "missing": ["Keyword 1"]
  },
  "improvements": [
    {
      "area": "Area to improve",
      "current": "Current state",
      "suggested": "Suggested change",
      "impact": "Why this matters"
    }
  ],
  "structureFeedback": {
    "format": "Assessment of format",
    "readability": "Assessment of readability",
    "flow": "Assessment of flow"
  },
  "nextSteps": ["Action 1", "Action 2", "Action 3"],
  "estimatedReadTime": "X seconds"
}`

    const userPrompt = `Please analyze this resume:

${resumeText}

${targetRole ? `Target Role: ${targetRole}` : ''}

Provide a comprehensive analysis with specific, actionable feedback.`

    const response = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1500,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: userPrompt,
        },
      ],
    })

    const textContent = response.content.find((block) => block.type === 'text')
    if (!textContent || textContent.type !== 'text') return null

    try {
      const jsonMatch = textContent.text.match(/\{[\s\S]*\}/)
      return jsonMatch ? JSON.parse(jsonMatch[0]) : { error: 'Could not parse analysis' }
    } catch (parseError) {
      return { error: 'Failed to parse AI response', raw: textContent.text }
    }
  } catch (error) {
    console.error('Claude Resume Analysis error:', error)
    return null
  }
}

export async function POST(req: NextRequest) {
  try {
    let user = null
    const session = await auth()

    if (session?.user?.email) {
      user = await prisma.user.findUnique({ where: { email: session.user.email } })
    }

    const { resumeText, targetRole } = await req.json().catch(() => ({}))

    if (!resumeText || typeof resumeText !== 'string' || resumeText.trim().length === 0) {
      return NextResponse.json({ error: 'Missing or invalid resume text' }, { status: 400 })
    }

    const analysis = await analyzeResumeWithClaude(resumeText, user, targetRole || user?.targetRole)

    if (analysis && !analysis.error) {
      return NextResponse.json(analysis)
    }

    // Fallback basic analysis
    return NextResponse.json({
      error: 'Unable to perform detailed analysis',
      fallback: true,
      basicInfo: {
        length: resumeText.length,
        wordCount: resumeText.split(/\s+/).length,
      },
    })
  } catch (error) {
    console.error('Resume analysis error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
