import { NextRequest, NextResponse } from 'next/server'

const projectDetails = {
  'task-manager': {
    id: 'task-manager',
    name: 'Task Manager Pro',
    description: 'A modern productivity platform with real-time collaboration and analytics.',
    progress: 72,
    status: 'In progress',
  },
  'portfolio-app': {
    id: 'portfolio-app',
    name: 'Portfolio Launchpad',
    description: 'A polished portfolio site for recruiters and case studies.',
    progress: 56,
    status: 'Review',
  },
}

type RouteContext =
  | { params: { id: string } }
  | { params: Promise<{ id: string }> }

async function resolveParams(context: RouteContext) {
  return context.params instanceof Promise ? await context.params : context.params
}

export async function GET(request: NextRequest, context: RouteContext) {
  const params = await resolveParams(context)
  const project = projectDetails[params.id as keyof typeof projectDetails]
  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 })
  }
  return NextResponse.json(project)
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const params = await resolveParams(context)
  return NextResponse.json({ message: `Project ${params.id} deleted` })
}
