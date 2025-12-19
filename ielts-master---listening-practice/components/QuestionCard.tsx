
import React from 'react';
import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  value: string;
  onChange: (id: number, value: string) => void;
  submitted: boolean;
  isCorrect?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ 
  question, 
  value, 
  onChange, 
  submitted, 
  isCorrect 
}) => {
  const getStatusColor = () => {
    if (!submitted) return 'border-gray-200 focus:border-blue-500';
    return isCorrect ? 'border-green-500 bg-green-50 text-green-700' : 'border-red-500 bg-red-50 text-red-700';
  };

  return (
    <div className={`p-4 rounded-xl border-2 transition-all ${getStatusColor()} mb-4`}>
      <div className="flex items-start gap-3">
        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-sm">
          {question.id}
        </span>
        <div className="flex-grow">
          {question.type === 'TEXT' ? (
            <div className="flex flex-col gap-2">
              <input
                type="text"
                value={value}
                onChange={(e) => onChange(question.id, e.target.value)}
                disabled={submitted}
                placeholder="Write your answer..."
                className={`w-full p-2 outline-none border-b-2 bg-transparent transition-colors ${
                  submitted ? 'cursor-not-allowed' : 'focus:border-blue-600'
                }`}
              />
            </div>
          ) : (
            <div className="grid gap-3 mt-1">
              {question.options?.map((opt) => (
                <label 
                  key={opt.value} 
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                    value === opt.value 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-transparent hover:bg-gray-100'
                  } ${submitted ? 'cursor-default opacity-80' : ''}`}
                >
                  <input
                    type="radio"
                    name={`q-${question.id}`}
                    value={opt.value}
                    checked={value === opt.value}
                    onChange={() => !submitted && onChange(question.id, opt.value)}
                    disabled={submitted}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">
                    <span className="font-bold mr-2">{opt.value}.</span>
                    {opt.label}
                  </span>
                </label>
              ))}
            </div>
          )}
          
          {submitted && (
            <div className="mt-3 flex items-center gap-2 text-xs font-semibold">
              {isCorrect ? (
                <><i className="fa-solid fa-circle-check"></i> Correct</>
              ) : (
                <><i className="fa-solid fa-circle-xmark"></i> Incorrect</>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
