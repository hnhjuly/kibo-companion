/**
 * kibo-true-false.ts
 * ==================
 * True/False question bank for Kibo Learn.
 *
 * CONTENT RULES (read before adding questions)
 * ---------------------------------------------
 * 1. Every statement must be verifiable against a named reputable source.
 * 2. No statistics that change frequently (user counts, market share %)
 *    unless the question is about the concept, not the number.
 * 3. No em dashes anywhere.
 * 4. Keep statements short and unambiguous — one clear idea per question.
 * 5. Write at a beginner level. Kibo's audience has never studied AI formally.
 * 6. Balance: roughly half TRUE, half FALSE per module.
 * 7. FALSE questions must have a clear, inarguable reason why they are false.
 *    Add that reason to the explanation field.
 * 8. To add more questions: copy an existing block, increment the id,
 *    update moduleId if needed, and verify the fact before saving.
 *
 * SOURCES USED (verified April 2026)
 * ------------------------------------
 * IBM Think:       https://www.ibm.com/think/topics/artificial-intelligence
 * IBM Halluc:      https://www.ibm.com/think/topics/ai-hallucinations
 * Google Cloud:    https://cloud.google.com/learn/what-is-artificial-intelligence
 * Google Cloud H:  https://cloud.google.com/discover/what-are-ai-hallucinations
 * Notre Dame:      https://learning.nd.edu/resource-library/ai-overview-and-definitions/
 * NASA:            https://www.nasa.gov/what-is-artificial-intelligence/
 * McKinsey AI:     https://www.mckinsey.com/featured-insights/mckinsey-explainers/what-is-ai
 * MIT Sloan:       https://mitsloanedtech.mit.edu/ai/basics/effective-prompts/
 * Wikipedia H:     https://en.wikipedia.org/wiki/Hallucination_(artificial_intelligence)
 * Wikipedia VB:    https://en.wikipedia.org/wiki/Vibe_coding
 * TechTarget P:    https://www.techtarget.com/searchenterpriseai/definition/AI-prompt
 * TechTarget H:    https://www.techtarget.com/whatis/definition/AI-hallucination
 * Palo Alto H:     https://www.paloaltonetworks.com/cyberpedia/what-are-ai-hallucinations
 * Wikipedia Diff:  https://en.wikipedia.org/wiki/Diffusion_model
 * Prompt Eng Wiki: https://en.wikipedia.org/wiki/Prompt_engineering
 * Harvard Prompts: https://www.huit.harvard.edu/news/ai-prompts
 *
 * MASCOT KEYS (use these in the UI)
 * ------------------------------------
 * KIBO.happy      -- shown on the question card (neutral/curious)
 * KIBO.celebrate  -- shown on correct answer
 * KIBO.sad        -- shown on wrong answer
 * TRUE mascot     -- your custom TRUE mascot image
 * FALSE mascot    -- your custom FALSE mascot image
 */

export interface TrueFalseQuestion {
  id: string;
  moduleId: string;          // 'm1' through 'm7'
  lessonRef: string;         // which lesson concept this reinforces
  statement: string;         // the statement the user judges
  answer: boolean;           // true = statement is TRUE, false = statement is FALSE
  explanation: string;       // shown after the user answers
  source: string;            // source name (not URL)
  difficulty: 1 | 2 | 3;    // 1 = easy, 2 = medium, 3 = harder
}

