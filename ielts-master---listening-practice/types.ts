
export type QuestionType = 'TEXT' | 'CHOICE';

export interface Question {
  id: number;
  type: QuestionType;
  label: string;
  correctAnswer: string;
  options?: { value: string; label: string }[];
}

export interface UserAnswers {
  [key: number]: string;
}

export interface TestState {
  answers: UserAnswers;
  submitted: boolean;
  score: number | null;
  timeRemaining: number; // in seconds
  isTimerRunning: boolean;
}

export interface WritingState {
  essay: string;
  submitted: boolean;
  timeRemaining: number;
  isTimerRunning: boolean;
}

export type TabType = 'LISTENING' | 'READING' | 'WRITING';
