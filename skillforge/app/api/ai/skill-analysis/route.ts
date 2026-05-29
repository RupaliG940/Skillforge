import { Anthropic } from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

type SkillInput = { name?: string; category?: string; level?: number; status?: string }

type NormalizedSkill = {
  name: string
  category: string
  level?: number
  status?: string
}

function normalizeSkills(skills: unknown): NormalizedSkill[] {
  if (!Array.isArray(skills)) return []

  return skills
    .map((item) => {
      if (typeof item === 'string') {
        return { name: item, category: 'Unknown', level: undefined, status: 'Learning' }
      }

      if (typeof item === 'object' && item !== null) {
        const skill = item as SkillInput
        return {
          name: skill.name?.trim() || 'Unknown Skill',
          category: skill.category?.trim() || 'Unknown',
          level: typeof skill.level === 'number' ? skill.level : undefined,
          status: skill.status?.trim() || 'Learning',
        }
      }

      return { name: 'Unknown Skill', category: 'Unknown', level: undefined, status: 'Learning' }
    })
    .filter((skill) => skill.name)
}

async function analyzeSkillsWithClaude(skills: NormalizedSkill[]): Promise<any> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    console.error('Missing ANTHROPIC_API_KEY')
    return null
  }

  try {
    const client = new Anthropic({ apiKey })

    const skillsList = skills
      .map((skill) => `- ${skill.name} (${skill.category})${skill.level !== undefined ? ` - ${skill.level}%` : ''}${skill.status ? ` [${skill.status}]` : ''}`)
      .join('\n')

    const systemPrompt = `You are an expert career coach and skill development advisor. Analyze the user's skill profile and provide detailed, actionable guidance.

Provide analysis in JSON format:
{
  "summary": "Overall skill assessment",
  "strengths": ["Strong skill 1", "Strong skill 2"],
  "gaps": ["Gap 1", "Gap 2"],
  "skillCategories": {
    "category": {
      "status": "Assessment",
      "nextStep": "What to do"
    }
  },
  "recommendations": [
    {
      "priority": "High/Medium/Low",
      "action": "Recommended action",
      "rationale": "Why this matters",
      "timeline": "When to do it",
      "resources": ["Resource 1", "Resource 2"]
    }
  ],
  "roadmap": [
    {
      "phase": "Phase name",
      "duration": "Duration",
      "focus": ["Skill 1", "Skill 2"],
      "outcomes": ["Outcome 1", "Outcome 2"]
    }
  ],
  "marketValue": "Assessment of market demand",
  "nextSteps": ["Action 1", "Action 2", "Action 3"],
  "estimatedGrowthTime": "Timeline for advancement"
}`

    const userPrompt = `Please analyze this skill profile:

${skillsList}

Provide detailed recommendations for skill development, growth areas, and career advancement based on current market demands.`

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
    console.error('Claude Skill Analysis error:', error)
    return null
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null)
    const skills = normalizeSkills(body?.skills)

    if (!skills.length) {
      return NextResponse.json({ error: 'Missing skill list' }, { status: 400 })
    }

    const analysis = await analyzeSkillsWithClaude(skills)

    if (analysis && !analysis.error) {
      return NextResponse.json(analysis)
    }

    // Fallback analysis
    const strongSkills = skills.filter((skill) => skill.level !== undefined && skill.level >= 70)
    const growthSkills = skills.filter((skill) => skill.level === undefined || skill.level < 70)

    return NextResponse.json({
      summary: `You have ${skills.length} skills tracked. Focus on deepening ${strongSkills.length > 0 ? strongSkills[0].name : 'your technical abilities'} and building ${growthSkills.length > 0 ? growthSkills.map((s) => s.name).join(', ') : 'complementary skills'}.`,
      strengths: strongSkills.map((s) => s.name),
      gaps: growthSkills.map((s) => s.name),
      nextSteps: [
        `Deepen ${strongSkills.length > 0 ? strongSkills[0].name : 'your strongest skill'} with practical projects`,
        `Build ${growthSkills.length > 0 ? growthSkills[0].name : 'complementary skills'} through structured learning`,
        'Create portfolio projects showcasing your strongest skills',
      ],
      fallback: true,
    })
  } catch (error) {
    console.error('Skill analysis error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
