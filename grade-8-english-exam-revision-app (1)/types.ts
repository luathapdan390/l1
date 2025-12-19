
export enum QuestionType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  FILL_BLANK = 'FILL_BLANK',
  TRUE_FALSE = 'TRUE_FALSE',
}

export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options?: Option[];
  correctAnswer: string;
  context?: string; // For things like "Speaker A: ..."
  note?: string; // For (WORD) in word formation
}

export interface Section {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
}

export interface QuizState {
  answers: Record<string, string>;
  results: Record<string, boolean | null>;
}
