'use client'

import { PROFILE_SAMPLE } from '@/lib/phaseConstants'

export default function ProfilePage() {
  const profile = PROFILE_SAMPLE

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">Profile</h1>
          <p className="text-zinc-500">Manage your account details and career preferences.</p>
        </div>
        <button className="rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-black hover:bg-orange-600 transition-colors">
          Edit Profile
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-8 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-white mb-3">About You</h2>
            <p className="text-zinc-300">{profile.bio}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-zinc-900 p-4">
              <h3 className="text-sm text-zinc-400">Full Name</h3>
              <p className="text-white font-semibold">{profile.name}</p>
            </div>
            <div className="rounded-3xl bg-zinc-900 p-4">
              <h3 className="text-sm text-zinc-400">Target Role</h3>
              <p className="text-white font-semibold">{profile.targetRole}</p>
            </div>
            <div className="rounded-3xl bg-zinc-900 p-4">
              <h3 className="text-sm text-zinc-400">College</h3>
              <p className="text-white font-semibold">{profile.college}</p>
            </div>
            <div className="rounded-3xl bg-zinc-900 p-4">
              <h3 className="text-sm text-zinc-400">Graduation Year</h3>
              <p className="text-white font-semibold">{profile.graduationYear}</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-zinc-900 p-4">
              <h3 className="text-sm text-zinc-400">GitHub</h3>
              <p className="text-white font-semibold">{profile.githubUsername}</p>
            </div>
            <div className="rounded-3xl bg-zinc-900 p-4">
              <h3 className="text-sm text-zinc-400">LinkedIn</h3>
              <a className="text-orange-400 hover:text-orange-300" href={profile.linkedinUrl} target="_blank" rel="noreferrer">
                {profile.linkedinUrl}
              </a>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-8 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-white mb-3">Stats</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-3xl bg-zinc-900 p-4">
                <span className="text-zinc-400">Member since</span>
                <span className="text-white font-semibold">{profile.memberSince}</span>
              </div>
              <div className="flex items-center justify-between rounded-3xl bg-zinc-900 p-4">
                <span className="text-zinc-400">XP points</span>
                <span className="text-white font-semibold">{profile.xp}</span>
              </div>
              <div className="flex items-center justify-between rounded-3xl bg-zinc-900 p-4">
                <span className="text-zinc-400">Level</span>
                <span className="text-white font-semibold">{profile.level}</span>
              </div>
              <div className="flex items-center justify-between rounded-3xl bg-zinc-900 p-4">
                <span className="text-zinc-400">Streak</span>
                <span className="text-white font-semibold">{profile.streak} days</span>
              </div>
            </div>
          </div>
          <div className="rounded-3xl bg-zinc-900 p-5 text-zinc-300">
            <h3 className="text-sm font-semibold text-white mb-3">Career snapshot</h3>
            <p>Keep your profile updated to get better AI recommendations and project ideas tailored to your goals.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
