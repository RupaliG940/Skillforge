'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  User,
  Code,
  MessageSquare,
  FolderOpen,
  Bot,
  Settings,
  ChevronDown,
} from 'lucide-react'
import { useState } from 'react'

export default function Sidebar() {
  const pathname = usePathname()
  const [expanded, setExpanded] = useState<string | null>(null)

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')
  const toggleExpanded = (name: string) => setExpanded(expanded === name ? null : name)

  return (
    <div className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-zinc-800">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="text-2xl">⚒️</span>
          <span className="text-xl font-bold text-white">SkillForge</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {/* Dashboard */}
          <li>
            <Link
              href="/dashboard"
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive('/dashboard') && pathname === '/dashboard'
                  ? 'bg-orange-500 text-black'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              )}
            >
              <LayoutDashboard className="w-5 h-5" />
              Dashboard
            </Link>
          </li>

          {/* Skills */}
          <li>
            <Link
              href="/dashboard/skills"
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive('/dashboard/skills')
                  ? 'bg-orange-500 text-black'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              )}
            >
              <Code className="w-5 h-5" />
              Skills
            </Link>
          </li>

          {/* Interview - with submenu */}
          <li>
            <button
              onClick={() => toggleExpanded('interview')}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive('/dashboard/interview')
                  ? 'bg-zinc-800 text-white'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              )}
            >
              <MessageSquare className="w-5 h-5" />
              Interview Coach
              <ChevronDown className={cn('w-4 h-4 ml-auto transition-transform', expanded === 'interview' && 'rotate-180')} />
            </button>
            {expanded === 'interview' && (
              <ul className="ml-4 mt-1 space-y-1">
                <li>
                  <Link
                    href="/dashboard/interview"
                    className={cn(
                      'block px-3 py-2 rounded text-sm transition-colors',
                      pathname === '/dashboard/interview'
                        ? 'text-orange-500'
                        : 'text-zinc-400 hover:text-white'
                    )}
                  >
                    Overview
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/interview/session"
                    className={cn(
                      'block px-3 py-2 rounded text-sm transition-colors',
                      pathname === '/dashboard/interview/session'
                        ? 'text-orange-500'
                        : 'text-zinc-400 hover:text-white'
                    )}
                  >
                    New Session
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/interview/history"
                    className={cn(
                      'block px-3 py-2 rounded text-sm transition-colors',
                      pathname === '/dashboard/interview/history'
                        ? 'text-orange-500'
                        : 'text-zinc-400 hover:text-white'
                    )}
                  >
                    History
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Projects */}
          <li>
            <Link
              href="/dashboard/projects"
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive('/dashboard/projects')
                  ? 'bg-orange-500 text-black'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              )}
            >
              <FolderOpen className="w-5 h-5" />
              Projects
            </Link>
          </li>

          {/* AI Guide */}
          <li>
            <Link
              href="/dashboard/ai"
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive('/dashboard/ai')
                  ? 'bg-orange-500 text-black'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              )}
            >
              <Bot className="w-5 h-5" />
              AI Guide
            </Link>
          </li>

          {/* Profile */}
          <li>
            <Link
              href="/profile"
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive('/profile')
                  ? 'bg-orange-500 text-black'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              )}
            >
              <User className="w-5 h-5" />
              Profile
            </Link>
          </li>

          {/* Settings */}
          <li>
            <Link
              href="/settings"
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive('/settings')
                  ? 'bg-orange-500 text-black'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              )}
            >
              <Settings className="w-5 h-5" />
              Settings
            </Link>
          </li>
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-zinc-800">
        <p className="text-xs text-zinc-600 text-center">
          Forge your future, one skill at a time
        </p>
      </div>
    </div>
  )
}