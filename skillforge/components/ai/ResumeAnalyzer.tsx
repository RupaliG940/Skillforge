'use client'

import { useState } from 'react'

interface ResumeAnalysis {
  atsScore: number
  impactScore: number
  missingKeywords: string[]
  feedback: string
  suggestedHeadline?: string
}

export default function ResumeAnalyzer() {
  const [resumeText, setResumeText] = useState('')
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const analyze = async () => {
    if (!resumeText.trim()) return
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/ai/resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText }),
      })
      const data = await response.json()

      if (response.ok) {
        setAnalysis(data)
      } else {
        setError(data.error || 'Unable to analyze resume')
      }
    } catch (err) {
      setError('Unable to analyze resume. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-lg">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-white">Resume Analyzer</h2>
          <p className="text-zinc-400">Paste your resume text and get instant ATS feedback.</p>
        </div>
        <textarea
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          placeholder="Paste your resume text here..."
          className="w-full min-h-[240px] rounded-3xl border border-zinc-800 bg-zinc-900 px-4 py-4 text-white outline-none focus:border-orange-400"
        />
        <button
          onClick={analyze}
          disabled={loading}
          className="mt-4 rounded-3xl bg-orange-500 px-6 py-3 font-semibold text-black hover:bg-orange-600 transition-colors disabled:opacity-50"
        >
          {loading ? 'Analyzing...' : 'Analyze Resume'}
        </button>
      </div>

      {error && <div className="rounded-3xl border border-error bg-zinc-950 p-4 text-error">{error}</div>}

      {analysis && (
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">ATS Score</p>
              <p className="text-4xl font-bold text-white">{analysis.atsScore}%</p>
            </div>
            <div className="rounded-3xl bg-zinc-900 px-4 py-3 text-zinc-300">
              <p className="text-sm font-semibold text-white">Recruiter impact</p>
              <p className="text-xl font-bold text-orange-400">{analysis.impactScore}/10</p>
            </div>
          </div>
          <div className="space-y-3 text-zinc-300">
            <p>{analysis.feedback}</p>
            <p>
              Suggested headline: <span className="font-semibold text-white">{analysis.suggestedHeadline}</span>
            </p>
            <p>
              Missing keywords: <span className="font-semibold text-white">{analysis.missingKeywords.join(', ') || 'None'}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
