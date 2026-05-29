import { Anthropic } from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

async function generateProjectIdeasWithClaude(
  skills: Array<{ name: string; level?: number }>,
  targetRole?: string,
  difficulty?: string
): Promise<any> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    console.error('Missing ANTHROPIC_API_KEY')
    return null
  }

  try {
    const client = new Anthropic({ apiKey })

    const skillsList = skills.map((s) => `${s.name}${s.level ? ` (${s.level}%)` : ''}`).join(', ')

    const systemPrompt = `You are an expert project advisor for career development. Generate personalized project ideas that help build skills and impress recruiters.

Provide ideas in JSON format:
{
  "ideas": [
    {
      "title": "Project title",
      "description": "Detailed description",
      "targetAudience": "Who benefits from this project",
      "skillsFocused": ["Skill 1", "Skill 2"],
      "skillsLearned": ["New skill 1", "New skill 2"],
      "techStack": ["Tech 1", "Tech 2"],
      "difficulty": "Beginner/Intermediate/Advanced",
      "buildTime": "Time estimate",
      "impact": "Career impact (1-10)",
      "features": ["Feature 1", "Feature 2", "Feature 3"],
      "learningOutcomes": ["Outcome 1", "Outcome 2"],
      "hireFactor": "Why recruiters love this (1-10)",
      "steps": ["Step 1", "Step 2", "Step 3"],
      "resources": ["Resource 1", "Resource 2"],
      "portfolio": "How to showcase this"
    }
  ]
}`

    const userPrompt = `Generate personalized project ideas for someone with these skills: ${skillsList}

${targetRole ? `Target Role: ${targetRole}` : ''}
${difficulty ? `Preferred Difficulty: ${difficulty}` : ''}

Create projects that:
1. Build on existing skills
2. Fill skill gaps
3. Impress recruiters
4. Are completable and impactful
5. Solve real problems or help real people`

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
      return jsonMatch ? JSON.parse(jsonMatch[0]) : { error: 'Could not parse ideas' }
    } catch (parseError) {
      return { error: 'Failed to parse AI response', raw: textContent.text }
    }
  } catch (error) {
    console.error('Claude Project Ideas error:', error)
    return null
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null)
    const { skills, targetRole, difficulty } = body ?? {}

    if (!skills || !Array.isArray(skills) || skills.length === 0) {
      return NextResponse.json({ error: 'Missing skills data' }, { status: 400 })
    }

    const ideas = await generateProjectIdeasWithClaude(skills, targetRole, difficulty)

    if (ideas && !ideas.error) {
      return NextResponse.json(ideas)
    }

    // Fallback ideas
    return NextResponse.json({
      ideas: [
        {
          title: 'Real-time Collaboration Tool',
          description: 'Build a real-time application with your primary skill',
          techStack: skills.slice(0, 3).map((s: any) => s.name),
          difficulty: 'Medium',
          buildTime: '3-4 weeks',
          hireFactor: 9,
          features: ['Real-time updates', 'User authentication', 'Responsive UI'],
        },
        {
          title: 'Full-Stack SaaS Application',
          description: 'Create a small SaaS product that solves a specific problem',
          techStack: skills.slice(0, 4).map((s: any) => s.name),
          difficulty: 'Hard',
          buildTime: '4-6 weeks',
          hireFactor: 9.5,
          features: ['Authentication', 'Database', 'Payment integration', 'Analytics'],
        },
      ],
      fallback: true,
    })
  } catch (error) {
    console.error('Project ideas error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
