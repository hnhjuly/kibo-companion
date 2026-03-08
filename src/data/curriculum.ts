import kiboHappy from "@/assets/kibo-happy.png";
import kiboSmile from "@/assets/kibo-smile.png";
import kiboWave from "@/assets/kibo-wave.png";
import kiboSurprised from "@/assets/kibo-surprised.png";
import kiboThinking from "@/assets/kibo-thinking.png";
import kiboCelebrate from "@/assets/kibo-celebrate.png";

import kiboSad from "@/assets/kibo-sad.png";
import kiboShocked from "@/assets/kibo-shocked.png";
import kiboThumbsup from "@/assets/kibo-thumbsup.png";
import kiboTrophy from "@/assets/kibo-trophy.png";
import kibo3DayStreak from "@/assets/kibo-3daystreak.png";
import kibo7DayStreak from "@/assets/kibo-7daystreak.png";
import kiboDay30 from "@/assets/kibo-day30.png";
import kiboFreezeStreak from "@/assets/kibo-freezestreak.png";
import kiboStudying from "@/assets/kibo-studying.png";
import kiboLowStreak from "@/assets/kibo-lowstreak.png";
import kiboStreakAtRisk from "@/assets/kibo-streakatrisk.png";

// New Kibo variants
import kiboCelebration2 from "@/assets/kibo-celebration2.png";
import kiboGraduate from "@/assets/kibo-graduate.png";
import kiboGraduate2 from "@/assets/kibo-graduate2.png";
import kiboFocusedIpad from "@/assets/kibo-focused-ipad.png";
import kiboFocusedLaptop from "@/assets/kibo-focused-laptop.png";
import kiboRobotics from "@/assets/kibo-robotics.png";
import kiboDetective from "@/assets/kibo-detective.png";
import kiboSad2 from "@/assets/kibo-sad2.png";

