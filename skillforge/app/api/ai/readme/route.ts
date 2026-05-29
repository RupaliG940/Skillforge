import { Anthropic } from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

async function generateReadmeWithClaude(
  projectName: string,
  description: string,
  stack: string[],
  features?: string[],
  goals?: string[]
): Promise<string | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    console.error('Missing ANTHROPIC_API_KEY')
    return null
  }

  try {
    const client = new Anthropic({ apiKey })

    const systemPrompt = `You are an expert technical writer. Create professional, comprehensive README.md files that are clear, complete, and developer-friendly.

Guidelines:
- Start with a compelling project description
- Include installation and setup instructions
- Provide usage examples
- Document the tech stack
- Explain key features and functionality
- Include deployment instructions
- Add contributing guidelines
- License information

Make it informative, well-structured, and easy to follow.`

    const stackString = stack.join(', ')
    const featuresString = features?.length ? features.join(', ') : 'See description for features'
    const goalsString = goals?.length ? goals.join(', ') : 'Build and deploy'

    const userPrompt = `Generate a professional README.md for this project:

Project Name: ${projectName}
Description: ${description}
Tech Stack: ${stackString}
Features: ${featuresString}
Goals: ${goalsString}

Create a complete, well-organized README that will help developers understand and use this project effectively.`

    const response = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2000,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: userPrompt,
        },
      ],
    })

    const textContent = response.content.find((block) => block.type === 'text')
    return textContent && textContent.type === 'text' ? textContent.text : null
  } catch (error) {
    console.error('Claude README generation error:', error)
    return null
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null)
    const { name, description, stack, features, goals } = body ?? {}

    if (!name || !description) {
      return NextResponse.json({ error: 'Missing project name or description' }, { status: 400 })
    }

    const stackArray = Array.isArray(stack)
      ? stack
      : typeof stack === 'string'
        ? stack
            .split(',')
            .map((tech: string) => tech.trim())
            .filter(Boolean)
        : []

    const finalStack = stackArray.length > 0 ? stackArray : ['Node.js', 'JavaScript']

    const readme = await generateReadmeWithClaude(name, description, finalStack, features, goals)

    if (readme) {
      return NextResponse.json({ readme })
    }

    // Fallback README
    const fallbackReadme = `# ${name}

${description}

## Tech Stack
${finalStack.map((tech: string) => `- ${tech}`).join('\n')}

## Features
${features?.length ? features.map((f: string) => `- ${f}`).join('\n') : '- Responsive design\n- Modern architecture\n- Well-documented code'}

## Installation

\`\`\`bash
npm install
\`\`\`

## Getting Started

\`\`\`bash
npm run dev
\`\`\`

## Usage

[Add usage instructions here]

## Setup Instructions

1. Clone the repository
2. Install dependencies: \`npm install\`
3. Set up environment variables
4. Run the development server: \`npm run dev\`
5. Open your browser to the specified port

## Deployment

[Add deployment instructions]

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Author

Generated with AI assistance for Skillforge

---

Built with ❤️ using modern web technologies
`

    return NextResponse.json({ readme: fallbackReadme })
  } catch (error) {
    console.error('README generation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
