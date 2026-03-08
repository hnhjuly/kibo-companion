export interface Flashcard {
  id: string;
  term: string;
  definition: string;
  icon: string;
  module: string;
  moduleColor: string;
  moduleBg: string;
  lessonId: string;
  difficulty: 1 | 2 | 3;
}

export const FLASHCARD_DATA: Flashcard[] = [
  { id: 'fc-m1-001', term: 'Artificial Intelligence', definition: 'The ability of computers to perform tasks that normally require human thinking — like recognising speech, making decisions, or generating text.', icon: '🤖', module: 'AI Basics', moduleColor: '#4a9eff', moduleBg: 'rgba(74,158,255,0.15)', lessonId: 'm1-l1', difficulty: 1 },
  { id: 'fc-m1-002', term: 'Machine Learning', definition: 'A way of building AI where the system improves by learning from data and examples rather than following fixed, hand-coded rules.', icon: '📊', module: 'AI Basics', moduleColor: '#4a9eff', moduleBg: 'rgba(74,158,255,0.15)', lessonId: 'm1-l1', difficulty: 1 },
  { id: 'fc-m1-003', term: 'Narrow AI', definition: 'AI designed to do one specific task very well — like translating languages or recommending music — but nothing outside that task.', icon: '🎯', module: 'AI Basics', moduleColor: '#4a9eff', moduleBg: 'rgba(74,158,255,0.15)', lessonId: 'm1-l1', difficulty: 1 },
  { id: 'fc-m1-004', term: 'Generative AI', definition: 'AI that creates brand new content — text, images, music, video — rather than just analysing existing data.', icon: '✨', module: 'AI Basics', moduleColor: '#4a9eff', moduleBg: 'rgba(74,158,255,0.15)', lessonId: 'm1-l2', difficulty: 1 },
  { id: 'fc-m1-005', term: 'Multimodal AI', definition: 'AI that can process and understand multiple types of input at once — like reading text and seeing images in the same conversation.', icon: '🔀', module: 'AI Basics', moduleColor: '#4a9eff', moduleBg: 'rgba(74,158,255,0.15)', lessonId: 'm1-l2', difficulty: 2 },
  { id: 'fc-m1-006', term: 'Hallucination', definition: 'When AI confidently states false information as if it were completely true — like inventing a research paper that does not exist.', icon: '👻', module: 'AI Basics', moduleColor: '#4a9eff', moduleBg: 'rgba(74,158,255,0.15)', lessonId: 'm1-l3', difficulty: 1 },
  { id: 'fc-m1-007', term: 'Knowledge Cutoff', definition: 'The date after which an AI has no training data and may not know about recent events unless it has a live search feature.', icon: '📅', module: 'AI Basics', moduleColor: '#4a9eff', moduleBg: 'rgba(74,158,255,0.15)', lessonId: 'm1-l3', difficulty: 1 },
  { id: 'fc-m1-008', term: 'Recommendation Engine', definition: 'An AI system that analyses your behaviour and similar users to suggest content you are likely to enjoy — used by Netflix, Spotify, and YouTube.', icon: '🎵', module: 'AI Basics', moduleColor: '#4a9eff', moduleBg: 'rgba(74,158,255,0.15)', lessonId: 'm1-l4', difficulty: 1 },
  { id: 'fc-m1-009', term: 'Computer Vision', definition: 'The field of AI that enables machines to understand and interpret images and video — powering face unlock, medical scans, and self-driving cars.', icon: '👁️', module: 'AI Basics', moduleColor: '#4a9eff', moduleBg: 'rgba(74,158,255,0.15)', lessonId: 'm1-l4', difficulty: 2 },
  { id: 'fc-m2-001', term: 'Prompt', definition: 'The text input you give to an AI to tell it what you want. Better prompts lead to better, more relevant responses.', icon: '💬', module: 'Talking to AI', moduleColor: '#3db74a', moduleBg: 'rgba(61,183,74,0.15)', lessonId: 'm2-l1', difficulty: 1 },
  { id: 'fc-m2-002', term: 'Prompt Engineering', definition: 'The skill of crafting prompts — including structure, context, and technique — to reliably get useful AI outputs.', icon: '⚙️', module: 'Talking to AI', moduleColor: '#3db74a', moduleBg: 'rgba(61,183,74,0.15)', lessonId: 'm2-l1', difficulty: 2 },
  { id: 'fc-m2-003', term: 'Zero-Shot Prompting', definition: 'Asking AI to complete a task with no examples — just an instruction — relying on what it learned during training.', icon: '🎯', module: 'Talking to AI', moduleColor: '#3db74a', moduleBg: 'rgba(61,183,74,0.15)', lessonId: 'm2-l1', difficulty: 2 },
  { id: 'fc-m2-004', term: 'Few-Shot Prompting', definition: 'Showing AI 2 to 5 examples of good output before your actual request — so it can match the pattern you want.', icon: '📋', module: 'Talking to AI', moduleColor: '#3db74a', moduleBg: 'rgba(61,183,74,0.15)', lessonId: 'm2-l1', difficulty: 2 },
  { id: 'fc-m2-005', term: 'Role Prompting', definition: 'Telling AI to "act as" a specific expert persona — like a nutritionist or lawyer — to shape how it frames its answers.', icon: '🎭', module: 'Talking to AI', moduleColor: '#3db74a', moduleBg: 'rgba(61,183,74,0.15)', lessonId: 'm2-l2', difficulty: 2 },
  { id: 'fc-m2-006', term: 'System Prompt', definition: 'Background instructions set before a conversation that shape how the AI behaves — usually set by developers, invisible to the user.', icon: '🔧', module: 'Talking to AI', moduleColor: '#3db74a', moduleBg: 'rgba(61,183,74,0.15)', lessonId: 'm2-l2', difficulty: 3 },
  { id: 'fc-m2-007', term: 'Constraints', definition: 'Limits added to a prompt to shape the output — like a word count, format type, or topics to avoid.', icon: '📏', module: 'Talking to AI', moduleColor: '#3db74a', moduleBg: 'rgba(61,183,74,0.15)', lessonId: 'm2-l3', difficulty: 2 },
  { id: 'fc-m2-008', term: 'Markdown', definition: 'A lightweight text format using symbols like # for headings and ** for bold — widely used in notes apps, GitHub, and AI outputs.', icon: '📝', module: 'Talking to AI', moduleColor: '#3db74a', moduleBg: 'rgba(61,183,74,0.15)', lessonId: 'm2-l3', difficulty: 2 },
  { id: 'fc-m2-009', term: 'Tone', definition: 'The mood or style of an AI response — formal, casual, empathetic, playful. Specifying it is one of the highest-impact prompt additions.', icon: '🎨', module: 'Talking to AI', moduleColor: '#3db74a', moduleBg: 'rgba(61,183,74,0.15)', lessonId: 'm2-l4', difficulty: 1 },
  { id: 'fc-m3-001', term: 'LLM', definition: 'Large Language Model — an AI trained on massive amounts of text to understand and generate human language. Claude, GPT-4, and Gemini are LLMs.', icon: '🧠', module: 'AI Tools', moduleColor: '#9b6dff', moduleBg: 'rgba(155,109,255,0.15)', lessonId: 'm3-l1', difficulty: 1 },
  { id: 'fc-m3-002', term: 'Image Generation AI', definition: 'AI that creates brand new images from text prompts. Tools include Midjourney, DALL-E, Adobe Firefly, and Stable Diffusion.', icon: '🖼️', module: 'AI Tools', moduleColor: '#9b6dff', moduleBg: 'rgba(155,109,255,0.15)', lessonId: 'm3-l1', difficulty: 1 },
  { id: 'fc-m3-003', term: 'Open Source AI', definition: "AI whose code and weights are publicly available for anyone to use, modify, or run on their own hardware. Stable Diffusion and LLaMA are examples.", icon: '🔓', module: 'AI Tools', moduleColor: '#9b6dff', moduleBg: 'rgba(155,109,255,0.15)', lessonId: 'm3-l1', difficulty: 2 },
  { id: 'fc-m3-004', term: 'Voice Cloning', definition: "Training an AI on samples of someone's voice so it can generate new speech that sounds exactly like that person.", icon: '🎙️', module: 'AI Tools', moduleColor: '#9b6dff', moduleBg: 'rgba(155,109,255,0.15)', lessonId: 'm3-l2', difficulty: 2 },
  { id: 'fc-m3-005', term: 'Whisper', definition: "OpenAI's open-source speech-to-text model that transcribes audio with high accuracy across many languages.", icon: '🎤', module: 'AI Tools', moduleColor: '#9b6dff', moduleBg: 'rgba(155,109,255,0.15)', lessonId: 'm3-l2', difficulty: 2 },
  { id: 'fc-m3-006', term: 'Sora', definition: "OpenAI's text-to-video model. First previewed in February 2024, publicly launched December 2024, with Sora 2 following in late 2025.", icon: '🎬', module: 'AI Tools', moduleColor: '#9b6dff', moduleBg: 'rgba(155,109,255,0.15)', lessonId: 'm3-l2', difficulty: 2 },
  { id: 'fc-m4-001', term: 'Adaptive Learning', definition: 'An AI system that adjusts its difficulty and content in real time based on your performance — making learning more efficient for each person.', icon: '📈', module: 'Daily Life', moduleColor: '#ff8c42', moduleBg: 'rgba(255,140,66,0.15)', lessonId: 'm4-l1', difficulty: 2 },
  { id: 'fc-m4-002', term: 'OCR', definition: 'Optical Character Recognition — AI technology that converts photographed text (like a handwritten note) into editable digital text.', icon: '📷', module: 'Daily Life', moduleColor: '#ff8c42', moduleBg: 'rgba(255,140,66,0.15)', lessonId: 'm4-l2', difficulty: 2 },
  { id: 'fc-m4-003', term: 'Transcription', definition: 'Using AI to convert spoken audio — like a meeting or podcast — into written text automatically.', icon: '🖊️', module: 'Daily Life', moduleColor: '#ff8c42', moduleBg: 'rgba(255,140,66,0.15)', lessonId: 'm4-l2', difficulty: 1 },
  { id: 'fc-m5-001', term: 'Action Items', definition: 'Specific tasks assigned after a meeting, typically with an owner and a deadline. AI can extract these from transcripts automatically.', icon: '✅', module: 'AI for Work', moduleColor: '#3db74a', moduleBg: 'rgba(61,183,74,0.15)', lessonId: 'm5-l1', difficulty: 1 },
  { id: 'fc-m5-002', term: 'Executive Summary', definition: 'A short, high-level overview of a longer document, written for leadership who need the key points fast without reading the full report.', icon: '📊', module: 'AI for Work', moduleColor: '#3db74a', moduleBg: 'rgba(61,183,74,0.15)', lessonId: 'm5-l1', difficulty: 1 },
  { id: 'fc-m5-003', term: 'Tone Matching', definition: 'Asking AI to write in the same style as an existing document or company communication — useful for brand and internal consistency.', icon: '🎯', module: 'AI for Work', moduleColor: '#3db74a', moduleBg: 'rgba(61,183,74,0.15)', lessonId: 'm5-l2', difficulty: 2 },
  { id: 'fc-m6-001', term: 'World Building', definition: 'Creating the rules, history, culture, and geography of a fictional universe — AI can generate consistent details on demand for authors.', icon: '🌍', module: 'Creativity', moduleColor: '#ff4f4f', moduleBg: 'rgba(255,79,79,0.15)', lessonId: 'm6-l1', difficulty: 1 },
  { id: 'fc-m6-002', term: 'Negative Prompt', definition: 'Words added to an image generation prompt telling the AI what NOT to include — like "blurry, watermark, extra fingers."', icon: '🚫', module: 'Creativity', moduleColor: '#ff4f4f', moduleBg: 'rgba(255,79,79,0.15)', lessonId: 'm6-l2', difficulty: 2 },
  { id: 'fc-m6-003', term: 'Inpainting', definition: 'AI that fills in missing or removed parts of an image seamlessly — used to remove unwanted objects from photos.', icon: '🖌️', module: 'Creativity', moduleColor: '#ff4f4f', moduleBg: 'rgba(255,79,79,0.15)', lessonId: 'm6-l2', difficulty: 2 },
  { id: 'fc-m6-004', term: 'Seed (image AI)', definition: 'A number that initialises the random process in image generation — using the same seed with the same prompt reproduces the same image every time.', icon: '🌱', module: 'Creativity', moduleColor: '#ff4f4f', moduleBg: 'rgba(255,79,79,0.15)', lessonId: 'm6-l2', difficulty: 3 },
  { id: 'fc-m6-005', term: 'Aspect Ratio', definition: 'The width-to-height proportion of an image. 1:1 for square posts, 9:16 for Stories, 16:9 for YouTube thumbnails.', icon: '📐', module: 'Creativity', moduleColor: '#ff4f4f', moduleBg: 'rgba(255,79,79,0.15)', lessonId: 'm6-l2', difficulty: 1 },
  { id: 'fc-m7-001', term: 'Grounding', definition: 'Connecting AI to verified source documents so it generates responses based on real, provided content rather than its training data alone.', icon: '⚓', module: 'AI Safety', moduleColor: '#ffb800', moduleBg: 'rgba(255,184,0,0.15)', lessonId: 'm7-l1', difficulty: 3 },
  { id: 'fc-m7-002', term: 'RAG', definition: 'Retrieval-Augmented Generation — a technique where AI retrieves relevant documents before generating a response, reducing hallucinations.', icon: '📚', module: 'AI Safety', moduleColor: '#ffb800', moduleBg: 'rgba(255,184,0,0.15)', lessonId: 'm7-l1', difficulty: 3 },
  { id: 'fc-m7-003', term: 'Algorithmic Bias', definition: 'When an AI system unfairly disadvantages certain groups because its training data reflected historical inequalities.', icon: '⚖️', module: 'AI Safety', moduleColor: '#ffb800', moduleBg: 'rgba(255,184,0,0.15)', lessonId: 'm7-l2', difficulty: 2 },
  { id: 'fc-m7-004', term: 'Deepfake', definition: 'AI-generated video or audio that realistically shows someone saying or doing something they never actually said or did.', icon: '🎭', module: 'AI Safety', moduleColor: '#ffb800', moduleBg: 'rgba(255,184,0,0.15)', lessonId: 'm7-l3', difficulty: 1 },
  { id: 'fc-m7-005', term: "Liar's Dividend", definition: 'The ability of bad actors to dismiss genuine evidence as AI-generated, using the existence of deepfake technology as cover.', icon: '🎲', module: 'AI Safety', moduleColor: '#ffb800', moduleBg: 'rgba(255,184,0,0.15)', lessonId: 'm7-l3', difficulty: 3 },
  { id: 'fc-m7-006', term: 'AI Alignment', definition: 'The challenge of making sure AI systems pursue goals that are truly beneficial to humans — one of the most important research areas in AI safety.', icon: '🧭', module: 'AI Safety', moduleColor: '#ffb800', moduleBg: 'rgba(255,184,0,0.15)', lessonId: 'm7-l4', difficulty: 3 },
  { id: 'fc-m7-007', term: 'Human-in-the-Loop', definition: 'A design where a human reviews and approves AI decisions before they take effect — essential in healthcare, justice, and finance.', icon: '🧑‍💻', module: 'AI Safety', moduleColor: '#ffb800', moduleBg: 'rgba(255,184,0,0.15)', lessonId: 'm7-l4', difficulty: 2 },
  { id: 'fc-m7-008', term: 'Agentic AI', definition: 'AI systems that can autonomously take sequences of actions and complete multi-step tasks without step-by-step human guidance.', icon: '🤖', module: 'AI Safety', moduleColor: '#ffb800', moduleBg: 'rgba(255,184,0,0.15)', lessonId: 'm7-l4', difficulty: 3 },
  { id: 'fc-m7-009', term: 'EU AI Act', definition: "The European Union's landmark law that classifies AI by risk level, banning certain practices and regulating high-risk applications, coming into force from 2025.", icon: '🏛️', module: 'AI Safety', moduleColor: '#ffb800', moduleBg: 'rgba(255,184,0,0.15)', lessonId: 'm7-l4', difficulty: 2 },
];

