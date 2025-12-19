
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { LISTENING_QUESTIONS, READING_QUESTIONS, AUDIO_URL, VIEW_AUDIO_URL, READING_PASSAGE, WRITING_TASK_2 } from './constants';
import { UserAnswers, TestState, TabType, WritingState } from './types';
import { QuestionCard } from './components/QuestionCard';

const LISTENING_TIME_LIMIT = 12 * 60; // 12 minutes
const READING_TIME_LIMIT = 25 * 60; // 25 minutes
const WRITING_TIME_LIMIT = 40 * 60; // 40 minutes

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('LISTENING');
  
  // Listening State
  const [listeningState, setListeningState] = useState<TestState>({
    answers: {},
    submitted: false,
    score: null,
    timeRemaining: LISTENING_TIME_LIMIT,
    isTimerRunning: false
  });

  // Reading State
  const [readingState, setReadingState] = useState<TestState>({
    answers: {},
    submitted: false,
    score: null,
    timeRemaining: READING_TIME_LIMIT,
    isTimerRunning: false
  });

  // Writing State
  const [writingState, setWritingState] = useState<WritingState>({
    essay: '',
    submitted: false,
    timeRemaining: WRITING_TIME_LIMIT,
    isTimerRunning: false
  });

  const listeningTimerRef = useRef<number | null>(null);
  const readingTimerRef = useRef<number | null>(null);
  const writingTimerRef = useRef<number | null>(null);

  // Timer Effect
  useEffect(() => {
    // Listening Timer
    if (activeTab === 'LISTENING' && listeningState.isTimerRunning && !listeningState.submitted) {
      listeningTimerRef.current = window.setInterval(() => {
        setListeningState(prev => {
          if (prev.timeRemaining <= 1) {
            if (listeningTimerRef.current) clearInterval(listeningTimerRef.current);
            handleListeningSubmit(prev.answers);
            return { ...prev, timeRemaining: 0, isTimerRunning: false };
          }
          return { ...prev, timeRemaining: prev.timeRemaining - 1 };
        });
      }, 1000);
    } else {
      if (listeningTimerRef.current) clearInterval(listeningTimerRef.current);
    }

    // Reading Timer
    if (activeTab === 'READING' && readingState.isTimerRunning && !readingState.submitted) {
      readingTimerRef.current = window.setInterval(() => {
        setReadingState(prev => {
          if (prev.timeRemaining <= 1) {
            if (readingTimerRef.current) clearInterval(readingTimerRef.current);
            handleReadingSubmit(prev.answers);
            return { ...prev, timeRemaining: 0, isTimerRunning: false };
          }
          return { ...prev, timeRemaining: prev.timeRemaining - 1 };
        });
      }, 1000);
    } else {
      if (readingTimerRef.current) clearInterval(readingTimerRef.current);
    }

    // Writing Timer
    if (activeTab === 'WRITING' && writingState.isTimerRunning && !writingState.submitted) {
      writingTimerRef.current = window.setInterval(() => {
        setWritingState(prev => {
          if (prev.timeRemaining <= 1) {
            if (writingTimerRef.current) clearInterval(writingTimerRef.current);
            setWritingState(s => ({ ...s, submitted: true, isTimerRunning: false }));
            return { ...prev, timeRemaining: 0, isTimerRunning: false };
          }
          return { ...prev, timeRemaining: prev.timeRemaining - 1 };
        });
      }, 1000);
    } else {
      if (writingTimerRef.current) clearInterval(writingTimerRef.current);
    }

    return () => {
      if (listeningTimerRef.current) clearInterval(listeningTimerRef.current);
      if (readingTimerRef.current) clearInterval(readingTimerRef.current);
      if (writingTimerRef.current) clearInterval(writingTimerRef.current);
    };
  }, [activeTab, listeningState.isTimerRunning, listeningState.submitted, readingState.isTimerRunning, readingState.submitted, writingState.isTimerRunning, writingState.submitted]);

  const handleAnswerChange = useCallback((tab: TabType, id: number, value: string) => {
    if (tab === 'LISTENING') {
      if (listeningState.submitted) return;
      setListeningState(prev => ({ ...prev, answers: { ...prev.answers, [id]: value } }));
    } else if (tab === 'READING') {
      if (readingState.submitted) return;
      setReadingState(prev => ({ ...prev, answers: { ...prev.answers, [id]: value } }));
    }
  }, [listeningState.submitted, readingState.submitted]);

  const handleListeningSubmit = (currentAnswers?: UserAnswers) => {
    const answersToEvaluate = currentAnswers || listeningState.answers;
    let correctCount = 0;
    LISTENING_QUESTIONS.forEach(q => {
      const userAnswer = (answersToEvaluate[q.id] || '').trim().toLowerCase();
      if (userAnswer === q.correctAnswer.toLowerCase()) correctCount++;
    });
    setListeningState(prev => ({ 
      ...prev, 
      submitted: true, 
      score: (40 * correctCount) / LISTENING_QUESTIONS.length,
      isTimerRunning: false
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReadingSubmit = (currentAnswers?: UserAnswers) => {
    const answersToEvaluate = currentAnswers || readingState.answers;
    let correctCount = 0;
    READING_QUESTIONS.forEach(q => {
      const userAnswer = (answersToEvaluate[q.id] || '').trim().toLowerCase();
      if (userAnswer === q.correctAnswer.toLowerCase()) correctCount++;
    });
    setReadingState(prev => ({ 
      ...prev, 
      submitted: true, 
      score: (40 * correctCount) / READING_QUESTIONS.length,
      isTimerRunning: false 
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const downloadEssay = () => {
    const element = document.createElement("a");
    const file = new Blob([`IELTS WRITING TASK 2\n\nPrompt: ${WRITING_TASK_2}\n\nCandidate's Essay:\n\n${writingState.essay}`], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "ielts_writing_task2.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const wordCount = writingState.essay.trim() ? writingState.essay.trim().split(/\s+/).length : 0;

  const currentTimerRemaining = activeTab === 'LISTENING' 
    ? listeningState.timeRemaining 
    : activeTab === 'READING' 
      ? readingState.timeRemaining 
      : writingState.timeRemaining;

  const isTestSubmitted = activeTab === 'LISTENING' 
    ? listeningState.submitted 
    : activeTab === 'READING' 
      ? readingState.submitted 
      : writingState.submitted;

  const isTimerRunning = activeTab === 'LISTENING'
    ? listeningState.isTimerRunning
    : activeTab === 'READING'
      ? readingState.isTimerRunning
      : writingState.isTimerRunning;

  return (
    <div className="min-h-screen pb-20 bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 text-white p-2 rounded-lg"><i className="fa-solid fa-graduation-cap text-xl"></i></div>
              <h1 className="font-bold text-xl text-slate-900 hidden sm:block">IELTS Master</h1>
            </div>

            <div className="flex bg-slate-100 p-1 rounded-xl">
              {(['LISTENING', 'READING', 'WRITING'] as TabType[]).map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 sm:px-6 py-2 rounded-lg font-bold text-xs sm:text-sm transition-all ${activeTab === tab ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  {tab.charAt(0) + tab.slice(1).toLowerCase()}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              {!isTestSubmitted && isTimerRunning && (
                <div className={`font-mono font-bold text-lg px-4 py-2 rounded-full border-2 ${
                  currentTimerRemaining < 60 ? 'border-red-500 text-red-600 animate-pulse' : 'border-blue-200 text-blue-600'
                }`}>
                  {formatTime(currentTimerRemaining)}
                </div>
              )}
              
              {activeTab === 'WRITING' && writingState.submitted && (
                <button 
                  onClick={downloadEssay}
                  className="bg-green-600 text-white px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-green-700 transition-all shadow-md"
                >
                  <i className="fa-solid fa-download"></i> Tải bài viết
                </button>
              )}

              <button 
                onClick={() => {
                  if (activeTab === 'LISTENING') handleListeningSubmit();
                  if (activeTab === 'READING') handleReadingSubmit();
                  if (activeTab === 'WRITING') setWritingState(s => ({ ...s, submitted: true, isTimerRunning: false }));
                }}
                disabled={!isTimerRunning || isTestSubmitted}
                className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold shadow-md hover:bg-blue-700 disabled:opacity-50"
              >
                {isTestSubmitted ? 'Completed' : 'Finish Test'}
              </button>
            </div>
          </div>
          
          {/* Result Banner */}
          {(activeTab !== 'WRITING' && isTestSubmitted) && (
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 flex items-center justify-between animate-fadeIn">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold shadow-sm">
                    {(activeTab === 'LISTENING' ? listeningState.score : readingState.score)?.toFixed(1)}
                  </div>
                  <span className="text-sm font-bold text-blue-900">Your IELTS Scaled Score (40.0 scale)</span>
               </div>
               <button 
                 onClick={() => {
                   if (activeTab === 'LISTENING') setListeningState({ answers: {}, submitted: false, score: null, timeRemaining: LISTENING_TIME_LIMIT, isTimerRunning: false });
                   if (activeTab === 'READING') setReadingState({ answers: {}, submitted: false, score: null, timeRemaining: READING_TIME_LIMIT, isTimerRunning: false });
                 }}
                 className="text-xs text-blue-600 hover:underline"
               >Reset Test</button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      {activeTab === 'LISTENING' && (
        <main className="max-w-5xl mx-auto p-4 md:p-8">
          {!listeningState.isTimerRunning && !listeningState.submitted ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center max-w-2xl mx-auto">
              <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-3xl mb-6"><i className="fa-solid fa-headphones"></i></div>
              <h2 className="text-3xl font-black text-slate-900 mb-4">IELTS Listening Test</h2>
              <p className="text-slate-600 mb-8">Bạn có 12 phút để hoàn thành. Đồng hồ sẽ bắt đầu chạy ngay khi bạn nhấp nút dưới.</p>
              <button 
                onClick={() => setListeningState(s => ({ ...s, isTimerRunning: true }))} 
                className="bg-blue-600 text-white px-10 py-4 rounded-full font-bold shadow-xl hover:scale-105 transition-all"
              >
                Start Listening Test
              </button>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-[1fr,320px]">
              <div className="space-y-12">
                <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><i className="fa-solid fa-headphones text-blue-500"></i>Audio</h2>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <audio controls className="w-full h-12 mb-4 bg-white rounded-lg"><source src={AUDIO_URL} type="audio/mpeg" /></audio>
                    <a href={VIEW_AUDIO_URL} target="_blank" className="text-xs font-bold text-blue-600 hover:underline"><i className="fa-brands fa-google-drive mr-1"></i>Drive Link</a>
                  </div>
                </section>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 space-y-6">
                   {LISTENING_QUESTIONS.map(q => (
                     <QuestionCard 
                       key={q.id} 
                       question={q} 
                       value={listeningState.answers[q.id] || ''} 
                       onChange={(id, val) => handleAnswerChange('LISTENING', id, val)} 
                       submitted={listeningState.submitted} 
                       isCorrect={listeningState.submitted ? (listeningState.answers[q.id] || '').trim().toLowerCase() === q.correctAnswer.toLowerCase() : undefined} 
                     />
                   ))}
                </div>
              </div>
              <aside className="hidden md:block">
                <div className="sticky top-48 p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                  <h3 className="font-bold text-slate-800 mb-4">Progress</h3>
                  <div className="grid grid-cols-5 gap-2">
                    {LISTENING_QUESTIONS.map(q => (
                      <div key={q.id} className={`w-8 h-8 rounded flex items-center justify-center text-xs font-bold ${listeningState.submitted ? (listeningState.answers[q.id]?.toLowerCase() === q.correctAnswer.toLowerCase() ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : (listeningState.answers[q.id] ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400')}`}>{q.id}</div>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          )}
        </main>
      )}

      {activeTab === 'READING' && (
        <main className="max-w-[1600px] mx-auto p-4 md:p-8">
           {!readingState.isTimerRunning && !readingState.submitted ? (
             <div className="flex flex-col items-center justify-center min-h-[60vh] text-center max-w-2xl mx-auto">
                <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-3xl mb-6"><i className="fa-solid fa-book"></i></div>
                <h2 className="text-3xl font-black text-slate-900 mb-4">IELTS Reading</h2>
                <p className="text-slate-600 mb-8">Bạn có 25 phút để hoàn thành. Đồng hồ sẽ bắt đầu ngay khi bạn nhấp nút dưới.</p>
                <button onClick={() => setReadingState(s => ({ ...s, isTimerRunning: true }))} className="bg-blue-600 text-white px-10 py-4 rounded-full font-bold shadow-xl hover:scale-105 transition-all">Start Reading Test</button>
             </div>
           ) : (
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="bg-white p-8 rounded-2xl shadow-md lg:sticky lg:top-28 h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
                  <h2 className="text-2xl font-black mb-6">How and why we yawn</h2>
                  <div className="prose text-slate-700 leading-relaxed space-y-4">
                    {READING_PASSAGE.split('\n').map((p, i) => p && <p key={i}>{p}</p>)}
                  </div>
                </div>
                <div className="space-y-6 pb-20">
                   {READING_QUESTIONS.map(q => (
                     <QuestionCard key={q.id} question={q} value={readingState.answers[q.id] || ''} onChange={(id, val) => handleAnswerChange('READING', id, val)} submitted={readingState.submitted} isCorrect={readingState.submitted ? readingState.answers[q.id] === q.correctAnswer : undefined} />
                   ))}
                </div>
             </div>
           )}
        </main>
      )}

      {activeTab === 'WRITING' && (
        <main className="max-w-6xl mx-auto p-4 md:p-8">
           {!writingState.isTimerRunning && !writingState.submitted ? (
             <div className="flex flex-col items-center justify-center min-h-[60vh] text-center max-w-2xl mx-auto">
                <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-3xl mb-6"><i className="fa-solid fa-pen-nib"></i></div>
                <h2 className="text-3xl font-black text-slate-900 mb-4">IELTS Writing Task 2</h2>
                <p className="text-slate-600 mb-8">Bạn có 40 phút để hoàn thành bài viết. Bạn nên viết ít nhất 250 từ.</p>
                <button onClick={() => setWritingState(s => ({ ...s, isTimerRunning: true }))} className="bg-blue-600 text-white px-10 py-4 rounded-full font-bold shadow-xl hover:scale-105 transition-all">Start Writing Test</button>
             </div>
           ) : (
             <div className="grid grid-cols-1 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-md border-l-8 border-blue-600">
                   <h3 className="text-sm font-black text-blue-600 uppercase mb-2">Writing Task 2</h3>
                   <p className="text-xl font-bold text-slate-800 leading-relaxed">{WRITING_TASK_2}</p>
                </div>
                <div className="bg-white p-1 rounded-2xl shadow-inner border border-slate-200 relative">
                   <textarea 
                     value={writingState.essay}
                     onChange={(e) => !writingState.submitted && setWritingState(s => ({ ...s, essay: e.target.value }))}
                     disabled={writingState.submitted}
                     placeholder="Type your essay here..."
                     className="w-full h-[500px] p-8 focus:outline-none text-lg text-slate-700 leading-relaxed font-serif rounded-2xl disabled:bg-slate-50 disabled:cursor-not-allowed"
                   />
                   <div className="absolute bottom-6 right-8 bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg">
                     Words: {wordCount}
                   </div>
                </div>
             </div>
           )}
        </main>
      )}
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default App;
