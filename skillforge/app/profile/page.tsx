'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface UserProfile {
  name: string
  email: string
  college: string
  targetRole: string
  bio: string
}

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [form, setForm] = useState<UserProfile>({
    name: '',
    email: '',
    college: '',
    targetRole: '',
    bio: ''
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
      return
    }

    if (session?.user) {
      // In a real app, fetch user profile data from API
      setForm({
        name: session.user.name || '',
        email: session.user.email || '',
        college: '',
        targetRole: '',
        bio: ''
      })
    }
  }, [session, status, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')

    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        setMessage(data.error || 'Failed to update profile')
        setSaving(false)
        return
      }

      setMessage('Profile updated successfully!')
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setMessage('Network error. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
          <p className="text-zinc-500">Manage your account information and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Preview */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 sticky top-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center text-black font-bold text-2xl mx-auto mb-4">
                  {getInitials(form.name)}
                </div>
                <h3 className="text-xl font-semibold mb-1">{form.name || 'Your Name'}</h3>
                <p className="text-zinc-500 text-sm mb-2">{form.email}</p>
                {form.targetRole && (
                  <p className="text-orange-400 text-sm font-medium">{form.targetRole}</p>
                )}
                {form.college && (
                  <p className="text-zinc-600 text-sm mt-2">{form.college}</p>
                )}
              </div>

              {form.bio && (
                <div className="mt-6 pt-6 border-t border-zinc-800">
                  <p className="text-zinc-400 text-sm">{form.bio}</p>
                </div>
              )}
            </div>
          </div>

          {/* Edit Form */}
          <div className="lg:col-span-2">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-6">Edit Profile</h2>

              {message && (
                <div className={`mb-6 p-4 rounded-lg text-sm ${
                  message.includes('successfully')
                    ? 'bg-green-500/10 border border-green-500/30 text-green-400'
                    : 'bg-red-500/10 border border-red-500/30 text-red-400'
                }`}>
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-zinc-400 text-sm mb-2 block">Full Name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-3 text-sm outline-none focus:border-orange-500 transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-zinc-400 text-sm mb-2 block">Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-3 text-sm outline-none focus:border-orange-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-zinc-400 text-sm mb-2 block">College/University</label>
                    <input
                      type="text"
                      value={form.college}
                      onChange={e => setForm({ ...form, college: e.target.value })}
                      placeholder="Your college or university"
                      className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-3 text-sm outline-none focus:border-orange-500 transition-colors placeholder:text-zinc-600"
                    />
                  </div>

                  <div>
                    <label className="text-zinc-400 text-sm mb-2 block">Target Role</label>
                    <input
                      type="text"
                      value={form.targetRole}
                      onChange={e => setForm({ ...form, targetRole: e.target.value })}
                      placeholder="e.g. Senior React Developer"
                      className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-3 text-sm outline-none focus:border-orange-500 transition-colors placeholder:text-zinc-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-zinc-400 text-sm mb-2 block">Bio</label>
                  <textarea
                    value={form.bio}
                    onChange={e => setForm({ ...form, bio: e.target.value })}
                    placeholder="Tell us about yourself and your career goals..."
                    rows={4}
                    className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-3 text-sm outline-none focus:border-orange-500 transition-colors placeholder:text-zinc-600 resize-none"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={saving}
                    className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-black font-bold py-3 px-6 rounded-lg text-sm transition-colors"
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>

                  <button
                    type="button"
                    onClick={() => router.push('/dashboard')}
                    className="bg-zinc-800 hover:bg-zinc-700 text-white font-medium py-3 px-6 rounded-lg text-sm transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}