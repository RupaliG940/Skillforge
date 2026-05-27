'use client'

import { useEffect, useState } from 'react'

interface ReportData {
  progressScore: number
  focusArea: string
  strengths: string[]
  improvements: string[]
  summary: string
  nextSteps: string[]
}

export default function CareerReport() {
  const [report, setReport] = useState<ReportData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true)
      setError('')
      try {
        const response = await fetch('/api/ai/report')
        const data = await response.json()
        setReport(data)
      } catch (err) {
        setError('Unable to load report. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchReport()
  }, [])

  if (loading) {
    return (
      <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-8 text-center text-white">
        Loading career report...
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-error bg-zinc-950 p-8 text-center text-white">
        {error}
      </div>
    )
  }

  if (!report) {
    return null
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-8 shadow-lg">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Weekly Career Report</p>
            <h2 className="text-3xl font-semibold text-white">Your progress dashboard</h2>
          </div>
          <div className="rounded-3xl bg-zinc-900 px-5 py-4 text-zinc-200">
            <p className="text-sm text-zinc-400">Focus Area</p>
            <p className="text-lg font-semibold text-white">{report.focusArea}</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3 mt-8">
          <div className="rounded-3xl bg-zinc-900 p-5">
            <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Progress Score</p>
            <p className="mt-3 text-4xl font-bold text-primary">{report.progressScore}%</p>
          </div>
          <div className="rounded-3xl bg-zinc-900 p-5">
            <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Strengths</p>
            <ul className="mt-3 space-y-2 text-zinc-300">
              {report.strengths.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl bg-zinc-900 p-5">
            <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Improvements</p>
            <ul className="mt-3 space-y-2 text-zinc-300">
              {report.improvements.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-8 shadow-lg">
        <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Action Plan</p>
        <h3 className="mt-3 text-xl font-semibold text-white">Next steps to strengthen your career profile</h3>
        <ul className="mt-4 space-y-3 text-zinc-300">
          {report.nextSteps.map((step) => (
            <li key={step} className="rounded-3xl bg-zinc-900 p-4">{step}</li>
          ))}
        </ul>
      </div>

      <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-8 shadow-lg">
        <p className="text-white leading-7">{report.summary}</p>
      </div>
    </div>
  )
}
