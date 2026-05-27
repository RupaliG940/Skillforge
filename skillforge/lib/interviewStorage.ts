// Interview session storage utilities
export type InterviewSession = {
  id: string
  category: string
  categoryLabel: string
  startedAt: string
  completedAt?: string
  totalQuestions: number
  questionsAnswered: number
  totalScore: number
  duration: number
  answers: Array<{
    questionId: string
    question: string
    answer: string
    score?: number
    feedback?: string
  }>
  status: 'in-progress' | 'completed'
}

const STORAGE_KEY = 'skillforge_interviews'

export function getInterviewSessions(): InterviewSession[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (err) {
    console.error('Failed to load interview sessions', err)
    return []
  }
}

export function saveInterviewSession(session: InterviewSession): void {
  if (typeof window === 'undefined') return
  try {
    const sessions = getInterviewSessions()
    const existingIndex = sessions.findIndex((s) => s.id === session.id)
    if (existingIndex >= 0) {
      sessions[existingIndex] = session
    } else {
      sessions.unshift(session)
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions))
  } catch (err) {
    console.error('Failed to save interview session', err)
  }
}

export function deleteInterviewSession(sessionId: string): void {
  if (typeof window === 'undefined') return
  try {
    const sessions = getInterviewSessions().filter((s) => s.id !== sessionId)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions))
  } catch (err) {
    console.error('Failed to delete interview session', err)
  }
}

export function getSessionById(sessionId: string): InterviewSession | null {
  return getInterviewSessions().find((s) => s.id === sessionId) || null
}

export function getCompletedSessions(): InterviewSession[] {
  return getInterviewSessions().filter((s) => s.status === 'completed')
}

export function getActiveSession(): InterviewSession | null {
  return getInterviewSessions().find((s) => s.status === 'in-progress') || null
}

export function getSessionStats(sessions: InterviewSession[]) {
  if (sessions.length === 0) {
    return {
      totalSessions: 0,
      averageScore: 0,
      bestScore: 0,
      totalTimeSpent: 0,
      categoryBreakdown: {} as Record<string, { attempts: number; averageScore: number }>,
    }
  }

  const completedSessions = sessions.filter((s) => s.status === 'completed')
  const scores = completedSessions.map((s) => s.totalScore)
  const averageScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0
  const bestScore = scores.length > 0 ? Math.max(...scores) : 0
  const totalTimeSpent = completedSessions.reduce((sum, s) => sum + (s.duration || 0), 0)

  const categoryBreakdown: Record<string, { attempts: number; averageScore: number }> = {}
  completedSessions.forEach((session) => {
    if (!categoryBreakdown[session.category]) {
      categoryBreakdown[session.category] = { attempts: 0, averageScore: 0 }
    }
    categoryBreakdown[session.category].attempts += 1
    categoryBreakdown[session.category].averageScore = Math.round(
      (categoryBreakdown[session.category].averageScore * (categoryBreakdown[session.category].attempts - 1) +
        session.totalScore) /
        categoryBreakdown[session.category].attempts
    )
  })

  return {
    totalSessions: completedSessions.length,
    averageScore,
    bestScore,
    totalTimeSpent,
    categoryBreakdown,
  }
}