// Spaced repetition state manager
const FC_STATE_KEY = 'kibo_fc_state';

interface CardState {
  interval: number;
  ease: number;
  nextReview: number;
  timesCorrect: number;
}

function loadState(): Record<string, CardState> {
  try { return JSON.parse(sessionStorage.getItem(FC_STATE_KEY) || '{}'); } catch { return {}; }
}

function saveState(state: Record<string, CardState>) {
  try { sessionStorage.setItem(FC_STATE_KEY, JSON.stringify(state)); } catch {}
}

function getCardState(cardId: string): CardState {
  const state = loadState();
  return state[cardId] || { interval: 1, ease: 2.5, nextReview: 0, timesCorrect: 0 };
}

export const FlashcardState = {
  rate(cardId: string, rating: 'again' | 'almost' | 'got-it') {
    const state = loadState();
    const cs = getCardState(cardId);
    const now = Date.now();
    if (rating === 'again') {
      cs.interval = 1;
      cs.ease = Math.max(1.3, cs.ease - 0.2);
    } else if (rating === 'almost') {
      cs.interval = Math.max(1, Math.round(cs.interval * 1.2));
      cs.ease = Math.max(1.3, cs.ease - 0.1);
    } else {
      cs.interval = Math.round(cs.interval * cs.ease);
      cs.ease = Math.min(3.5, cs.ease + 0.1);
      cs.timesCorrect = (cs.timesCorrect || 0) + 1;
    }
    cs.nextReview = now + cs.interval * 60 * 1000;
    state[cardId] = cs;
    saveState(state);
  },

  getDueCards(): Flashcard[] {
    const now = Date.now();
    return FLASHCARD_DATA.filter(card => {
      const cs = getCardState(card.id);
      return cs.nextReview <= now;
    });
  },

  getNewCards(limit = 10): Flashcard[] {
    const state = loadState();
    return FLASHCARD_DATA.filter(c => !state[c.id]).slice(0, limit);
  },

  getSessionQueue(newCardLimit = 5): Flashcard[] {
    const due = this.getDueCards();
    const newCards = this.getNewCards(newCardLimit);
    const shuffle = (arr: Flashcard[]): Flashcard[] => [...arr].sort(() => Math.random() - 0.5);
    return [...shuffle(due), ...shuffle(newCards)];
  },
};
