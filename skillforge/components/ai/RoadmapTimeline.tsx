'use client'

interface RoadmapTask {
  week: number
  title: string
  tasks: string[]
}

const roadmapData: RoadmapTask[] = [
  {
    week: 1,
    title: 'TypeScript Fundamentals',
    tasks: ['Complete TypeScript crash course', 'Convert one React app to TS', 'Build a Todo app'],
  },
  {
    week: 2,
    title: 'Node.js + Express Advanced',
    tasks: ['Build REST APIs', 'Add JWT auth', 'Learn middleware patterns'],
  },
  {
    week: 3,
    title: 'PostgreSQL + Prisma',
    tasks: ['Design schema', 'Build database APIs', 'Connect to frontend'],
  },
  {
    week: 4,
    title: 'Deploy + Portfolio',
    tasks: ['Deploy to Vercel', 'Update portfolio', 'Document your project'],
  },
]

export default function RoadmapTimeline() {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Career Roadmap</p>
          <h2 className="text-2xl font-semibold text-white">30-Day Plan</h2>
        </div>
        <span className="rounded-full bg-orange-500/15 px-3 py-1 text-sm font-semibold text-orange-300">Weekly</span>
      </div>
      <div className="space-y-6">
        {roadmapData.map((item) => (
          <div key={item.week} className="grid gap-4 md:grid-cols-[80px_1fr]">
            <div className="rounded-3xl bg-zinc-900 p-4 text-center text-white">
              <span className="block text-sm text-zinc-400">Week</span>
              <span className="mt-2 text-3xl font-bold">{item.week}</span>
            </div>
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
              <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
              <ul className="space-y-2 text-zinc-300 text-sm">
                {item.tasks.map((task, index) => (
                  <li key={index}>• {task}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
