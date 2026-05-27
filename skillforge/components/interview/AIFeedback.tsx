'use client'

interface AIFeedbackProps {
  strengths: string[]
  improvements: string[]
  summary: string
}

export default function AIFeedback({ strengths, improvements, summary }: AIFeedbackProps) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white">AI Feedback</h3>
        <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">Real-time</span>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl bg-green-500/10 p-4">
          <h4 className="text-sm font-semibold text-green-300 mb-3">What was good</h4>
          <ul className="space-y-2 text-zinc-300 text-sm">
            {strengths.map((item, index) => (
              <li key={index}>• {item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl bg-yellow-500/10 p-4">
          <h4 className="text-sm font-semibold text-yellow-300 mb-3">What to improve</h4>
          <ul className="space-y-2 text-zinc-300 text-sm">
            {improvements.map((item, index) => (
              <li key={index}>• {item}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-5 rounded-3xl bg-zinc-900 border border-zinc-800 p-4 text-zinc-300">
        <p className="text-sm font-semibold text-white mb-2">Improved version</p>
        <p className="text-sm leading-relaxed">{summary}</p>
      </div>
    </div>
  )
}
