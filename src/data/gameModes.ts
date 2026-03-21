export interface DidYouKnow {
  id: string;
  icon: string;
  category: string;
  fact: string;
  kiboReaction: string;
  cardColor: [string, string];
  lessonLink: string;
}

export interface SpeedRoundQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  difficulty: number;
}

export interface DailyChallengeOption {
  text: string;
  correct: boolean;
}

export interface DailyChallenge {
  id: string;
  question: string;
  options: DailyChallengeOption[];
  explanation: string;
  module: string;
  xpReward: number;
  difficulty: number;
}

export const DID_YOU_KNOW: DidYouKnow[] = [
  { id: 'dyk-001', icon: '🚀', category: 'Growth', fact: 'ChatGPT reached 1 million users in just 5 days — faster than any product in history.', kiboReaction: "That's faster than Netflix, Instagram, and Spotify combined! 🤯", cardColor: ['#4a9eff', '#7ab8ff'], lessonLink: 'm1-l2' },
  { id: 'dyk-002', icon: '🧠', category: 'Scale', fact: 'GPT-4 has roughly 1 trillion parameters — each one a tiny number the model learned from reading the internet.', kiboReaction: 'Imagine cramming the whole internet into numbers. Wild! 📚', cardColor: ['#9b6dff', '#c4a0ff'], lessonLink: 'm1-l1' },
  { id: 'dyk-003', icon: '🌍', category: 'Impact', fact: '77% of the devices you use every day already contain some form of AI.', kiboReaction: 'Check your phone, your car, your TV... AI is hiding everywhere! 👀', cardColor: ['#3db74a', '#67d472'], lessonLink: 'm1-l4' },
  { id: 'dyk-004', icon: '🎨', category: 'Creativity', fact: 'Google\'s Nano Banana image model can generate a photorealistic image from a text prompt in just a few seconds, for free, directly inside Gemini.', kiboReaction: "No subscription, no Discord, no wait — just describe it and it appears! 🖼️", cardColor: ['#ff8c42', '#ffb070'], lessonLink: 'm6-l2' },
  { id: 'dyk-005', icon: '🔬', category: 'Science', fact: 'AlphaFold solved a 50-year biology problem by predicting the 3D structure of nearly every known protein.', kiboReaction: 'This could speed up drug discovery by decades. AI is literally saving lives 💊', cardColor: ['#ff4f4f', '#ff8080'], lessonLink: 'm1-l2' },
  { id: 'dyk-006', icon: '💬', category: 'Language', fact: 'Claude, GPT-4, and Gemini can each generate roughly 1,000 words per second of high-quality text.', kiboReaction: "That's a full novel in about a minute. No writer's block here! ⚡", cardColor: ['#ffb800', '#ffcf45'], lessonLink: 'm2-l1' },
  { id: 'dyk-007', icon: '🎵', category: 'Music', fact: 'Suno AI can generate a full 3-minute song with vocals and instrumentation in about 30 seconds.', kiboReaction: 'Pop star career? Might need to pivot. Just saying 😄🎤', cardColor: ['#ff4f4f', '#ff7070'], lessonLink: 'm3-l2' },
  { id: 'dyk-008', icon: '🏥', category: 'Healthcare', fact: 'AI can detect diabetic eye disease from retina scans with accuracy matching trained ophthalmologists.', kiboReaction: 'AI that protects your vision is real and working today 👁️', cardColor: ['#4a9eff', '#7ab8ff'], lessonLink: 'm1-l2' },
  { id: 'dyk-009', icon: '🔒', category: 'Security', fact: 'AI-powered fraud detection saves global banks an estimated $27 billion per year by catching unusual transactions.', kiboReaction: "Every time your card gets declined on holiday, that's probably AI protecting you 😅", cardColor: ['#3db74a', '#56d660'], lessonLink: 'm1-l4' },
  { id: 'dyk-010', icon: '📚', category: 'Education', fact: 'Students who use AI tutoring tools for an hour a day improve test scores by 30% on average according to early studies.', kiboReaction: "That's literally why Kibo exists! Keep going 🎓", cardColor: ['#9b6dff', '#b98fff'], lessonLink: 'm1-l4' },
  { id: 'dyk-011', icon: '🚗', category: 'Transport', fact: "Waymo's self-driving taxis have driven over 20 million miles on public roads as of 2024.", kiboReaction: "That's like driving to the moon and back... 41 times 🌙", cardColor: ['#ff8c42', '#ffa055'], lessonLink: 'm1-l2' },
  { id: 'dyk-012', icon: '🌐', category: 'Language', fact: 'Google Translate supports over 130 languages and processes over 1 billion translations every single day.', kiboReaction: "Every menu photo you've translated on holiday? AI did that 📸", cardColor: ['#4a9eff', '#6cb8ff'], lessonLink: 'm4-l1' },
  { id: 'dyk-013', icon: '✍️', category: 'Writing', fact: 'Grammarly is used by over 30 million people daily — making it one of the most widely used AI tools in the world.', kiboReaction: "If you have ever gotten a green underline, you've used AI! ✅", cardColor: ['#3db74a', '#4dcc5a'], lessonLink: 'm1-l4' },
  { id: 'dyk-014', icon: '⚡', category: 'Power', fact: 'Training GPT-4 used roughly the same amount of electricity as a small city uses in a year.', kiboReaction: 'AI has a real energy footprint. Something worth thinking about 🌱', cardColor: ['#ffb800', '#ffd040'], lessonLink: 'm7-l4' },
  { id: 'dyk-015', icon: '🎬', category: 'Film', fact: 'Every major Hollywood film since 2010 has used some form of AI for visual effects, colour grading, or editing.', kiboReaction: 'AI has been in your favourite movies for years without you knowing 🎥', cardColor: ['#ff4f4f', '#ff7070'], lessonLink: 'm3-l2' },
  { id: 'dyk-016', icon: '📊', category: 'Business', fact: 'Goldman Sachs estimated that AI could automate tasks equivalent to 300 million full-time jobs globally.', kiboReaction: 'But new jobs are being created too! Learning AI = future-proofing yourself 💪', cardColor: ['#9b6dff', '#b48cff'], lessonLink: 'm7-l4' },
  { id: 'dyk-017', icon: '🐾', category: 'Wild', fact: 'Researchers trained an AI to identify individual penguins from photos — helping track endangered populations without disturbing them.', kiboReaction: 'Conservation AI! Who said robots are a threat to wildlife? 🐧', cardColor: ['#3db74a', '#4dcc5a'], lessonLink: 'm1-l2' },
  { id: 'dyk-018', icon: '🤳', category: 'Everyday', fact: "Your phone's face unlock uses a neural network with over 30,000 infrared dots to map your face in 3D.", kiboReaction: "Next time you unlock your phone, you're using serious AI 🔐", cardColor: ['#ff8c42', '#ffaa60'], lessonLink: 'm1-l4' },
  { id: 'dyk-019', icon: '🎯', category: 'Precision', fact: 'AI can detect cancer in medical images with accuracy of up to 99% — outperforming human radiologists in specific tasks.', kiboReaction: 'AI as a medical second opinion could save millions of lives 🏥', cardColor: ['#ff4f4f', '#ff6060'], lessonLink: 'm1-l2' },
  { id: 'dyk-020', icon: '🤖', category: 'History', fact: 'The term "Artificial Intelligence" was coined by John McCarthy at the 1956 Dartmouth Conference — nearly 70 years ago.', kiboReaction: 'AI is older than most of your parents! 👴 The idea has been building a long time.', cardColor: ['#4a9eff', '#80c4ff'], lessonLink: 'm1-l1' },
  { id: 'dyk-021', icon: '🌊', category: 'Environment', fact: 'AI models trained on satellite images can predict flooding up to a week in advance with over 80% accuracy.', kiboReaction: 'AI keeping communities safe from natural disasters. Real impact 🌍', cardColor: ['#3db74a', '#5dcc67'], lessonLink: 'm1-l2' },
  { id: 'dyk-022', icon: '🎙️', category: 'Voice', fact: 'ElevenLabs can clone a voice from just 1 minute of audio — the result is indistinguishable from the original to most listeners.', kiboReaction: 'Cool and a little scary. Always verify urgent voice messages! 🔒', cardColor: ['#9b6dff', '#b48cff'], lessonLink: 'm3-l2' },
  { id: 'dyk-023', icon: '🧬', category: 'Biology', fact: 'The human genome has about 3 billion base pairs. AI can now sequence and analyse an entire genome in under an hour.', kiboReaction: 'That used to take 13 years and cost $3 billion. AI changed everything 🔬', cardColor: ['#ff4f4f', '#ff7070'], lessonLink: 'm1-l2' },
  { id: 'dyk-024', icon: '📱', category: 'Mobile', fact: 'The average smartphone now runs over 100 different machine learning models — for autocorrect, camera, maps, and more.', kiboReaction: 'Your phone is basically a pocket AI lab 🧪', cardColor: ['#ffb800', '#ffd040'], lessonLink: 'm1-l4' },
  { id: 'dyk-025', icon: '🌸', category: 'Nature', fact: 'Google Lens AI can identify over 15,000 species of plants and animals from a single photo.', kiboReaction: "Next time you see a flower you don't recognise, your phone knows 🌺", cardColor: ['#3db74a', '#4dcc5a'], lessonLink: 'm1-l2' },
  { id: 'dyk-026', icon: '🎮', category: 'Gaming', fact: "DeepMind's AlphaGo defeated the world Go champion in 2016 — a game considered far too complex for computers to master.", kiboReaction: 'The world champion said AlphaGo played moves no human had ever thought of 🤯', cardColor: ['#9b6dff', '#c4a0ff'], lessonLink: 'm1-l2' },
  { id: 'dyk-027', icon: '🔍', category: 'Search', fact: 'Google processes over 8.5 billion search queries per day — and AI now influences almost every single result.', kiboReaction: 'Every Google search has AI quietly working behind the scenes 🔎', cardColor: ['#4a9eff', '#70b8ff'], lessonLink: 'm1-l4' },
  { id: 'dyk-028', icon: '✈️', category: 'Aviation', fact: 'Modern commercial aircraft spend only about 3 to 7 minutes flying without some form of AI assistance or autopilot.', kiboReaction: 'AI has been co-piloting your flights for decades 🛫', cardColor: ['#ff8c42', '#ffa05a'], lessonLink: 'm1-l4' },
  { id: 'dyk-029', icon: '💡', category: 'Energy', fact: 'Google uses AI to reduce the cooling energy used by its data centres by 40% — saving enormous amounts of electricity.', kiboReaction: 'AI making AI more efficient. The machines are taking care of themselves 😂', cardColor: ['#ffb800', '#ffd040'], lessonLink: 'm7-l4' },
  { id: 'dyk-030', icon: '🏆', category: 'Achievement', fact: 'In 2022, an AI-generated artwork won first place at the Colorado State Fair art competition — sparking a major debate about AI and creativity.', kiboReaction: 'Art, music, writing... AI is doing it all. But YOUR creative judgment still matters most 🎨', cardColor: ['#ff4f4f', '#ff8080'], lessonLink: 'm6-l1' },
];

