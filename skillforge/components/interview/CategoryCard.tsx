'use client'

import Link from 'next/link'

interface CategoryCardProps {
  title: string
  subtitle: string
  details: string
  variant: 'blue' | 'purple' | 'cyan' | 'yellow'
  href: string
}

const variantClasses = {
  blue: 'bg-blue-500/15 border-blue-500/30 text-blue-300',
  purple: 'bg-purple-500/15 border-purple-500/30 text-purple-300',
  cyan: 'bg-cyan-500/15 border-cyan-500/30 text-cyan-300',
  yellow: 'bg-yellow-500/15 border-yellow-500/30 text-yellow-300',
}

export default function CategoryCard({ title, subtitle, details, variant, href }: CategoryCardProps) {
  return (
    <Link
      href={href}
      className={`group block rounded-3xl border p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl ${variantClasses[variant]}`}
    >
      <div className="flex items-center justify-between mb-4 gap-3">
        <div>
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <p className="text-sm text-zinc-400 mt-1">{subtitle}</p>
        </div>
        <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/80">
          View
        </span>
      </div>
      <p className="text-zinc-300 leading-relaxed">{details}</p>
    </Link>
  )
}