export const TRUE_FALSE_QUESTIONS: TrueFalseQuestion[] = [

  // ============================================================
  // MODULE 1: AI BASICS
  // 5 questions — 3 TRUE, 2 FALSE
  // ============================================================

  {
    id: 'tf-m1-001',
    moduleId: 'm1',
    lessonRef: 'What AI is',
    statement: 'All AI that exists today is a form of Narrow AI, designed to perform specific tasks rather than think like a human in general.',
    answer: true,
    explanation: 'This is TRUE. All current AI systems are Narrow AI (also called Weak AI). They are very capable at specific tasks but cannot think, learn, or reason across all areas the way a human can. Artificial General Intelligence (AGI) does not exist yet.',
    source: 'Notre Dame, Google Cloud',
    difficulty: 1,
  },

  {
    id: 'tf-m1-002',
    moduleId: 'm1',
    lessonRef: 'What AI is',
    statement: 'AI learns by following a fixed set of rules written by a programmer for every possible situation.',
    answer: false,
    explanation: 'This is FALSE. Traditional software follows fixed rules, but modern AI uses machine learning — it learns patterns from data rather than relying on hand-written rules for every scenario. That is what makes it different from regular programming.',
    source: 'IBM Think, Google Cloud',
    difficulty: 1,
  },

  {
    id: 'tf-m1-003',
    moduleId: 'm1',
    lessonRef: 'AI in everyday life',
    statement: 'When a music app recommends a song you might like, it is using AI to analyse your listening history and predict your preferences.',
    answer: true,
    explanation: 'This is TRUE. Recommendation systems in apps like Spotify and YouTube use machine learning to find patterns in your behaviour and predict what you will enjoy. This is one of the most common everyday uses of AI.',
    source: 'IBM Think, Google Cloud',
    difficulty: 1,
  },

  {
    id: 'tf-m1-004',
    moduleId: 'm1',
    lessonRef: 'What AI is',
    statement: 'Artificial General Intelligence (AGI) is already available in products like ChatGPT and Claude.',
    answer: false,
    explanation: 'This is FALSE. AGI refers to a theoretical AI that could perform any intellectual task a human can. As of 2026, AGI does not exist. ChatGPT, Claude, and Gemini are all Narrow AI — they are powerful at language tasks but have no general understanding or awareness.',
    source: 'Notre Dame, McKinsey',
    difficulty: 2,
  },

  {
    id: 'tf-m1-005',
    moduleId: 'm1',
    lessonRef: 'What AI is',
    statement: 'Deep Learning is a type of Machine Learning that uses layers of artificial neurons inspired by how the human brain works.',
    answer: true,
    explanation: 'This is TRUE. Deep Learning uses neural networks with many layers (that is what "deep" means). These layers process data in stages, similar in concept to how neurons in the brain pass signals to each other. Most modern AI tools, including image generators and chatbots, rely on deep learning.',
    source: 'IBM Think, NASA',
    difficulty: 2,
  },

  // ============================================================
  // MODULE 2: TALKING TO AI
  // 5 questions — 3 TRUE, 2 FALSE
  // ============================================================

  {
    id: 'tf-m2-001',
    moduleId: 'm2',
    lessonRef: 'What is a prompt',
    statement: 'A prompt is the message or instruction you type into an AI tool to get a response.',
    answer: true,
    explanation: 'This is TRUE. A prompt is the input you provide to an AI system. It can be a question, a command, or a longer instruction. The quality of the AI\'s output depends heavily on how clearly the prompt is written.',
    source: 'TechTarget, MIT Sloan',
    difficulty: 1,
  },

  {
    id: 'tf-m2-002',
    moduleId: 'm2',
    lessonRef: 'Adding context',
    statement: 'AI tools already know who you are and your personal situation, so you do not need to add context to your prompts.',
    answer: false,
    explanation: 'This is FALSE. AI tools have no knowledge of who you are unless you tell them. They respond based only on what you include in the conversation. Adding context, such as your role, goal, or constraints, is one of the most effective ways to get better responses.',
    source: 'MIT Sloan, Harvard University',
    difficulty: 1,
  },

  {
    id: 'tf-m2-003',
    moduleId: 'm2',
    lessonRef: 'Asking for format',
    statement: 'You can ask an AI to present its answer as a table, a bullet list, or a short paragraph, and it will adjust its format accordingly.',
    answer: true,
    explanation: 'This is TRUE. AI language models can adapt their output format based on your instructions. Specifying a format, such as "give me a bullet list" or "format this as a table", usually produces output that is easier to use and requires less editing.',
    source: 'MIT Sloan, Harvard University',
    difficulty: 1,
  },

  {
    id: 'tf-m2-004',
    moduleId: 'm2',
    lessonRef: 'Asking for tone',
    statement: 'Once you send a prompt and get a response you dislike, your only option is to start a new conversation.',
    answer: false,
    explanation: 'This is FALSE. You can refine a prompt in the same conversation by giving follow-up instructions. Telling the AI "that was too long, make it shorter" or "try that again in a more casual tone" is faster than starting over and usually produces better results.',
    source: 'MIT Sloan, Harvard University',
    difficulty: 1,
  },

  {
    id: 'tf-m2-005',
    moduleId: 'm2',
    lessonRef: 'What is a prompt',
    statement: 'The practice of designing and refining prompts to get better results from AI is called prompt engineering.',
    answer: true,
    explanation: 'This is TRUE. Prompt engineering is the skill of crafting inputs that guide an AI model toward accurate and useful outputs. It involves choosing the right words, providing context, specifying format, and iterating based on the results.',
    source: 'Wikipedia (Prompt Engineering), Google Cloud',
    difficulty: 2,
  },

  // ============================================================
  // MODULE 3: UNDERSTANDING AI TOOLS
  // 5 questions — 3 TRUE, 2 FALSE
  // ============================================================

  {
    id: 'tf-m3-001',
    moduleId: 'm3',
    lessonRef: 'Chat AI vs Image AI',
    statement: 'ChatGPT, Claude, and Gemini are all examples of text-based AI tools designed primarily to understand and generate language.',
    answer: true,
    explanation: 'This is TRUE. These are Large Language Models (LLMs). They are trained on text data and are designed to read, write, summarise, and reason about language. While some versions can also handle images, their core capability is language.',
    source: 'Notre Dame, IBM Think',
    difficulty: 1,
  },

  {
    id: 'tf-m3-002',
    moduleId: 'm3',
    lessonRef: 'Chat AI vs Image AI',
    statement: 'Image AI tools like DALL-E and Nano Banana can listen to audio and transcribe speech.',
    answer: false,
    explanation: 'This is FALSE. Image AI tools generate pictures from text descriptions. Transcribing audio into text is a completely separate category of AI tool, such as OpenAI\'s Whisper or Otter.ai. Different AI tools are built for different tasks and are not interchangeable.',
    source: 'Notre Dame, IBM Think',
    difficulty: 1,
  },

  {
    id: 'tf-m3-003',
    moduleId: 'm3',
    lessonRef: 'Voice and video AI',
    statement: 'ElevenLabs is known as an AI voice generation tool that can produce realistic, expressive speech from text.',
    answer: true,
    explanation: 'This is TRUE. ElevenLabs specialises in AI-powered voice synthesis. It can generate human-like speech from written text and is widely used for voiceovers, podcasts, dubbing, and accessibility tools.',
    source: 'Notre Dame, IBM Think',
    difficulty: 1,
  },

  {
    id: 'tf-m3-004',
    moduleId: 'm3',
    lessonRef: 'Chat AI vs Image AI',
    statement: 'Multimodal AI tools can only process one type of input at a time, such as text or image, but not both together.',
    answer: false,
    explanation: 'This is FALSE. Multimodal AI is designed specifically to process more than one type of input together, for example receiving a photo and a text question at the same time. Tools like GPT-4o can handle text, images, and audio in the same conversation.',
    source: 'IBM Think, Google Cloud',
    difficulty: 2,
  },

  {
    id: 'tf-m3-005',
    moduleId: 'm3',
    lessonRef: 'Voice and video AI',
    statement: 'AI-generated video and audio can make it appear that a real person said something they never actually said.',
    answer: true,
    explanation: 'This is TRUE. This is how deepfakes work. AI video and audio tools can synthesise a person\'s voice or appearance from existing footage. This is why seeing or hearing something is no longer proof on its own that it actually happened.',
    source: 'IBM Think, Notre Dame',
    difficulty: 2,
  },

  // ============================================================
  // MODULE 4: AI FOR DAILY LIFE
  // 5 questions — 2 TRUE, 3 FALSE
  // ============================================================

  {
    id: 'tf-m4-001',
    moduleId: 'm4',
    lessonRef: 'Planning trips',
    statement: 'AI tools can help you plan a trip by suggesting itineraries, but they cannot book flights or hotels on your behalf unless connected to specialist booking tools.',
    answer: true,
    explanation: 'This is TRUE. Standard chat AI tools like ChatGPT or Claude can help you research and plan, but they cannot make real bookings or check live availability unless they are specifically connected to external booking services.',
    source: 'MIT Sloan, Harvard University',
    difficulty: 1,
  },

  {
    id: 'tf-m4-002',
    moduleId: 'm4',
    lessonRef: 'Summarising articles',
    statement: 'AI summaries of long documents are always completely accurate and do not require any fact-checking.',
    answer: false,
    explanation: 'This is FALSE. AI can miss important nuances, misrepresent details, or occasionally introduce errors even when summarising. For anything important, such as a legal document, medical information, or a financial report, you should always verify key points by reading the source material.',
    source: 'IBM (Hallucinations), MIT Sloan',
    difficulty: 1,
  },

  {
    id: 'tf-m4-003',
    moduleId: 'm4',
    lessonRef: 'Planning trips',
    statement: 'AI tools have access to real-time prices, live flight availability, and current weather forecasts by default.',
    answer: false,
    explanation: 'This is FALSE. Most AI language models are trained on static data up to a cutoff date and do not have live access to the internet by default. They cannot check real-time prices or live availability unless they are specifically given a web search tool.',
    source: 'Wikipedia (Knowledge cutoff), MIT Sloan',
    difficulty: 2,
  },

  {
    id: 'tf-m4-004',
    moduleId: 'm4',
    lessonRef: 'Summarising articles',
    statement: 'You can paste a long article into a chat AI and ask it to summarise the key points for you.',
    answer: true,
    explanation: 'This is TRUE. Summarisation is one of the most practical and reliable uses of chat AI. You can paste text directly into the conversation and ask for a summary in any format or length you choose.',
    source: 'MIT Sloan, Harvard University',
    difficulty: 1,
  },

  {
    id: 'tf-m4-005',
    moduleId: 'm4',
    lessonRef: 'Planning trips',
    statement: 'Being more specific in your prompt when asking for travel advice, such as including your budget and travel dates, will generally produce more useful results.',
    answer: true,
    explanation: 'This is TRUE. Specificity is one of the most important principles of good prompting. The more context and detail you provide, the better the AI can tailor its response to your actual situation.',
    source: 'MIT Sloan, Harvard University',
    difficulty: 1,
  },

  // ============================================================
  // MODULE 5: AI FOR WORK
  // 5 questions — 3 TRUE, 2 FALSE
  // ============================================================

  {
    id: 'tf-m5-001',
    moduleId: 'm5',
    lessonRef: 'AI in the workplace',
    statement: 'AI tools are most effective at work tasks that involve language, such as drafting, summarising, translating, and explaining complex ideas.',
    answer: true,
    explanation: 'This is TRUE. Large Language Models are specifically trained on text, which makes language tasks their natural strength. Drafting emails, summarising meetings, writing reports, and explaining technical concepts are all areas where AI tools consistently add value.',
    source: 'McKinsey, MIT Sloan',
    difficulty: 1,
  },

  {
    id: 'tf-m5-002',
    moduleId: 'm5',
    lessonRef: 'AI in the workplace',
    statement: 'AI is a reliable source of current news and up-to-date business information because it is always connected to the internet.',
    answer: false,
    explanation: 'This is FALSE. Standard AI language models are trained on data up to a specific cutoff date and do not have automatic access to current news or live business information. Always verify time-sensitive information using current sources.',
    source: 'Wikipedia (Knowledge cutoff)',
    difficulty: 1,
  },

  {
    id: 'tf-m5-003',
    moduleId: 'm5',
    lessonRef: 'Meeting summaries',
    statement: 'AI tools like Otter.ai are designed to transcribe and summarise spoken meetings in real time.',
    answer: true,
    explanation: 'This is TRUE. Otter.ai is a speech-to-text and meeting transcription tool that joins video calls, converts spoken audio to text, and generates summaries with action items. This is an example of AI designed for a specific workplace task.',
    source: 'Notre Dame, IBM Think',
    difficulty: 1,
  },

  {
    id: 'tf-m5-004',
    moduleId: 'm5',
    lessonRef: 'Professional communication',
    statement: 'When using AI to draft a professional email, it is best practice to review and edit the output before sending it.',
    answer: true,
    explanation: 'This is TRUE. AI-generated text should always be reviewed before use in professional contexts. It may contain subtle errors, miss important context, or not perfectly match your voice and intent. AI produces a first draft; the final version should reflect your judgment.',
    source: 'MIT Sloan, Harvard University',
    difficulty: 1,
  },

  {
    id: 'tf-m5-005',
    moduleId: 'm5',
    lessonRef: 'AI in the workplace',
    statement: 'Only technical professionals like software engineers and data scientists can use AI tools at work.',
    answer: false,
    explanation: 'This is FALSE. Modern AI tools are designed for everyone. Marketing teams, teachers, nurses, administrators, and people in almost every profession are finding practical ways to use AI for tasks like writing, research, and organisation. No coding knowledge is required.',
    source: 'McKinsey, IBM Think',
    difficulty: 1,
  },

  // ============================================================
  // MODULE 6: AI FOR CREATIVITY
  // 5 questions — 3 TRUE, 2 FALSE
  // ============================================================

  {
    id: 'tf-m6-001',
    moduleId: 'm6',
    lessonRef: 'Image prompts',
    statement: 'Adding specific details to an image prompt, such as the style, lighting, and mood, generally produces better results than a vague description.',
    answer: true,
    explanation: 'This is TRUE. Image AI models respond to detail. A prompt like "a golden retriever puppy in a sunny park, soft natural light, photorealistic style" will produce a much more accurate result than simply "a dog". Specificity gives the AI less room to guess.',
    source: 'MIT Sloan, Wikipedia (Prompt Engineering)',
    difficulty: 1,
  },

  {
    id: 'tf-m6-002',
    moduleId: 'm6',
    lessonRef: 'Writing stories',
    statement: 'Adobe Firefly is specifically designed to be commercially safe to use for business projects because it is trained on licensed content.',
    answer: true,
    explanation: 'This is TRUE. Adobe Firefly is trained on licensed Adobe Stock images and openly licensed content. This makes it a safer choice for commercial projects compared to other image AI tools that may have been trained on copyright-protected images without permission.',
    source: 'IBM Think, Notre Dame',
    difficulty: 2,
  },

  {
    id: 'tf-m6-003',
    moduleId: 'm6',
    lessonRef: 'Image prompts',
    statement: 'AI replaces the need for human creativity because it can generate ideas, images, and stories entirely on its own.',
    answer: false,
    explanation: 'This is FALSE. AI generates content based on patterns from human-created data. It needs human direction, judgment, and taste to produce useful creative work. The best results come from collaboration — humans provide the idea, direction, and discernment; AI provides speed and variety.',
    source: 'MIT Sloan, IBM Think',
    difficulty: 1,
  },

  {
    id: 'tf-m6-004',
    moduleId: 'm6',
    lessonRef: 'Image prompts',
    statement: 'Nano Banana is Google\'s AI image generation model, built into the Gemini platform and available to use for free.',
    answer: true,
    explanation: 'This is TRUE. Nano Banana is the name for Google\'s image generation capability powered by Gemini Flash models. It is accessible through the Gemini app and supports both text-to-image generation and image editing via natural language prompts.',
    source: 'Google AI for Developers (verified April 2026)',
    difficulty: 2,
  },

  {
    id: 'tf-m6-005',
    moduleId: 'm6',
    lessonRef: 'Writing stories',
    statement: 'You can use AI to help brainstorm ideas for a creative project, but the AI owns the copyright to any content it helps generate.',
    answer: false,
    explanation: 'This is FALSE. Copyright law in most countries does not recognise AI as a legal author. AI-generated content generally does not have automatic copyright protection, and ownership questions depend on jurisdiction and how the content was created. The human who directed and shaped the creative work is typically considered the creator.',
    source: 'MIT Sloan (copyright note)',
    difficulty: 3,
  },

  // ============================================================
  // MODULE 7: AI SAFETY AND AWARENESS
  // 5 questions — 2 TRUE, 3 FALSE
  // ============================================================

  {
    id: 'tf-m7-001',
    moduleId: 'm7',
    lessonRef: 'AI hallucinations',
    statement: 'An AI hallucination occurs when an AI tool produces information that sounds confident and plausible but is actually incorrect or made up.',
    answer: true,
    explanation: 'This is TRUE. AI hallucinations are outputs that are factually wrong but presented with confidence. They happen because AI models predict the most likely next word based on patterns, not because they are checking facts against a trusted database.',
    source: 'IBM (Hallucinations), Google Cloud, Wikipedia (Hallucination AI)',
    difficulty: 1,
  },

  {
    id: 'tf-m7-002',
    moduleId: 'm7',
    lessonRef: 'AI hallucinations',
    statement: 'AI hallucinations have been completely solved and no longer occur in modern tools like ChatGPT or Claude.',
    answer: false,
    explanation: 'This is FALSE. As of 2026, hallucinations have not been eliminated. Researchers have found them to be an ongoing limitation of large language models. While newer models have reduced the rate of hallucinations, all current AI tools are still capable of producing confident but incorrect information.',
    source: 'Wikipedia (Hallucination AI), IBM (Hallucinations)',
    difficulty: 1,
  },

  {
    id: 'tf-m7-003',
    moduleId: 'm7',
    lessonRef: 'Bias in AI',
    statement: 'AI systems can inherit biases from the data they were trained on, which can lead to unfair or inaccurate outputs.',
    answer: true,
    explanation: 'This is TRUE. AI learns from human-created data which may reflect historical biases, stereotypes, or unequal representation. These biases can appear in the model\'s outputs, sometimes in subtle ways. Awareness of this is an important part of using AI responsibly.',
    source: 'IBM Think, Notre Dame, PMC (National Institutes of Health)',
    difficulty: 2,
  },

  {
    id: 'tf-m7-004',
    moduleId: 'm7',
    lessonRef: 'Deepfakes',
    statement: 'A deepfake is always easy to identify because the video quality is noticeably low and obviously fake.',
    answer: false,
    explanation: 'This is FALSE. Modern deepfakes can be highly convincing. While there are often subtle signs such as unnatural blinking, slightly off lip sync, or blurry edges around hair, many viewers cannot detect them without careful inspection. This is why they pose a real risk for spreading misinformation.',
    source: 'IBM Think, Wikipedia (Hallucination AI)',
    difficulty: 2,
  },

  {
    id: 'tf-m7-005',
    moduleId: 'm7',
    lessonRef: 'The future of AI',
    statement: 'As of 2026, more than 60 countries have national strategies or policies for managing AI responsibly.',
    answer: true,
    explanation: 'This is TRUE. According to McKinsey, more than 60 countries or regional blocs have developed national AI strategies. These include the US, EU, UK, China, Singapore, and others. The EU passed its AI Act, one of the first comprehensive legal frameworks for AI regulation.',
    source: 'McKinsey (AI regulation)',
    difficulty: 3,
  },

];

