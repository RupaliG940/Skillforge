import { Anthropic } from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

interface RoadmapRequest {
  duration?: string | number
  goal?: string
  skills?: Array<{ name: string; level: number }>
  targetRole?: string
}

async function generateRoadmapWithClaude(
  duration: number,
  user: any,
  request: RoadmapRequest
): Promise<any> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    console.error('Missing ANTHROPIC_API_KEY')
    return null
  }

  try {
    const client = new Anthropic({ apiKey })

    const userContext = user
      ? `User Profile: ${user.name || 'User'} (${user.email})\nTarget Role: ${user.targetRole || 'Not specified'}\nCurrent Skills: ${user.skills?.map((s: any) => s.name).join(', ') || 'Not specified'}`
      : 'No user profile data'

    const systemPrompt = `You are an expert career development advisor. Create a detailed, actionable learning and career roadmap based on the user's profile and timeline.

The roadmap should be:
- Specific and measurable with clear weekly milestones
- Progressive, starting from fundamentals to advanced topics
- Realistic and achievable within the given timeframe
- Based on real industry practices and market demands
- Include practical projects, skills to build, and assessment points

Provide the roadmap in JSON format:
{
  "title": "Career Roadmap Title",
  "duration": "X days",
  "overview": "Brief overview of the roadmap",
  "weeks": [
    {
      "week": 1,
      "title": "Week Title",
      "focus": "Main focus area",
      "tasks": ["Task 1", "Task 2", "Task 3"],
      "project": "Practical project to build",
      "learningResources": ["Resource 1", "Resource 2"],
      "milestones": ["Milestone 1", "Milestone 2"],
      "assessment": "How to assess progress"
    }
  ]
}`

    const userPrompt = `Create a detailed ${duration}-day roadmap for: ${
      request.goal || `someone targeting a ${request.targetRole || 'tech'} role`
    }.

${userContext}

Make it specific, actionable, and progressive. Include real skills, projects, and timelines.`

    const response = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2000,
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
      return jsonMatch ? JSON.parse(jsonMatch[0]) : { error: 'Could not parse roadmap' }
    } catch (parseError) {
      return { error: 'Failed to parse AI response', raw: textContent.text }
    }
  } catch (error) {
    console.error('Claude Roadmap API error:', error)
    return null
  }
}

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

    const body = await req.json().catch(() => ({}))
    const { duration = '30', goal, targetRole } = body

    const durationDays = Math.max(7, Math.min(180, parseInt(duration.toString()) || 30))

    const roadmap = await generateRoadmapWithClaude(durationDays, user, {
      duration: durationDays,
      goal,
      targetRole: targetRole || user?.targetRole,
      skills: user?.skills,
    })

    if (roadmap && !roadmap.error) {
      return NextResponse.json(roadmap)
    }

    // Fallback if Claude fails
    return NextResponse.json({
      error: 'Unable to generate detailed roadmap',
      fallback: true,
      duration: durationDays,
    })
  } catch (error) {
    console.error('Roadmap generation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
