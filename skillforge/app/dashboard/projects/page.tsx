'use client';

import { useState } from 'react';
import Link from 'next/link';

const initialProjects = [
  {
    id: 'ai-study-buddy',
    name: 'AI Study Buddy',
    description: 'Smart study companion with spaced repetition and learning reminders.',
    stack: ['React', 'GPT-4', 'Node.js'],
    progress: 85,
    status: 'Active',
    github: 'https://github.com',
    liveUrl: 'https://example.com',
    impact: 9.5,
  },
  {
    id: 'portfolio-launchpad',
    name: 'Portfolio Launchpad',
    description: 'A polished portfolio builder tailored for recruiters and case studies.',
    stack: ['Next.js', 'Framer Motion'],
    progress: 60,
    status: 'Active',
    github: 'https://github.com',
    liveUrl: 'https://example.com',
    impact: 7.2,
  },
  {
    id: 'budget-tracker',
    name: 'Budget Tracker',
    description: 'Personal finance dashboard with budgets, charts, and savings goals.',
    stack: ['React', 'SQLite'],
    progress: 100,
    status: 'Done',
    github: 'https://github.com',
    liveUrl: 'https://example.com',
    impact: 8.1,
  },
];

const projectStatuses = ['Planning', 'Active', 'Done', 'Paused'] as const;

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Done':
      return 'bg-success bg-opacity-20 text-success';
    case 'Active':
      return 'bg-primary bg-opacity-20 text-primary';
    case 'Planning':
      return 'bg-warning bg-opacity-20 text-warning';
    default:
      return 'bg-error bg-opacity-20 text-error';
  }
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState(initialProjects);
  const [showModal, setShowModal] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectStack, setProjectStack] = useState('React, Node.js');
  const [projectStatus, setProjectStatus] = useState<typeof projectStatuses[number]>('Planning');
  const [generatedIdeas, setGeneratedIdeas] = useState<any[]>([]);
  const [generatedReadme, setGeneratedReadme] = useState('');
  const [ideaLoading, setIdeaLoading] = useState(false);
  const [readmeLoading, setReadmeLoading] = useState(false);

  const handleGenerateIdea = async () => {
    setIdeaLoading(true)
    const response = await fetch('/api/ai/project-ideas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ skills: projects.flatMap((project) => project.stack) }),
    })
    const data = await response.json()
    setGeneratedIdeas(data.ideas || [])
    setIdeaLoading(false)
  }

  const [readmeError, setReadmeError] = useState('')

  const handleGenerateReadme = async () => {
    setReadmeLoading(true)
    setReadmeError('')

    try {
      const stackArray = projectStack
        .split(',')
        .map((tech) => tech.trim())
        .filter(Boolean)

      const response = await fetch('/api/ai/readme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: projectName || 'New Project',
          description: projectDescription || 'A modern project built with emerging web technologies.',
          stack: stackArray,
        }),
      })

      const data = await response.json()
      if (!response.ok) {
        setReadmeError(data.error || 'Unable to generate README.')
        setGeneratedReadme('')
      } else {
        setGeneratedReadme(data.readme || '')
      }
    } catch (err) {
      setReadmeError('Unable to generate README. Please try again.')
      setGeneratedReadme('')
    } finally {
      setReadmeLoading(false)
    }
  }

  const handleAddProject = () => {
    if (!projectName.trim() || !projectDescription.trim()) return

    setProjects((current) => [
      {
        id: projectName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        name: projectName,
        description: projectDescription,
        stack: projectStack.split(',').map((tech) => tech.trim()).filter(Boolean),
        progress: 10,
        status: projectStatus,
        github: 'https://github.com',
        liveUrl: 'https://example.com',
        impact: 6.5,
      },
      ...current,
    ])
    setProjectName('')
    setProjectDescription('')
    setProjectStack('React, Node.js')
    setProjectStatus('Planning')
    setShowModal(false)
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Projects</h1>
          <p className="text-text-secondary">Build impressive projects to showcase on your resume</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-3 bg-primary hover:bg-orange-600 text-black font-semibold rounded-lg transition-colors"
        >
          + New Project
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-6">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
          <div className="flex items-center justify-between mb-6 gap-4">
            <div>
              <h2 className="text-xl font-semibold text-white">AI Project Toolkit</h2>
              <p className="text-text-secondary text-sm">Generate idea prompts, README content, and recruiter-focused insight.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleGenerateIdea}
                className="rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-black hover:bg-orange-600 transition-colors"
              >
                {ideaLoading ? 'Generating...' : 'Generate Ideas'}
              </button>
              <button
                onClick={handleGenerateReadme}
                className="rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:border-orange-500 hover:text-orange-400 transition-colors"
              >
                {readmeLoading ? 'Generating...' : 'Generate README'}
              </button>
            </div>
          </div>

          {readmeError && (
            <div className="rounded-3xl border border-error bg-zinc-950 p-4 text-sm text-error mb-4">
              {readmeError}
            </div>
          )}

          {generatedIdeas.length > 0 ? (
            <div className="space-y-4 mb-6">
              <h3 className="text-lg font-semibold text-white">AI Suggestions</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {generatedIdeas.map((idea) => (
                  <div key={idea.title} className="rounded-3xl bg-zinc-900 p-5 text-zinc-300">
                    <div className="font-semibold text-white mb-2">{idea.title}</div>
                    <p className="text-sm mb-3">{idea.description}</p>
                    <div className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-2">Stack</div>
                    <div className="flex flex-wrap gap-2">
                      {idea.stack.map((tech: string) => (
                        <span key={tech} className="rounded-full bg-zinc-800 px-2 py-1 text-xs text-zinc-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-3xl bg-zinc-900 p-6 text-zinc-400">Generate an idea to see project recommendations here.</div>
          )}

          {generatedReadme && (
            <div className="rounded-3xl bg-zinc-900 p-6 text-zinc-300">
              <h3 className="text-lg font-semibold text-white mb-4">Generated README</h3>
              <pre className="whitespace-pre-wrap wrap-break-word text-sm">{generatedReadme}</pre>
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-white">Project health</h3>
            <p className="text-text-secondary text-sm">Track active work and recruiter-readiness in one place.</p>
          </div>
          <div className="grid grid-cols-1 gap-3">
            <div className="rounded-3xl bg-zinc-900 p-4">
              <div className="text-sm text-zinc-400">Active projects</div>
              <div className="text-3xl font-bold text-white">{projects.filter((project) => project.status === 'Active').length}</div>
            </div>
            <div className="rounded-3xl bg-zinc-900 p-4">
              <div className="text-sm text-zinc-400">Completed projects</div>
              <div className="text-3xl font-bold text-success">{projects.filter((project) => project.status === 'Done').length}</div>
            </div>
            <div className="rounded-3xl bg-zinc-900 p-4">
              <div className="text-sm text-zinc-400">Average recruiter impact</div>
              <div className="text-3xl font-bold text-primary">
                {Math.round(projects.reduce((sum, project) => sum + project.impact, 0) / projects.length)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-white mb-4">Your Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <Link key={project.id} href={`/dashboard/projects/${project.id}`} className="group">
              <div className="bg-card border border-border rounded-xl p-6 hover:border-primary transition-all h-full hover:shadow-lg hover:shadow-primary/20">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{project.name}</h3>
                    <p className="text-text-secondary text-sm mt-2">{project.description}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.stack.map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-border rounded text-xs text-text-secondary">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mb-4 pb-4 border-b border-border">
                  <div className="flex justify-between text-xs text-text-secondary mb-2">
                    <span>Impact</span>
                    <span>{project.impact}/10</span>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(10)].map((_, index) => (
                      <div
                        key={index}
                        className={`h-1 flex-1 rounded-full ${index < Math.round(project.impact) ? 'bg-primary' : 'bg-border'}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-text-secondary">Progress</span>
                    <span className="text-primary font-semibold">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${project.progress}%` }} />
                  </div>
                </div>
              </div>
            </Link>
          ))}

          <button
            onClick={() => setShowModal(true)}
            className="bg-card border-2 border-dashed border-border rounded-xl p-6 hover:border-primary transition-all flex items-center justify-center min-h-85"
          >
            <div className="text-center">
              <div className="text-4xl mb-2">+</div>
              <h3 className="text-lg font-bold text-white mb-1">Add Project</h3>
              <p className="text-text-secondary text-sm">Launch your next project</p>
            </div>
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-3xl p-8 max-w-xl w-full animate-slideUp">
            <h2 className="text-2xl font-bold text-white mb-4">Add New Project</h2>
            <div className="space-y-4">
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Project Name"
                className="w-full bg-border border border-border rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:border-primary outline-none"
              />
              <textarea
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                placeholder="Project Description"
                className="w-full bg-border border border-border rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:border-primary outline-none h-28 resize-none"
              />
              <input
                type="text"
                value={projectStack}
                onChange={(e) => setProjectStack(e.target.value)}
                placeholder="Tech stack, comma separated"
                className="w-full bg-border border border-border rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:border-primary outline-none"
              />
              <select
                value={projectStatus}
                onChange={(e) => setProjectStatus(e.target.value as typeof projectStatuses[number])}
                className="w-full bg-border border border-border rounded-xl px-4 py-3 text-white focus:border-primary outline-none"
              >
                {projectStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <div className="flex gap-3 flex-col sm:flex-row">
                <button
                  onClick={handleAddProject}
                  className="flex-1 bg-primary hover:bg-orange-600 text-black font-semibold px-4 py-3 rounded-xl transition-colors"
                >
                  Save Project
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold px-4 py-3 rounded-xl transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