export const SPEED_ROUND_QUESTIONS: SpeedRoundQuestion[] = [
  { id: 'sp-001', question: 'What does AI stand for?', options: ['Artificial Intelligence', 'Automated Interface', 'Advanced Input', 'Algorithmic Integration'], correct: 0, difficulty: 1 },
  { id: 'sp-002', question: 'The text you give to AI to tell it what to do is called a...?', options: ['Query', 'Command', 'Prompt', 'Request'], correct: 2, difficulty: 1 },
  { id: 'sp-003', question: 'Which company created ChatGPT?', options: ['Google', 'Anthropic', 'Meta', 'OpenAI'], correct: 3, difficulty: 1 },
  { id: 'sp-004', question: 'When AI makes up false information confidently, it is called a...?', options: ['Bug', 'Hallucination', 'Glitch', 'Bias'], correct: 1, difficulty: 1 },
  { id: 'sp-005', question: 'Claude is an AI assistant made by which company?', options: ['OpenAI', 'Google', 'Anthropic', 'Meta'], correct: 2, difficulty: 1 },
  { id: 'sp-006', question: 'Midjourney and DALL-E are examples of what type of AI?', options: ['Language AI', 'Voice AI', 'Image AI', 'Video AI'], correct: 2, difficulty: 1 },
  { id: 'sp-007', question: 'Which AI model can transcribe speech to text accurately?', options: ['Sora', 'Whisper', 'ARIA', 'Echo'], correct: 1, difficulty: 1 },
  { id: 'sp-008', question: 'What is a deepfake?', options: ['A type of chatbot', 'Fake AI-generated video of a real person', 'A hacking technique', 'A training method'], correct: 1, difficulty: 1 },
  { id: 'sp-009', question: 'An AI that handles text, images, and audio together is called...?', options: ['Generative', 'Multimodal', 'Open-source', 'Adaptive'], correct: 1, difficulty: 1 },
  { id: 'sp-010', question: 'The date after which AI may not know about recent events is its knowledge...?', options: ['Gap', 'Horizon', 'Cutoff', 'Limit'], correct: 2, difficulty: 1 },
  { id: 'sp-011', question: 'What does LLM stand for?', options: ['Large Learning Method', 'Large Language Model', 'Layered Logic Map', 'Linear Learn Module'], correct: 1, difficulty: 2 },
  { id: 'sp-012', question: 'Giving AI examples before your request is called...?', options: ['Few-shot prompting', 'Grounding', 'Fine-tuning', 'Pre-loading'], correct: 0, difficulty: 2 },
  { id: 'sp-013', question: 'AI bias usually comes from biased what?', options: ['Code', 'Prompts', 'Training data', 'Server settings'], correct: 2, difficulty: 2 },
  { id: 'sp-014', question: 'Which tool lets you upload documents and chat with them?', options: ['Sora', 'NotebookLM', 'Midjourney', 'Grammarly'], correct: 1, difficulty: 2 },
  { id: 'sp-015', question: "OpenAI's text-to-video model is called...?", options: ['Kling', 'Runway', 'Sora', 'Pika'], correct: 2, difficulty: 2 },
  { id: 'sp-016', question: 'Asking AI to "act as an expert nutritionist" is called...?', options: ['Context prompting', 'Role prompting', 'Chain prompting', 'System prompting'], correct: 1, difficulty: 2 },
  { id: 'sp-017', question: "A review that checks if AI treats all demographic groups fairly is called a bias...?", options: ['Check', 'Audit', 'Review', 'Filter'], correct: 1, difficulty: 2 },
  { id: 'sp-018', question: 'What image AI is known for being safest for commercial use due to licensed training data?', options: ['Stable Diffusion', 'Midjourney', 'DALL-E', 'Adobe Firefly'], correct: 3, difficulty: 2 },
  { id: 'sp-019', question: "The EU's law that classifies AI by risk level is called the EU AI...?", options: ['Law', 'Charter', 'Act', 'Code'], correct: 2, difficulty: 2 },
  { id: 'sp-020', question: 'ElevenLabs is primarily an AI tool for generating...?', options: ['Images', 'Code', 'Voice', 'Video'], correct: 2, difficulty: 2 },
  { id: 'sp-021', question: 'A number in image AI that lets you reproduce the same image is called a...?', options: ['Token', 'Seed', 'Hash', 'Key'], correct: 1, difficulty: 2 },
  { id: 'sp-022', question: 'Specifying the width-to-height proportion of an AI image is setting the...?', options: ['Aspect ratio', 'Resolution', 'DPI', 'Canvas size'], correct: 0, difficulty: 2 },
  { id: 'sp-023', question: 'Converting a meeting transcript into a summary is a task AI does in which category?', options: ['Creativity', 'Daily Life', 'Work', 'Safety'], correct: 2, difficulty: 2 },
  { id: 'sp-024', question: "Google's AI research tool that grounds answers in your own documents is called...?", options: ['Bard', 'Gemini Ultra', 'NotebookLM', 'Vertex'], correct: 2, difficulty: 2 },
  { id: 'sp-025', question: 'Showing AI exactly what output you want with 2 to 5 examples is called...?', options: ['Zero-shot', 'Few-shot', 'One-shot', 'Chain-of-thought'], correct: 1, difficulty: 2 },
  { id: 'sp-026', question: 'RAG stands for Retrieval-_____ Generation.', options: ['Augmented', 'Automated', 'Advanced', 'Aligned'], correct: 0, difficulty: 3 },
  { id: 'sp-027', question: 'The challenge of ensuring AI pursues goals beneficial to humans is called AI...?', options: ['Safety', 'Alignment', 'Ethics', 'Governance'], correct: 1, difficulty: 3 },
  { id: 'sp-028', question: 'Connecting AI to verified documents to reduce hallucinations is called...?', options: ['Fine-tuning', 'Grounding', 'Pruning', 'Distillation'], correct: 1, difficulty: 3 },
  { id: 'sp-029', question: 'AI that can autonomously complete multi-step tasks is described as...?', options: ['Generative', 'Multimodal', 'Agentic', 'Narrow'], correct: 2, difficulty: 3 },
  { id: 'sp-030', question: "The idea that deepfakes help people deny real evidence is called the Liar's...?", options: ['Bonus', 'Dividend', 'Shortcut', 'Escape'], correct: 1, difficulty: 3 },
  { id: 'sp-031', question: 'A design requiring human review before AI decisions take effect is called human-in-the-...?', options: ['System', 'Pipeline', 'Loop', 'Network'], correct: 2, difficulty: 3 },
  { id: 'sp-032', question: 'The observation that larger AI models reliably perform better is called...?', options: ['Growth laws', 'Scale laws', 'Scaling laws', 'Power laws'], correct: 2, difficulty: 3 },
  { id: 'sp-033', question: 'Stable Diffusion is unique because it is...?', options: ['The best image AI', 'Open-source', 'Made by Adobe', 'Only for videos'], correct: 1, difficulty: 3 },
  { id: 'sp-034', question: 'AI that fills in missing parts of an image is called...?', options: ['Outpainting', 'Inpainting', 'Interpolation', 'Upscaling'], correct: 1, difficulty: 3 },
  { id: 'sp-035', question: 'Predictive policing AI creating feedback loops of over-policing is an example of...?', options: ['Hallucination', 'Bias feedback loop', 'Data poisoning', 'Adversarial attack'], correct: 1, difficulty: 3 },
  { id: 'sp-036', question: 'AlphaFold solved which 50-year biology challenge?', options: ['DNA sequencing', 'Protein folding', 'Gene editing', 'Brain mapping'], correct: 1, difficulty: 3 },
  { id: 'sp-037', question: 'The self-rated "Again / Almost / Got it" system is a simplified version of...?', options: ['Adaptive testing', 'Spaced repetition', 'Active recall', 'Interleaving'], correct: 1, difficulty: 3 },
  { id: 'sp-038', question: 'Background instructions that shape AI behaviour before a conversation begins are called...?', options: ['Meta prompts', 'System prompts', 'Base prompts', 'Root prompts'], correct: 1, difficulty: 3 },
  { id: 'sp-039', question: 'AI designed from day one around AI capabilities (not retrofitted) is called AI-...?', options: ['Powered', 'First', 'Native', 'Ready'], correct: 2, difficulty: 3 },
  { id: 'sp-040', question: 'What does OCR stand for?', options: ['Optical Character Recognition', 'Online Content Retrieval', 'Output Content Reader', 'Open Code Repository'], correct: 0, difficulty: 3 },
];

