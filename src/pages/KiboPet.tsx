// KiboPet.tsx — drop into src/pages/KiboPet.tsx
// Add route: <Route path="/pet" element={<KiboPet />} />

import { useEffect, useRef, useState, useCallback } from "react";

// ── PIXEL ART ─────────────────────────────────────────────────
const PAL: Record<string, string | null> = {
  W:"#e8f8d0",B:"#0f380f",Y:"#e8c000",P:"#ffaaaa",K:"#306230",_:null,
};
const FRAMES: Record<string, string[]> = {
  neutral:["__BWWWWB__","_BWWWWWWB_","BBWWWWWWBB","BWWWWWWWWB","BW_BWB_WBW","BWWWWWWWWB","BW_BWWB_WB","BWWWWWWWWB","BBWWWWWWBB","_BB_WW_BB_","__BB__BB__","___B__B___"],
  happy:  ["__BWWWWB__","_BWWWWWWB_","BBWWWWWWBB","BWWWWWWWWB","BW_B__B_WB","BWWWWWWWWB","BW_BBBBBBW","BWWBWWWWWB","BBWWWWWWBB","_BB_WW_BB_","__BB__BB__","___B__B___"],
  sad:    ["__BWWWWB__","_BWWWWWWB_","BBWWWWWWBB","BWWWWWWWWB","BWBWWWWBWB","BWWWWWWWWB","BW__BBB__B","BWWWWWWWWB","BBWWWWWWBB","_BB_WW_BB_","__BB__BB__","___B__B___"],
  sleep:  ["__BWWWWB__","_BWWWWWWB_","BBWWWWWWBB","BWWWWWWWWB","BWWBBWBBWB","BWWWWWWWWB","BW__BWB__B","BWWWWWWWWB","BBWWWWWWBB","_BB_WW_BB_","__BB__BB__","___B__B___"],
  eat:    ["__BWWWWB__","_BWWWWWWB_","BBWWWWWWBB","BWWWWWWWWB","BW_BWB_WBW","BWWWWWWWWB","BW_BPPB__B","BWWBPPWWWB","BBWWWWWWBB","_BB_WW_BB_","__BB__BB__","___B__B___"],
  excited:["__BWWWWB__","_BWWWWWWB_","BBWWWWWWBB","BWWWWWWWWB","BWBWWWWBWB","BWWWWWWWWB","BWW_BBBB_W","BWWWWWWWWB","BBWWWWWWBB","_BB_WW_BB_","__BB__BB__","___B__B___"],
  sick:   ["__BWWWWB__","_BWWWWWWB_","BBWWWWWWBB","BWWWWWWWWB","BW_BWB_WBW","BWWWWWWWWB","BW__BBB__B","BWWWWWWWWB","BBWWWWWWBB","_BB_WW_BB_","__BB__BB__","___B__B___"],
  catch:  ["__BWWWWB__","_BWWWWWWB_","BBWWWWWWBB","BWWWWWWWWB","BW_B__B_WB","BWWWWWWWWB","BWWBBBBBWB","BWWWWWWWWB","BBWWWWWWBB","_BB_WW_BB_","__BB__BB__","___B__B___"],
};
const CROWN = ["____YBYB__","___BYYYYB_"];

function drawKibo(ctx: CanvasRenderingContext2D, mood: string, S=4, ox=0, oy=0) {
  CROWN.forEach((row,ry)=>[...row].forEach((ch,cx)=>{const c=PAL[ch];if(!c)return;ctx.fillStyle=c;ctx.fillRect(ox+cx*S,oy+ry*S,S,S);}));
  const rows=FRAMES[mood]??FRAMES.neutral;
  rows.forEach((row,ry)=>[...row].forEach((ch,cx)=>{const c=PAL[ch];if(!c)return;ctx.fillStyle=c;ctx.fillRect(ox+cx*S,oy+(ry+2)*S,S,S);}));
  ctx.fillStyle="#ffaaaa";ctx.fillRect(ox+4,oy+24,4,4);ctx.fillRect(ox+32,oy+24,4,4);
}

// ── FOODS ─────────────────────────────────────────────────────
const FOODS=[
  {emoji:"🍎",name:"Apple", hunger:15,happy:5, energy:2, xp:10},
  {emoji:"🍌",name:"Banana",hunger:12,happy:8, energy:10,xp:12},
  {emoji:"🍔",name:"Burger",hunger:25,happy:15,energy:-5,xp:8},
  {emoji:"🍣",name:"Sushi", hunger:18,happy:12,energy:8, xp:15},
  {emoji:"🍰",name:"Cake",  hunger:8, happy:20,energy:5, xp:10},
  {emoji:"🥕",name:"Carrot",hunger:10,happy:3, energy:15,xp:14},
];

// ── STATE ─────────────────────────────────────────────────────
interface PS {
  hunger:number;happy:number;energy:number;
  xp:number;level:number;streak:number;age:number;
  lastFeed:number;lastPlay:number;lastRest:number;lastPet:number;
  lastActive:number;returnCoolness:number;sick:boolean;
}
const DEFAULTS:PS={hunger:70,happy:80,energy:90,xp:0,level:1,streak:0,age:0,lastFeed:0,lastPlay:0,lastRest:0,lastPet:0,lastActive:Date.now(),returnCoolness:0,sick:false};

