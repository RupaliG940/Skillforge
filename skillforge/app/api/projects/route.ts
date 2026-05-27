import { NextRequest, NextResponse } from 'next/server'

const projects = [
  {
    id: 'task-manager',
    name: 'Task Manager Pro',
    status: 'In progress',
    progress: 72,
  },
  {
    id: 'portfolio-app',
    name: 'Portfolio Launchpad',
    status: 'Review',
    progress: 56,
  },
]

export async function GET() {
  return NextResponse.json({ projects })
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)

  if (!body?.name || !body?.description) {
    return NextResponse.json({ error: 'Missing project data' }, { status: 400 })
  }

  return NextResponse.json({
    message: 'Project created',
    project: {
      id: 'new-project',
      name: body.name,
      description: body.description,
      status: 'Planning',
      progress: 0,
    },
  })
}
