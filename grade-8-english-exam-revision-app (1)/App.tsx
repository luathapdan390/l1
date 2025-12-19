
// Import React to resolve 'Cannot find namespace React' error when using React.FC
import React, { useState, useMemo, useCallback } from 'react';
import { EXAM_DATA } from './constants';
import { QuestionType, QuizState, Section, Question } from './types';

const App: React.FC = () => {
  const [state, setState] = useState<QuizState>({
    answers: {},
    results: {},
  });

  const totalQuestions = useMemo(() => {
    return EXAM_DATA.reduce((acc, section) => acc + section.questions.length, 0);
  }, []);

  const correctCount = useMemo(() => {
    return Object.values(state.results).filter((r) => r === true).length;
  }, [state.results]);

  const finalScore = useMemo(() => {
    if (totalQuestions === 0) return 0;
    const score = (10 * correctCount) / totalQuestions;
    return Math.round(score * 100) / 100;
  }, [correctCount, totalQuestions]);

  const normalizeString = (str: string) => {
    return str
      .trim()
      .toLowerCase()
      .replace(/[\u2018\u2019\u201b]/g, "'") // Handle smart quotes/apostrophes
      .replace(/[.!?]$/, '') // Remove trailing punctuation
      .replace(/\s+/g, ' '); // Collapse multiple spaces
  };

  const handleAnswerChange = useCallback((questionId: string, answer: string, correctAnswer: string, type: QuestionType) => {
    setState((prev) => {
      let isCorrect = false;
      if (type === QuestionType.FILL_BLANK) {
        const normalizedInput = normalizeString(answer);
        const normalizedTarget = normalizeString(correctAnswer);
        isCorrect = normalizedInput === normalizedTarget;
      } else {
        isCorrect = answer === correctAnswer;
      }

      return {
        ...prev,
        answers: { ...prev.answers, [questionId]: answer },
        results: { ...prev.results, [questionId]: isCorrect },
      };
    });
  }, []);

  const renderQuestion = (q: Question) => {
    const currentResult = state.results[q.id];
    const currentAnswer = state.answers[q.id] || '';

    return (
      <div key={q.id} className="mb-6 p-4 rounded-lg bg-white border border-gray-200 shadow-sm transition-all hover:shadow-md">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <p className="font-medium text-gray-800 whitespace-pre-wrap">{q.text}</p>
            {q.note && (
              <span className="inline-block mt-1 text-xs font-bold px-2 py-1 bg-indigo-100 text-indigo-700 rounded uppercase">
                Word: {q.note}
              </span>
            )}
          </div>
          {currentResult !== undefined && currentResult !== null && (
            <div className={`ml-3 flex items-center ${currentResult ? 'text-green-600' : 'text-red-600'}`}>
              <i className={`fas ${currentResult ? 'fa-check-circle' : 'fa-times-circle'} mr-1`}></i>
              <span className="text-xs font-bold uppercase">{currentResult ? 'Đúng' : 'Sai'}</span>
            </div>
          )}
        </div>

        {q.type === QuestionType.MULTIPLE_CHOICE && q.options && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
            {q.options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleAnswerChange(q.id, opt.id, q.correctAnswer, q.type)}
                className={`text-left p-3 rounded border transition-colors ${
                  currentAnswer === opt.id
                    ? 'bg-indigo-600 border-indigo-600 text-white'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <span className="font-bold mr-2">{opt.id}.</span> {opt.text}
              </button>
            ))}
          </div>
        )}

        {q.type === QuestionType.TRUE_FALSE && (
          <div className="flex gap-4 mt-3">
            {['True', 'False'].map((val) => (
              <button
                key={val}
                onClick={() => handleAnswerChange(q.id, val, q.correctAnswer, q.type)}
                className={`px-6 py-2 rounded border font-medium transition-colors ${
                  currentAnswer === val
                    ? 'bg-indigo-600 border-indigo-600 text-white'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-700'
                }`}
              >
                {val}
              </button>
            ))}
          </div>
        )}

        {q.type === QuestionType.FILL_BLANK && (
          <input
            type="text"
            value={currentAnswer}
            placeholder="Nhập toàn bộ câu viết lại..."
            onChange={(e) => handleAnswerChange(q.id, e.target.value, q.correctAnswer, q.type)}
            className="w-full mt-3 p-3 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          />
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-indigo-700 text-white shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4 sm:py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">EXAM REVISION - GRADE 8</h1>
            <div className="flex gap-4 text-xs sm:text-sm mt-1 opacity-90">
              <p><span className="font-semibold">NAME:</span> Lãnh Thị Trà My</p>
              <p><span className="font-semibold">CLASS:</span> 8A6</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-xs uppercase tracking-widest opacity-80">Score</p>
              <p className="text-2xl sm:text-4xl font-black">{finalScore}/10</p>
            </div>
            <div className="text-center border-l border-indigo-500 pl-6">
              <p className="text-xs uppercase tracking-widest opacity-80">Correct</p>
              <p className="text-2xl sm:text-4xl font-black">{correctCount}/{totalQuestions}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 mt-8">
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8 rounded shadow-sm text-sm text-blue-700">
          <p className="font-bold flex items-center">
            <i className="fas fa-info-circle mr-2"></i> Instructions:
          </p>
          <p>Complete the questions below. For Section VII, you must rewrite the <strong>entire</strong> sentence. The app will immediately tell you if your answer is Correct or Incorrect.</p>
        </div>

        {EXAM_DATA.map((section) => (
          <section key={section.id} className="mb-12">
            <div className="mb-4 border-b-2 border-indigo-100 pb-2">
              <h2 className="text-xl font-extrabold text-indigo-900 uppercase tracking-wide">
                {section.title}
              </h2>
              {section.description && (
                <p className="text-sm text-gray-500 mt-1 italic">{section.description}</p>
              )}
            </div>
            <div className="space-y-4">
              {section.questions.map(renderQuestion)}
            </div>
          </section>
        ))}

        <div className="text-center py-10 bg-indigo-50 rounded-2xl border-2 border-dashed border-indigo-200 mb-12">
          <h3 className="text-2xl font-black text-indigo-600 mb-2">FINISHED?</h3>
          <p className="text-gray-600 mb-6">Review your answers above and check your score in the header.</p>
          <div className="flex flex-col items-center">
             <p className="text-5xl font-black text-indigo-800 mb-2">{finalScore}</p>
             <p className="text-sm font-medium text-indigo-500 uppercase tracking-widest">Final Grade</p>
          </div>
          <p className="mt-10 font-bold text-indigo-400">- THE END - TRY YOUR BEST AND GOOD LUCK! -</p>
        </div>
      </main>

      {/* Floating Action Button for Scroll to Top */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 w-12 h-12 bg-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-indigo-700 transition-all z-40"
      >
        <i className="fas fa-arrow-up"></i>
      </button>
    </div>
  );
};

export default App;
