'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signIn } from 'next-auth/react'

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const email = form.email.trim().toLowerCase()
    const res = await signIn('credentials', {
      email,
      password: form.password,
      redirect: false,
    })

    if (res?.error) {
      setError(res.error === 'CredentialsSignin' ? 'Invalid email or password' : res.error)
      setLoading(false)
      return
    }

    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-3xl">⚒️</span>
            <h1 className="text-3xl font-bold text-white">SkillForge</h1>
          </div>
          <p className="text-zinc-500 text-sm">Forge your future, one skill at a time</p>
        </div>

        {/* Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
          <h2 className="text-white text-xl font-semibold mb-1">Welcome back</h2>
          <p className="text-zinc-500 text-sm mb-6">Continue forging your career path</p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-zinc-400 text-sm mb-1.5 block">Email</label>
              <input
                type="email"
                autoComplete="email"
                placeholder="you@email.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                required
                className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-3 text-sm outline-none focus:border-orange-500 transition-colors placeholder:text-zinc-600"
              />
            </div>

            <div>
              <label className="text-zinc-400 text-sm mb-1.5 block">Password</label>
              <input
                type="password"
                autoComplete="current-password"
                placeholder="Your password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
                className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-3 text-sm outline-none focus:border-orange-500 transition-colors placeholder:text-zinc-600"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-black font-bold py-3 rounded-lg text-sm transition-colors mt-2"
            >
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>
          </form>

          <p className="text-zinc-600 text-sm text-center mt-6">
            Don't have an account?{' '}
            <Link href="/register" className="text-orange-400 hover:text-orange-300 transition-colors">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
