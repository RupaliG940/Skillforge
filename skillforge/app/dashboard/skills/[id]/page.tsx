'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { SKILLS_SAMPLE } from '@/lib/phaseConstants'

type Skill = (typeof SKILLS_SAMPLE)[number]
const STORAGE_KEY = 'skillforge_skills'

export default function SkillDetailPage() {
  const params = useParams()
  const [skills, setSkills] = useState<Skill[]>(SKILLS_SAMPLE)

  useEffect(() => {
    const storedSkills = window.localStorage.getItem(STORAGE_KEY)
    if (storedSkills) {
      try {
        const parsed = JSON.parse(storedSkills)
        if (Array.isArray(parsed)) {
          setSkills(parsed)
        }
      } catch (err) {
        console.error('Failed to load saved skills', err)
      }
    }
  }, [])

  const skillId = Array.isArray(params.id) ? params.id[0] : params.id
  const skill = skills.find((item) => item.id === skillId)

  if (!skill) {
    return (
      <div className="min-h-[60vh] rounded-3xl border border-zinc-800 bg-zinc-950 p-8 text-zinc-400">
        Skill not found.
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">{skill.name}</h1>
          <p className="text-zinc-500">Track your {skill.category} progress and growth.</p>
        </div>
        <Link href="/dashboard/skills" className="rounded-full border border-zinc-800 bg-zinc-900 px-5 py-3 text-sm font-semibold text-white hover:border-orange-500 hover:text-orange-400 transition-colors">
          ← Back to Skills
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-8">
          <div className="mb-6">
            <div className="text-sm text-zinc-400">Current Level</div>
            <div className="text-5xl font-bold text-white">{skill.level}%</div>
          </div>
          <div className="mb-6 h-4 overflow-hidden rounded-full bg-zinc-900">
            <div className="h-4 rounded-full bg-orange-500" style={{ width: `${skill.level}%` }} />
          </div>
          <div className="space-y-4 text-zinc-300">
            <p>Category: {skill.category}</p>
            <p>Status: {skill.status}</p>
            <p>Last updated: {skill.lastUpdated}</p>
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-8 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-white mb-3">Resources</h2>
            <ul className="space-y-3 text-zinc-300">
              <li>• Learn advanced patterns with official docs</li>
              <li>• Watch project-based tutorials for {skill.name}</li>
              <li>• Build a mini app to sharpen your skills</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white mb-3">AI Suggestions</h2>
            <div className="rounded-3xl bg-zinc-900 p-4 text-zinc-300">
              Based on your current level, focus on project work and interview problems to move to the next stage.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
