/**
 * Reading Cards Data
 * Short "Read First" discussion cards shown before each module's learning path.
 */

const STORAGE_KEY = "kibo_reading_cards";

export interface ReadingCard {
  id: string;
  title: string;
  emoji: string;
  body: string[];
  tip: string | null;
  source: string;
}

export interface ModuleReadingCards {
  moduleTitle: string;
  cards: ReadingCard[];
}

export const READING_CARDS: Record<string, ModuleReadingCards> = {
  m1: {
    moduleTitle: "AI Basics",
    cards: [
      {
        id: "m1-r1",
        title: "What is AI, really?",
        emoji: "🤖",
        body: [
          "AI stands for Artificial Intelligence. It refers to computer systems that can perform tasks that normally require human thinking, like understanding language, recognising patterns, or making decisions.",
          "AI is not one single thing. It is a broad field that includes many different tools and technologies. When people say \"AI\" today, they usually mean software powered by machine learning, such as ChatGPT, Claude, or Google Gemini.",
          "AI has been around since the 1950s, but it became widely used by everyday people starting in the early 2020s with the rise of tools like ChatGPT.",
        ],
        tip: "Think of AI as a very fast pattern-matching machine. It has read billions of examples and uses those patterns to respond to you.",
        source: "IBM Think, Google Cloud, McKinsey",
      },
      {
        id: "m1-r2",
        title: "The three layers: AI, Machine Learning, and Deep Learning",
        emoji: "🧅",
        body: [
          "AI is the big idea: machines that can think-like tasks. Machine Learning (ML) is a way to achieve AI, where a computer learns from data instead of following fixed instructions.",
          "Deep Learning is a type of Machine Learning that uses layers of artificial \"neurons\" to process information, similar to how a brain works. Most modern AI tools like image generators and chatbots use deep learning.",
          "You do not need to understand all three deeply. Just know that when you use ChatGPT or Claude, you are using deep learning inside a machine learning system inside the broader world of AI.",
        ],
        tip: null,
        source: "IBM Think, NASA, Google Cloud",
      },
      {
        id: "m1-r3",
        title: "Narrow AI vs General AI",
        emoji: "🎯",
        body: [
          "All AI that exists today is called Narrow AI (also called Weak AI). This means it is very good at one specific type of task, but cannot do everything a human can.",
          "For example, the AI that recommends your next Netflix show cannot also drive a car or write an email. Each AI is built for a specific job.",
          "Artificial General Intelligence (AGI) is a theoretical future type of AI that could do anything a human can do. As of 2026, AGI does not exist. Researchers are still working toward it.",
        ],
        tip: "ChatGPT, Claude, and Gemini are all Narrow AI. They are very capable at language tasks but have no awareness or real understanding.",
        source: "Notre Dame, Google Cloud, Coursera",
      },
      {
        id: "m1-r4",
        title: "Where you already use AI every day",
        emoji: "📱",
        body: [
          "AI is already built into many things you use daily. Your phone uses AI to recognise your face. Spotify and Netflix use AI to recommend what to watch or listen to next.",
          "When you search on Google, AI ranks the results. When your email filters spam, that is AI. When your maps app finds the fastest route, AI is involved.",
          "You have been using AI for years without knowing it. Learning about it now just means you can use it more intentionally.",
        ],
        tip: "Look at your phone today. Can you spot three apps that probably use AI in the background?",
        source: "Google Cloud, Coursera, IBM Think",
      },
    ],
  },
  m2: {
    moduleTitle: "Talking to AI",
    cards: [
      {
        id: "m2-r1",
        title: "What is a prompt?",
        emoji: "💬",
        body: [
          "A prompt is the message or instruction you type into an AI tool. It is how you communicate what you want the AI to do.",
          "A prompt can be as short as a few words or as long as several paragraphs. It can be a question, a command, a request for creative writing, or even a piece of code.",
          "The quality of what the AI gives you depends heavily on how clearly you write your prompt. A vague prompt gets a vague answer. A specific prompt gets a useful one.",
        ],
        tip: "Think of a prompt like a job brief. The more detail you give, the better the output.",
        source: "MIT Sloan, TechTarget, Wikipedia (Prompt Engineering)",
      },
      {
        id: "m2-r2",
        title: "Why context makes a big difference",
        emoji: "🗂️",
        body: [
          "AI does not know anything about you unless you tell it. Without context, it makes general assumptions. With context, it tailors its answer to your actual situation.",
          "For example: \"Write an email\" is a weak prompt. \"Write a professional follow-up email to a client who did not respond to my proposal last week\" is a much stronger one.",
          "Adding context means telling the AI who you are, what you need, who the audience is, and any constraints that matter. This is the single biggest way to improve your results.",
        ],
        tip: "Before you send a prompt, ask yourself: \"Does the AI know enough about my situation to actually help me?\"",
        source: "MIT Sloan, Harvard University, Google Cloud",
      },
      {
        id: "m2-r3",
        title: "Asking for a specific format",
        emoji: "📋",
        body: [
          "AI can produce its answers in many formats: bullet points, numbered lists, tables, short paragraphs, headings, or plain prose. By default it picks a format on its own.",
          "You can take control by telling it exactly how you want the output. Ask for a \"bullet list of 5 tips\" or a \"short 3-paragraph summary\" or a \"table comparing these two options\".",
          "Specifying a format saves you time editing the output afterward and makes the AI more useful in real workflows.",
        ],
        tip: "Try adding \"Format this as a table\" or \"Give me bullet points only\" to your next prompt and see the difference.",
        source: "MIT Sloan, Harvard University",
      },
      {
        id: "m2-r4",
        title: "Tone and length: you are in control",
        emoji: "🎛️",
        body: [
          "AI tools can adjust their tone based on your instructions. You can ask for formal, casual, friendly, professional, enthusiastic, or simple language.",
          "You can also control length. Asking for a \"one-sentence summary\" vs \"a detailed 500-word explanation\" gives very different results from the same question.",
          "If the response is too long or uses jargon you do not understand, just tell the AI. Say \"make this shorter\" or \"explain this like I am 12 years old\" and it will adjust.",
        ],
        tip: null,
        source: "MIT Sloan, Harvard University, Section AI",
      },
      {
        id: "m2-r5",
        title: "Prompting is a skill you can improve",
        emoji: "📈",
        body: [
          "Getting good results from AI is a learnable skill called prompt engineering. It does not require coding or technical knowledge.",
          "The process is iterative. You write a prompt, see what comes back, then refine it. Add more detail, change the wording, or ask the AI to try again a different way.",
          "Most people get much better results simply by being more specific and by having a back-and-forth conversation with the AI rather than sending one prompt and stopping.",
        ],
        tip: "If the AI gives you a bad answer, do not give up. Ask it: \"That was not quite right. Can you try again and focus more on [specific thing]?\"",
        source: "MIT Sloan, Section AI, Wikipedia (Prompt Engineering)",
      },
    ],
  },
  m3: {
    moduleTitle: "Understanding AI Tools",
    cards: [
      {
        id: "m3-r1",
        title: "Chat AI vs Image AI: what is the difference?",
        emoji: "🖼️",
        body: [
          "Chat AI tools like ChatGPT, Claude, and Gemini are built to understand and generate text. You type something, they type back. They can write, summarise, answer questions, and help you think through problems.",
          "Image AI tools like Midjourney, DALL-E, and Stable Diffusion are built to generate pictures from text descriptions. You describe what you want to see, and the AI creates it.",
          "These are separate types of AI with different training data and different purposes. Some newer tools combine both, letting you send an image and ask questions about it.",
        ],
        tip: null,
        source: "Notre Dame, IBM Think",
      },
      {
        id: "m3-r2",
        title: "Voice and video AI",
        emoji: "🎙️",
        body: [
          "Voice AI can understand spoken words and respond in a human-sounding voice. Tools like ElevenLabs, Siri, and Google Assistant use this. Voice AI is also used to clone voices and create audio from text.",
          "Video AI can generate short video clips from text descriptions, animate still images, or make a person appear to say something they never said. Tools like Sora (OpenAI) and Runway work this way.",
          "These tools are powerful and also raise serious questions about trust. A video of someone saying something does not mean they actually said it.",
        ],
        tip: "If you see a video of a public figure saying something shocking, pause before sharing. Ask: could this be AI-generated?",
        source: "IBM Think, Notre Dame",
      },
    ],
  },
  m4: {
    moduleTitle: "AI for Daily Life",
    cards: [
      {
        id: "m4-r1",
        title: "Using AI as a personal assistant",
        emoji: "🗓️",
        body: [
          "AI tools can help with everyday tasks like planning a trip, writing a shopping list, summarising a long article, or explaining a confusing document.",
          "The key is being specific about what you need. Instead of asking \"help me plan a trip,\" try \"I want to visit Japan for 10 days in April with a budget of $3000. What should I prioritise?\"",
          "AI will not book the trip for you or check live prices without special tools. But it can help you think through decisions and create a starting plan quickly.",
        ],
        tip: null,
        source: "MIT Sloan, Harvard University",
      },
      {
        id: "m4-r2",
        title: "Summarising articles and documents",
        emoji: "📰",
        body: [
          "One of the most practical uses of AI is summarising long content. You can paste in a news article, a legal document, a report, or a long email and ask the AI to give you the key points.",
          "This saves time and helps you quickly decide whether something is worth reading in full. It is especially useful for long contracts, research papers, or meeting notes.",
          "Always remember: summaries can miss nuance. If a document is important, read the key parts yourself after seeing the AI summary.",
        ],
        tip: "Try pasting a long article you have been meaning to read and asking: \"Summarise this in 5 bullet points. What are the most important things to know?\"",
        source: "MIT Sloan, Harvard University",
      },
    ],
  },
  m5: {
    moduleTitle: "AI for Work",
    cards: [
      {
        id: "m5-r1",
        title: "AI in the workplace today",
        emoji: "💼",
        body: [
          "AI is already being used in most industries. In offices, it helps with drafting emails, summarising meetings, creating reports, and analysing data.",
          "You do not need to be a programmer to use AI at work. Most AI tools today are designed for everyday use, with a simple chat interface anyone can learn.",
          "Companies that train their teams to use AI effectively tend to get better results than those that ban it or ignore it entirely.",
        ],
        tip: null,
        source: "McKinsey, IBM Think",
      },
      {
        id: "m5-r2",
        title: "What AI is good at in a work context",
        emoji: "✅",
        body: [
          "AI is very good at tasks that involve language: drafting, summarising, translating, reformatting, brainstorming, and explaining complex things simply.",
          "It is also useful for repetitive tasks like organising information, creating templates, or generating first drafts that you then edit.",
          "AI is not good at tasks that require current real-world knowledge (its training data has a cutoff date), personal judgment, emotional intelligence, or accountability for decisions.",
        ],
        tip: "A good rule: use AI for the first draft, use your brain for the final one.",
        source: "McKinsey, MIT Sloan",
      },
    ],
  },
  m6: {
    moduleTitle: "AI for Creativity",
    cards: [
      {
        id: "m6-r1",
        title: "AI as a creative collaborator",
        emoji: "🎨",
        body: [
          "AI can help with creative work: writing stories, generating image ideas, brainstorming concepts, writing song lyrics, and producing first drafts of creative content.",
          "The best results come when you treat AI like a collaborator, not a replacement. You bring the idea, taste, and direction. AI brings speed and variety.",
          "Creative AI is a tool for people who want to create more, not a shortcut that removes the need for creativity.",
        ],
        tip: null,
        source: "MIT Sloan, IBM Think",
      },
      {
        id: "m6-r2",
        title: "Writing image prompts that actually work",
        emoji: "🖌️",
        body: [
          "Image AI tools respond to descriptive prompts. The more specific your description, the closer the output to what you imagined.",
          "Strong image prompts include: the subject, the setting, the style (e.g. photorealistic, watercolour, cartoon), the mood, and the lighting.",
          "Example of a weak prompt: \"a dog.\" Example of a strong prompt: \"a golden retriever puppy sitting in a sunny park, soft natural light, photorealistic style, shallow depth of field.\"",
        ],
        tip: "Study prompts from images you like online. Many image AI communities share their prompts alongside the results.",
        source: "MIT Sloan, Wikipedia (Prompt Engineering)",
      },
    ],
  },
  m7: {
    moduleTitle: "AI Safety and Awareness",
    cards: [
      {
        id: "m7-r1",
        title: "What is an AI hallucination?",
        emoji: "👻",
        body: [
          "AI hallucination is when an AI tool produces information that sounds confident and plausible, but is actually incorrect, made up, or misleading.",
          "This happens because AI language models work by predicting what text should come next based on patterns, not by looking up facts. They can generate a convincing-sounding answer even when they have no reliable information on the topic.",
          "Examples of hallucinations include: inventing a book citation that does not exist, stating a wrong historical date with confidence, or making up a law or statistic.",
        ],
        tip: "Never use an AI answer for anything important without checking it against a real source. This includes medical, legal, financial, and factual claims.",
        source: "IBM (AI Hallucinations), Google Cloud, Wikipedia (Hallucination AI)",
      },
      {
        id: "m7-r2",
        title: "Bias in AI: where it comes from",
        emoji: "⚖️",
        body: [
          "AI learns from large amounts of human-created data: text, images, and other content from the internet and books. If that data contains biases, the AI absorbs and can repeat them.",
          "Bias in AI can show up in many ways: favouring certain groups in image generation, making unfair assumptions in hiring tools, or producing different quality answers depending on how a question is phrased.",
          "Researchers and companies work to reduce bias in AI, but it cannot be fully eliminated yet. Being aware of this helps you use AI more critically.",
        ],
        tip: null,
        source: "IBM Think, Notre Dame, National Institutes of Health (PMC)",
      },
      {
        id: "m7-r3",
        title: "Deepfakes: what they are and why they matter",
        emoji: "🎭",
        body: [
          "A deepfake is a piece of AI-generated media, usually a video or audio clip, that makes it appear as if a real person said or did something they never actually said or did.",
          "Deepfakes are made using AI models trained on real footage of a person. The technology has become accessible enough that individuals, not just experts, can create them.",
          "This matters because a convincing fake video can spread false information very quickly. Seeing is no longer believing when it comes to AI-generated video and audio.",
        ],
        tip: "Signs of a deepfake often include: unnatural blinking, odd lighting around the face, slightly off lip sync, and blurry edges around hair or ears.",
        source: "IBM Think, Wikipedia (Hallucination AI)",
      },
      {
        id: "m7-r4",
        title: "The future of AI: what we actually know",
        emoji: "🔭",
        body: [
          "AI is developing quickly. As of 2026, more than 60 countries have national strategies for managing AI responsibly, including the United States, the European Union, China, and Singapore.",
          "The EU passed the AI Act, one of the first major legal frameworks specifically for AI, which classifies AI tools by risk level and sets rules for how they can be used.",
          "No one knows exactly how AI will develop over the next decade. What is clear is that people who understand AI will be better placed to use it, question it, and shape how it is used in society.",
        ],
        tip: null,
        source: "McKinsey (AI regulation section)",
      },
    ],
  },
};

