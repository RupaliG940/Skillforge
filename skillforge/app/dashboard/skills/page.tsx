'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { SKILLS_SAMPLE } from '@/lib/phaseConstants'

type Skill = (typeof SKILLS_SAMPLE)[number]

export default function SkillsPage() {
  const searchParams = useSearchParams()
  const [selectedFilter, setSelectedFilter] = useState('All')
  const [skills, setSkills] = useState<Skill[]>(SKILLS_SAMPLE)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newSkillName, setNewSkillName] = useState('')
  const [newSkillCategory, setNewSkillCategory] = useState('Frontend')
  const [newSkillLevel, setNewSkillLevel] = useState(40)
  const [analysisResult, setAnalysisResult] = useState<string>('')
  const [analysisLoading, setAnalysisLoading] = useState(false)
  const [error, setError] = useState('')

  const STORAGE_KEY = 'skillforge_skills'
  const filters = ['All', 'Frontend', 'Backend', 'Data Science', 'DevOps', 'Soft Skills']

  useEffect(() => {
    const storedSkills = window.localStorage.getItem(STORAGE_KEY)
    if (storedSkills) {
      try {
        const parsed = JSON.parse(storedSkills)
        if (Array.isArray(parsed)) {
          setSkills(parsed)
        }
      } catch (err) {
        console.error('Failed to parse saved skills', err)
      }
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(skills))
  }, [skills])

  useEffect(() => {
    const mode = searchParams.get('mode')
    if (mode === 'add') {
      setShowAddModal(true)
    }
    if (mode === 'analyze') {
      handleAnalyzeSkills()
    }
  }, [searchParams])

  const filteredSkills = useMemo(
    () => (selectedFilter === 'All' ? skills : skills.filter((skill) => skill.category === selectedFilter)),
    [selectedFilter, skills]
  )

  const handleAddSkill = async () => {
    setError('')
    if (!newSkillName.trim()) {
      setError('Skill name is required.')
      return
    }

    try {
      const response = await fetch('/api/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newSkillName,
          category: newSkillCategory,
          level: newSkillLevel,
          status: newSkillLevel > 70 ? 'Advanced' : newSkillLevel > 40 ? 'Intermediate' : 'Learning',
        }),
      })
      const data = await response.json()
      if (!response.ok) {
        setError(data.error || 'Unable to add skill.')
        return
      }
      setSkills((current) => [data.skill, ...current])
      setNewSkillName('')
      setNewSkillCategory('Frontend')
      setNewSkillLevel(40)
      setShowAddModal(false)
    } catch (err) {
      setError('Unable to add skill. Please try again.')
    }
  }

  const handleAnalyzeSkills = async () => {
    setAnalysisLoading(true)
    setAnalysisResult('')
    setError('')

    try {
      const response = await fetch('/api/ai/skill-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skills: filteredSkills }),
      })
      const data = await response.json()
      if (!response.ok) {
        setError(data.error || 'Unable to analyze skills.')
      } else {
        setAnalysisResult(data.analysis.summary)
      }
    } catch (err) {
      setError('Unable to analyze skills. Please try again.')
    } finally {
      setAnalysisLoading(false)
    }
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">My Skills</h1>
          <p className="text-zinc-500">Track your skills, progress, and AI recommendations.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-black hover:bg-orange-600 transition-colors"
          >
            + Add Skill
          </button>
          <button
            type="button"
            onClick={handleAnalyzeSkills}
            disabled={analysisLoading}
            className="rounded-full border border-zinc-800 px-5 py-3 text-sm font-semibold text-white hover:border-orange-500 hover:text-orange-400 transition-colors disabled:opacity-50"
          >
            {analysisLoading ? 'Analyzing...' : '🤖 AI Analyze'}
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              selectedFilter === filter ? 'bg-orange-500 text-black' : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {error && <div className="rounded-3xl border border-error bg-zinc-950 p-4 text-error">{error}</div>}
      {analysisResult && (
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-300">
          <h2 className="text-xl font-semibold text-white mb-3">AI Skill Insight</h2>
          <p>{analysisResult}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredSkills.map((skill) => (
          <Link
            key={skill.id}
            href={`/dashboard/skills/${skill.id}`}
            className="group block rounded-3xl border border-zinc-800 bg-zinc-950 p-6 transition hover:-translate-y-1 hover:border-orange-500 hover:shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-white">{skill.name}</h2>
                <p className="text-zinc-400 text-sm">{skill.category}</p>
              </div>
              <span className="rounded-full bg-zinc-900 px-3 py-1 text-xs font-semibold text-zinc-300">{skill.status}</span>
            </div>
            <div className="mb-4 h-3 overflow-hidden rounded-full bg-zinc-900">
              <div className="h-3 rounded-full bg-orange-500" style={{ width: `${skill.level}%` }} />
            </div>
            <div className="flex justify-between text-sm text-zinc-400">
              <span>{skill.level}%</span>
              <span>{skill.lastUpdated}</span>
            </div>
          </Link>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6">
          <div className="mx-auto w-full max-w-xl rounded-3xl border border-zinc-800 bg-zinc-950 p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-white">Add a new skill</h2>
                <p className="text-zinc-400">Save a skill and track your progress over time.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-zinc-400 hover:text-white"
              >
                Close
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm text-zinc-400">Skill name</span>
                <input
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  className="w-full rounded-3xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-orange-500"
                  placeholder="React, TypeScript, SQL..."
                />
              </label>
              <label className="space-y-2">
                <span className="text-sm text-zinc-400">Category</span>
                <select
                  value={newSkillCategory}
                  onChange={(e) => setNewSkillCategory(e.target.value)}
                  className="w-full rounded-3xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-orange-500"
                >
                  {filters.slice(1).map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>
              <label className="space-y-2 sm:col-span-2">
                <span className="text-sm text-zinc-400">Current level</span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={newSkillLevel}
                  onChange={(e) => setNewSkillLevel(Number(e.target.value))}
                  className="w-full"
                />
                <p className="text-sm text-zinc-400">{newSkillLevel}% proficiency</p>
              </label>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="rounded-3xl border border-zinc-800 px-5 py-3 text-sm font-semibold text-white hover:border-orange-500 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddSkill}
                className="rounded-3xl bg-orange-500 px-5 py-3 text-sm font-semibold text-black hover:bg-orange-600 transition-colors"
              >
                Save Skill
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
