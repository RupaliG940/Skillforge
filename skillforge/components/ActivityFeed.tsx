interface ActivityItem {
  id: string
  type: 'skill' | 'project' | 'interview' | 'profile'
  title: string
  description: string
  timestamp: string
}

const mockActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'skill',
    title: 'Updated React skill',
    description: 'Increased proficiency from 75% to 80%',
    timestamp: '2 hours ago'
  },
  {
    id: '2',
    type: 'project',
    title: 'Completed SkillForge dashboard',
    description: 'Finished the main dashboard layout and components',
    timestamp: '1 day ago'
  },
  {
    id: '3',
    type: 'interview',
    title: 'Frontend Developer interview',
    description: 'Scored 85% at TechCorp interview',
    timestamp: '3 days ago'
  },
  {
    id: '4',
    type: 'profile',
    title: 'Updated profile',
    description: 'Added target role: Senior React Developer',
    timestamp: '1 week ago'
  }
]

import Link from 'next/link'

interface ActivityFeedProps {
  items?: ActivityItem[]
}

export default function ActivityFeed({ items }: ActivityFeedProps) {
  const activities = items && items.length > 0 ? items : mockActivities

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3 pb-4 border-b border-zinc-800 last:border-b-0 last:pb-0">
            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 shrink-0"></div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium text-sm">{activity.title}</p>
              <p className="text-zinc-500 text-sm">{activity.description}</p>
              <p className="text-zinc-600 text-xs mt-1">{activity.timestamp}</p>
            </div>
          </div>
        ))}
      </div>

      <Link
        href="/dashboard/activity"
        className="w-full mt-4 block text-center text-orange-400 hover:text-orange-300 text-sm font-medium transition-colors"
      >
        View all activity →
      </Link>
    </div>
  )
}