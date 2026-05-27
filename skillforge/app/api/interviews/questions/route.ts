import { NextRequest, NextResponse } from 'next/server';
import { SAMPLE_QUESTIONS } from '@/lib/constants';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const category = searchParams.get('category');
    const difficulty = searchParams.get('difficulty');
    const limit = parseInt(searchParams.get('limit') || '10');

    const filtered = SAMPLE_QUESTIONS.filter((question) => {
      if (category && question.category !== category) return false;
      if (difficulty && question.difficulty !== difficulty) return false;
      return true;
    });

    return NextResponse.json(filtered.slice(0, limit));
  } catch (error) {
    console.error('Error fetching questions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch questions' },
      { status: 500 }
    );
  }
}
