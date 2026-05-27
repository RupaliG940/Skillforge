'use client'

import { useState } from 'react'

type MatchResult = {
  matchScore: number
  recommendation: string
  hasSkills: string[]
  missingSkills: string[]
  timeToReady: string
  strategy: string
}

export default function JobMatcher() {
  const [description, setDescription] = useState('')
  const [result, setResult] = useState<MatchResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const analyze = async () => {
    if (!description.trim()) return

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/ai/job-match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description }),
      })
      const data = await response.json()

      if (response.ok) {
        setResult(data)
      } else {
        setError(data.error || 'Unable to analyze job description')
      }
    } catch (err) {
      setError('Unable to analyze job description. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-lg">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-white">Job Match Analyzer</h2>
          <p className="text-zinc-400">Paste the job description and compare it against your profile.</p>
        </div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Paste job description here..."
          className="w-full min-h-[220px] rounded-3xl border border-zinc-800 bg-zinc-900 px-4 py-4 text-white outline-none focus:border-orange-400"
        />
        <button
          onClick={analyze}
          disabled={loading}
          className="mt-4 rounded-3xl bg-orange-500 px-6 py-3 font-semibold text-black hover:bg-orange-600 transition-colors disabled:opacity-50"
        >
          {loading ? 'Analyzing...' : 'Analyze Job Match'}
        </button>
      </div>

      {error && <div className="rounded-3xl border border-error bg-zinc-950 p-4 text-error">{error}</div>}

      {result && (
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Match Score</p>
              <p className="text-4xl font-bold text-white">{result.matchScore}%</p>
            </div>
            <div className="rounded-3xl bg-zinc-900 px-4 py-3 text-zinc-300">
              <p className="text-sm font-semibold text-white">Recommendation</p>
              <p className="text-xl font-bold text-orange-400">{result.recommendation}</p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl bg-zinc-900 p-4">
              <p className="text-sm font-semibold text-white mb-3">Skills you have</p>
              <ul className="space-y-2 text-zinc-300 text-sm">
                {result.hasSkills.map((skill) => (
                  <li key={skill}>• {skill}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl bg-zinc-900 p-4">
              <p className="text-sm font-semibold text-white mb-3">Skills missing</p>
              <ul className="space-y-2 text-zinc-300 text-sm">
                {result.missingSkills.map((skill) => (
                  <li key={skill}>• {skill}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-6 space-y-4 text-zinc-300">
            <p>
              <span className="font-semibold text-white">Time to Ready:</span> {result.timeToReady}
            </p>
            <p>
              <span className="font-semibold text-white">Strategy:</span> {result.strategy}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
