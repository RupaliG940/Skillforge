import { Anthropic } from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

interface ChatContext {
  profile?: {
    name?: string
    email?: string
    college?: string
    targetRole?: string
    bio?: string
  }
  skills?: Array<{ name?: string; category?: string; level?: number; status?: string }>
  projects?: Array<{ name?: string; status?: string; progress?: number }>
  interviews?: Array<{ category?: string; difficulty?: string; totalQuestions?: number; totalScore?: number }>
}

function formatChatContext(context: ChatContext) {
  const parts: string[] = []

  if (context.profile) {
    const profileParts = []
    if (context.profile.name) profileParts.push(`Name: ${context.profile.name}`)
    if (context.profile.college) profileParts.push(`College: ${context.profile.college}`)
    if (context.profile.targetRole) profileParts.push(`Target role: ${context.profile.targetRole}`)
    if (context.profile.bio) profileParts.push(`Bio: ${context.profile.bio}`)

    if (profileParts.length) {
      parts.push(`User profile:
${profileParts.join('\n')}`)
    }
  }

  if (Array.isArray(context.skills) && context.skills.length > 0) {
    const topSkills = context.skills
      .slice(0, 8)
      .map((skill) => `- ${skill.name} (${skill.category || 'Unknown'}, ${skill.level ?? 0}%)`)
      .join('\n')
    parts.push(`Skills:
${topSkills}`)
  }

  if (Array.isArray(context.projects) && context.projects.length > 0) {
    const projectSummaries = context.projects
      .slice(0, 6)
      .map((project) => `- ${project.name}: ${project.progress ?? 0}% complete (${project.status || 'Unknown'})`)
      .join('\n')
    parts.push(`Projects:
${projectSummaries}`)
  }

  if (Array.isArray(context.interviews) && context.interviews.length > 0) {
    const interviewSummaries = context.interviews
      .slice(0, 6)
      .map((session) => `- ${session.category || 'Unknown'} (${session.difficulty || 'N/A'}): score ${session.totalScore ?? 0}`)
      .join('\n')
    parts.push(`Interview sessions:
${interviewSummaries}`)
  }

  return parts.length ? `User progress context:
${parts.join('\n\n')}` : ''
}

async function callExternalAI(messages: Array<{ role: string; content: string }>, context?: ChatContext) {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return null
  }

  const systemMessage = {
    role: 'system',
    content:
      'You are a personalized career and learning coach. Use the user’s profile and progress context to provide a descriptive, step-by-step plan that reflects their skill levels, projects, and interview history. Answer in a detailed and personal way, using multiple paragraphs and practical next steps. Ask a follow-up question when helpful.',
  }

  const contextMessage = context ? { role: 'system', content: formatChatContext(context) } : undefined
  const requestMessages = contextMessage ? [systemMessage, contextMessage, ...messages] : [systemMessage, ...messages]

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4.1-mini',
      messages: requestMessages,
      temperature: 0.85,
      max_tokens: 700,
    }),
  })

  if (!response.ok) {
    return null
  }

  const data = await response.json().catch(() => null)
  return data?.choices?.[0]?.message?.content?.trim() ?? null
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null)
    const { messages, context } = body ?? {}

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Missing messages' }, { status: 400 })
    }

    const reply = await callClaude(messages, context)

    if (reply) {
      return NextResponse.json({ reply })
    }

    return NextResponse.json(
      { error: 'Unable to generate response from AI' },
      { status: 500 }
    )
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
