import kiboHappy from "@/assets/kibo-happy.png";
import kiboSmile from "@/assets/kibo-smile.png";
import kiboWave from "@/assets/kibo-wave.png";

export const KIBO = {
  happy: kiboHappy,
  neutral: kiboSmile,
  wave: kiboWave,
};

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

export const CURRICULUM: Curriculum = {
  levels: [
    {
      id: 1, title: "AI Basics", color: "#3db74a", lessons: [
        {
          id: "l1-1", title: "What is AI?", duration: "3 min", xp: 20, state: "done", questions: [
            { type: "mcq", question: "What does 'AI' stand for?", hint: "Think about the letters...", choices: ["Automated Interface", "Artificial Intelligence", "Advanced Interaction", "Analog Integration"], correct: 1, explanation: "AI = Artificial Intelligence — teaching machines to think and learn like humans.", xp: 10 },
            { type: "mcq", question: "Which of these is an example of AI in everyday life?", choices: ["A calculator", "A light switch", "A voice assistant like Siri", "A wooden chair"], correct: 2, explanation: "Voice assistants use AI to understand speech and respond intelligently.", xp: 10 },
            { type: "mcq", question: "AI was first seriously researched in which decade?", choices: ["1930s", "1950s", "1970s", "1990s"], correct: 1, explanation: "The term 'Artificial Intelligence' was coined at Dartmouth in 1956.", xp: 10 }
          ]
        },
        {
          id: "l1-2", title: "AI vs Humans", duration: "3 min", xp: 20, state: "done", questions: [
            { type: "mcq", question: "What can AI currently do BETTER than most humans?", choices: ["Feel emotions", "Process huge datasets quickly", "Understand sarcasm perfectly", "Create original art with meaning"], correct: 1, explanation: "AI excels at speed and scale — processing millions of data points humans never could.", xp: 10 },
            { type: "mcq", question: "What is something humans still do better than AI?", choices: ["Play chess", "Translate languages", "Understand context and nuance", "Recognize faces"], correct: 2, explanation: "Humans naturally understand cultural context, irony, and nuance far better than AI.", xp: 10 }
          ]
        },
        {
          id: "l1-3", title: "Types of AI Tools", duration: "4 min", xp: 20, state: "active", questions: [
            { type: "mcq", question: "Which is the BEST AI prompt for writing an email?", hint: "Specificity matters!", choices: ['"Write email"', '"Professional email to manager requesting Friday off, polite and short"', '"Email please about time off"', '"Manager email Friday"'], correct: 1, explanation: "Great prompts have context, tone, format and goal. Specific = better outputs!", xp: 10 },
            { type: "mcq", question: "You want to summarize a 3-page document. Which AI is best?", choices: ["An image generator", "A text AI like Claude or ChatGPT", "A music AI", "A coding-only AI"], correct: 1, explanation: "Text AI excels at reading, understanding and summarizing long documents.", xp: 10 },
            { type: "mcq", question: "What is 'AI hallucination'?", choices: ["When AI crashes", "When AI confidently gives false info", "When AI is slow", "When AI needs retraining"], correct: 1, explanation: "Hallucination = AI generating plausible but false info with confidence. Always verify!", xp: 10 }
          ]
        },
        { id: "l1-4", title: "History of AI", duration: "3 min", xp: 20, state: "locked", questions: [] },
        { id: "l1-5", title: "AI Today", duration: "4 min", xp: 20, state: "locked", questions: [] }
      ]
    },
    {
      id: 2, title: "Prompting", color: "#4a9eff", lessons: [
        { id: "l2-1", title: "What is a Prompt?", duration: "3 min", xp: 25, state: "locked", questions: [] },
        { id: "l2-2", title: "Bad vs Good Prompts", duration: "4 min", xp: 25, state: "locked", questions: [] },
        { id: "l2-3", title: "Fixing Prompts", duration: "5 min", xp: 30, state: "locked", questions: [] }
      ]
    },
    {
      id: 3, title: "AI for Work", color: "#ff8c42", lessons: [
        { id: "l3-1", title: "Writing Emails with AI", duration: "4 min", xp: 30, state: "locked", questions: [] },
        { id: "l3-2", title: "Summaries & Reports", duration: "4 min", xp: 30, state: "locked", questions: [] },
        { id: "l3-3", title: "AI for Research", duration: "5 min", xp: 30, state: "locked", questions: [] }
      ]
    },
    {
      id: 4, title: "AI Tools", color: "#9b6dff", lessons: [
        { id: "l4-1", title: "Writing Tools", duration: "3 min", xp: 30, state: "locked", questions: [] },
        { id: "l4-2", title: "Image Tools", duration: "3 min", xp: 30, state: "locked", questions: [] },
        { id: "l4-3", title: "Automation Tools", duration: "4 min", xp: 35, state: "locked", questions: [] }
      ]
    },
    {
      id: 5, title: "AI Safety", color: "#ff5a5a", lessons: [
        { id: "l5-1", title: "Hallucinations", duration: "4 min", xp: 35, state: "locked", questions: [] },
        { id: "l5-2", title: "Privacy & AI", duration: "3 min", xp: 35, state: "locked", questions: [] },
        { id: "l5-3", title: "Fact Checking AI", duration: "4 min", xp: 35, state: "locked", questions: [] }
      ]
    }
  ]
};
