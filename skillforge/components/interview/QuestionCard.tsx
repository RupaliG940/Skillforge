'use client'

interface QuestionCardProps {
  question: string
  difficulty: string
  company?: string
  onAnswerChange: (value: string) => void
  answer: string
}

export default function QuestionCard({ question, difficulty, company, onAnswerChange, answer }: QuestionCardProps) {
  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <span className="rounded-full bg-orange-500/15 px-3 py-1 text-sm font-semibold text-orange-200">
          {difficulty}
        </span>
        {company && <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">{company}</span>}
      </div>
      <h2 className="text-2xl font-semibold text-white mb-4">{question}</h2>
      <textarea
        value={answer}
        onChange={(event) => onAnswerChange(event.target.value)}
        placeholder="Type your answer here..."
        className="min-h-[160px] w-full rounded-3xl border border-zinc-800 bg-zinc-950 px-5 py-4 text-white outline-none transition-colors focus:border-orange-400 focus:ring-2 focus:ring-orange-500/20 resize-none"
      />
    </div>
  )
}
