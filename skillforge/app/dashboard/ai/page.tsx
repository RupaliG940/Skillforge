'use client'

import Link from 'next/link'
import ChatInterface from '@/components/ai/ChatInterface'

export default function AIGuidePage() {
  return (
    <div className="flex gap-6 h-[calc(100vh-120px)]">
      <aside className="w-72 rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-lg">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">AI Career Guide</p>
          <h1 className="mt-3 text-2xl font-semibold text-white">Your next career move</h1>
          <p className="mt-3 text-sm text-zinc-400">Use AI tools to improve your resume, roadmap, and job matching.</p>
        </div>

        <div className="space-y-3">
          <Link
            href="/dashboard/ai/roadmap"
            className="block rounded-3xl border border-zinc-800 bg-zinc-900 px-4 py-4 text-white hover:border-orange-500 hover:text-orange-400 transition-colors"
          >
            🗺️ Roadmap Planner
            <span className="block text-xs text-zinc-500 mt-1">Build a 30/60/90 day plan</span>
          </Link>
          <Link
            href="/dashboard/ai/resume"
            className="block rounded-3xl border border-zinc-800 bg-zinc-900 px-4 py-4 text-white hover:border-orange-500 hover:text-orange-400 transition-colors"
          >
            📄 Resume Review
            <span className="block text-xs text-zinc-500 mt-1">Improve your ATS score</span>
          </Link>
          <Link
            href="/dashboard/ai/job-match"
            className="block rounded-3xl border border-zinc-800 bg-zinc-900 px-4 py-4 text-white hover:border-orange-500 hover:text-orange-400 transition-colors"
          >
            🎯 Job Match
            <span className="block text-xs text-zinc-500 mt-1">Compare skills vs role</span>
          </Link>
          <Link
            href="/dashboard/ai/report"
            className="block rounded-3xl border border-zinc-800 bg-zinc-900 px-4 py-4 text-white hover:border-orange-500 hover:text-orange-400 transition-colors"
          >
            📊 Career Report
            <span className="block text-xs text-zinc-500 mt-1">Actionable growth insights</span>
          </Link>
        </div>

        <div className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-900 p-5 text-sm text-zinc-400">
          <p className="font-semibold text-white mb-3">Quick tips</p>
          <ul className="space-y-2">
            <li>• Focus on impact when you write projects.</li>
            <li>• Keep answers concise and structured.</li>
            <li>• Add key skills to your resume for ATS.</li>
          </ul>
        </div>
      </aside>

      <main className="flex-1 flex flex-col gap-6">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-lg">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Fast support</p>
              <h2 className="text-3xl font-semibold text-white">AI Career Assistant</h2>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-3xl bg-zinc-900 px-4 py-3 text-zinc-300">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Resume</p>
                <p className="mt-2 text-lg font-semibold text-white">Optimize</p>
              </div>
              <div className="rounded-3xl bg-zinc-900 px-4 py-3 text-zinc-300">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Roadmap</p>
                <p className="mt-2 text-lg font-semibold text-white">Plan</p>
              </div>
              <div className="rounded-3xl bg-zinc-900 px-4 py-3 text-zinc-300">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Job Match</p>
                <p className="mt-2 text-lg font-semibold text-white">Review</p>
              </div>
              <div className="rounded-3xl bg-zinc-900 px-4 py-3 text-zinc-300">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Report</p>
                <p className="mt-2 text-lg font-semibold text-white">Insights</p>
              </div>
            </div>
          </div>
        </div>

        <ChatInterface />
      </main>
    </div>
  )
}
