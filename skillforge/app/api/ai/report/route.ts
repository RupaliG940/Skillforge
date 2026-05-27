import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    progressScore: 84,
    focusArea: 'TypeScript & System Design',
    strengths: ['React', 'Full-stack architecture', 'Interview preparation'],
    improvements: ['Add more cloud experience', 'Practice behavioral stories', 'Polish resume keywords'],
    summary:
      'Your profile is strong for developer roles. Keep building high-impact projects and apply to roles that value full-stack JavaScript skills.',
    nextSteps: [
      'Finish one recruiter-ready portfolio project',
      'Add TypeScript and AWS keywords to your resume',
      'Do 3 more mock interviews this week',
    ],
  })
}
