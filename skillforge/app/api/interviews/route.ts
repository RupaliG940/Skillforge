import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

const sampleSessions = [
  {
    id: 'session-1',
    category: 'JavaScript',
    difficulty: 'Medium',
    totalQuestions: 8,
    totalScore: 72,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'session-2',
    category: 'System Design',
    difficulty: 'Hard',
    totalQuestions: 5,
    totalScore: 61,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(sampleSessions);
  } catch (error) {
    console.error('Error fetching interview sessions:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { category, difficulty, totalQuestions } = await req.json();

    const newSession = {
      id: `session-${Date.now()}`,
      category,
      difficulty,
      totalQuestions,
      totalScore: 0,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(newSession, { status: 201 });
  } catch (error) {
    console.error('Error creating interview session:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
