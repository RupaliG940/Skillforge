import { Anthropic } from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

async function reviewAnswerWithClaude(
  question: string,
  answer: string
): Promise<any> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    console.error('Missing ANTHROPIC_API_KEY')
    return null
  }

  try {
    const client = new Anthropic({ apiKey })

    const systemPrompt = `You are an expert interview coach and communication specialist. Evaluate interview answers and provide detailed, constructive feedback.

Provide feedback in JSON format:
{
  "score": 0-100,
  "assessment": "Overall assessment",
  "strengths": ["Strength 1", "Strength 2"],
  "weaknesses": ["Weakness 1", "Weakness 2"],
  "details": {
    "structure": "Assessment of answer structure",
    "clarity": "Assessment of clarity",
    "specificity": "Assessment of specificity with examples",
    "relevance": "How relevant to the question"
  },
  "improvements": [
    {
      "area": "Area to improve",
      "current": "What you said/did",
      "suggested": "What to do instead",
      "impact": "Why this matters"
    }
  ],
  "improvedAnswer": "A better version of your answer",
  "tips": ["Tip 1", "Tip 2", "Tip 3"],
  "followUpPractice": ["Practice question 1", "Practice question 2"],
  "readinessLevel": "Ready/Needs work/Not ready"
}`

    const userPrompt = `Please review this interview answer:

Question: ${question}

Answer: ${answer}

Provide detailed feedback, scoring, specific improvements, and a better version of the answer.`

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
      return jsonMatch ? JSON.parse(jsonMatch[0]) : { error: 'Could not parse review' }
    } catch (parseError) {
      return { error: 'Failed to parse AI response', raw: textContent.text }
    }
  } catch (error) {
    console.error('Claude Review error:', error)
    return null
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null)
    const { answer, question } = body ?? {}

    if (!answer || !question) {
      return NextResponse.json({ error: 'Missing question or answer' }, { status: 400 })
    }

    const review = await reviewAnswerWithClaude(question, answer)

    if (review && !review.error) {
      return NextResponse.json(review)
    }

    // Fallback review
    return NextResponse.json({
      score: 75,
      assessment: 'Good answer with room for improvement',
      highlights: ['Clear structure', 'Relevant examples'],
      suggestions: [
        'Add more specific metrics and outcomes',
        'Explain your thought process more clearly',
        'Include what you learned from the experience',
      ],
      improvedAnswer: `${answer.slice(0, 100)}... [Enhanced with specific metrics, clear structure, and key takeaways]`,
      fallback: true,
    })
  } catch (error) {
    console.error('Answer review error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
