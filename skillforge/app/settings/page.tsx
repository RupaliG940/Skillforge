import { auth } from '@/auth'
import Link from 'next/link'

export default async function SettingsPage() {
  const session = await auth()
  const user = session?.user

  return (
    <div className="space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-4xl border border-zinc-800 bg-zinc-950 p-8 shadow-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Account Settings</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Manage your profile and preferences</h1>
        <p className="mt-4 max-w-2xl text-zinc-400 leading-7">
          Update your account details, review security settings, and connect your career tools in one place.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-4xl border border-zinc-800 bg-zinc-950 p-8 shadow-lg">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-white">Profile</h2>
            <p className="text-zinc-400 mt-2">Your account details and contact info.</p>
          </div>
          <div className="grid gap-4">
            <div className="rounded-3xl bg-zinc-900 p-5">
              <p className="text-sm text-zinc-400">Name</p>
              <p className="text-white font-semibold mt-1">{user?.name || 'No name available'}</p>
            </div>
            <div className="rounded-3xl bg-zinc-900 p-5">
              <p className="text-sm text-zinc-400">Email</p>
              <p className="text-white font-semibold mt-1">{user?.email || 'Not signed in'}</p>
            </div>
            <div className="rounded-3xl bg-zinc-900 p-5">
              <p className="text-sm text-zinc-400">Member since</p>
              <p className="text-white font-semibold mt-1">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        <div className="rounded-4xl border border-zinc-800 bg-zinc-950 p-8 shadow-lg">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-white">Connected tools</h2>
            <p className="text-zinc-400 mt-2">Link external accounts and keep your career data synced.</p>
          </div>
          <div className="space-y-4">
            <div className="rounded-3xl bg-zinc-900 p-5">
              <p className="text-sm text-zinc-400">GitHub</p>
              <p className="text-white font-semibold mt-1">Connected</p>
            </div>
            <div className="rounded-3xl bg-zinc-900 p-5">
              <p className="text-sm text-zinc-400">LinkedIn</p>
              <p className="text-white font-semibold mt-1">Connected</p>
            </div>
            <Link
              href="/profile"
              className="block rounded-3xl bg-orange-500 px-4 py-3 text-center font-semibold text-black hover:bg-orange-600 transition-colors"
            >
              Edit Profile Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