function loadPS():PS{
  try{
    const raw=localStorage.getItem("kibo_v5");
    if(raw){
      const g:PS=JSON.parse(raw);
      const secs=(Date.now()-g.lastActive)/1000;
      if(secs>10){const m=secs/60;g.hunger=Math.max(0,g.hunger-m*1.5);g.happy=Math.max(0,g.happy-m*1.0);g.energy=Math.max(0,g.energy-m*0.6);if(m>10)g.returnCoolness=Math.min(3,Math.floor(m/60)+1);if(m>30&&!g.sick&&Math.random()<0.3)g.sick=true;}
      g.lastActive=Date.now();return g;
    }
  }catch{}
  return{...DEFAULTS};
}
function savePS(g:PS){localStorage.setItem("kibo_v5",JSON.stringify(g));}
function cl(v:number){return Math.max(0,Math.min(100,v));}
function moodSprite(g:PS):string{if(g.sick)return"sick";const a=(g.hunger+g.happy+g.energy)/3;if(g.energy<20)return"sleep";if(g.hunger<25||g.happy<25)return"sad";if(a>75)return"happy";return"neutral";}

// ── GAME CONSTANTS ────────────────────────────────────────────
const SW=184,SH=148,GROUND=SH-36,KW=20,KH=48,KY=GROUND-KH+10,MAX_C=15;
const CDS={feed:8000,play:15000,rest:12000,pet:2500};