// Module color mapping for progress bars
export const MODULE_COLORS: Record<string, string> = {
  m1: "#3db74a",
  m2: "#4a9eff",
  m3: "#ff8c42",
  m4: "#9b6dff",
  m5: "#4a9eff",
  m6: "#ffb800",
  m7: "#ff4f4f",
};

// State manager with localStorage persistence
const READING_STATE_KEY = "kibo_reading_done";

function loadReadState(): Set<string> {
  try {
    const raw = localStorage.getItem(READING_STATE_KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw));
  } catch {
    return new Set();
  }
}

function saveReadState(set: Set<string>) {
  localStorage.setItem(READING_STATE_KEY, JSON.stringify([...set]));
}

export const ReadingCardState = {
  _read: loadReadState(),
  _justCompleted: new Set<string>(),

  markAllRead(moduleId: string) {
    const mod = READING_CARDS[moduleId];
    if (!mod) return;
    mod.cards.forEach((c) => this._read.add(c.id));
    this._justCompleted.add(moduleId);
    saveReadState(this._read);
  },

  hasReadAll(moduleId: string): boolean {
    const mod = READING_CARDS[moduleId];
    if (!mod) return true; // no cards = skip
    return mod.cards.every((c) => this._read.has(c.id));
  },

  wasJustCompleted(moduleId: string): boolean {
    return this._justCompleted.has(moduleId);
  },

  clearJustCompleted(moduleId: string) {
    this._justCompleted.delete(moduleId);
  },

  reset() {
    this._read.clear();
    this._justCompleted.clear();
    localStorage.removeItem(READING_STATE_KEY);
  },
};
