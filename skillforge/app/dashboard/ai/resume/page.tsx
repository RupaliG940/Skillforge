import ResumeAnalyzer from '@/components/ai/ResumeAnalyzer'

export default function AIResumeAudit() {
  return (
    <main className="space-y-8 px-6 py-8 md:px-10 lg:px-12">
      <div className="rounded-4xl border border-zinc-800 bg-zinc-950 p-8 shadow-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Resume Review</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Optimize your resume for tech roles</h1>
        <p className="mt-4 max-w-2xl text-zinc-300 leading-7">
          Get instant feedback on structure, keywords, and recruiter impact so you can apply with confidence.
        </p>
      </div>
      <ResumeAnalyzer />
    </main>
  )
}
