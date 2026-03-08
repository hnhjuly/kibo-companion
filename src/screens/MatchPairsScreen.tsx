import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { FLASHCARD_DATA } from "@/data/flashcards";
import { KIBO } from "@/data/curriculum";
import { ArrowLeft } from "lucide-react";
import PreloadedImg from "@/components/PreloadedImg";
import ExitGameDialog from "@/components/ExitGameDialog";

interface Tile {
  id: string;
  pairId: string;
  text: string;
  type: "term" | "def";
}

const MatchPairsScreen = () => {
  const { setScreen } = useApp();

  const tiles = useMemo(() => {
    const shuffled = [...FLASHCARD_DATA].sort(() => Math.random() - 0.5).slice(0, 4);
    const items: Tile[] = [];
    shuffled.forEach(c => {
      items.push({ id: c.id + "-t", pairId: c.id, text: c.term, type: "term" });
      items.push({ id: c.id + "-d", pairId: c.id, text: c.definition.split(" ").slice(0, 5).join(" ") + "…", type: "def" });
    });
    return items.sort(() => Math.random() - 0.5);
  }, []);

  const [selected, setSelected] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrong, setWrong] = useState<Set<string>>(new Set());
  const [timer, setTimer] = useState(0);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    if (started && !done) {
      intervalRef.current = setInterval(() => setTimer(t => t + 1), 1000);
      return () => clearInterval(intervalRef.current);
    }
  }, [started, done]);

  useEffect(() => {
    if (matched.size === tiles.length && tiles.length > 0) {
      clearInterval(intervalRef.current);
      setDone(true);
      const prev = parseInt(sessionStorage.getItem("kibo_pairs_best") || "9999");
      if (timer < prev) sessionStorage.setItem("kibo_pairs_best", String(timer));
    }
  }, [matched.size, tiles.length, timer]);

  const handleTap = useCallback((tileId: string) => {
    if (matched.has(tileId) || wrong.size > 0) return;
    if (!started) setStarted(true);

    if (selected === tileId) {
      setSelected(null);
      return;
    }

    if (!selected) {
      setSelected(tileId);
      return;
    }

    const tile1 = tiles.find(t => t.id === selected)!;
    const tile2 = tiles.find(t => t.id === tileId)!;

    if (tile1.pairId === tile2.pairId && tile1.type !== tile2.type) {
      setMatched(m => new Set([...m, tile1.id, tile2.id]));
      setSelected(null);
    } else {
      setWrong(new Set([selected, tileId]));
      setTimeout(() => { setWrong(new Set()); setSelected(null); }, 400);
    }
  }, [selected, tiles, matched, wrong, started]);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  const restart = () => {
    setSelected(null);
    setMatched(new Set());
    setWrong(new Set());
    setTimer(0);
    setStarted(false);
    setDone(false);
  };

  if (done) {
    const best = parseInt(sessionStorage.getItem("kibo_pairs_best") || "9999");
    return (
      <div className="flex flex-col flex-1 bg-card">
        <div className="px-5 py-3.5 border-b border-border flex items-center gap-3">
          <button onClick={() => setScreen("train")}><ArrowLeft className="w-5 h-5 text-muted-foreground" /></button>
          <span className="font-black text-foreground">🧩 Match the Pairs</span>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-8 gap-4">
          <PreloadedImg src={KIBO.celebrate} alt="Kibo" className="w-28 h-28 object-contain" />
          <h2 className="text-2xl font-black text-foreground">Matched in {formatTime(timer)}!</h2>
          {timer <= best && <p className="text-kibo-gold font-black">🏆 New best time!</p>}
          <p className="text-kibo-gold font-bold text-lg">+30 XP earned</p>
          <button onClick={restart} className="mt-4 px-10 py-3.5 bg-[#9b6dff] text-primary-foreground rounded-xl font-black shadow-[0_4px_0_#7a4ddf] active:translate-y-[2px] active:shadow-none transition-all">
            Play Again 🧩
          </button>
          <button onClick={() => setScreen("train")} className="text-muted-foreground font-bold text-sm">Back to Train</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 bg-card">
      <div className="px-5 py-3.5 border-b border-border flex items-center gap-3">
        <button onClick={() => setScreen("train")}><ArrowLeft className="w-5 h-5 text-muted-foreground" /></button>
        <span className="font-black text-foreground">🧩 Match the Pairs</span>
        <span className="ml-auto font-black text-foreground">{formatTime(timer)}</span>
      </div>

      <div className="flex-1 overflow-y-auto p-4" style={{ scrollbarWidth: "none" }}>
        <p className="text-sm text-muted-foreground font-bold text-center mb-4">Tap a term, then tap its matching definition</p>
        <div className="grid grid-cols-2 gap-2.5">
          {tiles.map(tile => {
            const isMatched = matched.has(tile.id);
            const isSelected = selected === tile.id;
            const isWrong = wrong.has(tile.id);

            let cls = "bg-card border-2 border-border";
            if (isMatched) cls = "bg-kibo-green/10 border-2 border-kibo-green text-kibo-green scale-100";
            else if (isWrong) cls = "bg-destructive/10 border-2 border-destructive text-destructive animate-[shake_0.35s_ease-in-out]";
            else if (isSelected) cls = "bg-[#f0e8ff] border-2 border-[#9b6dff] scale-[1.04]";

            return (
              <button key={tile.id} onClick={() => handleTap(tile.id)} disabled={isMatched}
                className={`${cls} rounded-[14px] p-3.5 font-bold text-[13px] text-center transition-all min-h-[70px] flex items-center justify-center`}>
                {tile.text}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MatchPairsScreen;