export const DAILY_CHALLENGES: DailyChallenge[] = [
  { id: 'dc-001', question: 'A company trains an AI hiring tool on 10 years of historical data where the workforce was 85% male. What is the most likely problem?', options: [{ text: 'The AI will be too slow to process applications', correct: false }, { text: 'The AI will learn to favour male candidates due to biased training data', correct: true }, { text: 'The AI will refuse to rank applicants', correct: false }, { text: 'The AI will require more storage than expected', correct: false }], explanation: 'This is exactly what happened at Amazon in 2018. Training on biased historical data caused the AI to reproduce those patterns, downgrading female applicants for technical roles.', module: 'AI Safety', xpReward: 40, difficulty: 3 },
  { id: 'dc-002', question: 'You ask an AI assistant about a major news event and it gives a confident, detailed answer. The event happened 3 months ago. What should you do?', options: [{ text: 'Trust the answer — AI is always up to date', correct: false }, { text: 'Verify with a current news source — AI may not have this in its training data', correct: true }, { text: 'Assume the AI is lying', correct: false }, { text: 'Ask the AI again with a different prompt', correct: false }], explanation: 'AI has a knowledge cutoff and confident answers about recent events can still be wrong or outdated. Always verify recent facts with a live news source.', module: 'AI Safety', xpReward: 40, difficulty: 3 },
  { id: 'dc-003', question: "You receive a voicemail from your parent's voice saying they are in trouble and need you to send money urgently. What is the safest first step?", options: [{ text: 'Send the money immediately — it sounds exactly like them', correct: false }, { text: 'Call your parent back on their known number to verify', correct: true }, { text: 'Ignore the message', correct: false }, { text: 'Report it to the police immediately without checking', correct: false }], explanation: "Voice cloning AI can replicate someone's voice from seconds of audio. Always independently verify urgent financial requests by calling back on a number you already know.", module: 'AI Tools', xpReward: 40, difficulty: 3 },
  { id: 'dc-004', question: "A student pastes an entire essay into an AI and asks it to improve it. The AI rewrites it completely in a different voice. What went wrong in the prompt?", options: [{ text: 'The student should not use AI for essays', correct: false }, { text: 'The student did not specify to keep their original voice and structure', correct: true }, { text: 'The essay was too long for the AI to handle', correct: false }, { text: 'The AI deliberately ignores student requests', correct: false }], explanation: 'Without constraints, AI will do what it thinks "improve" means — often a complete rewrite. Specifying "keep my original voice, only fix grammar and clarity" gives the AI the boundaries it needs.', module: 'Talking to AI', xpReward: 40, difficulty: 4 },
  { id: 'dc-005', question: "An AI content moderation system flags Black individuals' comments as \"aggressive\" at twice the rate of equivalent comments from white users. What is this an example of?", options: [{ text: 'The AI working correctly based on community standards', correct: false }, { text: 'A hallucination in the moderation system', correct: false }, { text: 'Racial bias in the training data of the moderation AI', correct: true }, { text: 'The AI being deliberately discriminatory', correct: false }], explanation: 'AI bias does not require intent. If training data reflects societal biases in how language is labelled, the AI learns and amplifies those patterns. This is a documented real-world problem in content moderation.', module: 'AI Safety', xpReward: 40, difficulty: 4 },
  { id: 'dc-006', question: 'A journalist asks an AI to write an article claiming a politician said something. The AI produces a convincing quote. What ethical problem does this raise?', options: [{ text: 'AI is not allowed to write about politics', correct: false }, { text: 'AI can fabricate convincing quotes that could be used as disinformation', correct: true }, { text: 'The politician owns copyright over anything written about them', correct: false }, { text: 'AI articles always have to be labelled as AI-generated', correct: false }], explanation: 'AI can generate highly convincing but entirely fabricated quotes and scenarios. This is a major concern for disinformation. Ethical AI use requires verifying all factual content.', module: 'AI Safety', xpReward: 40, difficulty: 4 },
  { id: 'dc-007', question: 'Your AI generates a research summary with 6 cited papers. You search for them and find only 4 actually exist. What should you do with the summary?', options: [{ text: 'Use it — 4 out of 6 is still a good hit rate', correct: false }, { text: 'Delete it — if AI lied once it all might be wrong', correct: false }, { text: 'Verify every factual claim individually using the real sources only', correct: true }, { text: 'Ask the AI to fix the citations', correct: false }], explanation: 'Hallucinated citations are a serious problem. The correct approach is to verify every factual claim against real, verified sources. Do not rely on the AI to self-correct citation errors reliably.', module: 'AI Safety', xpReward: 40, difficulty: 4 },
  { id: 'dc-008', question: 'You want AI to help write a message declining a job offer professionally. What context is most important to include in your prompt?', options: [{ text: 'Your age and education level', correct: false }, { text: 'The reason for declining, the desired tone, and whether you want to keep the relationship warm', correct: true }, { text: "The company's revenue and size", correct: false }, { text: 'A list of other companies you are considering', correct: false }], explanation: 'The three most important pieces of context for a professional decline are: reason (or how much to share), desired tone, and relationship goal (burn no bridges vs neutral exit).', module: 'Talking to AI', xpReward: 40, difficulty: 3 },
  { id: 'dc-009', question: "A predictive policing AI sends more officers to a neighbourhood. Crime data rises in that area. The AI uses this to send even more officers. What is this called?", options: [{ text: 'Effective law enforcement', correct: false }, { text: 'Hallucination in public safety AI', correct: false }, { text: 'A bias feedback loop — the AI amplifying historical over-policing patterns', correct: true }, { text: 'Adaptive learning working correctly', correct: false }], explanation: 'When AI is trained on data shaped by historical bias, its decisions create new data that reinforces that bias.', module: 'AI Safety', xpReward: 40, difficulty: 5 },
  { id: 'dc-010', question: 'An image generator consistently produces images of doctors as male and nurses as female when given neutral prompts. What is the best first fix?', options: [{ text: 'Use a different image generator', correct: false }, { text: 'Add explicit gender diversity instructions to your prompts', correct: true }, { text: 'Report the tool to regulators', correct: false }, { text: 'Only ask for images of objects rather than people', correct: false }], explanation: 'Explicit prompting for diversity is an immediate, practical fix any user can apply now.', module: 'AI Safety', xpReward: 40, difficulty: 4 },
  { id: 'dc-011', question: 'You want to use AI to summarise competitor research for a business presentation. Which approach produces the most reliable output?', options: [{ text: 'Ask the AI to research and summarise competitor X', correct: false }, { text: 'Find recent articles yourself, paste them in, and ask AI to summarise what you provided', correct: true }, { text: 'Ask AI to predict what competitors are doing', correct: false }, { text: 'Ask AI to write the presentation without any source material', correct: false }], explanation: 'Providing real, current source material and asking AI to summarise it gives you accurate, grounded output.', module: 'Daily Life', xpReward: 40, difficulty: 3 },
  { id: 'dc-012', question: 'You are using AI to draft a salary negotiation email. Which combination of context gives the strongest result?', options: [{ text: 'Your name and job title only', correct: false }, { text: 'Time in role, new responsibilities taken on, and current market rate for similar roles', correct: true }, { text: 'How much you like your job and why you deserve more', correct: false }, { text: "Your manager's name and what you think they want to hear", correct: false }], explanation: 'The three strongest negotiation pillars are time in role, added responsibilities, and market rate.', module: 'AI for Work', xpReward: 40, difficulty: 3 },
];

// Did You Know session tracker
const dykShown = new Set<string>();
export function getRandomFact(): DidYouKnow {
  const unseen = DID_YOU_KNOW.filter(f => !dykShown.has(f.id));
  const pool = unseen.length ? unseen : (dykShown.clear(), DID_YOU_KNOW);
  const fact = pool[Math.floor(Math.random() * pool.length)];
  dykShown.add(fact.id);
  return fact;
}

// Daily challenge manager
export const DailyChallengeManager = {
  getToday(): DailyChallenge {
    const dayIndex = Math.floor(Date.now() / 86400000);
    return DAILY_CHALLENGES[dayIndex % DAILY_CHALLENGES.length];
  },
  hasCompletedToday(): boolean {
    const today = new Date().toISOString().slice(0, 10);
    return sessionStorage.getItem('kibo_daily_' + today) === 'done';
  },
  markComplete() {
    const today = new Date().toISOString().slice(0, 10);
    sessionStorage.setItem('kibo_daily_' + today, 'done');
  },
};
