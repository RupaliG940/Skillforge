import { notFound } from 'next/navigation'

interface ProjectPageProps {
  params: {
    id: string
  }
}

const projectData = {
  'ai-study-buddy': {
    title: 'AI Study Buddy',
    description: 'A smart study companion that helps learners stay consistent with flashcards, explanations, and progress tracking.',
    stack: ['React', 'GPT-4', 'Node.js', 'Tailwind'],
    goals: ['Add adaptive practice sessions', 'Create voice-enabled review mode', 'Implement progress streaks'],
    learnings: ['AI UX', 'state management', 'real-time notifications'],
  },
  'portfolio-launchpad': {
    title: 'Portfolio Launchpad',
    description: 'A recruiter-ready portfolio system with case studies, animated showcases, and performance analytics.',
    stack: ['Next.js', 'TypeScript', 'Framer Motion', 'Vercel'],
    goals: ['Add client testimonials', 'Publish case study pages', 'Optimize SEO and accessibility'],
    learnings: ['SSR rendering', 'responsive UI', 'developer branding'],
  },
  'budget-tracker': {
    title: 'Budget Tracker',
    description: 'A personal finance dashboard with budget planning, spending categories, and savings goals.',
    stack: ['React', 'SQLite', 'Chart.js', 'Node.js'],
    goals: ['Add recurring budgets', 'Integrate transaction import', 'Build savings forecast charts'],
    learnings: ['data visualization', 'CRUD workflows', 'financial UX'],
  },
}

export default function ProjectDetailPage({ params }: ProjectPageProps) {
  const project = projectData[params.id as keyof typeof projectData]
  if (!project) return notFound()

  return (
    <main className="space-y-8 px-6 py-8 md:px-10 lg:px-12">
      <div className="rounded-4xl border border-zinc-800 bg-zinc-950 p-8 shadow-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Project details</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">{project.title}</h1>
        <p className="mt-4 max-w-2xl text-zinc-300 leading-7">{project.description}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Tech stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span key={tech} className="rounded-full bg-zinc-900 px-3 py-2 text-sm text-zinc-300">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Next milestones</h2>
          <ul className="space-y-3 text-zinc-300">
            {project.goals.map((goal) => (
              <li key={goal} className="rounded-3xl bg-zinc-900 p-4">{goal}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-white mb-4">What you learned</h2>
          <ul className="space-y-3 text-zinc-300">
            {project.learnings.map((item) => (
              <li key={item} className="rounded-3xl bg-zinc-900 p-4">{item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-white mb-4">Recruiter impact</h2>
          <p className="text-zinc-300">This project demonstrates strong full-stack skills, modern tooling, and a clean user experience. Add it to your portfolio as a high-value case study.</p>
        </div>
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-white mb-4">Next step</h2>
          <p className="text-zinc-300">Document your build process, create a demo video, and link to your GitHub so recruiters can evaluate your code quality quickly.</p>
        </div>
      </div>
    </main>
  )
}
