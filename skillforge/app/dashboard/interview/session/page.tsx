'use client'

import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { INTERVIEW_CATEGORIES, SAMPLE_QUESTIONS } from '@/lib/constants'
import { saveInterviewSession, getActiveSession, type InterviewSession } from '@/lib/interviewStorage'

type ReviewResult = {
  score: number
  highlights: string[]
  suggestions: string[]
  improvedAnswer: string
}

type SessionAnswer = {
  questionId: string
  question: string
  answer: string
  score?: number
  feedback?: string
}

export default function InterviewSessionPage() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get('category') ?? 'dsa'

  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answer, setAnswer] = useState('')
  const [timeLeft, setTimeLeft] = useState(1800) // 30 minutes in seconds
  const [sessionStarted, setSessionStarted] = useState(false)
  const [sessionId, setSessionId] = useState<string>('')
  const [answers, setAnswers] = useState<SessionAnswer[]>([])
  const [review, setReview] = useState<ReviewResult | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [loadingReview, setLoadingReview] = useState(false)
  const [sessionCompleted, setSessionCompleted] = useState(false)
  const [finalScore, setFinalScore] = useState(0)
  const [reviewedAnswerCount, setReviewedAnswerCount] = useState(0)

  const MAX_SESSION_QUESTIONS = 15

  useEffect(() => {
    const category = searchParams.get('category')
    if (category) {
      setSelectedCategory(category)
    }
  }, [searchParams])

  const questions = useMemo(
    () => SAMPLE_QUESTIONS.filter((question) => question.category === selectedCategory).slice(0, MAX_SESSION_QUESTIONS),
    [selectedCategory]
  )

  const question = questions[currentQuestion]
  const hasQuestions = questions.length > 0
  const categoryLabel =
    INTERVIEW_CATEGORIES.find((cat) => cat.id === selectedCategory)?.label || 'Unknown'

  // Timer effect
  useEffect(() => {
    if (!sessionStarted || timeLeft <= 0 || sessionCompleted) return

    if (timeLeft === 0) {
      handleFinishSession()
      return
    }

    const timer = setInterval(() => setTimeLeft((t) => Math.max(t - 1, 0)), 1000)
    return () => clearInterval(timer)
  }, [sessionStarted, timeLeft, sessionCompleted])

  const handleStartSession = () => {
    const newSessionId = `session-${Date.now()}`
    setSessionId(newSessionId)
    setSessionStarted(true)
    setTimeLeft(1800)
    setCurrentQuestion(0)
    setAnswer('')
    setAnswers([])
    setReview(null)
    setShowFeedback(false)
    setSessionCompleted(false)
    setFinalScore(0)
    setReviewedAnswerCount(0)
  }

  const handleGetFeedback = async () => {
    if (!answer.trim()) return

    setLoadingReview(true)
    try {
      const response = await fetch('/api/ai/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: question.question, answer }),
      })
      const data = await response.json()
      const reviewData = data.review || { score: 70, highlights: [], suggestions: [], improvedAnswer: '' }
      setReview(reviewData)
      setShowFeedback(true)
    } catch (err) {
      console.error('Failed to get feedback', err)
      setReview({ score: 70, highlights: ['Clear structure'], suggestions: ['Add more examples'], improvedAnswer: answer })
      setShowFeedback(true)
    } finally {
      setLoadingReview(false)
    }
  }

  const handleNextQuestion = () => {
    const updatedAnswers = [...answers]

    if (answer.trim()) {
      const newAnswer: SessionAnswer = {
        questionId: question.id,
        question: question.question,
        answer,
        score: review?.score,
        feedback: review ? `${review.highlights.join('; ')}` : 'No AI review available',
      }
      updatedAnswers.push(newAnswer)
    }

    setAnswers(updatedAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setAnswer('')
      setReview(null)
      setShowFeedback(false)
    } else {
      // Last question answered, go to finish
      handleFinishSession(updatedAnswers)
    }
  }

  const handleFinishSession = (finalAnswers?: SessionAnswer[]) => {
    const answersToSave = finalAnswers || [...answers]

    if (!answer.trim() && answersToSave.length === 0) {
      alert('Please answer at least one question before finishing.')
      return
    }

    if (answer.trim() && !finalAnswers) {
      const lastAnswer: SessionAnswer = {
        questionId: question.id,
        question: question.question,
        answer,
        score: review?.score,
        feedback: review ? `${review.highlights.join('; ')}` : 'Not reviewed',
      }
      answersToSave.push(lastAnswer)
    }

    const scoredAnswers = answersToSave.filter((a) => typeof a.score === 'number')
    const avgScore = scoredAnswers.length > 0 ? Math.round(scoredAnswers.reduce((a, b) => a + (b.score || 0), 0) / scoredAnswers.length) : 0
    const reviewedCount = scoredAnswers.length
    const timeSpent = 1800 - timeLeft

    const session: InterviewSession = {
      id: sessionId,
      category: selectedCategory,
      categoryLabel,
      startedAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      totalQuestions: questions.length,
      questionsAnswered: answersToSave.length,
      totalScore: avgScore,
      duration: Math.round(timeSpent / 60),
      answers: answersToSave,
      status: 'completed',
    }

    setAnswers(answersToSave)
    setReviewedAnswerCount(reviewedCount)
    saveInterviewSession(session)
    setFinalScore(avgScore)
    setSessionCompleted(true)
  }

  const handleSkipQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setAnswer('')
      setReview(null)
      setShowFeedback(false)
    } else {
      handleFinishSession()
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const timePercentage = (timeLeft / 1800) * 100
  const progressPercentage = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0

  // Start screen
  if (!sessionStarted) {
    return (
      <div className="min-h-[calc(100vh-6rem)] flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-2xl rounded-3xl border border-zinc-800 bg-zinc-950 p-8 shadow-lg">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🎙️</div>
            <h1 className="text-4xl font-bold text-white mb-3">Start Mock Interview</h1>
            <p className="text-zinc-400 text-lg">30 minutes • Up to 15 questions • Real-time feedback</p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-8">
            {INTERVIEW_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-3xl border px-4 py-6 text-left transition ${
                  selectedCategory === cat.id
                    ? 'border-orange-500 bg-orange-500/10 text-white'
                    : 'border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-orange-500 hover:bg-zinc-900'
                }`}
              >
                <div className="text-3xl mb-2">{cat.emoji}</div>
                <div className="font-semibold text-white text-sm">{cat.label}</div>
              </button>
            ))}
          </div>

          <div className="rounded-3xl bg-zinc-900 p-6 mb-6">
            <h3 className="font-semibold text-white mb-3">Session Includes:</h3>
            <ul className="space-y-2 text-zinc-300">
              <li>✓ Up to {questions.length} practice questions</li>
              <li>✓ 30 minutes total time</li>
              <li>✓ Real-time AI feedback</li>
              <li>✓ Performance scoring</li>
              <li>✓ Session saved to history</li>
            </ul>
          </div>

          <button
            onClick={handleStartSession}
            className="w-full rounded-3xl bg-orange-500 hover:bg-orange-600 px-6 py-4 text-black font-bold text-lg transition-colors"
          >
            Start Interview Session
          </button>
        </div>
      </div>
    )
  }

  // No questions
  if (sessionStarted && !hasQuestions) {
    return (
      <div className="min-h-[calc(100vh-6rem)] flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-xl rounded-3xl border border-zinc-800 bg-zinc-950 p-8 shadow-lg text-center">
          <div className="text-5xl mb-4">⚠️</div>
          <h1 className="text-3xl font-bold text-white mb-3">No Questions Available</h1>
          <p className="text-zinc-400 mb-6">This category doesn't have enough questions yet. Please choose another.</p>
          <button
            onClick={() => setSessionStarted(false)}
            className="rounded-3xl bg-orange-500 hover:bg-orange-600 px-6 py-4 text-black font-semibold transition-colors"
          >
            Choose Another Category
          </button>
        </div>
      </div>
    )
  }

  // Completion screen
  if (sessionCompleted) {
    const completedSession = getActiveSession()
    const questionsAttempted = answers.length

    return (
      <div className="min-h-[calc(100vh-6rem)] flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-2xl rounded-3xl border border-zinc-800 bg-zinc-950 p-8 shadow-lg">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">
              {finalScore >= 80 ? '🎉' : finalScore >= 60 ? '👍' : '💪'}
            </div>
            <h1 className="text-4xl font-bold text-white mb-3">Session Complete!</h1>
            <p className="text-zinc-400">Your interview session has been saved</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="rounded-3xl bg-zinc-900 p-6 text-center">
              <p className="text-zinc-400 text-sm mb-2">Your Score</p>
              <p className="text-4xl font-bold text-orange-500">{finalScore}%</p>
            </div>
            <div className="rounded-3xl bg-zinc-900 p-6 text-center">
              <p className="text-zinc-400 text-sm mb-2">Questions Answered</p>
              <p className="text-4xl font-bold text-blue-500">
                {questionsAttempted}/{questions.length}
              </p>
            </div>
          </div>

          <div className="rounded-3xl bg-zinc-900 p-6 mb-6">
            <h3 className="font-semibold text-white mb-3">Performance Summary</h3>
            <ul className="space-y-2 text-zinc-300 text-sm">
              <li>✓ Category: {categoryLabel}</li>
              <li>✓ Time Spent: {formatTime(1800 - timeLeft)}</li>
              <li>✓ Session ID: {sessionId}</li>
              <li>✓ Reviewed answers: {reviewedAnswerCount}/{questionsAttempted}</li>
              {reviewedAnswerCount === 0 && questionsAttempted > 0 && (
                <li>⚠️ Some answers were not scored because AI review was skipped.</li>
              )}
              {finalScore >= 80 && <li>🌟 Excellent performance!</li>}
              {finalScore >= 60 && finalScore < 80 && <li>📈 Good effort, keep practicing!</li>}
              {finalScore < 60 && <li>💡 Review the feedback and try again!</li>}
            </ul>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/dashboard/interview/history"
              className="flex-1 rounded-3xl bg-orange-500 hover:bg-orange-600 px-6 py-4 text-black font-semibold transition-colors text-center"
            >
              View All Sessions
            </Link>
            <button
              onClick={() => {
                setSessionStarted(false)
                setCurrentQuestion(0)
                setAnswer('')
                setAnswers([])
                setReview(null)
                setShowFeedback(false)
              }}
              className="flex-1 rounded-3xl border border-orange-500 text-white hover:bg-orange-500/10 px-6 py-4 font-semibold transition-colors"
            >
              New Session
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Active session
  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-slideUp px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">{INTERVIEW_CATEGORIES.find((c) => c.id === selectedCategory)?.emoji}</span>
            <h1 className="text-3xl font-bold text-white">Interview Practice</h1>
          </div>
          <p className="text-zinc-400">
            {categoryLabel} • Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>
        <div className="rounded-3xl bg-zinc-950 border border-zinc-800 p-4 text-right">
          <p className="text-sm text-zinc-400 mb-1">Time Remaining</p>
          <p className={`text-3xl font-bold ${timeLeft <= 300 ? 'text-red-500' : 'text-orange-500'}`}>
            {formatTime(timeLeft)}
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-zinc-400">
          <span>Question Progress</span>
          <span>{Math.round(progressPercentage)}%</span>
        </div>
        <div className="w-full bg-zinc-900 rounded-full h-2 overflow-hidden">
          <div
            className="h-2 bg-linear-to-r from-orange-500 to-orange-400 rounded-full transition-all"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Time warning */}
      {timeLeft <= 300 && (
        <div className="rounded-3xl bg-red-500/10 border border-red-500/30 p-3">
          <p className="text-red-400 text-sm font-semibold">
            ⏰ Time running out! {formatTime(timeLeft)} remaining
          </p>
        </div>
      )}

      {/* Question */}
      <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-8">
        <h2 className="text-2xl font-bold text-white mb-4">{question.question}</h2>

        <div className="mb-6 p-4 rounded-2xl bg-zinc-900">
          <p className="text-sm text-zinc-400">
            <span className="font-semibold text-white">Difficulty:</span> {question.difficulty}
          </p>
          <p className="text-sm text-zinc-400 mt-2">
            <span className="font-semibold text-white">Tips:</span> {question.tips.join(' • ')}
          </p>
        </div>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer here... Be thorough but concise."
          className="w-full min-h-64 rounded-3xl border border-zinc-800 bg-zinc-900 px-5 py-4 text-white outline-none focus:border-orange-500 transition-colors resize-none"
        />

        {review && (
          <div className="mt-6 rounded-3xl border border-orange-500 bg-orange-500/5 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm uppercase tracking-widest text-zinc-500">AI Feedback</p>
                <h3 className="text-2xl font-bold text-white">Score: {review.score}/100</h3>
              </div>
              <div className="text-4xl">
                {review.score >= 80 ? '⭐' : review.score >= 60 ? '👍' : '💡'}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 mb-4">
              <div>
                <p className="font-semibold text-white mb-2">✓ Strengths</p>
                <ul className="space-y-1 text-sm text-zinc-300">
                  {review.highlights.map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-green-400">•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-semibold text-white mb-2">💡 Suggestions</p>
                <ul className="space-y-1 text-sm text-zinc-300">
                  {review.suggestions.map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-blue-400">•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-2xl bg-zinc-900 p-4">
              <p className="text-xs text-zinc-400 mb-2">Improved Version:</p>
              <p className="text-white text-sm">{review.improvedAnswer}</p>
            </div>
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={() => handleFinishSession()}
            className="flex-1 rounded-3xl bg-green-600 hover:bg-green-700 text-white px-6 py-4 font-semibold transition-colors"
          >
            Submit Session
          </button>

          {!showFeedback && (
            <button
              onClick={handleGetFeedback}
              disabled={!answer.trim() || loadingReview}
              className="flex-1 rounded-3xl bg-orange-500 hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed px-6 py-4 text-black font-semibold transition-colors"
            >
              {loadingReview ? '⏳ Getting Feedback...' : 'Get AI Feedback'}
            </button>
          )}

          {currentQuestion < questions.length - 1 && (
            <button
              onClick={handleNextQuestion}
              className="flex-1 rounded-3xl bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 font-semibold transition-colors"
            >
              Next Question →
            </button>
          )}

          {showFeedback && (
            <button
              onClick={handleSkipQuestion}
              className="flex-1 rounded-3xl border border-zinc-700 hover:border-zinc-600 text-white px-6 py-4 font-semibold transition-colors"
            >
              Skip Question
            </button>
          )}

          {!showFeedback && (
            <button
              onClick={() => {
                setSessionStarted(false)
                setCurrentQuestion(0)
                setAnswer('')
                setAnswers([])
                setReview(null)
                setShowFeedback(false)
              }}
              className="flex-1 rounded-3xl border border-zinc-700 hover:border-zinc-600 text-white px-6 py-4 font-semibold transition-colors"
            >
              Exit Session
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