// ── CSS ───────────────────────────────────────────────────────
const CSS=`
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
.kp-wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;background:#b8d4f0;background-image:radial-gradient(circle at 20% 30%,#c8e4ff 0%,transparent 50%),radial-gradient(circle at 80% 70%,#ffd6e8 0%,transparent 50%);font-family:'Press Start 2P',monospace;overflow:hidden;}
.kp-wrap.embedded{min-height:unset;background:none;background-image:none;overflow:visible;padding:18px 14px 24px;}
.kp-dev{width:220px;background:linear-gradient(170deg,#ffe8f0 0%,#ffd0e4 40%,#ffb8d4 100%);border-radius:50% 50% 42% 42% / 18% 18% 14% 14%;padding:22px 18px 30px;position:relative;box-shadow:0 0 0 3px #e890b0,0 8px 0 3px #cc7090,0 12px 30px rgba(180,80,120,.4),inset 0 3px 6px rgba(255,255,255,.6),inset 0 -4px 8px rgba(200,80,120,.2);}
.kp-ear{position:absolute;top:16px;width:22px;height:22px;background:#ffb8d4;border-radius:50%;border:3px solid #e890b0;box-shadow:0 2px 0 #cc7090;}
.kp-el{left:-8px;}.kp-er{right:-8px;}
.kp-eh{width:8px;height:8px;background:#cc7090;border-radius:50%;margin:4px auto;}
.kp-brand{text-align:center;font-size:7px;color:#cc6090;letter-spacing:3px;margin-bottom:10px;}
.kp-bz{background:#1a0a14;border-radius:10px;padding:5px;box-shadow:inset 0 3px 8px rgba(0,0,0,.8),0 2px 0 rgba(255,255,255,.2),0 0 0 2px #cc6090;margin-bottom:14px;position:relative;}
.kp-bz::after{content:'';position:absolute;inset:5px;border-radius:6px;background:repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,.03) 3px,rgba(0,0,0,.03) 4px);pointer-events:none;z-index:10;}
.kp-sc{width:100%;height:148px;background:#9bbc0f;border-radius:6px;position:relative;overflow:hidden;cursor:pointer;image-rendering:pixelated;}
.kp-sun{position:absolute;top:6px;right:8px;width:12px;height:12px;background:#0f380f;box-shadow:-4px 0 0 #0f380f,4px 0 0 #0f380f,0 -4px 0 #0f380f,0 4px 0 #0f380f;}
.kp-cl{position:absolute;background:#306230;animation:kpCl linear infinite;}
.kp-cl::before,.kp-cl::after{content:'';position:absolute;background:#306230;}
.kp-ca{width:16px;height:4px;top:10px;left:-20px;animation-duration:18s;}
.kp-ca::before{width:8px;height:4px;top:-4px;left:2px;}.kp-ca::after{width:6px;height:4px;top:-4px;left:8px;}
.kp-cb{width:12px;height:4px;top:20px;left:-14px;animation-duration:26s;animation-delay:-10s;}
.kp-cb::before{width:6px;height:4px;top:-4px;left:2px;}
@keyframes kpCl{from{left:-30px}to{left:110%}}
.kp-gr{position:absolute;bottom:0;left:0;right:0;height:36px;background:#0f380f;}
.kp-gr::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:#306230;}
.kp-gs{position:absolute;bottom:36px;background:#306230;}
.kp-sov{position:absolute;inset:0;background:rgba(80,200,80,.08);z-index:3;pointer-events:none;animation:kpSk 2s ease-in-out infinite;}
@keyframes kpSk{0%,100%{opacity:.5}50%{opacity:1}}
.kp-pips{position:absolute;top:4px;left:4px;display:flex;gap:1px;z-index:5;}
.kp-pip{width:5px;height:5px;background:#0f380f;}.kp-pip.e{background:#306230;}
.kp-mt{position:absolute;bottom:40px;left:50%;transform:translateX(-50%);font-size:5px;color:#0f380f;white-space:nowrap;z-index:5;background:#9bbc0f;padding:1px 3px;}
.kp-sp{position:absolute;bottom:36px;left:50%;transform:translateX(-50%);z-index:4;}
.kp-sp.idle{animation:kpId .8s steps(1) infinite;}
.kp-sp.happy{animation:kpHp .4s steps(1) infinite;}
.kp-sp.sad{animation:kpSd 2s steps(1) infinite;}
.kp-sp.sleep{animation:kpSl 2s steps(1) infinite;}
.kp-sp.eat{animation:kpEt .3s steps(1) infinite;}
.kp-sp.bounce{animation:kpBn .35s steps(1) infinite;}
.kp-sp.sick{animation:kpSk2 1s steps(1) infinite;}
@keyframes kpId{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(-3px)}}
@keyframes kpHp{0%,100%{transform:translateX(-50%) rotate(-4deg)}50%{transform:translateX(-50%) translateY(-8px) rotate(4deg)}}
@keyframes kpSd{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(2px)}}
@keyframes kpSl{0%,100%{transform:translateX(-50%) rotate(-3deg)}50%{transform:translateX(-50%) rotate(3deg)}}
@keyframes kpEt{0%,100%{transform:translateX(-50%) scaleY(1)}50%{transform:translateX(-50%) scaleY(.88) translateY(3px)}}
@keyframes kpBn{0%,100%{transform:translateX(-50%) scaleY(1) translateY(0)}40%{transform:translateX(-50%) scaleY(1.1) translateY(-10px)}80%{transform:translateX(-50%) scaleY(.9) translateY(0)}}
@keyframes kpSk2{0%,100%{transform:translateX(-50%) rotate(0)}25%{transform:translateX(-50%) rotate(-3deg)}75%{transform:translateX(-50%) rotate(3deg)}}
.kp-em{position:absolute;bottom:54px;left:50%;transform:translateX(-50%) scale(0);background:#9bbc0f;border:2px solid #0f380f;padding:2px 4px;font-size:6px;color:#0f380f;white-space:nowrap;z-index:8;transition:transform .12s cubic-bezier(.34,1.56,.64,1);}
.kp-em.show{transform:translateX(-50%) scale(1);}
.kp-zzz{position:absolute;bottom:74px;right:28px;font-size:7px;color:#306230;z-index:6;animation:kpZ 1.5s ease-in-out infinite;}
@keyframes kpZ{0%,100%{transform:translateY(0) rotate(-5deg)}50%{transform:translateY(-5px) rotate(5deg)}}
.kp-xp{position:absolute;bottom:2px;left:4px;right:4px;height:4px;background:#306230;z-index:5;}
.kp-xpf{height:100%;background:#0f380f;transition:width .4s steps(4);}
.kp-gc{position:absolute;top:0;left:0;z-index:15;border-radius:6px;image-rendering:pixelated;}
.kp-cc{position:absolute;top:4px;right:4px;font-size:6px;color:#0f380f;background:#9bbc0f;padding:1px 3px;z-index:16;}
.kp-gm{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:7px;color:#0f380f;background:#9bbc0f;padding:4px 6px;border:2px solid #0f380f;text-align:center;line-height:1.8;z-index:16;white-space:pre-line;pointer-events:none;}
.kp-mid{display:flex;justify-content:center;align-items:center;gap:14px;margin-bottom:12px;}
.kp-dp{position:relative;width:36px;height:36px;}
.kp-dh{position:absolute;width:36px;height:12px;top:12px;left:0;background:#e890b0;border-radius:3px;box-shadow:0 2px 0 #cc7090;}
.kp-dv{position:absolute;width:12px;height:36px;top:0;left:12px;background:#e890b0;border-radius:3px;box-shadow:0 2px 0 #cc7090;}
.kp-dc{position:absolute;width:12px;height:12px;background:#f0a0c0;top:12px;left:12px;z-index:1;}
.kp-bc{width:28px;height:28px;background:radial-gradient(circle at 35% 35%,#ff90b0,#cc5080);border-radius:50%;border:none;box-shadow:0 3px 0 #aa3060;cursor:pointer;transition:transform .1s,box-shadow .1s;}
.kp-bc:active{transform:translateY(2px);box-shadow:0 1px 0 #aa3060;}
.kp-lv{font-size:6px;color:#cc6090;text-align:center;line-height:1.6;margin-top:4px;}
.kp-ctrl{display:flex;justify-content:center;gap:8px;margin-bottom:6px;}
.kp-cb2{width:44px;height:34px;background:linear-gradient(160deg,#ffd0e4,#ffb8d4);border:none;border-radius:8px;font-size:16px;cursor:pointer;box-shadow:0 3px 0 #cc7090;transition:transform .1s,box-shadow .1s;touch-action:none;user-select:none;}
.kp-cb2:active{transform:translateY(2px);box-shadow:0 1px 0 #cc7090;}
.kp-acts{display:flex;justify-content:center;gap:6px;}
.kp-act{width:48px;background:linear-gradient(160deg,#ffd0e4,#ffb8d4);border:none;border-radius:12px;padding:7px 3px 5px;cursor:pointer;box-shadow:0 4px 0 #cc7090;transition:transform .1s,box-shadow .1s;display:flex;flex-direction:column;align-items:center;gap:3px;}
.kp-act:active{transform:translateY(3px);box-shadow:0 1px 0 #cc7090;}
.kp-ai{font-size:12px;line-height:1;}.kp-al{font-size:4px;color:#993060;text-align:center;}
.kp-bot{display:flex;justify-content:space-between;align-items:center;margin-top:8px;padding:0 4px;}
.kp-pl{font-size:5px;color:#cc6090;background:rgba(255,255,255,.5);border-radius:8px;padding:3px 6px;}
.kp-toast{position:fixed;bottom:28px;left:50%;transform:translateX(-50%) translateY(12px);background:#0f380f;color:#9bbc0f;font-size:7px;padding:8px 14px;border-radius:4px;opacity:0;pointer-events:none;transition:all .25s;white-space:nowrap;z-index:999;font-family:'Press Start 2P',monospace;}
.kp-toast.on{opacity:1;transform:translateX(-50%) translateY(0);}
.kp-fo{position:fixed;inset:0;background:rgba(0,0,0,.3);display:flex;align-items:flex-end;justify-content:center;z-index:500;font-family:'Press Start 2P',monospace;}
.kp-fp{background:#ffd0e4;border-radius:20px 20px 0 0;padding:14px 14px 28px;width:100%;max-width:360px;border-top:3px solid #e890b0;}
.kp-ft{font-size:7px;color:#993060;text-align:center;margin-bottom:12px;}
.kp-fg{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:12px;}
.kp-fi{background:white;border-radius:12px;padding:10px 4px 6px;display:flex;flex-direction:column;align-items:center;gap:4px;cursor:pointer;border:3px solid transparent;box-shadow:0 3px 0 #e890b0;}
.kp-fi.s{border-color:#cc5080;}
.kp-fe{font-size:20px;line-height:1;}.kp-fn{font-size:5px;color:#993060;}.kp-fs{font-size:4px;color:#cc7090;line-height:1.8;text-align:center;}
.kp-fb{width:100%;background:#cc5080;color:white;border:none;border-radius:10px;padding:9px;font-family:'Press Start 2P',monospace;font-size:7px;cursor:pointer;box-shadow:0 4px 0 #993060;}
.kp-fc{width:100%;background:none;border:none;color:#cc7090;font-family:'Press Start 2P',monospace;font-size:6px;cursor:pointer;margin-top:6px;}
.kp-mo{position:fixed;inset:0;background:rgba(0,0,0,.4);display:flex;align-items:center;justify-content:center;z-index:500;font-family:'Press Start 2P',monospace;}
.kp-mp{background:#ffd0e4;border-radius:16px;padding:16px;width:180px;border:3px solid #e890b0;text-align:center;}
.kp-mt2{font-size:7px;color:#993060;margin-bottom:12px;}
.kp-mb{width:100%;background:#cc5080;color:white;border:none;border-radius:8px;padding:8px;font-family:'Press Start 2P',monospace;font-size:7px;cursor:pointer;box-shadow:0 3px 0 #993060;}
.kp-mc{width:100%;background:none;border:none;color:#cc7090;font-family:'Press Start 2P',monospace;font-size:6px;cursor:pointer;margin-top:6px;}
.kp-lo{position:fixed;inset:0;background:rgba(155,188,15,.96);display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:600;font-family:'Press Start 2P',monospace;}
.kp-lt{font-size:11px;color:#0f380f;text-align:center;line-height:2.2;white-space:pre-line;}
.kp-lb2{margin-top:20px;background:#0f380f;color:#9bbc0f;border:none;border-radius:4px;padding:10px 20px;font-family:'Press Start 2P',monospace;font-size:8px;cursor:pointer;box-shadow:0 3px 0 #000;}
`;

