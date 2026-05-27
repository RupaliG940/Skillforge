'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getCompletedSessions, getSessionStats, type InterviewSession } from '@/lib/interviewStorage'

export default function InterviewHistoryPage() {
  const [sessions, setSessions] = useState<InterviewSession[]>([])
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [stats, setStats] = useState({
    totalSessions: 0,
    averageScore: 0,
    bestScore: 0,
    totalTimeSpent: 0,
    categoryBreakdown: {} as Record<string, { attempts: number; averageScore: number }>,
  })

  useEffect(() => {
    const completedSessions = getCompletedSessions()
    setSessions(completedSessions)
    setStats(getSessionStats(completedSessions))
  }, [])

  const filteredSessions =
    selectedFilter === 'all'
      ? sessions
      : sessions.filter((session) => session.category === selectedFilter)

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  const getStatusBadge = (score: number) => {
    if (score >= 80) return { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400', label: '✅ Excellent' }
    if (score >= 60) return { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', label: '⚠️ Good' }
    return { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-400', label: '💡 Practice More' }
  }

  const categories = ['all', 'dsa', 'behavioral', 'system-design', 'hr', 'frontend', 'backend', 'communication']

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Interview History</h1>
        <p className="text-zinc-500">Review your past sessions and track your improvement</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
          <p className="text-zinc-500 text-sm mb-2">Total Attempts</p>
          <div className="text-3xl font-bold text-white">{stats.totalSessions}</div>
        </div>
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
          <p className="text-zinc-500 text-sm mb-2">Average Score</p>
          <div className="text-3xl font-bold text-orange-500">{stats.averageScore}%</div>
        </div>
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
          <p className="text-zinc-500 text-sm mb-2">Best Score</p>
          <div className="text-3xl font-bold text-green-500">{stats.bestScore}%</div>
        </div>
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
          <p className="text-zinc-500 text-sm mb-2">Total Time Invested</p>
          <div className="text-3xl font-bold text-blue-500">{formatTime(stats.totalTimeSpent)}</div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => {
          const categoryName =
            cat === 'all'
              ? 'All Sessions'
              : cat === 'dsa'
                ? 'DSA'
                : cat === 'behavioral'
                  ? 'Behavioral'
                  : cat === 'system-design'
                    ? 'System Design'
                    : cat === 'hr'
                      ? 'HR Round'
                      : cat === 'frontend'
                        ? 'Frontend'
                        : cat === 'backend'
                          ? 'Backend'
                          : 'Communication'

          return (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-4 py-2 rounded-3xl font-semibold transition-colors ${
                selectedFilter === cat
                  ? 'bg-orange-500 text-black'
                  : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
              }`}
            >
              {categoryName}
            </button>
          )
        })}
      </div>

      {/* Sessions List */}
      {filteredSessions.length > 0 ? (
        <div>
          <h2 className="text-xl font-bold text-white mb-4">{filteredSessions.length} Session(s) Found</h2>
          <div className="space-y-3">
            {filteredSessions.map((session) => {
              const statusBadge = getStatusBadge(session.totalScore)
              const sessionDate = new Date(session.completedAt || session.startedAt)
              const daysAgo = Math.floor(
                (Date.now() - sessionDate.getTime()) / (1000 * 60 * 60 * 24)
              )

              return (
                <div
                  key={session.id}
                  className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 hover:border-orange-500 transition-all"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-white">{session.categoryLabel} Interview</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadge.bg} ${statusBadge.border} border ${statusBadge.text}`}>
                          {statusBadge.label}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-zinc-400">
                        <div>
                          <span className="block text-xs text-zinc-500 mb-1">Date</span>
                          <span className="text-white font-medium">
                            {sessionDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                          {daysAgo === 0 && <span className="text-xs text-zinc-500">Today</span>}
                          {daysAgo === 1 && <span className="text-xs text-zinc-500">Yesterday</span>}
                          {daysAgo > 1 && <span className="text-xs text-zinc-500">{daysAgo}d ago</span>}
                        </div>
                        <div>
                          <span className="block text-xs text-zinc-500 mb-1">Questions</span>
                          <span className="text-white font-medium">{session.questionsAnswered}/{session.totalQuestions}</span>
                        </div>
                        <div>
                          <span className="block text-xs text-zinc-500 mb-1">Duration</span>
                          <span className="text-white font-medium">{formatTime(session.duration)}</span>
                        </div>
                        <div>
                          <span className="block text-xs text-zinc-500 mb-1">Session ID</span>
                          <span className="text-white font-medium text-xs">{session.id.slice(0, 12)}...</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <div className="text-center">
                        <p className="text-sm text-zinc-400">Score</p>
                        <p className="text-4xl font-bold text-orange-500">{session.totalScore}%</p>
                      </div>
                      <Link
                        href={`/dashboard/interview/history?sessionId=${session.id}`}
                        className="text-sm text-orange-400 hover:text-orange-300 font-semibold"
                      >
                        View Details →
                      </Link>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-4 flex gap-2 items-center">
                    <div className="flex-1 h-2 rounded-full bg-zinc-900 overflow-hidden">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          session.totalScore >= 80
                            ? 'bg-green-500'
                            : session.totalScore >= 60
                              ? 'bg-blue-500'
                              : 'bg-yellow-500'
                        }`}
                        style={{ width: `${session.totalScore}%` }}
                      />
                    </div>
                    <span className="text-xs text-zinc-400 w-10 text-right">{session.totalScore}%</span>
                  </div>

                  {/* Answers preview */}
                  {session.answers && session.answers.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-zinc-800">
                      <p className="text-xs text-zinc-400 font-semibold mb-2">Answered Questions:</p>
                      <div className="space-y-1">
                        {session.answers.slice(0, 3).map((answer, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-zinc-400">
                            <span className="text-orange-500 font-bold">Q{i + 1}:</span>
                            <span className="line-clamp-1">{answer.question}</span>
                            {answer.score && <span className="ml-auto text-orange-400 font-semibold">{answer.score}/100</span>}
                          </div>
                        ))}
                        {session.answers.length > 3 && (
                          <p className="text-xs text-zinc-500 ml-6">+{session.answers.length - 3} more questions</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-12 text-center">
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-white font-bold text-lg mb-2">No Sessions Yet</h3>
          <p className="text-zinc-400 mb-6">
            {selectedFilter === 'all'
              ? 'Start your first interview session to begin tracking your progress.'
              : 'No sessions found in this category.'}
          </p>
          <Link
            href="/dashboard/interview/session"
            className="inline-block px-6 py-3 bg-orange-500 hover:bg-orange-600 text-black font-semibold rounded-3xl transition-colors"
          >
            Start Interview Session
          </Link>
        </div>
      )}

      {/* Category Breakdown */}
      {Object.keys(stats.categoryBreakdown).length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Performance by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(stats.categoryBreakdown).map(([category, breakdown]) => (
              <div key={category} className="rounded-3xl border border-zinc-800 bg-zinc-950 p-4">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-white capitalize">{category}</h3>
                  <span className="text-sm text-zinc-400">{breakdown.attempts} attempt(s)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex-1 h-2 rounded-full bg-zinc-900 overflow-hidden mr-3">
                    <div
                      className="h-2 bg-linear-to-r from-orange-500 to-orange-400 rounded-full"
                      style={{ width: `${breakdown.averageScore}%` }}
                    />
                  </div>
                  <span className="text-lg font-bold text-orange-500 w-12 text-right">{breakdown.averageScore}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

