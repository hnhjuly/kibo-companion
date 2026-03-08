export interface Question {
  type: string;
  question: string;
  hint?: string;
  choices: string[];
  correct: number;
  explanation: string;
  xp: number;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  xp: number;
  state: "done" | "active" | "locked";
  questions: Question[];
}

export interface Level {
  id: number;
  title: string;
  color: string;
  lessons: Lesson[];
}

export interface Curriculum {
  levels: Level[];
}
