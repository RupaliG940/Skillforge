'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { INTERVIEW_CATEGORIES } from '@/lib/constants'
import { getInterviewSessions, getCompletedSessions, getSessionStats, type InterviewSession } from '@/lib/interviewStorage'

export default function InterviewPage() {
  const [allSessions, setAllSessions] = useState<InterviewSession[]>([])
  const [completedSessions, setCompletedSessions] = useState<InterviewSession[]>([])
  const [stats, setStats] = useState({
    totalSessions: 0,
    averageScore: 0,
    bestScore: 0,
    totalTimeSpent: 0,
    categoryBreakdown: {} as Record<string, { attempts: number; averageScore: number }>,
  })

  useEffect(() => {
    const sessions = getInterviewSessions()
    const completed = getCompletedSessions()
    const sessionStats = getSessionStats(sessions)

    setAllSessions(sessions)
    setCompletedSessions(completed)
    setStats(sessionStats)
  }, [])

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Interview Coach</h1>
          <p className="text-zinc-500">Master your interviews with AI-powered practice</p>
        </div>
        <Link
          href="/dashboard/interview/session"
          className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-black font-semibold rounded-3xl transition-colors"
        >
          + New Session
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
          <p className="text-zinc-500 text-sm mb-2">Total Attempts</p>
          <div className="text-3xl font-bold text-orange-500">{stats.totalSessions}</div>
        </div>
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
          <p className="text-zinc-500 text-sm mb-2">Average Score</p>
          <div className="text-3xl font-bold text-white">{stats.averageScore}%</div>
        </div>
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
          <p className="text-zinc-500 text-sm mb-2">Best Performance</p>
          <div className="text-3xl font-bold text-green-500">{stats.bestScore}%</div>
        </div>
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
          <p className="text-zinc-500 text-sm mb-2">Time Invested</p>
          <div className="text-3xl font-bold text-blue-500">{formatTime(stats.totalTimeSpent)}</div>
        </div>
      </div>

      {/* Practice Categories */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Practice Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {INTERVIEW_CATEGORIES.map((cat) => {
            const breakdown = stats.categoryBreakdown[cat.id]
            const attempts = breakdown?.attempts || 0
            const avgScore = breakdown?.averageScore || 0

            return (
              <Link
                key={cat.id}
                href={`/dashboard/interview/session?category=${cat.id}`}
                className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/20 transition-all"
              >
                <div className="text-4xl mb-3">{cat.emoji}</div>
                <h3 className="text-xl font-bold text-white mb-1">{cat.label}</h3>
                <p className="text-zinc-400 text-sm mb-4">{attempts > 0 ? `${attempts} attempts` : 'Not started'}</p>
                {attempts > 0 && (
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-zinc-400">Avg Score</span>
                      <span className="text-orange-400 font-semibold">{avgScore}%</span>
                    </div>
                    <div className="w-full bg-zinc-900 rounded-full h-2">
                      <div
                        className="bg-orange-500 h-2 rounded-full transition-all"
                        style={{ width: `${avgScore}%` }}
                      />
                    </div>
                  </div>
                )}
              </Link>
            )
          })}
        </div>
      </div>

      {/* Recent Sessions */}
      {completedSessions.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Recent Sessions</h2>
          <div className="space-y-3">
            {completedSessions.slice(0, 5).map((session) => (
              <Link
                key={session.id}
                href={`/dashboard/interview/history`}
                className="rounded-3xl border border-zinc-800 bg-zinc-950 p-4 hover:border-orange-500 transition-all"
              >
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <h3 className="text-white font-semibold mb-2">
                      {session.categoryLabel} Interview
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-zinc-400">
                      <span>📅 {new Date(session.completedAt || session.startedAt).toLocaleDateString()}</span>
                      <span>📊 {session.questionsAnswered} / {session.totalQuestions} questions</span>
                      <span>⏱️ {formatTime(session.duration)}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-orange-500">{session.totalScore}%</div>
                    <div className="text-xs text-zinc-400 mt-1">
                      {session.totalScore >= 80
                        ? '✅ Excellent'
                        : session.totalScore >= 60
                          ? '⚠️ Good'
                          : '❌ Practice More'}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {completedSessions.length === 0 && (
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-8 text-center">
          <div className="text-5xl mb-4">🎙️</div>
          <h3 className="text-white font-bold text-lg mb-2">No Sessions Yet</h3>
          <p className="text-zinc-400 mb-6">Start a new interview session to begin practicing and track your progress.</p>
          <Link
            href="/dashboard/interview/session"
            className="inline-block px-6 py-3 bg-orange-500 hover:bg-orange-600 text-black font-semibold rounded-3xl transition-colors"
          >
            Start Your First Session
          </Link>
        </div>
      )}
    </div>
  )
}
