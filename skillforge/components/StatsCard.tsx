import { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  color?: string
}

export default function StatsCard({ title, value, icon: Icon, color = 'text-orange-500' }: StatsCardProps) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-zinc-500 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-lg bg-zinc-800 ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  )
}