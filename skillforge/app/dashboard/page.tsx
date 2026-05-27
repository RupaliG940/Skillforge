import Link from 'next/link'
import { auth } from '@/auth'
import StatsCard from '@/components/StatsCard'
import ActivityFeed from '@/components/ActivityFeed'
import { Code, TrendingUp, FolderOpen, Calendar } from 'lucide-react'

export default async function DashboardPage() {
  const session = await auth()

  // Mock data - in a real app, this would come from the database
  const stats = {
    skillsTracked: 12,
    averageScore: 87,
    projectsCount: 3,
    learningStreak: 7
  }

  const userName = session?.user?.name || 'Developer'

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">
          Good morning, {userName.split(' ')[0]} 👋
        </h1>
        <p className="text-zinc-500">
          Ready to forge some new skills today?
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/dashboard/skills" className="block">
          <StatsCard
            title="Skills Tracked"
            value={stats.skillsTracked}
            icon={Code}
            color="text-blue-500"
          />
        </Link>
        <Link href="/dashboard/interview" className="block">
          <StatsCard
            title="Average Interview Score"
            value={`${stats.averageScore}%`}
            icon={TrendingUp}
            color="text-green-500"
          />
        </Link>
        <Link href="/dashboard/projects" className="block">
          <StatsCard
            title="Projects Completed"
            value={stats.projectsCount}
            icon={FolderOpen}
            color="text-purple-500"
          />
        </Link>
        <Link href="/dashboard/ai" className="block">
          <StatsCard
            title="Learning Streak"
            value={`${stats.learningStreak} days`}
            icon={Calendar}
            color="text-orange-500"
          />
        </Link>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                href="/dashboard/skills?mode=add"
                className="block w-full bg-orange-500 hover:bg-orange-600 text-black font-medium py-3 px-4 rounded-lg transition-colors text-left"
              >
                + Add New Skill
              </Link>
              <Link
                href="/dashboard/interview"
                className="block w-full bg-zinc-800 hover:bg-zinc-700 text-white font-medium py-3 px-4 rounded-lg transition-colors text-left"
              >
                📝 Log Interview
              </Link>
              <Link
                href="/dashboard/projects"
                className="block w-full bg-zinc-800 hover:bg-zinc-700 text-white font-medium py-3 px-4 rounded-lg transition-colors text-left"
              >
                🚀 Start New Project
              </Link>
              <Link
                href="/dashboard/ai"
                className="block w-full bg-zinc-800 hover:bg-zinc-700 text-white font-medium py-3 px-4 rounded-lg transition-colors text-left"
              >
                🤖 AI Skill Analysis
              </Link>
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="lg:col-span-2">
          <ActivityFeed />
        </div>
      </div>
    </div>
  )
}