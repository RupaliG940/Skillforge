import { Anthropic } from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

async function generateCareerReportWithClaude(user: any): Promise<any> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    console.error('Missing ANTHROPIC_API_KEY')
    return null
  }

  try {
    const client = new Anthropic({ apiKey })

    const userContext = `User Profile:
- Name: ${user.name || 'User'}
- Email: ${user.email}
- Target Role: ${user.targetRole || 'Not specified'}
- College: ${user.college || 'Not specified'}
- Bio: ${user.bio || 'Not specified'}
- Skills: ${user.skills?.map((s: any) => `${s.name} (${s.level}%)`).join(', ') || 'Not specified'}
- Projects: ${user.projects?.map((p: any) => `${p.name} (${p.progress}%)`).join(', ') || 'No projects yet'}
- Interview History: ${user.interviews?.length || 0} sessions`

    const systemPrompt = `You are a senior career development coach. Generate a comprehensive career report based on the user's profile.

Provide report in JSON format:
{
  "title": "Your Career Development Report",
  "generated": "timestamp",
  "executiveSummary": "Overall assessment",
  "progressScore": 0-100,
  "currentStatus": {
    "strengths": ["Strength 1", "Strength 2"],
    "opportunities": ["Opportunity 1", "Opportunity 2"],
    "challenges": ["Challenge 1", "Challenge 2"]
  },
  "careerTrajectory": {
    "current": "Current level",
    "nextLevel": "Next career level",
    "timeline": "X months",
    "requirements": ["Requirement 1", "Requirement 2"]
  },
  "focusAreas": [
    {
      "area": "Focus area",
      "importance": "High/Medium/Low",
      "action": "What to do",
      "impact": "Expected impact"
    }
  ],
  "recommendations": ["Recommendation 1", "Recommendation 2", "Recommendation 3"],
  "nintyDayPlan": [
    {"month": 1, "goals": ["Goal 1", "Goal 2"], "outcomes": ["Outcome 1"]},
    {"month": 2, "goals": ["Goal 1", "Goal 2"], "outcomes": ["Outcome 1"]},
    {"month": 3, "goals": ["Goal 1", "Goal 2"], "outcomes": ["Outcome 1"]}
  ],
  "marketFitAnalysis": "Assessment of market fit for target role",
  "competitiveAdvantage": ["Advantage 1", "Advantage 2"],
  "nextSteps": ["Action 1", "Action 2", "Action 3"]
}`

    const userPrompt = `Please generate a detailed career development report:

${userContext}

Provide actionable insights, progress assessment, and a 90-day development plan.`

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
      return jsonMatch ? JSON.parse(jsonMatch[0]) : { error: 'Could not parse report' }
    } catch (parseError) {
      return { error: 'Failed to parse AI response', raw: textContent.text }
    }
  } catch (error) {
    console.error('Claude Report generation error:', error)
    return null
  }
}

export async function GET() {
  try {
    const session = await auth()

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { skills: true, projects: true, interviews: true },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const report = await generateCareerReportWithClaude(user)

    if (report && !report.error) {
      return NextResponse.json(report)
    }

    // Fallback report
    return NextResponse.json({
      progressScore: 72,
      focusArea: 'Building portfolio projects',
      strengths: user.skills?.map((s: any) => s.name).slice(0, 3) || [],
      improvements: [
        'Add more real-world projects',
        'Prepare interview answers with STAR method',
        'Polish resume with metrics and outcomes',
      ],
      summary: 'Your profile shows strong potential. Focus on building measurable projects and practicing interviews.',
      nextSteps: [
        'Complete one portfolio project this month',
        'Practice mock interviews weekly',
        'Update resume with latest skills',
      ],
      fallback: true,
    })
  } catch (error) {
    console.error('Career report error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
