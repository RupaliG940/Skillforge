import CareerReport from '@/components/ai/CareerReport'

export default function AIReportPage() {
  return (
    <main className="space-y-8 px-6 py-8 md:px-10 lg:px-12">
      <div className="rounded-4xl border border-zinc-800 bg-zinc-950 p-8 shadow-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Career Report</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Track your progress with AI</h1>
        <p className="mt-4 max-w-2xl text-zinc-300 leading-7">
          Receive a concise report focused on your strengths, gaps, and high-impact next steps for job readiness.
        </p>
      </div>
      <CareerReport />
    </main>
  )
}
