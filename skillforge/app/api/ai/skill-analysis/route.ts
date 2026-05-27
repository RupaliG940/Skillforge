import { NextRequest, NextResponse } from 'next/server'

type SkillInput = { name?: string; category?: string; level?: number; status?: string }

type NormalizedSkill = {
  name: string
  category: string
  level?: number
  status?: string
}

function normalizeSkills(skills: unknown): NormalizedSkill[] {
  if (!Array.isArray(skills)) return []

  return skills
    .map((item) => {
      if (typeof item === 'string') {
        return { name: item, category: 'Unknown', level: undefined, status: 'Learning' }
      }

      if (typeof item === 'object' && item !== null) {
        const skill = item as SkillInput
        return {
          name: skill.name?.trim() || 'Unknown Skill',
          category: skill.category?.trim() || 'Unknown',
          level: typeof skill.level === 'number' ? skill.level : undefined,
          status: skill.status?.trim() || 'Learning',
        }
      }

      return { name: 'Unknown Skill', category: 'Unknown', level: undefined, status: 'Learning' }
    })
    .filter((skill) => skill.name)
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)
  const skills = normalizeSkills(body?.skills)

  if (!skills.length) {
    return NextResponse.json({ error: 'Missing skill list' }, { status: 400 })
  }

  const strongSkills = skills.filter((skill) => skill.level !== undefined && skill.level >= 70)
  const growthSkills = skills.filter((skill) => skill.level === undefined || skill.level < 70)
  const skillSummary = skills
    .slice(0, 5)
    .map((skill) => `${skill.name}${skill.category ? ` (${skill.category})` : ''}${skill.level !== undefined ? ` - ${skill.level}%` : ''}`)
    .join(', ')

  const summary = `Your skill set currently includes ${skillSummary}. ${
    strongSkills.length
      ? `You have solid strengths in ${strongSkills.map((skill) => skill.name).join(', ')}.`
      : 'You have a good base to build on.'
  } ${
    growthSkills.length
      ? `Focus on improving ${growthSkills.map((skill) => skill.name).join(', ')} through real projects and consistent practice.`
      : 'Keep refining your skills with deeper challenges and portfolio work.'
  }`

  const recommendations = [
    strongSkills.length
      ? `Showcase your strongest skill${strongSkills.length > 1 ? 's' : ''} (${strongSkills.map((skill) => skill.name).join(', ')}) with a focused project or case study.`
      : 'Pick one skill to deepen through hands-on practice and a small project.',
    growthSkills.length
      ? `Spend time improving ${growthSkills.map((skill) => skill.name).join(', ')} with targeted learning and measurable outcomes.`
      : 'Continue advancing your current skills with more challenging applications.',
    'Use your updated skill list in resumes and interview answers so your progress is reflected clearly.',
  ]

  return NextResponse.json({
    analysis: {
      summary,
      recommendations,
    },
  })
}
