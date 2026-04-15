/**
 * Premium / Pro dashboard components - saved for future use.
 * These were removed from DashboardScreen while the app is freemium.
 * Re-integrate when Pro features are ready.
 */

// ─── Locked modules data ─────────────────────────────────
// Add these back to the MODULES array in DashboardScreen when Pro is ready:
//   { e: "💼", n: "AI for Work",   id: "m5", color: "#e5e7eb", locked: true },
//   { e: "🎨", n: "Creativity",    id: "m6", color: "#e5e7eb", locked: true },
//   { e: "🛡️", n: "AI Safety",    id: "m7", color: "#e5e7eb", locked: true },

// ─── Upsell Banner JSX ──────────────────────────────────
// Place this between the XP/calendar row and the Module progress row:
/*
{/* Upsell banner *\/}
<div className="rounded-[14px] p-4 flex flex-col sm:flex-row items-center gap-4 mb-3 relative overflow-hidden" style={{ background: "#0c111d" }}>
  <div className="absolute top-[-40px] right-[-40px] w-[160px] h-[160px] pointer-events-none" style={{ background: "radial-gradient(circle,rgba(61,183,74,.18) 0%,transparent 70%)" }} />
  <PreloadedImg src={KIBO.thinking} alt="Kibo" className="w-[54px] h-[54px] object-contain shrink-0 relative z-10" />
  <div className="flex-1 relative z-10 text-center sm:text-left">
    <h3 className="text-[14px] font-black text-white mb-[3px]">3 modules still locked</h3>
    <p className="text-[11.5px] font-semibold leading-relaxed" style={{ color: "rgba(255,255,255,.45)" }}>
      Unlock AI for Work, AI for Creativity and AI Safety to complete your path.
    </p>
    <div className="flex gap-[5px] mt-[7px] flex-wrap justify-center sm:justify-start">
      {[{l:"💼 AI for Work",c:"rgba(74,158,255,.15)",tc:"#93c5fd"},{l:"🎨 AI Creativity",c:"rgba(255,140,66,.15)",tc:"#fdba74"},{l:"🛡️ AI Safety",c:"rgba(155,109,255,.15)",tc:"#c4b5fd"}].map(m=>(
        <span key={m.l} className="text-[10px] font-extrabold px-[8px] py-[2px] rounded-[5px]" style={{ background: m.c, color: m.tc }}>{m.l}</span>
      ))}
    </div>
  </div>
  <button className="relative z-10 px-5 py-[10px] rounded-[10px] bg-[#3db74a] text-white text-[13px] font-black border-none shrink-0 hover:-translate-y-[1px] transition-transform" style={{ boxShadow: "0 4px 0 #2ea33d" }}>
    Unlock All - $9.99
  </button>
</div>
*/

// ─── "4 / 7 unlocked" label in Module progress header ───
// Replace the current count with this when locked modules return:
// <span className="text-[11px] font-bold text-[#9ca3af]">4 / 7 unlocked</span>

export {};
