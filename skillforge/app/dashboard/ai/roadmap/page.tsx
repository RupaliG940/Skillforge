import RoadmapPlanner from '@/components/ai/RoadmapPlanner'
import RoadmapTimeline from '@/components/ai/RoadmapTimeline'

export default function AICareerRoadmap() {
  return (
    <main className="space-y-8 px-6 py-8 md:px-10 lg:px-12">
      <div className="rounded-4xl border border-zinc-800 bg-zinc-950 p-8 shadow-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">AI Roadmap</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Build your next-level career path</h1>
        <p className="mt-4 max-w-2xl text-zinc-300 leading-7">
          Follow a structured plan with milestone checkpoints, project practice, and interview prep customized for high-growth tech roles.
        </p>
      </div>

      <RoadmapPlanner />

      <div className="rounded-4xl border border-zinc-800 bg-zinc-950 p-8 shadow-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Reference Plan</p>
        <h2 className="mt-3 text-2xl font-semibold text-white">Sample Roadmap Timeline</h2>
        <p className="mt-3 text-zinc-400">Use this as a model for executing your goals week-by-week.</p>
        <RoadmapTimeline />
      </div>
    </main>
  )
}