export default function KiboPet({ embedded = false }: { embedded?: boolean } = {}) {
  const [pet,setPet]=useState<PS>(loadPS);
  const [toast,setToast]=useState("");
  const [toastOn,setToastOn]=useState(false);
  const [emote,setEmote]=useState("");
  const [emoteOn,setEmoteOn]=useState(false);
  const [moodTxt,setMoodTxt]=useState("hello!");
  const [anim,setAnim]=useState("idle");
  const [zzz,setZzz]=useState(false);
  const [xpPct,setXpPct]=useState(0);
  const [pips,setPips]=useState<boolean[]>([]);
  const [foodOpen,setFoodOpen]=useState(false);
  const [medOpen,setMedOpen]=useState(false);
  const [luOpen,setLuOpen]=useState(false);
  const [selFood,setSelFood]=useState<typeof FOODS[0]|null>(null);
  const [gameMode,setGameMode]=useState(false);
  const [catchCnt,setCatchCnt]=useState(0);
  const [gameMsg,setGameMsg]=useState("");

  const kiboRef=useRef<HTMLCanvasElement>(null);
  const gameRef2=useRef<HTMLCanvasElement>(null);
  const luRef=useRef<HTMLCanvasElement>(null);
  const screenRef=useRef<HTMLDivElement>(null);
  const feeding=useRef(false);
  const petRef=useRef(pet); petRef.current=pet;

  const G=useRef({
    active:false,phase:"idle" as "idle"|"throwing"|"bouncing",
    kiboX:92,ball:{x:92,y:10,vx:0,vy:0,r:5},
    catches:0,catchFlash:0,
    moveIv:null as ReturnType<typeof setInterval>|null,
    animId:null as number|null,lastTime:0,
  });

  const wantTick=useRef(0);
  const drag=useRef({on:false,lx:0});

  // helpers
  const toast_=useCallback((m:string)=>{setToast(m);setToastOn(true);setTimeout(()=>setToastOn(false),2200);},[]);
  const emote_=useCallback((m:string)=>{setEmote(m);setEmoteOn(true);setTimeout(()=>setEmoteOn(false),1400);},[]);
  const redraw=useCallback((mood:string)=>{
    const c=kiboRef.current;if(!c)return;
    const ctx=c.getContext("2d")!;ctx.clearRect(0,0,40,52);drawKibo(ctx,mood,4,0,0);
  },[]);
  const sync=useCallback((g:PS)=>{
    setXpPct(Math.min((g.xp/(g.level*100))*100,100));
    const f=Math.round((g.hunger+g.happy+g.energy)/30);
    setPips(Array.from({length:10},(_,i)=>i<f));
    savePS(g);
  },[]);
  const addXP=useCallback((n:number,g:PS):PS=>{
    let ng={...g,xp:g.xp+n};
    if(ng.xp>=ng.level*100){ng.xp-=ng.level*100;ng.level++;setLuOpen(true);setTimeout(()=>{const c=luRef.current;if(c){const ctx=c.getContext("2d")!;ctx.clearRect(0,0,80,96);drawKibo(ctx,"happy",8,0,0);}},50);}
    return ng;
  },[]);
  const cd=useCallback((k:keyof typeof CDS,g:PS):boolean=>{
    const km:Record<string,keyof PS>={feed:"lastFeed",play:"lastPlay",rest:"lastRest",pet:"lastPet"};
    const left=CDS[k]-(Date.now()-(g[km[k]] as number));
    if(left>0){toast_("wait "+Math.ceil(left/1000)+"s");return true;}return false;
  },[toast_]);

  // autonomous
  const autonomous=useCallback((g:PS)=>{
    wantTick.current--;if(wantTick.current>0)return;
    wantTick.current=10+Math.floor(Math.random()*8);
    if(g.sick){setMoodTxt("not well~");setAnim("sick");setZzz(false);redraw("sick");if(Math.random()>.5)emote_(">_<");return;}
    const w={hungry:Math.max(0,80-g.hunger)*1.5,sleepy:Math.max(0,70-g.energy)*1.2,bored:Math.max(0,75-g.happy)*1.0,playful:g.happy>70?30:5,content:g.hunger>70&&g.happy>70&&g.energy>70?40:5};
    const tot=Object.values(w).reduce((a,b)=>a+b,0);let r=Math.random()*tot,want="content";
    for(const[k,v]of Object.entries(w)){r-=v;if(r<=0){want=k;break;}}
    const cfg:Record<string,{text:string;em:string;sp:string;an:string;zzz:boolean}>={
      hungry:{text:"hungry...",em:"food?",sp:"sad",an:"sad",zzz:false},
      sleepy:{text:"sleepy~",em:"zzz",sp:"sleep",an:"sleep",zzz:true},
      bored:{text:"bored...",em:"...",sp:"sad",an:"idle",zzz:false},
      playful:{text:"play!!!",em:"!!!",sp:"excited",an:"bounce",zzz:false},
      content:{text:"happy~",em:"<3",sp:"happy",an:"happy",zzz:false},
    };
    const c=cfg[want]??cfg.content;
    setMoodTxt(c.text);setAnim(c.an);setZzz(c.zzz);redraw(c.sp);
    if(Math.random()>.45)emote_(c.em);
    if(!g.sick&&(g.hunger<20||g.happy<20||g.energy<20)&&Math.random()<0.08){
      setPet(p=>{const ng={...p,sick:true};savePS(ng);return ng;});
      toast_("KIBO is sick! Give medicine!");
    }
  },[redraw,emote_,toast_]);

  // decay loop
  useEffect(()=>{
    const id=setInterval(()=>{
      if(feeding.current||G.current.active)return;
      setPet(p=>{
        const ng={...p,hunger:Math.max(0,p.hunger-1.2),happy:Math.max(0,p.happy-0.8),energy:Math.max(0,p.energy-0.5),lastActive:Date.now()};
        if(ng.sick){ng.hunger=Math.max(0,ng.hunger-0.5);ng.energy=Math.max(0,ng.energy-0.3);}
        sync(ng);autonomous(ng);return ng;
      });
    },1500);
    const ag=setInterval(()=>setPet(p=>{const ng={...p,age:p.age+1};savePS(ng);return ng;}),120000);
    return()=>{clearInterval(id);clearInterval(ag);};
  },[sync,autonomous]);

  // init
  useEffect(()=>{
    const g=petRef.current;redraw(moodSprite(g));sync(g);
    setTimeout(()=>{
      if(g.sick){emote_(">_<");toast_("KIBO is sick! Give medicine!");}
      else if(g.returnCoolness>=2){emote_("who?");toast_("KIBO seems distant...");}
      else if(g.returnCoolness===1){emote_("oh.");toast_("KIBO misses you a bit");}
      else{emote_("hi!!");toast_("KIBO is happy to see you!");}
    },600);
  // eslint-disable-next-line
  },[]);

  // actions
  function feedKibo(){if(cd("feed",petRef.current))return;setFoodOpen(true);}
  function confirmFeed(){if(!selFood){toast_("pick a food!");return;}setFoodOpen(false);throwFood(selFood);}

  function throwFood(food:typeof FOODS[0]){
    feeding.current=true;
    const scr=screenRef.current;if(!scr)return;
    const sx=6,sy=scr.clientHeight*.45,ex=88,ey=scr.clientHeight-36-28;
    const el=document.createElement("div");
    el.style.cssText=`position:absolute;font-size:14px;z-index:20;pointer-events:none;line-height:1;left:${sx}px;top:${sy}px;`;
    el.textContent=food.emoji;scr.appendChild(el);
    setAnim("idle");redraw("excited");
    const dur=550,t0=performance.now();
    function af(now:number){
      const t=Math.min((now-t0)/dur,1);
      const e=t<.5?2*t*t:-1+(4-2*t)*t;
      el.style.left=(sx+(ex-sx)*e)+"px";
      el.style.top=(sy+(ey-sy)*e-Math.sin(t*Math.PI)*35)+"px";
      el.style.transform=`rotate(${t*360}deg)`;
      if(t<1){requestAnimationFrame(af);return;}
      el.remove();setAnim("eat");redraw("eat");emote_("nom!");
      setPet(p=>{const ng=addXP(food.xp,{...p,hunger:cl(p.hunger+food.hunger),happy:cl(p.happy+food.happy),energy:cl(p.energy+food.energy),lastFeed:Date.now()});sync(ng);return ng;});
      toast_(food.emoji+" yummy! +"+food.xp+"xp");
      setTimeout(()=>{feeding.current=false;setAnim("idle");redraw(moodSprite(petRef.current));setMoodTxt("yummy!");},1100);
    }
    requestAnimationFrame(af);
  }

  function giveMed(){
    setMedOpen(false);
    setPet(p=>{const ng=addXP(20,{...p,sick:false,happy:cl(p.happy+10),energy:cl(p.energy+15)});sync(ng);return ng;});
    setAnim("bounce");redraw("excited");emote_("ugh!");setTimeout(()=>emote_("<3"),1000);
    toast_("KIBO feels better! +20xp");
    setTimeout(()=>{setAnim("idle");redraw(moodSprite(petRef.current));},1500);
  }

  function restKibo(){
    if(cd("rest",petRef.current))return;
    setPet(p=>{const ng=addXP(5,{...p,energy:cl(p.energy+35),lastRest:Date.now()});sync(ng);return ng;});
    emote_("zzz");toast_("+35 energy +5xp");setAnim("sleep");redraw("sleep");
    setTimeout(()=>{setAnim("idle");redraw(moodSprite(petRef.current));},2000);
  }

  function petKibo(){
    if(feeding.current||G.current.active)return;
    const g=petRef.current;
    if(CDS.pet-(Date.now()-g.lastPet)>0)return;
    setPet(p=>{
      if(p.returnCoolness>0){const ng={...p,returnCoolness:p.returnCoolness-1,lastPet:Date.now()};emote_(ng.returnCoolness>0?"...":"<3");if(ng.returnCoolness===0)toast_("KIBO warmed up!");savePS(ng);return ng;}
      const ng={...p,happy:cl(p.happy+8),lastPet:Date.now()};
      emote_(["<3","!!!","hehe","hi!",":)"][Math.floor(Math.random()*5)]);sync(ng);return ng;
    });
  }

  // ── GAME ────────────────────────────────────────────────────
  function startPlay(){
    if(cd("play",petRef.current))return;
    if(petRef.current.sick){toast_("Give medicine first!");return;}
    if(petRef.current.energy<15){emote_("zzz");toast_("too tired!");return;}
    setPet(p=>({...p,lastPlay:Date.now()}));
    const g=G.current;
    g.active=true;g.phase="throwing";g.kiboX=92;
    g.ball={x:92,y:10,vx:0,vy:0,r:5};g.catches=0;g.catchFlash=0;g.lastTime=performance.now();
    setCatchCnt(0);setGameMode(true);
    setGameMsg("TAP SCREEN\nTO THROW!");
    setTimeout(()=>setGameMsg(""),1800);
    requestAnimationFrame(loop);
  }

  const loop=useCallback((now:number)=>{
    const g=G.current;if(!g.active)return;
    const dt=Math.min((now-g.lastTime)/16,3);g.lastTime=now;
    const cv=gameRef2.current;if(!cv)return;
    const ctx=cv.getContext("2d")!;
    ctx.clearRect(0,0,SW,SH);

    // draw KIBO
    const ox=g.kiboX-20,oy=KY-10;
    if(g.catchFlash>0){g.catchFlash--;drawKibo(ctx,"catch",4,ox,oy);}
    else drawKibo(ctx,g.phase==="throwing"?"excited":"neutral",4,ox,oy);

    // trajectory dots
    if(g.phase==="throwing"){
      ctx.fillStyle="rgba(15,56,15,0.3)";
      let sy=10,svy=1.2;
      for(let i=0;i<12;i++){svy+=0.21;sy+=svy*3;if(sy>GROUND)break;ctx.beginPath();ctx.arc(g.kiboX,sy,2,0,Math.PI*2);ctx.fill();}
    }

    if(g.phase==="bouncing"){
      g.ball.vy+=0.07*dt;
      g.ball.x+=g.ball.vx*dt;g.ball.y+=g.ball.vy*dt;
      if(g.ball.x-g.ball.r<0){g.ball.x=g.ball.r;g.ball.vx=Math.abs(g.ball.vx)*.85;}
      if(g.ball.x+g.ball.r>SW){g.ball.x=SW-g.ball.r;g.ball.vx=-Math.abs(g.ball.vx)*.85;}
      if(g.ball.y-g.ball.r<0){g.ball.y=g.ball.r;g.ball.vy=Math.abs(g.ball.vy)*.7;}

      const kl=g.kiboX-KW/2-18,kr=g.kiboX+KW/2+18;
      if(g.ball.vy>0&&g.ball.y+g.ball.r>=KY&&g.ball.y+g.ball.r<=KY+18&&g.ball.x>kl&&g.ball.x<kr){
        g.catches++;g.catchFlash=8;g.ball.vy=-2.8;g.ball.vx=(Math.random()-.5)*1.2;g.ball.y=KY-g.ball.r-1;
        setCatchCnt(g.catches);emote_("nice!");
        if(g.catches>=MAX_C){gameWin();return;}
      }
      if(g.ball.y+g.ball.r>=GROUND){gameOver();return;}

      // shadow
      const ss=Math.max(.2,1-(g.ball.y/GROUND));
      ctx.fillStyle="rgba(15,56,15,0.2)";
      ctx.beginPath();ctx.ellipse(g.ball.x,GROUND-2,g.ball.r*2*ss,3*ss,0,0,Math.PI*2);ctx.fill();
    }

    // ball
    ctx.fillStyle="#0f380f";ctx.beginPath();ctx.arc(g.ball.x,g.ball.y,g.ball.r,0,Math.PI*2);ctx.fill();
    ctx.fillStyle="#9bbc0f";ctx.beginPath();ctx.arc(g.ball.x-1,g.ball.y-1.5,2,0,Math.PI*2);ctx.fill();
    // catch zone
    ctx.fillStyle="rgba(15,56,15,0.15)";ctx.fillRect(g.kiboX-KW/2,KY,KW,4);

    g.animId=requestAnimationFrame(loop);
  },[emote_]);

  function throwBall(e:React.MouseEvent|React.TouchEvent){
    const g=G.current;if(!g.active||g.phase!=="throwing")return;
    g.ball.x=g.kiboX;g.ball.y=10;g.ball.vx=(Math.random()-.5)*.8;g.ball.vy=1.2;g.phase="bouncing";setGameMsg("");
  }

  function moveGame(dir:number){const g=G.current;if(!g.active)return;g.kiboX=Math.max(20,Math.min(164,g.kiboX+dir*22));}
  function startMove(dir:number){stopMove();moveGame(dir);G.current.moveIv=setInterval(()=>moveGame(dir),50);}
  function stopMove(){if(G.current.moveIv){clearInterval(G.current.moveIv);G.current.moveIv=null;}}

  function gameWin(){
    const g=G.current;g.active=false;g.phase="idle";stopMove();if(g.animId)cancelAnimationFrame(g.animId);
    setGameMsg("🎉 AMAZING!\n"+MAX_C+" CATCHES!");
    setPet(p=>{const ng=addXP(50,{...p,happy:cl(p.happy+40),energy:Math.max(0,p.energy-15),hunger:Math.max(0,p.hunger-10)});sync(ng);return ng;});
    toast_("Perfect! +50xp 🎉");setTimeout(endGame,2600);
  }
  function gameOver(){
    const g=G.current;const c=g.catches;g.active=false;g.phase="idle";stopMove();if(g.animId)cancelAnimationFrame(g.animId);
    const cv=gameRef2.current;if(cv){const ctx=cv.getContext("2d")!;drawKibo(ctx,"sad",4,g.kiboX-20,KY-10);}
    setGameMsg("DROPPED!\n"+c+"/"+MAX_C);
    setPet(p=>{const ng=addXP(c*2,{...p,happy:cl(p.happy+c*2),energy:Math.max(0,p.energy-10)});sync(ng);return ng;});
    toast_(c>0?c+" catches! +"+(c*2)+"xp":"Ball dropped! Try again");setTimeout(endGame,2400);
  }
  function endGame(){
    G.current.active=false;setGameMode(false);
    setAnim(G.current.catches>=MAX_C?"bounce":"sad");redraw(moodSprite(petRef.current));setGameMsg("");
  }

  // touch on screen during game
  function onTouchStart(e:React.TouchEvent){
    if(!G.current.active)return;
    if(G.current.phase==="throwing"){throwBall(e);return;}
    drag.current={on:true,lx:e.touches[0].clientX};
  }
  function onTouchMove(e:React.TouchEvent){
    if(!G.current.active||!drag.current.on)return;
    e.preventDefault();
    const dx=e.touches[0].clientX-drag.current.lx;drag.current.lx=e.touches[0].clientX;
    G.current.kiboX=Math.max(20,Math.min(164,G.current.kiboX+dx*1.4));
  }
  function onTouchEnd(){drag.current.on=false;}

  // keyboard
  useEffect(()=>{
    const kd=(e:KeyboardEvent)=>{if(!G.current.active)return;if(e.key==="ArrowLeft"||e.key==="a")startMove(-1);if(e.key==="ArrowRight"||e.key==="d")startMove(1);};
    const ku=(e:KeyboardEvent)=>{if(["ArrowLeft","ArrowRight","a","d"].includes(e.key))stopMove();};
    window.addEventListener("keydown",kd);window.addEventListener("keyup",ku);
    return()=>{window.removeEventListener("keydown",kd);window.removeEventListener("keyup",ku);};
  // eslint-disable-next-line
  },[]);

  const g=pet;

  return(
    <>
      <style>{CSS}</style>
      <div className={"kp-wrap" + (embedded ? " embedded" : "")}>
        <div className="kp-dev">
          <div className="kp-ear kp-el"><div className="kp-eh"/></div>
          <div className="kp-ear kp-er"><div className="kp-eh"/></div>
          <div className="kp-brand">✦ K I B O ✦</div>

          <div className="kp-bz">
            <div className="kp-sc" ref={screenRef}
              onClick={gameMode?throwBall:undefined}
              onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
              {g.sick&&<div className="kp-sov"/>}
              <div className="kp-sun"/>
              <div className="kp-cl kp-ca"/><div className="kp-cl kp-cb"/>
              <div className="kp-gs" style={{left:4,width:4,height:8}}/>
              <div className="kp-gs" style={{left:10,width:4,height:6}}/>
              <div className="kp-gs" style={{right:6,width:4,height:8}}/>
              <div className="kp-gs" style={{right:14,width:4,height:5}}/>
              <div className="kp-gr"/>

              {!gameMode&&<>
                <div className="kp-pips">{pips.map((f,i)=><div key={i} className={"kp-pip"+(f?"":" e")}/>)}</div>
                <div className="kp-mt">{moodTxt}</div>
                <div className={"kp-sp "+anim} onClick={petKibo}>
                  <div className={"kp-em"+(emoteOn?" show":"")}>{emote}</div>
                  <canvas ref={kiboRef} width={40} height={52} style={{display:"block",imageRendering:"pixelated"}}/>
                </div>
                {zzz&&<div className="kp-zzz">z z z</div>}
              </>}

              {gameMode&&<>
                <canvas ref={gameRef2} width={SW} height={SH} className="kp-gc"/>
                <div className="kp-cc">{catchCnt}/{MAX_C}</div>
                {gameMsg&&<div className="kp-gm">{gameMsg}</div>}
                <div className={"kp-em"+(emoteOn?" show":"")} style={{bottom:54}}>{emote}</div>
              </>}

              <div className="kp-xp"><div className="kp-xpf" style={{width:xpPct+"%"}}/></div>
            </div>
          </div>

          <div className="kp-mid">
            <div className="kp-dp"><div className="kp-dh"/><div className="kp-dv"/><div className="kp-dc"/></div>
            <div>
              <button className="kp-bc" onClick={petKibo}/>
              <div className="kp-lv">LV {g.level}</div>
            </div>
            <div style={{fontSize:8,color:"#cc6090",textAlign:"right",lineHeight:1.8}}>
              <div>🔥{g.streak}</div>
              <div style={{fontSize:6,color:"#e890b0"}}>day {g.age}</div>
            </div>
          </div>

          {gameMode&&<div className="kp-ctrl">
            <button className="kp-cb2"
              onMouseDown={()=>startMove(-1)} onTouchStart={e=>{e.preventDefault();startMove(-1);}}
              onMouseUp={stopMove} onMouseLeave={stopMove} onTouchEnd={stopMove}>◀</button>
            <button className="kp-cb2"
              onMouseDown={()=>startMove(1)} onTouchStart={e=>{e.preventDefault();startMove(1);}}
              onMouseUp={stopMove} onMouseLeave={stopMove} onTouchEnd={stopMove}>▶</button>
          </div>}

          {!gameMode&&<div className="kp-acts">
            <button className="kp-act" onClick={feedKibo}><div className="kp-ai">🍎</div><div className="kp-al">FEED</div></button>
            <button className="kp-act" onClick={startPlay}><div className="kp-ai">⚽</div><div className="kp-al">PLAY</div></button>
            <button className="kp-act" onClick={restKibo}><div className="kp-ai">💤</div><div className="kp-al">REST</div></button>
            {g.sick&&<button className="kp-act" onClick={()=>setMedOpen(true)}><div className="kp-ai">💊</div><div className="kp-al">MEDS</div></button>}
          </div>}

          <div className="kp-bot">
            <div className="kp-pl">XP {g.xp}/{g.level*100}</div>
            <div className="kp-pl">{g.sick?"KIBO IS SICK!":"TAP KIBO ♥"}</div>
          </div>
        </div>
      </div>

      <div className={"kp-toast"+(toastOn?" on":"")}>{toast}</div>

      {foodOpen&&<div className="kp-fo" onClick={e=>{if(e.target===e.currentTarget)setFoodOpen(false);}}>
        <div className="kp-fp">
          <div className="kp-ft">WHAT TO FEED KIBO?</div>
          <div className="kp-fg">
            {FOODS.map(f=>(
              <div key={f.name} className={"kp-fi"+(selFood===f?" s":"")} onClick={()=>setSelFood(f)}>
                <div className="kp-fe">{f.emoji}</div>
                <div className="kp-fn">{f.name}</div>
                <div className="kp-fs"><div>hunger +{f.hunger}</div><div style={{color:"#3db74a"}}>+{f.xp}xp</div></div>
              </div>
            ))}
          </div>
          <button className="kp-fb" onClick={confirmFeed}>THROW IT! ▶</button>
          <button className="kp-fc" onClick={()=>setFoodOpen(false)}>cancel</button>
        </div>
      </div>}

      {medOpen&&<div className="kp-mo" onClick={e=>{if(e.target===e.currentTarget)setMedOpen(false);}}>
        <div className="kp-mp">
          <div className="kp-mt2">KIBO IS SICK!</div>
          <div style={{fontSize:32,margin:"8px 0"}}>💊</div>
          <div style={{fontSize:5,color:"#cc7090",lineHeight:1.8,marginBottom:12}}>Give medicine to help KIBO!</div>
          <button className="kp-mb" onClick={giveMed}>GIVE MEDS</button>
          <button className="kp-mc" onClick={()=>setMedOpen(false)}>later</button>
        </div>
      </div>}

      {luOpen&&<div className="kp-lo">
        <canvas ref={luRef} width={80} height={96} style={{marginBottom:16,imageRendering:"pixelated"}}/>
        <div className="kp-lt">{"LEVEL UP!\nLV "+g.level}</div>
        <button className="kp-lb2" onClick={()=>setLuOpen(false)}>CONTINUE ▶</button>
      </div>}
    </>
  );
}