export const KIBO = {
  happy: kiboHappy,
  neutral: kiboSmile,
  wave: kiboWave,
  surprised: kiboSurprised,
  thinking: kiboThinking,
  celebrate: kiboCelebrate,
  focused: kiboStudying,
  sad: kiboSad,
  shocked: kiboShocked,
  thumbsup: kiboThumbsup,
  trophy: kiboTrophy,
  streak3: kibo3DayStreak,
  streak7: kibo7DayStreak,
  streak30: kiboDay30,
  freezeStreak: kiboFreezeStreak,
  studying: kiboStudying,
  lowStreak: kiboLowStreak,
  streakAtRisk: kiboStreakAtRisk,
  // New variants
  celebration2: kiboCelebration2,
  graduate: kiboGraduate,
  graduate2: kiboGraduate2,
  focusedIpad: kiboFocusedIpad,
  focusedLaptop: kiboFocusedLaptop,
  robotics: kiboRobotics,
  detective: kiboDetective,
  sad2: kiboSad2,
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
            { type: "mcq", question: "What does 'AI' stand for?", hint: "Think about the letters...", choices: ["Automated Interface", "Artificial Intelligence", "Advanced Interaction", "Analog Integration"], correct: 1, explanation: "AI = Artificial Intelligence. It's about teaching machines to think and learn like humans.", xp: 10 },
            { type: "mcq", question: "Which of these is an example of AI in everyday life?", choices: ["A calculator", "A light switch", "A voice assistant like Siri", "A wooden chair"], correct: 2, explanation: "Voice assistants use AI to understand speech and respond intelligently.", xp: 10 },
            { type: "mcq", question: "AI was first seriously researched in which decade?", choices: ["1930s", "1950s", "1970s", "1990s"], correct: 1, explanation: "The term 'Artificial Intelligence' was coined at Dartmouth in 1956.", xp: 10 }
          ]
        },
        {
          id: "l1-2", title: "AI vs Humans", duration: "3 min", xp: 20, state: "done", questions: [
            { type: "mcq", question: "What can AI currently do BETTER than most humans?", choices: ["Feel emotions", "Process huge datasets quickly", "Understand sarcasm perfectly", "Create original art with meaning"], correct: 1, explanation: "AI excels at speed and scale, processing millions of data points humans never could.", xp: 10 },
            { type: "mcq", question: "What is something humans still do better than AI?", choices: ["Play chess", "Translate languages", "Understand context and nuance", "Recognize faces"], correct: 2, explanation: "Humans naturally understand cultural context, irony, and nuance far better than AI.", xp: 10 }
          ]
        },
        {
          id: "l1-3", title: "Types of AI Tools", duration: "4 min", xp: 20, state: "active", questions: [
            { type: "mcq", question: "Which is the BEST AI prompt for writing an email?", hint: "Specificity matters!", choices: ['"Write email"', '"Professional email to manager requesting Friday off, polite and short"', '"Email please about time off"', '"Manager email Friday"'], correct: 1, explanation: "Great prompts have context, tone, format and goal. Specific = better outputs!", xp: 10 },
            { type: "mcq", question: "You want to summarize a 3-page document. Which AI is best?", choices: ["An image generator", "A text AI like Claude or ChatGPT", "A music AI", "A coding-only AI"], correct: 1, explanation: "Text AI excels at reading, understanding and summarizing long documents.", xp: 10 },
            { type: "mcq", question: "What is 'AI hallucination'?", choices: ["When AI crashes", "When AI confidently gives false info", "When AI is slow", "When AI needs retraining"], correct: 1, explanation: "Hallucination means AI generating plausible but false info with confidence. Always verify!", xp: 10 }
          ]
        },
        {
          id: "l1-4", title: "History of AI", duration: "3 min", xp: 20, state: "locked", questions: [
            { type: "mcq", question: "The term 'Artificial Intelligence' was coined at which event?", choices: ["MIT symposium 1960", "Dartmouth workshop 1956", "Stanford conference 1965", "IBM summit 1950"], correct: 1, explanation: "John McCarthy coined the term at the 1956 Dartmouth workshop, considered AI's birthplace.", xp: 10 },
            { type: "mcq", question: "What was 'Deep Blue' famous for?", choices: ["First chatbot", "Beating a chess world champion", "Self-driving car", "Writing poetry"], correct: 1, explanation: "IBM's Deep Blue defeated world chess champion Garry Kasparov in 1997.", xp: 10 },
            { type: "mcq", question: "What is an 'AI Winter'?", choices: ["AI that works in cold climates", "A period of reduced AI funding and interest", "A type of cooling system for AI", "An annual AI conference"], correct: 1, explanation: "AI Winters were periods when hype faded, funding dried up, and research slowed dramatically.", xp: 10 }
          ]
        },
        {
          id: "l1-5", title: "AI Today", duration: "4 min", xp: 20, state: "locked", questions: [
            { type: "mcq", question: "Which AI model sparked massive public interest in late 2022?", choices: ["DALL-E", "ChatGPT", "AlphaGo", "Watson"], correct: 1, explanation: "ChatGPT by OpenAI reached 100 million users in just 2 months after its Nov 2022 launch.", xp: 10 },
            { type: "mcq", question: "What does 'generative AI' mean?", choices: ["AI that generates electricity", "AI that creates new content like text or images", "AI that only reads data", "AI for generating passwords"], correct: 1, explanation: "Generative AI creates new content — text, images, code, music — based on patterns learned from training data.", xp: 10 },
            { type: "mcq", question: "Which industry has NOT been significantly impacted by AI?", choices: ["Healthcare", "Education", "Finance", "None — AI impacts all of these"], correct: 3, explanation: "AI is transforming virtually every industry including healthcare, education, finance, and many more.", xp: 10 }
          ]
        }
      ]
    },
    {
      id: 2, title: "Prompting", color: "#4a9eff", lessons: [
        {
          id: "l2-1", title: "What is a Prompt?", duration: "3 min", xp: 25, state: "locked", questions: [
            { type: "mcq", question: "What is a 'prompt' in AI?", choices: ["A loading screen", "An instruction or input you give to an AI", "An AI's internal memory", "A programming language"], correct: 1, explanation: "A prompt is the text or instruction you provide to an AI system to get a response.", xp: 10 },
            { type: "mcq", question: "Which part of a prompt tells the AI what format to respond in?", choices: ["The greeting", "The output instruction", "The password", "The disclaimer"], correct: 1, explanation: "Output instructions tell AI how to format responses — bullet points, paragraph, table, etc.", xp: 10 },
            { type: "mcq", question: "What happens when you give AI a vague prompt?", choices: ["It asks for clarification every time", "It gives a vague or generic answer", "It crashes", "Nothing happens"], correct: 1, explanation: "Vague prompts = vague outputs. The more specific your prompt, the better the result.", xp: 10 }
          ]
        },
        {
          id: "l2-2", title: "Bad vs Good Prompts", duration: "4 min", xp: 25, state: "locked", questions: [
            { type: "mcq", question: "Which is a BETTER prompt for writing help?", choices: ['"Write something"', '"Write a 200-word blog intro about remote work benefits for freelancers"', '"Blog post please"', '"Help me write"'], correct: 1, explanation: "Good prompts include topic, length, audience, and purpose for specific, useful outputs.", xp: 10 },
            { type: "mcq", question: "What makes a prompt 'bad'?", choices: ["It's too long", "It's too specific", "It's vague and lacks context", "It uses simple words"], correct: 2, explanation: "Bad prompts lack context, specificity, and clear intent — leading to unhelpful AI responses.", xp: 10 },
            { type: "mcq", question: "Adding 'Explain like I'm 5' to a prompt is an example of:", choices: ["Adding tone/audience context", "Making it worse", "A coding instruction", "An error"], correct: 0, explanation: "Specifying the audience or comprehension level helps AI tailor its language and complexity.", xp: 10 }
          ]
        },
        {
          id: "l2-3", title: "Fixing Prompts", duration: "5 min", xp: 30, state: "locked", questions: [
            { type: "mcq", question: "If AI gives a too-long response, what should you do?", choices: ["Give up", "Add 'keep it under 100 words' to your prompt", "Use a different AI", "Delete everything"], correct: 1, explanation: "Adding length constraints to your prompt guides AI to give concise, focused responses.", xp: 10 },
            { type: "mcq", question: "What is 'iterative prompting'?", choices: ["Writing one perfect prompt", "Refining your prompt through multiple attempts", "Using multiple AI tools at once", "Copying someone else's prompt"], correct: 1, explanation: "Iterative prompting means refining and improving your prompts based on the AI's responses.", xp: 10 },
            { type: "mcq", question: "Which technique helps get more accurate AI outputs?", choices: ["Using ALL CAPS", "Providing examples of what you want", "Adding emojis", "Writing in code"], correct: 1, explanation: "Few-shot prompting — giving examples — helps AI understand exactly what format and style you want.", xp: 10 }
          ]
        }
      ]
    },
    {
      id: 3, title: "AI for Work", color: "#ff8c42", lessons: [
        {
          id: "l3-1", title: "Writing Emails with AI", duration: "4 min", xp: 30, state: "locked", questions: [
            { type: "mcq", question: "What should you ALWAYS do after AI drafts an email?", choices: ["Send it immediately", "Review and personalize it", "Delete it", "Forward it to AI again"], correct: 1, explanation: "AI drafts are starting points — always review for accuracy, tone, and personal touches.", xp: 10 },
            { type: "mcq", question: "Which detail helps AI write a better email?", choices: ["Your favorite color", "The recipient's role and the email's purpose", "The current weather", "Your email password"], correct: 1, explanation: "Context about who you're writing to and why produces more relevant, professional emails.", xp: 10 },
            { type: "mcq", question: "AI-written emails are best used as:", choices: ["Final drafts ready to send", "Starting points to edit and refine", "Replacements for all human writing", "Only for spam"], correct: 1, explanation: "Think of AI as a first-draft assistant. Your human review adds authenticity and catches errors.", xp: 10 }
          ]
        },
        {
          id: "l3-2", title: "Summaries & Reports", duration: "4 min", xp: 30, state: "locked", questions: [
            { type: "mcq", question: "What's the best way to get AI to summarize a long document?", choices: ["Say 'summarize'", "Paste the text and specify length and key points to focus on", "Ask it to guess what the document says", "Send just the title"], correct: 1, explanation: "Providing the full text with specific instructions yields accurate, focused summaries.", xp: 10 },
            { type: "mcq", question: "When using AI for reports, what should you verify?", choices: ["The font size", "All facts, data, and claims", "The AI's name", "Nothing — AI is always right"], correct: 1, explanation: "AI can hallucinate facts and statistics. Always fact-check AI-generated reports before sharing.", xp: 10 },
            { type: "mcq", question: "Which prompt gets the best meeting summary?", choices: ['"Summarize this"', '"Create bullet-point summary of key decisions and action items from this meeting transcript"', '"What happened?"', '"Meeting notes"'], correct: 1, explanation: "Specifying format (bullets), focus (decisions, actions), and source (transcript) gives the best results.", xp: 10 }
          ]
        },
        {
          id: "l3-3", title: "AI for Research", duration: "5 min", xp: 30, state: "locked", questions: [
            { type: "mcq", question: "Why shouldn't you blindly trust AI research results?", choices: ["AI is always wrong", "AI can present false information confidently", "AI doesn't know anything", "Research is impossible with AI"], correct: 1, explanation: "AI can hallucinate — generating plausible but false information. Always cross-reference sources.", xp: 10 },
            { type: "mcq", question: "What's a good use of AI in research?", choices: ["As your only source of truth", "To explore topics and generate starting points", "To replace all human analysis", "To fabricate data"], correct: 1, explanation: "AI excels at brainstorming, exploring angles, and creating research outlines to build upon.", xp: 10 },
            { type: "mcq", question: "How can you make AI research more reliable?", choices: ["Ask it to cite sources and then verify them", "Use bigger fonts", "Ask the same question 10 times", "Only research simple topics"], correct: 0, explanation: "Asking AI for sources and then independently verifying them dramatically improves reliability.", xp: 10 }
          ]
        }
      ]
    },
    {
      id: 4, title: "AI Tools", color: "#9b6dff", lessons: [
        {
          id: "l4-1", title: "Writing Tools", duration: "3 min", xp: 30, state: "locked", questions: [
            { type: "mcq", question: "Which is an AI writing tool?", choices: ["Photoshop", "ChatGPT", "Excel", "Spotify"], correct: 1, explanation: "ChatGPT, Claude, Jasper, and Grammarly are popular AI tools that help with writing tasks.", xp: 10 },
            { type: "mcq", question: "AI writing tools are BEST for:", choices: ["Replacing all human writers", "Drafting, editing, and brainstorming content", "Only writing code", "Creating legal contracts without review"], correct: 1, explanation: "AI writing tools excel as creative partners for drafting, editing, rephrasing, and brainstorming.", xp: 10 },
            { type: "mcq", question: "What's a risk of using AI for all your writing?", choices: ["Faster output", "Loss of personal voice and potential inaccuracies", "Better grammar", "More creativity"], correct: 1, explanation: "Over-reliance on AI can make your writing generic and may introduce factual errors.", xp: 10 }
          ]
        },
        {
          id: "l4-2", title: "Image Tools", duration: "3 min", xp: 30, state: "locked", questions: [
            { type: "mcq", question: "Which tool generates images from text descriptions?", choices: ["Google Docs", "DALL-E / Midjourney", "Slack", "Zoom"], correct: 1, explanation: "DALL-E, Midjourney, and Stable Diffusion create images from text prompts using AI.", xp: 10 },
            { type: "mcq", question: "What ethical concern exists with AI image generation?", choices: ["Images load too slowly", "It can create deepfakes and misinformation", "Colors aren't accurate enough", "It uses too much paper"], correct: 1, explanation: "AI-generated images raise concerns about deepfakes, copyright, and spreading misinformation.", xp: 10 },
            { type: "mcq", question: "To get better AI-generated images, you should:", choices: ["Use fewer words", "Be very descriptive about style, mood, and details", "Only use one-word prompts", "Let AI decide everything"], correct: 1, explanation: "Detailed prompts with style, lighting, composition, and mood produce much better AI images.", xp: 10 }
          ]
        },
        {
          id: "l4-3", title: "Automation Tools", duration: "4 min", xp: 35, state: "locked", questions: [
            { type: "mcq", question: "What does AI automation help with?", choices: ["Making coffee", "Handling repetitive tasks without manual effort", "Replacing the internet", "Only entertainment"], correct: 1, explanation: "AI automation tools handle repetitive tasks like data entry, scheduling, and email sorting.", xp: 10 },
            { type: "mcq", question: "Which is an example of AI automation?", choices: ["Reading a book", "Auto-sorting emails into categories", "Handwriting a letter", "Walking to work"], correct: 1, explanation: "AI can automatically categorize, prioritize, and route emails based on content analysis.", xp: 10 },
            { type: "mcq", question: "Tools like Zapier and Make use AI to:", choices: ["Build physical robots", "Connect apps and automate workflows", "Replace your computer", "Only send texts"], correct: 1, explanation: "Zapier and Make connect different apps and automate workflows between them using AI.", xp: 10 }
          ]
        }
      ]
    },
    {
      id: 5, title: "AI Safety", color: "#ff5a5a", lessons: [
        {
          id: "l5-1", title: "Hallucinations", duration: "4 min", xp: 35, state: "locked", questions: [
            { type: "mcq", question: "What is an AI 'hallucination'?", choices: ["When AI sees things", "When AI generates confident but false information", "When AI crashes", "When AI dreams"], correct: 1, explanation: "AI hallucinations are outputs that sound convincing but contain made-up or incorrect information.", xp: 10 },
            { type: "mcq", question: "How can you reduce AI hallucinations?", choices: ["Ask shorter questions", "Provide clear context and ask AI to cite sources", "Use AI less often", "Turn off your computer"], correct: 1, explanation: "Clear, specific prompts with source requests help reduce hallucinations. Always verify critical info.", xp: 10 },
            { type: "mcq", question: "Which field is MOST dangerous for AI hallucinations?", choices: ["Creative writing", "Medical or legal advice", "Casual conversation", "Recipe suggestions"], correct: 1, explanation: "Hallucinations in medical or legal contexts can lead to serious real-world harm.", xp: 10 }
          ]
        },
        {
          id: "l5-2", title: "Privacy & AI", duration: "3 min", xp: 35, state: "locked", questions: [
            { type: "mcq", question: "What should you NEVER put into a public AI chatbot?", choices: ["A recipe question", "Passwords, private data, or confidential business info", "A general knowledge question", "A joke"], correct: 1, explanation: "Public AI tools may store or use your inputs for training. Never share sensitive personal or business data.", xp: 10 },
            { type: "mcq", question: "Why is data privacy important with AI?", choices: ["AI needs privacy to think", "Your data could be stored, leaked, or used to train models", "It's not important", "Only for famous people"], correct: 1, explanation: "AI companies may store your conversations and use them to improve their models. Be mindful of what you share.", xp: 10 },
            { type: "mcq", question: "Which is a safe AI practice?", choices: ["Sharing your SSN with ChatGPT", "Using anonymized data when testing AI tools", "Posting private keys in prompts", "Sharing client data freely"], correct: 1, explanation: "Always anonymize sensitive data before using it with AI tools to protect privacy.", xp: 10 }
          ]
        },
        {
          id: "l5-3", title: "Fact Checking AI", duration: "4 min", xp: 35, state: "locked", questions: [
            { type: "mcq", question: "What's the FIRST thing to do with AI-generated facts?", choices: ["Share them immediately", "Verify them with trusted sources", "Assume they're correct", "Ignore them"], correct: 1, explanation: "Always cross-reference AI outputs with reliable sources before using or sharing them.", xp: 10 },
            { type: "mcq", question: "Which is a reliable way to fact-check AI?", choices: ["Ask the same AI again", "Check multiple independent, authoritative sources", "Trust it if it sounds right", "Only check spelling"], correct: 1, explanation: "Cross-referencing with multiple independent authoritative sources is the gold standard for fact-checking.", xp: 10 },
            { type: "mcq", question: "Why does AI sometimes present wrong info confidently?", choices: ["It's trying to trick you", "It predicts likely text patterns, not truth", "It's broken", "It has opinions"], correct: 1, explanation: "AI generates text based on probability patterns, not factual understanding — so it can be confidently wrong.", xp: 10 }
          ]
        }
      ]
    }
  ]
};
