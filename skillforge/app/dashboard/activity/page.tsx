'use client'

import Link from 'next/link'

export default function DashboardActivityPage() {
  return (
    <div className="min-h-[calc(100vh-6rem)] px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Activity Feed</h1>
            <p className="text-text-secondary">Review your recent app actions and progress updates.</p>
          </div>
          <Link
            href="/dashboard"
            className="rounded-3xl bg-primary px-5 py-3 text-black font-semibold hover:bg-orange-600 transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl border border-border bg-card p-6">
            <p className="text-sm text-text-secondary">Today • 2 min ago</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Started a new interview practice session</h2>
            <p className="mt-2 text-text-secondary">Continue building your confidence with the latest mock interview.</p>
          </div>
          <div className="rounded-3xl border border-border bg-card p-6">
            <p className="text-sm text-text-secondary">Yesterday • 8:34 PM</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Opened the project idea generator</h2>
            <p className="mt-2 text-text-secondary">Explore AI-backed project concepts tailored to your skills.</p>
          </div>
          <div className="rounded-3xl border border-border bg-card p-6">
            <p className="text-sm text-text-secondary">Mar 2 • 11:20 AM</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Saved a new skill in your profile</h2>
            <p className="mt-2 text-text-secondary">Track your growth and get personalized recommendations.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
