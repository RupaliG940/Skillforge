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

const fallbackResponses = [
  'Describe your exact goal and I will turn it into a concrete study, project, or interview plan.',
  'Give me the role, company, university, or topic you want and I will answer with practical next steps.',
  'Base your next action on one strong project, one resume improvement, and one interview or learning step this week.',
]

function getReplyForPrompt(prompt: string) {
  const text = prompt.toLowerCase()

  if (text.includes('tcs') || text.includes('nqt') || text.includes('technical round') || text.includes('technical interview')) {
    return 'For the TCS technical round, focus on core CS fundamentals such as arrays, strings, linked lists, sorting, and object-oriented programming. Practice 10-15 coding problems, review DBMS and OS basics, and prepare to explain one project clearly. Speak through your logic, keep answers concise, and show how your skills match the role.'
  }

  if (text.includes('resume') || text.includes('ats') || text.includes('headline') || text.includes('cv')) {
    return 'To improve your resume, highlight measurable achievements, use relevant keywords from the role, and clearly show the technologies you used. Write strong bullets with outcomes and keep the summary concise and role-specific.'
  }

  if (text.includes('roadmap') || text.includes('plan') || text.includes('schedule') || text.includes('learning path')) {
    return 'A strong roadmap begins with fundamentals, then moves to a practical project, followed by interview preparation, and finishes with portfolio presentation. I can help you build a 30/60/90 day plan tailored to your goals.'
  }

  if (text.includes('job') || text.includes('description') || text.includes('role') || text.includes('company')) {
    return 'Share the exact job description or role details and I will tell you what to emphasize in your resume, what skills to polish, and how to prepare for the interview.'
  }

  if (text.includes('interview') || text.includes('behavioral') || text.includes('dsa') || text.includes('system design') || text.includes('hr round')) {
    return 'For interviews, answer behavioral questions using STAR and technical questions by explaining the problem, approach, edge cases, and result. I can also give you sample answers or walk you through problem structure.'
  }

  if (text.includes('cloud') || text.includes('aws') || text.includes('gcp') || text.includes('azure') || text.includes('devops')) {
    return 'When discussing cloud skills, mention a real architecture, the services you used, and how you solved deployment or security challenges. That makes your answer concrete and practical.'
  }

  if (text.includes('skill') || text.includes('learning') || text.includes('practice') || text.includes('improve')) {
    return 'Focus on one skill at a time, build a small project around it, and practice related interview questions. I can help you choose the best next activity based on your current strengths.'
  }

  if (text.includes('university') || text.includes('college') || text.includes('admission') || text.includes('course') || text.includes('study abroad')) {
    return 'Tell me the program, country, or study area. I can help with admissions strategy, course selection, eligibility, and how to compare schools.'
  }

  if (text.includes('company') || text.includes('interview at') || text.includes('hiring') || text.includes('process') || text.includes('about') || text.includes('information')) {
    return 'I can help with company information, role expectations, interview preparation, and comparisons. Send me the company name or details and I will give you relevant insights or preparation steps.'
  }

  if (/(who|what|when|where|why|how|explain|difference|compare)\b/.test(text)) {
    return 'Ask any question about companies, universities, roles, or general topics. I can give you a concise answer, explain concepts, compare options, or suggest the next steps.'
  }

  const fallbackIndex = Math.floor(Math.random() * fallbackResponses.length)
  return fallbackResponses[fallbackIndex]
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
  const body = await request.json().catch(() => null)
  const { messages, context } = body ?? {}

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: 'Missing messages' }, { status: 400 })
  }

  const aiReply = await callExternalAI(messages, context)
  if (aiReply) {
    return NextResponse.json({ reply: aiReply })
  }

  const lastUserMessage = messages.slice().reverse().find((message: any) => message.role === 'user')
  const prompt = lastUserMessage?.content?.toString() || ''
  const reply = getReplyForPrompt(prompt)

  return NextResponse.json({ reply })
}
