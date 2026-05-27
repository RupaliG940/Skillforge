'use client'

import { useState } from 'react'
import { ROADMAP_DURATIONS } from '@/lib/constants'

type RoadmapItem = {
  week: number
  title: string
  tasks: string[]
}

export default function RoadmapPlanner() {
  const [duration, setDuration] = useState('30')
  const [roadmap, setRoadmap] = useState<RoadmapItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const generateRoadmap = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/ai/roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ duration }),
      })

      if (!response.ok) {
        throw new Error('Unable to generate roadmap')
      }

      const data = await response.json()
      setRoadmap(Array.isArray(data) ? data : data.roadmap || [])
    } catch (err) {
      setError('Unable to generate roadmap. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-lg">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Roadmap Planner</p>
            <h2 className="text-2xl font-semibold text-white">Generate a career roadmap</h2>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="rounded-3xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-primary"
            >
              {ROADMAP_DURATIONS.map((value) => (
                <option key={value} value={value}>
                  {value}-Day Plan
                </option>
              ))}
            </select>
            <button
              onClick={generateRoadmap}
              className="rounded-3xl bg-primary px-5 py-3 text-black font-semibold hover:bg-orange-600 transition-colors"
            >
              {loading ? 'Generating...' : 'Generate'}
            </button>
          </div>
        </div>

        {error && <p className="mt-4 text-sm text-error">{error}</p>}
      </div>

      {roadmap.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          {roadmap.map((item) => (
            <div key={item.week} className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-zinc-400">Week {item.week}</span>
                <span className="rounded-full bg-primary px-3 py-1 text-black text-xs font-semibold">Milestone</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
              <ul className="space-y-2 text-zinc-300">
                {item.tasks.map((task) => (
                  <li key={task}>• {task}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
