import { useState, useCallback } from "react";
import NotoEmoji from "@/components/NotoEmoji";
import type { FillBlankQuestion } from "@/data/fillBlankQuestions";

interface FillBlankCardProps {
  question: FillBlankQuestion;
  onAnswer: (correct: boolean) => void;
  answered: boolean;
}

const FillBlankCard = ({ question, onAnswer, answered }: FillBlankCardProps) => {
  const [input, setInput] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = useCallback(() => {
    if (!input.trim() || submitted) return;
    const userAnswer = input.toLowerCase().trim();
    const correct = question.acceptedAnswers.includes(userAnswer);
    setIsCorrect(correct);
    setSubmitted(true);
    onAnswer(correct);
  }, [input, submitted, question, onAnswer]);

  // Split sentence at _____ to render the blank inline
  const parts = question.sentence.split('_____');

  return (
    <div className="flex flex-col gap-5">
      {/* Sentence with blank */}
      <div className="text-[17px] font-bold text-foreground leading-relaxed">
        {parts[0]}
        {submitted ? (
          <span className={`inline-block px-2 py-0.5 rounded-lg font-black border-b-[2.5px] mx-1 ${
            isCorrect 
              ? "text-kibo-green border-kibo-green bg-kibo-green/10" 
              : "text-destructive border-destructive bg-destructive/10"
          }`}>
            {isCorrect ? input.trim() : question.answer}
          </span>
        ) : (
          <span className="inline-block mx-1 border-b-[2.5px] border-secondary min-w-[100px]">
            &nbsp;
          </span>
        )}
        {parts[1]}
      </div>

      {/* Input area */}
      {!submitted && (
        <div className="flex flex-col gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="Type your answer..."
            autoFocus
            className="w-full px-4 py-3.5 rounded-[14px] border-[2.5px] border-border bg-background text-foreground font-bold text-[15px] 
              focus:border-secondary focus:outline-none focus:ring-0 transition-colors placeholder:text-muted-foreground/40"
          />
          <div className="flex gap-2.5">
            <button
              onClick={() => setShowHint(!showHint)}
              className="px-4 py-2.5 rounded-xl border-[2px] border-border bg-card text-muted-foreground font-bold text-sm 
                hover:border-accent hover:text-accent transition-all flex items-center gap-1.5"
            >
              <NotoEmoji name="lightbulb" size={14} />
              {showHint ? "Hide Hint" : "Hint"}
            </button>
            <button
              onClick={handleSubmit}
              disabled={!input.trim()}
              className="flex-1 py-2.5 rounded-xl bg-secondary text-secondary-foreground font-black text-sm 
                disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:brightness-110"
            >
              CHECK
            </button>
          </div>
          {showHint && (
            <p className="text-sm text-muted-foreground italic px-1">
              <NotoEmoji name="lightbulb" size={13} /> {question.hint}
            </p>
          )}
        </div>
      )}

      {/* Show wrong answer if incorrect */}
      {submitted && !isCorrect && (
        <p className="text-sm text-muted-foreground">
          You answered: <span className="text-destructive font-bold">{input.trim()}</span>
        </p>
      )}
    </div>
  );
};

export default FillBlankCard;
