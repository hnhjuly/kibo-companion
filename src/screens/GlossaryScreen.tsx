import { useState, useRef, useMemo } from "react";
import { Search, ChevronUp } from "lucide-react";
import { GLOSSARY, GLOSSARY_LETTERS } from "@/data/glossary";
import { KIBO } from "@/data/curriculum";
import NotoEmoji from "@/components/NotoEmoji";
import PreloadedImg from "@/components/PreloadedImg";

const GlossaryScreen = () => {
  const [search, setSearch] = useState("");
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const filtered = useMemo(() => {
    if (!search.trim()) return GLOSSARY;
    const q = search.toLowerCase();
    return GLOSSARY.filter(
      t => t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q)
    );
  }, [search]);

  const groupedLetters = useMemo(() => {
    const letters = new Set(filtered.map(t => t.term[0].toUpperCase()));
    return GLOSSARY_LETTERS.filter(l => letters.has(l));
  }, [filtered]);

  const scrollToLetter = (letter: string) => {
    const el = letterRefs.current[letter];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Header */}
      <div className="bg-card px-5 py-3.5 border-b border-border shrink-0">
        <div className="flex items-center gap-3 mb-3">
          <PreloadedImg src={KIBO.detective} alt="Kibo" className="w-9 h-9 object-contain" />
          <div className="flex-1">
            <span className="text-lg font-black text-foreground flex items-center gap-2">
              <NotoEmoji name="book" size={20} /> AI Glossary
            </span>
            <div className="text-[11px] text-muted-foreground font-semibold">{GLOSSARY.length} terms</div>
          </div>
        </div>
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search AI terms..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border-[1.5px] border-border bg-background text-foreground text-[13px] font-semibold placeholder:text-muted-foreground/40 focus:outline-none focus:border-kibo-green transition-colors"
          />
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Alphabet sidebar */}
        <div className="flex flex-col items-center py-1.5 px-1 overflow-y-auto shrink-0" style={{ scrollbarWidth: "none" }}>
          {GLOSSARY_LETTERS.map(letter => (
            <button
              key={letter}
              onClick={() => scrollToLetter(letter)}
              className={`w-6 h-5 flex items-center justify-center text-[9px] font-black rounded transition-colors ${
                groupedLetters.includes(letter)
                  ? "text-kibo-green hover:bg-kibo-green/10"
                  : "text-muted-foreground/30"
              }`}
            >
              {letter}
            </button>
          ))}
        </div>

        {/* Terms list */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto pb-[100px] pr-3" style={{ scrollbarWidth: "none" }}>
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center px-6">
              <PreloadedImg src={KIBO.thinking} alt="Kibo thinking" className="w-20 h-20 object-contain mb-3" />
              <div className="text-[15px] font-black text-foreground mb-1">No results found</div>
              <div className="text-[12px] text-muted-foreground font-semibold">Try a different search term</div>
            </div>
          ) : (
            groupedLetters.map(letter => {
              const terms = filtered.filter(t => t.term[0].toUpperCase() === letter);
              return (
                <div key={letter}>
                  <div
                    ref={el => { letterRefs.current[letter] = el; }}
                    className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm px-3 py-1.5"
                  >
                    <span className="text-[13px] font-black text-kibo-green">{letter}</span>
                  </div>
                  {terms.map((t, i) => {
                    const globalIdx = GLOSSARY.indexOf(t);
                    const isExpanded = expandedIdx === globalIdx;
                    return (
                      <button
                        key={t.term}
                        onClick={() => setExpandedIdx(isExpanded ? null : globalIdx)}
                        className={`w-full text-left px-3 py-2.5 rounded-xl mb-1 transition-all ${
                          isExpanded
                            ? "bg-kibo-green/8 border-[1.5px] border-kibo-green/20"
                            : "bg-transparent border-[1.5px] border-transparent hover:bg-muted/50"
                        }`}
                      >
                        <div className="text-[13px] font-extrabold text-foreground leading-tight">
                          {t.term}
                        </div>
                        {isExpanded && (
                          <div className="text-[12px] text-muted-foreground font-medium leading-relaxed mt-1.5">
                            {t.definition}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Scroll to top FAB */}
      <button
        onClick={scrollToTop}
        className="absolute bottom-[80px] right-4 w-9 h-9 rounded-full bg-kibo-green text-primary-foreground flex items-center justify-center shadow-lg z-50 active:scale-90 transition-transform"
      >
        <ChevronUp className="w-5 h-5" />
      </button>
    </>
  );
};

export default GlossaryScreen;
