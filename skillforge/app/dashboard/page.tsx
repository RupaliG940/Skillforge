import Link from 'next/link'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import StatsCard from '@/components/StatsCard'
import ActivityFeed from '@/components/ActivityFeed'
import { Code, TrendingUp, FolderOpen, Calendar } from 'lucide-react'

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric'
  }).format(date)
}

function computeStreak(sessions: Array<{ createdAt: Date }>) {
  const daySet = new Set(sessions.map((session) => new Date(session.createdAt).toDateString()))
  let streak = 0
  const today = new Date()
  let current = new Date(today)

  while (daySet.has(current.toDateString())) {
    streak += 1
    current.setDate(current.getDate() - 1)
  }

  return streak
}

export default async function DashboardPage() {
  const session = await auth()

  const user = session?.user?.id
    ? await prisma.user.findUnique({
        where: { id: session.user.id },
        include: {
          skills: { orderBy: { updatedAt: 'desc' }, take: 4 },
          projects: { orderBy: { updatedAt: 'desc' }, take: 4 },
          interviews: { orderBy: { createdAt: 'desc' }, take: 4 },
          _count: { select: { skills: true, projects: true, interviews: true } }
        }
      })
    : null

  const stats = {
    skillsTracked: user?._count.skills ?? 0,
    averageScore: user?.interviews?.length
      ? Math.round(user.interviews.reduce((total, interview) => total + interview.score, 0) / user.interviews.length)
      : 0,
    projectsCount: user?.projects?.filter((project) => project.progress >= 100 || project.status.toLowerCase() === 'completed').length ?? 0,
    learningStreak: user?.streak ?? 0
  }

  const recentActivities = [
    ...((user?.interviews ?? []).slice(0, 2).map((interview) => ({
      id: interview.id,
      type: 'interview' as const,
      title: `Finished ${interview.category || 'Interview'} session`,
      description: `Score ${interview.score}% for ${interview.role || 'practice'} session`,
      timestamp: formatDate(new Date(interview.createdAt))
    }))),
    ...((user?.projects ?? []).slice(0, 2).map((project) => ({
      id: project.id,
      type: 'project' as const,
      title: project.progress >= 100 ? `Completed ${project.name}` : `Updated ${project.name}`,
      description: project.progress >= 100
        ? 'Project is complete and ready to showcase.'
        : `Progress ${project.progress}% • ${project.status}`,
      timestamp: formatDate(new Date(project.updatedAt))
    }))),
    ...((user?.skills ?? []).slice(0, 2).map((skill) => ({
      id: skill.id,
      type: 'skill' as const,
      title: `Tracked ${skill.name}`,
      description: `Level ${skill.level}% • ${skill.category}`,
      timestamp: formatDate(new Date(skill.updatedAt))
    })))
  ].slice(0, 4)

  const userName = user?.name?.split(' ')[0] ?? 'Developer'
  const targetRole = user?.targetRole ?? 'your next role'

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
          <ActivityFeed items={recentActivities} />
        </div>
      </div>
    </div>
  )
}