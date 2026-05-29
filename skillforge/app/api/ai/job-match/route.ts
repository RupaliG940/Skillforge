import { Anthropic } from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

async function analyzeJobMatchWithClaude(
  jobDescription: string,
  userProfile?: any
): Promise<any> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    console.error('Missing ANTHROPIC_API_KEY')
    return null
  }

  try {
    const client = new Anthropic({ apiKey })

    const systemPrompt = `You are an expert career advisor and job match analyst. Analyze how well a candidate matches a job description and provide strategic guidance.

Provide analysis in JSON format:
{
  "matchScore": 0-100,
  "readinessLevel": "Immediate/Ready/3-6 months/6-12 months/Long-term",
  "matchSummary": "Brief overall assessment",
  "skillsAnalysis": {
    "matched": ["Skill 1: matches JD requirement"],
    "missing": ["Skill 1: needed for this role"],
    "canQuicklyLearn": ["Skill 1: learnable in weeks"]
  },
  "strengths": ["Your strength for this role"],
  "gaps": ["Gap that needs addressing"],
  "recommendations": [
    {
      "priority": "High/Medium/Low",
      "action": "What to do",
      "rationale": "Why it matters",
      "timeframe": "When to do it"
    }
  ],
  "interviewFocus": [
    "Focus area 1 for preparation",
    "Focus area 2 for preparation"
  ],
  "learningPlan": {
    "urgent": ["Critical skill to learn immediately"],
    "important": ["Important skill to build"],
    "nice-to-have": ["Nice-to-have skill"]
  },
  "timeline": "X weeks to become competitive",
  "applicationStrategy": "How and when to apply"
}`

    const userContext = userProfile
      ? `User Profile:
- Name: ${userProfile.name || 'Candidate'}
- Current Skills: ${userProfile.skills?.map((s: any) => s.name).join(', ') || 'Not specified'}
- Experience: ${userProfile.experience || 'Not specified'}
- Target Role: ${userProfile.targetRole || 'Not specified'}`
      : 'Generic candidate profile'

    const userPrompt = `Please analyze this job description and provide a detailed match analysis:

${jobDescription}

${userContext}

Provide specific, actionable guidance on match fit, skill gaps, and preparation strategy.`

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
    console.error('Claude Job Match error:', error)
    return null
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null)
    const { description, userProfile } = body ?? {}

    if (!description || typeof description !== 'string' || description.trim().length === 0) {
      return NextResponse.json({ error: 'Missing job description' }, { status: 400 })
    }

    const analysis = await analyzeJobMatchWithClaude(description, userProfile)

    if (analysis && !analysis.error) {
      return NextResponse.json(analysis)
    }

    // Fallback response
    return NextResponse.json({
      error: 'Unable to perform detailed analysis',
      fallback: true,
      matchScore: 65,
      recommendation: 'Could be a good fit. Review the job description carefully and align your resume.',
    })
  } catch (error) {
    console.error('Job match error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
