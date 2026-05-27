import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)
  const name = body?.name
  const description = body?.description
  let stack = body?.stack

  if (!name || !description) {
    return NextResponse.json({ error: 'Missing project name or description' }, { status: 400 })
  }

  const stackArray = Array.isArray(stack)
    ? stack
    : typeof stack === 'string'
    ? stack.split(',').map((tech: string) => tech.trim()).filter(Boolean)
    : []

  const stackList = stackArray.length > 0 ? stackArray : ['React', 'TypeScript', 'Node.js']

  const readme = `# ${name}

${description}

## Tech Stack
${stackList.map((tech: string) => `- ${tech}`).join('\n')}

## Features
- Built with modern web technologies
- Responsive design
- AI-generated documentation

## Setup
1. npm install
2. npm run dev

## License
MIT
`

  return NextResponse.json({ readme })
}
