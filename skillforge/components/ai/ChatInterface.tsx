'use client'

import { useEffect, useState } from 'react'

interface Message {
  id: number
  role: 'user' | 'assistant'
  content: string
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      content:
        'Hello! Ask me anything about your career progress, resume, roadmap, company research, or university planning. I will use your personal profile and progress data to give a detailed answer.',
    },
  ])
  const [input, setInput] = useState('')
  const [contextData, setContextData] = useState<Record<string, any> | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadContext() {
      try {
        const [profileRes, skillsRes, projectsRes, interviewsRes] = await Promise.all([
          fetch('/api/profile'),
          fetch('/api/skills'),
          fetch('/api/projects'),
          fetch('/api/interviews'),
        ])

        const [profileData, skillsData, projectsData, interviewsData] = await Promise.all([
          profileRes.ok ? profileRes.json() : null,
          skillsRes.ok ? skillsRes.json() : null,
          projectsRes.ok ? projectsRes.json() : null,
          interviewsRes.ok ? interviewsRes.json() : null,
        ])

        let loadedSkills = skillsData?.skills ?? null
        if (typeof window !== 'undefined') {
          const storedSkills = window.localStorage.getItem('skillforge_skills')
          if (storedSkills) {
            try {
              const parsed = JSON.parse(storedSkills)
              if (Array.isArray(parsed)) {
                loadedSkills = parsed
              }
            } catch (err) {
              console.error('Failed to parse saved skills for chat context', err)
            }
          }
        }

        setContextData({
          profile: profileData?.user ?? null,
          skills: loadedSkills,
          projects: projectsData?.projects ?? null,
          interviews: interviewsData ?? null,
        })
      } catch (error) {
        console.error('Failed to load chat context', error)
      }
    }

    loadContext()
  }, [])

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      role: 'user',
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage], context: contextData }),
      })
      const data = await response.json()
      const assistantMessage: Message = {
        id: userMessage.id + 1,
        role: 'assistant',
        content: data.reply || 'Sorry, I could not generate a response right now.',
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      setError('Unable to reach AI assistant. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-full flex-col rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">AI Career Guide</p>
          <h2 className="text-2xl font-semibold text-white">Chat</h2>
        </div>
        <span className="rounded-full bg-orange-500/15 px-3 py-1 text-sm font-semibold text-orange-300">Live</span>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto pr-2">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`rounded-3xl p-4 ${
              message.role === 'assistant' ? 'bg-zinc-900 text-zinc-200' : 'bg-orange-500/10 text-white self-end'
            }`}
          >
            <p className="text-sm leading-6">{message.content}</p>
          </div>
        ))}
      </div>

      {contextData && (
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-3 text-sm text-zinc-400">
          <p className="font-medium text-white">Personal context loaded.</p>
          <p className="mt-1">Your chat will use your profile and progress data to generate more detailed, personalized guidance.</p>
        </div>
      )}

      {error && <div className="rounded-3xl bg-error/10 border border-error p-3 text-sm text-error">{error}</div>}

      <div className="mt-6 flex gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          className="flex-1 rounded-3xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-orange-400"
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          disabled={loading}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="rounded-3xl bg-orange-500 px-5 py-3 font-semibold text-black transition hover:bg-orange-600 disabled:opacity-50"
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  )
}