// ============================================================
// TRUE/FALSE STATE MANAGER
// ============================================================
// Tracks which questions have been shown in the current session.
// Prevents repeating a question in the same play session.

export const TrueFalseState = {
  _seen: new Set<string>(),

  getPool(moduleId?: string): TrueFalseQuestion[] {
    const questions = moduleId
      ? TRUE_FALSE_QUESTIONS.filter(q => q.moduleId === moduleId)
      : TRUE_FALSE_QUESTIONS;
    return questions.filter(q => !this._seen.has(q.id));
  },

  getNext(moduleId?: string): TrueFalseQuestion | null {
    const pool = this.getPool(moduleId);
    if (pool.length === 0) {
      // Reset if all seen
      this._seen.clear();
      const freshPool = moduleId
        ? TRUE_FALSE_QUESTIONS.filter(q => q.moduleId === moduleId)
        : TRUE_FALSE_QUESTIONS;
      if (freshPool.length === 0) return null;
      const q = freshPool[Math.floor(Math.random() * freshPool.length)];
      this._seen.add(q.id);
      return q;
    }
    const q = pool[Math.floor(Math.random() * pool.length)];
    this._seen.add(q.id);
    return q;
  },

  getRandom(count: number, moduleId?: string): TrueFalseQuestion[] {
    const all = moduleId
      ? TRUE_FALSE_QUESTIONS.filter(q => q.moduleId === moduleId)
      : [...TRUE_FALSE_QUESTIONS];
    const shuffled = all.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
  },

  reset() {
    this._seen.clear();
  },
};
