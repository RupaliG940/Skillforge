'use client'
import { signOut } from 'next-auth/react'
import { LogOut, Bell } from 'lucide-react'

interface NavbarProps {
  user: {
    name?: string | null
    email?: string | null
  }
}

export default function Navbar({ user }: NavbarProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const displayName = user.name || user.email || 'User'

  return (
    <header className="bg-zinc-900 border-b border-zinc-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-white">Dashboard</h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="p-2 text-zinc-400 hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
          </button>

          {/* User Avatar */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-black font-bold text-sm">
              {getInitials(displayName)}
            </div>
            <span className="text-sm text-zinc-300 hidden sm:block">
              {displayName}
            </span>
          </div>

          {/* Logout Button */}
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:block">Logout</span>
          </button>
        </div>
      </div>
    </header>
  )
}