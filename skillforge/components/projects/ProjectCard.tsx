'use client'

import Link from 'next/link'

interface ProjectCardProps {
  id: string
  name: string
  description: string
  stack: string[]
  progress: number
  status: string
  impact: number
}

export default function ProjectCard({ id, name, description, stack, progress, status, impact }: ProjectCardProps) {
  return (
    <Link href={`/dashboard/projects/${id}`} className="block">
      <div className="h-full rounded-3xl border border-zinc-800 bg-zinc-950 p-6 transition hover:-translate-y-1 hover:border-orange-500 hover:shadow-xl hover:shadow-orange-500/10">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white">{name}</h3>
            <p className="text-sm text-zinc-400">{description}</p>
          </div>
          <span className="rounded-full bg-orange-500/15 px-3 py-1 text-xs font-semibold text-orange-300">
            {status}
          </span>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {stack.map((item) => (
            <span key={item} className="rounded-full bg-zinc-900 px-3 py-1 text-xs text-zinc-300">
              {item}
            </span>
          ))}
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-xs text-zinc-500 mb-2">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 rounded-full bg-zinc-900">
            <div className="h-2 rounded-full bg-orange-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="rounded-3xl bg-zinc-900 p-3 text-sm text-zinc-300">
          Recruiter impact: <span className="font-semibold text-white">{impact}/10</span>
        </div>
      </div>
    </Link>
  )
}
