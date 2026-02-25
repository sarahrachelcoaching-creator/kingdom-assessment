import { useState, useEffect, useRef } from "react";

const P = "#006400";
const GOLD = "#E88504";
const CREAM = "#FAF6F0";
const LIGHT = "#FEF3E2";
const ESPRESSO = "#4E342E";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Jost',sans-serif;background:${CREAM};}
.app{min-height:100vh;background:linear-gradient(160deg,#FAF6F0 0%,#FEF3E2 50%,#FAF6F0 100%);display:flex;flex-direction:column;align-items:center;padding:0 16px 60px;}
.hdr{width:100%;max-width:640px;text-align:center;padding:36px 0 20px;border-bottom:1px solid rgba(0,100,0,.15);margin-bottom:28px;}
.hdr-eye{font-size:10px;font-weight:500;letter-spacing:3px;text-transform:uppercase;color:${GOLD};margin-bottom:10px;}
.hdr-title{font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:600;color:#006400;line-height:1.2;margin-bottom:6px;}
.hdr-sub{font-size:12px;color:#4E342E;font-weight:300;opacity:.7;}
.chat{width:100%;max-width:640px;display:flex;flex-direction:column;gap:16px;}
.msg{display:flex;gap:10px;animation:fu .35s ease forwards;opacity:0;}
.msg.user{flex-direction:row-reverse;}
@keyframes fu{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.av{width:34px;height:34px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:14px;}
.av.s{background:#006400;color:#E88504;font-family:'Cormorant Garamond',serif;font-size:15px;}
.av.u{background:#006400;color:white;font-size:11px;font-weight:500;}
.bub{max-width:84%;padding:12px 16px;border-radius:4px;font-size:13.5px;line-height:1.75;font-weight:300;}
.bub.s{background:#FDF6EE;color:#2C1510;border:1px solid rgba(78,52,46,.2);border-top-left-radius:0;box-shadow:0 2px 16px rgba(0,0,0,.2);}
.bub.u{background:#4E342E;color:#FDF6EE;border-top-right-radius:0;}
.opts{width:100%;max-width:640px;display:flex;flex-direction:column;gap:7px;animation:fu .35s ease .15s forwards;opacity:0;margin-top:4px;}
.opt{background:white;border:1px solid rgba(78,52,46,.2);border-radius:4px;padding:11px 16px;text-align:left;cursor:pointer;font-family:'Jost',sans-serif;font-size:13px;font-weight:300;color:#4E342E;transition:all .2s;line-height:1.5;}
.opt:hover{border-color:#E88504;background:rgba(232,133,4,.15);color:#E88504;}
.qlabel{font-family:'Cormorant Garamond',serif;font-size:15px;font-style:italic;color:#4E342E;margin-bottom:10px;}
.qnum{font-size:11px;color:#4E342E;opacity:.6;margin-bottom:6px;}
.multi{width:100%;max-width:640px;animation:fu .35s ease .15s forwards;opacity:0;margin-top:4px;}
.mcat{font-size:10px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:#E88504;margin:14px 0 7px;}
.mgrid{display:flex;flex-direction:column;gap:6px;}
.mgrid2{display:grid;grid-template-columns:1fr 1fr;gap:6px;}
.chk{background:white;border:1px solid rgba(78,52,46,.2);border-radius:4px;padding:9px 13px;text-align:left;cursor:pointer;font-family:'Jost',sans-serif;font-size:12px;font-weight:300;color:#4E342E;transition:all .2s;display:flex;align-items:flex-start;gap:7px;line-height:1.5;}
.chk:hover{border-color:#E88504;background:rgba(232,133,4,.12);}
.chk.on{border-color:#E88504;background:rgba(232,133,4,.18);color:#E88504;}
.chkbox{width:13px;height:13px;border:1px solid rgba(78,52,46,.3);border-radius:2px;flex-shrink:0;margin-top:2px;display:flex;align-items:center;justify-content:center;font-size:9px;}
.chk.on .chkbox{background:#E88504;border-color:#E88504;color:white;}
.cont{background:#006400;color:white;border:none;border-radius:4px;padding:12px 26px;font-family:'Jost',sans-serif;font-size:12px;font-weight:400;letter-spacing:1px;cursor:pointer;transition:background .2s;margin-top:10px;}
.cont:hover{background:#004d00;}
.pbar{width:100%;max-width:640px;height:2px;background:rgba(255,255,255,.15);border-radius:2px;margin-bottom:6px;}
.pfill{height:100%;background:linear-gradient(90deg,#E88504,#006400);border-radius:2px;transition:width .5s ease;}
.plabel{width:100%;max-width:640px;font-size:10px;color:rgba(255,255,255,.4);font-weight:300;letter-spacing:1px;margin-bottom:20px;text-align:right;}
.typing{display:flex;gap:4px;padding:12px 16px;background:#FDF6EE;border:1px solid rgba(78,52,46,.2);border-radius:4px;border-top-left-radius:0;width:fit-content;box-shadow:0 2px 16px rgba(0,0,0,.2);}
.typing span{width:5px;height:5px;border-radius:50%;background:#4E342E;animation:bl 1.2s infinite;}
.typing span:nth-child(2){animation-delay:.2s;}
.typing span:nth-child(3){animation-delay:.4s;}
@keyframes bl{0%,80%,100%{opacity:.3;transform:scale(1)}40%{opacity:1;transform:scale(1.2)}}
.inrow{display:flex;gap:7px;width:100%;max-width:640px;margin-top:6px;animation:fu .35s ease .15s forwards;opacity:0;}
.txtin{flex:1;border:1px solid rgba(255,255,255,.2);border-radius:4px;padding:11px 15px;font-family:'Jost',sans-serif;font-size:13px;font-weight:300;color:#2C1510;background:#FDF6EE;outline:none;transition:border-color .2s;}
.txtin:focus{border-color:#E88504;}
.sndbtn{background:#E88504;color:white;border:none;border-radius:4px;padding:11px 18px;cursor:pointer;font-size:13px;transition:background .2s;}
.sndbtn:hover{background:#c97000;}
.rcard{background:#FDF6EE;border:1px solid rgba(78,52,46,.15);border-radius:4px;padding:28px;width:100%;max-width:640px;animation:fu .5s ease forwards;opacity:0;box-shadow:0 8px 32px rgba(0,0,0,.3);margin-top:24px;}
.rsec{margin-bottom:26px;padding-bottom:26px;border-bottom:1px solid rgba(78,52,46,.12);}
.rsec:last-child{border-bottom:none;margin-bottom:0;padding-bottom:0;}
.reye{font-size:10px;font-weight:500;letter-spacing:3px;text-transform:uppercase;color:#E88504;margin-bottom:7px;}
.rhead{font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:400;color:#006400;margin-bottom:9px;}
.rbody{font-size:13px;line-height:1.8;color:#4E342E;font-weight:300;}
.rlist{list-style:none;margin-top:9px;}
.rlist li{font-size:12.5px;color:#4E342E;font-weight:300;padding:3px 0 3px 15px;position:relative;line-height:1.6;}
.rlist li::before{content:'–';position:absolute;left:0;color:#E88504;}
.cost-box{background:#FEF3E2;border-left:3px solid #006400;padding:14px 16px;margin-top:10px;border-radius:0 4px 4px 0;}
.cost-n{font-family:'Cormorant Garamond',serif;font-size:26px;color:#006400;font-weight:600;}
.cost-l{font-size:10px;color:#999;font-weight:300;letter-spacing:1px;text-transform:uppercase;margin-top:2px;}
.nstar{background:linear-gradient(135deg,#006400 0%,#4E342E 100%);color:white;padding:18px 22px;border-radius:4px;margin-top:10px;}
.nstar-l{font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#E88504;margin-bottom:7px;}
.nstar-t{font-family:'Cormorant Garamond',serif;font-size:17px;font-weight:300;font-style:italic;line-height:1.5;}
.sgrid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px;}
.sitem{background:#FAF6F0;border:1px solid rgba(78,52,46,.1);border-radius:4px;padding:11px 13px;}
.sitem-l{font-size:9px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:#E88504;margin-bottom:3px;}
.sitem-v{font-size:12px;color:#4E342E;font-weight:300;line-height:1.5;}
.score-row{display:flex;justify-content:space-between;align-items:center;padding:5px 0;border-bottom:1px solid rgba(78,52,46,.08);}
.score-row:last-child{border-bottom:none;}
`;

// ── DATA ─────────────────────────────────────────────────────────────────────

const STATEMENTS = [
  "I always have extra money",
  "I can always afford everything I want and need",
  "I am great at saving and investing",
  "It's easy to take a financial leap when I feel called",
  "I trust money / I trust myself with money",
  "Money strongly supports me living my purpose",
  "I have all the extra time and energy I want",
  "I feel fulfilled and at ease most of the time",
  "Money comes in with ease — I receive it rather than strain for it",
];

const ANS_OPTS = [
  { label: "Consistently True", level: "Promised Land" },
  { label: "Sometimes True", level: "Borderland" },
  { label: "Rarely True", level: "Familiar" },
  { label: "Not At All", level: "Ordinary" },
];

const INCOME_OPTS = ["Under $3,000/month","$3,000–$5,000/month","$5,000–$8,000/month","$8,000–$12,000/month","$12,000–$20,000/month","$20,000+/month"];
const INCOME_NEXT_OPTS = ["$5,000–$8,000/month","$8,000–$12,000/month","$12,000–$20,000/month","$20,000–$30,000/month","$30,000+/month"];
const MONEY_OPTS = ["At zero or in the negative","Less than one month of expenses","1–3 months of expenses","3–6 months of expenses","6+ months — genuinely secure"];

const PATTERN_CATS = {
  Financial: ["An unexpected expense wipes it out","A tax bill or unexpected debt shows up","I undercharge or discount at the last minute","I give money away impulsively","I impulse spend or over-invest"],
  Family: ["Family conflict arises — spouse/partner","Family conflict arises — kids","Family conflict arises — extended family"],
  "Relationships/Social": ["A friendship suddenly becomes draining or falls apart","I start comparing myself to others and spiral","I withdraw or isolate"],
  "Physical/Health": ["A health issue shows up","I get injured","Sleep problems or exhaustion hit suddenly","Anxiety or panic shows up","I get sick or run down"],
  Spiritual: ["I start questioning if this is really God's will","I feel distant from God suddenly","Spiritual warfare feels heightened"],
  "Business/Work": ["A client suddenly becomes a problem","I lose a key team member or contractor","Tech breaks down or systems fail","A launch flops right after a win","I get overwhelmed with admin and busy work","I start chasing shiny objects or pivoting","I start overgiving or undercharging"],
  "Mental/Emotional": ["Imposter syndrome floods in","I freeze and stop taking action","I get hit with shame or old memories","I start numbing out — scrolling, Netflix, food, etc.","I get overwhelmed and slow down","I self-sabotage in some other way","I'm not sure — it just doesn't stick"],
};

const NON_MONEY = [
  { key: "ease", label: "Ease vs. Striving", opts: ["I mostly operate in ease","Ease and striving are about equal","I mostly operate in striving","Striving feels normal — ease feels unsafe"] },
  { key: "rest", label: "Rest & Margin", opts: ["I rest freely and consistently","I rest but feel guilty about it","I rarely allow myself to stop","Rest feels impossible or dangerous"] },
  { key: "fulfillment", label: "Fulfillment", opts: ["I consistently feel I'm living my calling","I feel it sometimes","I mostly feel like I'm just managing","I've lost touch with my calling"] },
  { key: "relational", label: "Relational Richness", opts: ["I feel deeply supported and seen","Somewhat supported","I give more than I receive","I feel isolated in my work"] },
];

const COST_OPTS = ["Financial provision for my family","Time and margin","Peace and ease in my daily life","Confidence in my calling","The generational pattern I want to break","My physical health","My sense of fulfillment","My relationship with God around money"];

const HB_CATS = [
  { key: "overworking", name: "Overworking", qs: ["Volunteering for multiple community roles despite having a busy home life","Helping friends and family with their problems, even when you're facing your own challenges","Hosting social gatherings, even though you're often too tired","Taking on all household chores, even when feeling completely overwhelmed","Helping with every school event, despite a packed schedule","Organizing family vacations, even when you desperately need a break","Maintaining multiple hobbies, despite having very little free time","Helping neighbors with tasks, regardless of your own pressing responsibilities","Overcommitting to religious activities, even when it means neglecting self-care","Keeping up with fitness routines, even when physically exhausted","Babysitting for friends, even when you really need personal time","Coaching kids' sports teams, despite managing a demanding schedule","Caring for elderly family members without help, regardless of your own responsibilities","Taking on extensive DIY projects, even when your time is already stretched thin","Continuously learning new skills, despite being overloaded with commitments"] },
  { key: "avoiding_judgment", name: "Avoiding Judgment", qs: ["Taking on additional responsibilities even when you already have enough on your plate","Dressing or presenting yourself in a way that feels socially acceptable rather than personal preference","Choosing a career path based on what's respected or admired rather than what excites you","Avoiding big decisions until you're sure others will approve","Changing your opinions or preferences to match the people around you","Keeping your home, car, or personal space at a certain standard to avoid negative comments","Feeling pressure to always be polite, agreeable, or easy to be around, even when it's exhausting","Attending social, work, or family events to avoid disappointing others","Over-explaining your choices","Offering to help others even when you don't have the capacity","Struggling to set boundaries because you don't want to seem selfish","Making purchases or lifestyle choices to maintain a specific image","Feeling guilty or anxious when others disapprove of your decisions","Holding back from expressing your true thoughts or needs","Apologizing or softening your words even when you haven't done anything wrong"] },
  { key: "seeking_validation", name: "Seeking Validation", qs: ["Feeling the urge to share personal milestones, even when it's not relevant to the conversation","Volunteering for visible roles or projects, even when it adds stress","Taking on the responsibility of hosting events, even when optional","Speaking up in groups even when there's no real need to","Stepping into leadership roles, even when it's not the easiest path","Choosing outfits that ensure you get noticed in a crowd","Finding ways to bring up achievements, even in casual conversations","Helping others in ways that make sure your generosity is seen","Posting online frequently, even when there's no specific reason to","Seeking out exclusive groups, not just for networking, but for status","Giving advice often, even when people haven't asked for it","Rushing to share new information to be the first to say it","Feeling angry or upset when accomplishments go unnoticed","Seeking recognition or awards, even when they hold little personal meaning","Making unique or bold choices, even when it's not necessary"] },
  { key: "avoiding_responsibility", name: "Avoiding Responsibility", qs: ["I often wait until the last minute to complete tasks, even when I have time to do them earlier","I tend to push off decisions, telling myself I'll figure it out later","I focus on enjoyable tasks or activities, even when I have more pressing responsibilities","I sometimes feel relieved when a responsibility is canceled or postponed","I frequently delay handling tasks that feel stressful or overwhelming","I put off conversations or decisions, hoping the situation will resolve itself","I find myself frequently shifting priorities, leaving some things unfinished","I sometimes rely on others to take the lead or handle responsibilities for me","I often tell myself I'll get to it later, but later keeps getting pushed back","I spend extra time on hobbies, entertainment, or distractions before tackling commitments","I prefer to wait until I feel ready before taking action on something important","I tend to avoid scheduling things too far in advance because I don't want to feel locked in","I often delay paperwork, financial planning, or important administrative tasks","I put off doctor's appointments, dental checkups, or personal care tasks, even when I know they're overdue","When I finally take action, I often wonder why I put it off for so long"] },
];

const SP_DESC = {
  "Ordinary": "Your nervous system doesn't yet know that more is possible for you. You're not striving toward a ceiling — you haven't yet seen the ceiling. The good news is everything is about to shift.",
  "Familiar": "You've built something real — but your nervous system is keeping you in the Land of Familiar. It feels safe here. It feels known. And that safety is exactly what's keeping you from the next level.",
  "Borderland": "You can see it. You know what's possible. You've probably even touched it. But something keeps pulling you back. You're right at the edge — and that's actually the most important place to be.",
  "Promised Land": "You've crossed over in a lot of ways — but you haven't yet taken full possession of what's yours. There's more available than what you're currently receiving.",
};

const HB_DESC = {
  overworking: "Your nervous system has learned that staying busy keeps you safe. If you're always working, you're always worthy. The problem is it's also keeping the ceiling exactly where it is.",
  avoiding_judgment: "Your nervous system is protecting you from being seen. Because if you receive more — more money, more visibility, more success — more people are watching. And that feels dangerous.",
  seeking_validation: "Your nervous system is keeping you just dependent enough on external approval that you can't fully trust your own receiving. You need someone else to say it's okay before you let it in.",
  avoiding_responsibility: "Your nervous system has learned that having more means being responsible for more. And somewhere deep down, that feels like more than you want to carry.",
};

const HB_NAME = { overworking: "Overworking", avoiding_judgment: "Avoiding Judgment", seeking_validation: "Seeking Validation", avoiding_responsibility: "Avoiding Responsibility" };

const NM_LABELS = { ease: "Ease vs. Striving", rest: "Rest & Margin", fulfillment: "Fulfillment", relational: "Relational Richness" };

const INCOME_VAL = {
  "Under $3,000/month": 2000,
  "$3,000–$5,000/month": 4000,
  "$5,000–$8,000/month": 6500,
  "$8,000–$12,000/month": 10000,
  "$12,000–$20,000/month": 16000,
  "$20,000+/month": 22000,
  "$20,000–$30,000/month": 25000,
  "$30,000+/month": 32000,
};

const fmt = (n) => "$" + n.toLocaleString();

function getSetPoint(t) {
  const order = ["Ordinary","Familiar","Borderland","Promised Land"];
  let best = "Ordinary", bestVal = -1;
  for (const l of order) { if ((t[l]||0) >= bestVal) { bestVal = t[l]||0; best = l; } }
  // tie goes lower — already handled by iterating ascending
  return best;
}

function getHB(scores) {
  let best = "overworking", bestVal = -1;
  for (const [k,v] of Object.entries(scores)) { if (v > bestVal) { bestVal = v; best = k; } }
  return best;
}

// ── MULTI-SELECT COMPONENT ────────────────────────────────────────────────────

function MultiCat({ cats, onContinue }) {
  const [sel, setSel] = useState([]);
  const toggle = (x) => setSel(p => p.includes(x) ? p.filter(i=>i!==x) : [...p,x]);
  return (
    <div className="multi">
      {Object.entries(cats).map(([cat, items]) => (
        <div key={cat}>
          <div className="mcat">{cat}</div>
          <div className="mgrid">
            {items.map(item => (
              <button key={item} className={`chk ${sel.includes(item)?"on":""}`} onClick={()=>toggle(item)}>
                <div className="chkbox">{sel.includes(item)?"✓":""}</div>
                {item}
              </button>
            ))}
          </div>
        </div>
      ))}
      <button className="cont" onClick={()=>onContinue(sel)}>Continue →</button>
    </div>
  );
}

function MultiFlatCat({ items, onContinue }) {
  const [sel, setSel] = useState([]);
  const toggle = (x) => setSel(p => p.includes(x) ? p.filter(i=>i!==x) : [...p,x]);
  return (
    <div className="multi">
      <div className="mgrid">
        {items.map(item => (
          <button key={item} className={`chk ${sel.includes(item)?"on":""}`} onClick={()=>toggle(item)}>
            <div className="chkbox">{sel.includes(item)?"✓":""}</div>
            {item}
          </button>
        ))}
      </div>
      <button className="cont" onClick={()=>onContinue(sel)}>Continue →</button>
    </div>
  );
}

function HBSelect({ cat, onContinue }) {
  const [checked, setChecked] = useState({});
  const toggle = (q) => setChecked(p => ({...p,[q]:!p[q]}));
  const score = Object.values(checked).filter(Boolean).length;
  return (
    <div className="multi">
      <div style={{fontSize:10,fontWeight:500,letterSpacing:2,textTransform:"uppercase",color:GOLD,marginBottom:10}}>{cat.name} — does this feel familiar?</div>
      <div className="mgrid">
        {cat.qs.map(q => (
          <button key={q} className={`chk ${checked[q]?"on":""}`} onClick={()=>toggle(q)}>
            <div className="chkbox">{checked[q]?"✓":""}</div>
            {q}
          </button>
        ))}
      </div>
      <button className="cont" onClick={()=>onContinue(score)}>Continue → ({score} selected)</button>
    </div>
  );
}

// ── RESULTS ───────────────────────────────────────────────────────────────────

function Results({ name, tallies, hbScores, incomeCeiling, incomeNext, patterns, moneyOnHand, northStar, nonMoney, costItems }) {
  const sp = getSetPoint(tallies);
  const hb = getHB(hbScores);
  const cur = INCOME_VAL[incomeCeiling]||0;
  const nxt = INCOME_VAL[incomeNext]||0;
  const annual = Math.max(0,(nxt-cur)*12);
  const decade = annual*10;

  return (
    <div className="rcard">
      <div style={{textAlign:"center",marginBottom:24,paddingBottom:24,borderBottom:"1px solid rgba(0,100,0,.07)"}}>
        <div className="reye">Your Assessment Results</div>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:24,fontWeight:300,color:P,marginBottom:4}}>{name}</div>
        <div style={{fontSize:11,color:"#bbb"}}>{new Date().toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})}</div>
      </div>

      <div className="rsec">
        <div className="reye">Kingdom Abundance Set Point</div>
        <div className="rhead">{sp} Set Point</div>
        <div className="rbody">{SP_DESC[sp]}</div>
      </div>

      <div className="rsec">
        <div className="reye">Primary Hidden Benefit</div>
        <div className="rhead">{HB_NAME[hb]}</div>
        <div className="rbody">{HB_DESC[hb]}</div>
        <div style={{marginTop:12}}>
          {HB_CATS.map(cat => {
            const s = hbScores[cat.key]||0;
            const imp = s<=5?"Low Impact":s<=10?"Moderate Impact":"High Impact";
            const isPrim = cat.key===hb;
            return (
              <div key={cat.key} className="score-row">
                <span style={{fontSize:12,color:isPrim?P:"#999",fontWeight:isPrim?500:300}}>{cat.name}</span>
                <span style={{fontSize:11,color:isPrim?GOLD:"#bbb",fontWeight:isPrim?500:300}}>{s}/15 · {imp}</span>
              </div>
            );
          })}
        </div>
        <div style={{fontSize:13,fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",color:"#4E342E",marginTop:12,lineHeight:1.7}}>
          This isn't a character flaw. This is your nervous system doing exactly what it was designed to do — protecting you based on old data. The data just needs to be renewed.
        </div>
      </div>

      <div className="rsec">
        <div className="reye">Financial Set Point</div>
        <div className="rhead">Household Income Ceiling</div>
        <div className="rbody">{incomeCeiling}</div>
        <div className="reye" style={{marginTop:14}}>Consistent Money on Hand</div>
        <div className="rbody">{moneyOnHand}</div>
        {patterns.length>0&&<>
          <div className="reye" style={{marginTop:14}}>When You Exceed Your Ceiling</div>
          <ul className="rlist">{patterns.map(p=><li key={p}>{p}</li>)}</ul>
        </>}
      </div>

      <div className="rsec">
        <div className="reye">The Real Reason You're Here</div>
        <div className="nstar">
          <div className="nstar-l">What this is really about</div>
          <div className="nstar-t">"{northStar}"</div>
        </div>
      </div>

      <div className="rsec">
        <div className="reye">Non-Money Set Points</div>
        <div className="sgrid">
          {Object.entries(nonMoney).map(([k,v])=>(
            <div key={k} className="sitem">
              <div className="sitem-l">{NM_LABELS[k]}</div>
              <div className="sitem-v">{v}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="rsec">
        <div className="reye">The Real Cost</div>
        <div className="sgrid" style={{marginBottom:12}}>
          <div className="sitem"><div className="sitem-l">Current Ceiling</div><div className="sitem-v">{incomeCeiling}</div></div>
          <div className="sitem"><div className="sitem-l">Realistic Next Level</div><div className="sitem-v">{incomeNext}</div></div>
        </div>
        <div className="cost-box">
          <div className="cost-n">{fmt(annual)}</div>
          <div className="cost-l">Annual cost of your current set point</div>
          <div style={{marginTop:10}}>
            <div className="cost-n">{fmt(decade)}</div>
            <div className="cost-l">Over a decade</div>
          </div>
        </div>
        {costItems.length>0&&<>
          <div className="reye" style={{marginTop:14}}>Beyond Money, This Is Costing You</div>
          <ul className="rlist">{costItems.map(c=><li key={c}>{c}</li>)}</ul>
        </>}
      </div>

      <div className="rsec">
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,lineHeight:1.9,color:"#4E342E"}}>
          You are not stuck because you lack strategy, faith, or effort. You are stuck because your Receptive Nervous System is doing exactly what it was programmed to do — keeping you at the level it learned was safe.
          <br/><br/>
          Romans 12:2 says be transformed by the renewing of your mind. Not positive thinking. Actual renewal of the subconscious belief that has been generating these results.
          <br/><br/>
          That's the work. And it's available to you now.
        </div>
      </div>

      <div className="rsec" style={{background:"linear-gradient(135deg,#006400 0%,#004d00 100%)",borderRadius:6,padding:"28px 24px",margin:"0 -4px"}}>
        <div style={{fontSize:10,fontWeight:500,letterSpacing:3,textTransform:"uppercase",color:"#E88504",marginBottom:10}}>Your Next Step</div>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,fontWeight:300,color:"white",marginBottom:14,lineHeight:1.4}}>
          What we just did — that's the map.
        </div>
        <div style={{fontSize:13,lineHeight:1.85,color:"rgba(255,255,255,0.85)",fontWeight:300,marginBottom:20}}>
          Inside <strong style={{color:"white",fontWeight:500}}>Renew & Receive™</strong> we take you all the way to the root memory where your hidden benefit was formed and invite Jesus to speak truth into it there. That's where the subconscious actually changes. That's where Romans 12:2 — <em style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15}}>be transformed by the renewing of your mind</em> — actually happens.
          <br/><br/>
          It's 90 days. We do the deep work together. And on the other side, the ceiling lifts — not because you pushed harder, but because your nervous system finally learned it's safe to receive.
        </div>
        <div style={{fontSize:12,color:"rgba(255,255,255,0.6)",fontStyle:"italic",fontFamily:"'Cormorant Garamond',serif",fontSize:14,borderTop:"1px solid rgba(255,255,255,0.15)",paddingTop:16,marginTop:4}}>
          The question isn't whether this is real. You just saw it in your own answers. The question is whether you're ready to stop bumping that ceiling.
        </div>
        <div style={{marginTop:20}}>
          <div style={{fontSize:12,color:"rgba(255,255,255,0.7)",marginBottom:12,fontWeight:300}}>This is an application process — not everyone is accepted. If you feel ready, apply below.</div>
          <a href="https://www.kingdomalignment.academy/renew-receive" target="_blank" rel="noopener noreferrer" style={{display:"inline-block",background:"#E88504",color:"white",padding:"13px 28px",borderRadius:4,fontFamily:"'Jost',sans-serif",fontSize:12,fontWeight:500,letterSpacing:"1.5px",textTransform:"uppercase",textDecoration:"none",transition:"background .2s"}}>Apply for Renew & Receive™</a>
        </div>
      </div>

      <div style={{textAlign:"center",paddingTop:16}}>
        <div style={{fontSize:10,fontWeight:500,letterSpacing:3,textTransform:"uppercase",color:"#E88504",marginBottom:6}}>Kingdom Alignment Academy</div>
      </div>
    </div>
  );
}

// ── MAIN ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [msgs, setMsgs] = useState([]);
  const [typing, setTyping] = useState(false);
  const [phase, setPhase] = useState("init");
  const [ui, setUi] = useState(null);
  const [nameInput, setNameInput] = useState("");

  // answers
  const [name, setName] = useState("");
  const [tallies, setTallies] = useState({"Ordinary":0,"Familiar":0,"Borderland":0,"Promised Land":0});
  const [aIdx, setAIdx] = useState(0);
  const [northStar, setNorthStar] = useState(null);
  const [incomeCeil, setIncomeCeil] = useState(null);
  const [patterns, setPatterns] = useState([]);
  const [moneyHand, setMoneyHand] = useState(null);
  const [nonMoney, setNonMoney] = useState({});
  const [nmIdx, setNmIdx] = useState(0);
  const [incNext, setIncNext] = useState(null);
  const [costItems, setCostItems] = useState([]);
  const [hbScores, setHbScores] = useState({overworking:0,avoiding_judgment:0,seeking_validation:0,avoiding_responsibility:0});
  const [hbIdx, setHbIdx] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const bottom = useRef(null);

  useEffect(() => { bottom.current?.scrollIntoView({behavior:"smooth"}); }, [msgs, ui, typing, showResults]);

  const say = (text, delay=0) => new Promise(res => setTimeout(()=>{ setMsgs(p=>[...p,{text,from:"s",id:Date.now()+Math.random()}]); res(); }, delay));
  const wait = (ms=1100) => new Promise(res=>{ setTyping(true); setTimeout(()=>{setTyping(false);res();},ms); });
  const userSay = (text) => setMsgs(p=>[...p,{text,from:"u",id:Date.now()+Math.random()}]);

  // boot
  useEffect(()=>{
    (async()=>{
      await say("I'm so glad you're here. This is part conversation, part experience. Just answer honestly — first instinct is always the truest data.", 400);
      await wait(900);
      await say("Let's start with your name. What should I call you?");
      setPhase("name");
    })();
  },[]);

  const handleName = async () => {
    if (!nameInput.trim()) return;
    const n = nameInput.trim().split(" ")[0];
    setName(n); userSay(nameInput.trim()); setNameInput(""); setUi(null);
    await wait(700); await say(`Beautiful. Welcome, ${n}.`);
    await wait(1000);
    await say("Before we begin, I want to invite God into this conversation — because He is not an add-on to what we're doing here. He is the whole thing.");
    await wait(1000);
    await say("Here's a suggested prayer — feel free to use your own words:");
    await wait(1200);
    await say("\"God, I invite You into this conversation right now. I ask that You would be present in everything that surfaces today — every answer, every pattern, every number. Give me eyes to see clearly what You already see. And where there has been a ceiling that was never Your limit for me, begin to move. I submit this time to You. In Jesus' name, amen.\"");
    await wait(1000);
    await say("When you're done praying, type Next to continue.");
    setPhase("prayer");
  };

  const handlePrayer = async (val) => {
    if (val.trim().toLowerCase() !== "next") return;
    userSay("Next"); setNameInput(""); setUi(null);
    await wait(700); await say("I'm going to read you nine statements. For each one just tell me — consistently true, sometimes true, rarely true, or not at all. First reaction, don't overthink it.");
    await wait(500);
    setPhase("abundance"); setAIdx(0);
    setUi({ type:"abundance", idx:0 });
  };

  const handleAbundance = async (opt) => {
    const level = ANS_OPTS.find(o=>o.label===opt).level;
    userSay(opt); setUi(null);
    setTallies(p=>({...p,[level]:p[level]+1}));
    const nextIdx = aIdx+1;
    if (nextIdx < STATEMENTS.length) {
      setAIdx(nextIdx); setUi({type:"abundance",idx:nextIdx});
    } else {
      await wait(800);
      await say("Good. Of those nine statements — which single one do you most want to be consistently true? The one that gets closest to the real reason you're here.");
      setUi({type:"northstar"});
    }
  };

  const handleNorthStar = async (opt) => {
    setNorthStar(opt); userSay(opt); setUi(null);
    await wait(700); await say("Hold onto that. That's the real reason you're here.");
    await wait(900); await say("Now let's get specific about your ceiling. This is your total household income — if you include your spouse or partner's income as your own, factor that in.");
    setUi({type:"single", opts:INCOME_OPTS, next:"incomeceiling"});
  };

  const handleSingle = async (opt, next) => {
    userSay(opt); setUi(null);
    if (next==="incomeceiling") {
      setIncomeCeil(opt);
      await wait(700); await say("And when you exceed that number — what does your nervous system do to pull you back? Select everything that feels familiar.");
      setUi({type:"multicat"});
    } else if (next==="moneyhand") {
      setMoneyHand(opt);
      await wait(700); await say("Your abundance set point isn't just about money. Let's look at the full picture.");
      setNmIdx(0); setUi({type:"nonmoney",idx:0});
    } else if (next==="incnext") {
      setIncNext(opt);
      const cur = INCOME_VAL[incomeCeil]||0;
      const nxt = INCOME_VAL[opt]||0;
      const ann = Math.max(0,(nxt-cur)*12);
      const dec = ann*10;
      await wait(800); await say(`That's ${fmt(ann)} every year your current set point is costing you. Over a decade — ${fmt(dec)}.`);
      await wait(900); await say("Beyond money — what is staying here costing you? Select everything that applies.");
      setUi({type:"costflat"});
    }
  };

  const handleNonMoney = async (opt) => {
    const key = NON_MONEY[nmIdx].key;
    setNonMoney(p=>({...p,[key]:opt})); userSay(opt); setUi(null);
    const nextIdx = nmIdx+1;
    if (nextIdx < NON_MONEY.length) {
      setNmIdx(nextIdx); await wait(400); setUi({type:"nonmoney",idx:nextIdx});
    } else {
      await wait(800); await say("Let's do some quick math. What's your realistic next income level — not your dream number, your next level.");
      setUi({type:"single",opts:INCOME_NEXT_OPTS,next:"incnext"});
    }
  };

  const handlePatterns = async (sel) => {
    setPatterns(sel); userSay(sel.length>0?`${sel.length} pattern${sel.length!==1?"s":""} selected`:"None selected"); setUi(null);
    await wait(700); await say("And how much extra money do you consistently have on hand? Not last month — the consistent number.");
    setUi({type:"single",opts:MONEY_OPTS,next:"moneyhand"});
  };

  const handleCostItems = async (sel) => {
    setCostItems(sel); userSay(sel.length>0?`${sel.length} item${sel.length!==1?"s":""} selected`:"None selected"); setUi(null);
    await wait(900); await say("Last set of questions — and these are different. I'm going to read statements and just ask if they feel familiar. If it takes more than three seconds, or you need to ask a clarifying question, that's a yes.");
    await wait(700); await say("Group 1 of 4.");
    setHbIdx(0); setUi({type:"hb",idx:0});
  };

  const handleHB = async (score) => {
    const cat = HB_CATS[hbIdx];
    setHbScores(p=>({...p,[cat.key]:score}));
    userSay(`${score} of 15 felt familiar`); setUi(null);
    const nextIdx = hbIdx+1;
    if (nextIdx < HB_CATS.length) {
      setHbIdx(nextIdx); await wait(500); await say(`Group ${nextIdx+1} of 4.`); setUi({type:"hb",idx:nextIdx});
    } else {
      await wait(1100); await say("I've been taking notes this whole time. Let me show you what I see.");
      await wait(1400); setShowResults(true); setPhase("done");
    }
  };

  // progress
  const prog = ()=>{
    if (phase==="init"||phase==="name") return 2;
    if (phase==="abundance") return 5 + (aIdx/9)*20;
    if (ui?.type==="northstar") return 27;
    if (ui?.next==="incomeceiling") return 32;
    if (ui?.type==="multicat") return 40;
    if (ui?.next==="moneyhand") return 46;
    if (ui?.type==="nonmoney") return 50+(nmIdx/4)*10;
    if (ui?.next==="incnext") return 63;
    if (ui?.type==="costflat") return 70;
    if (ui?.type==="hb") return 74+(hbIdx/4)*20;
    if (phase==="done") return 100;
    return 0;
  };
  const progLabel = ()=>{
    if (phase==="name") return "Getting started";
    if (phase==="abundance"||ui?.type==="northstar") return "Abundance Inventory";
    if (ui?.next==="incomeceiling"||ui?.type==="multicat"||ui?.next==="moneyhand") return "Financial Set Point";
    if (ui?.type==="nonmoney") return "Non-Money Set Points";
    if (ui?.next==="incnext"||ui?.type==="costflat") return "The Real Cost";
    if (ui?.type==="hb") return `Hidden Benefit Assessment — Group ${hbIdx+1} of 4`;
    if (phase==="done") return "Complete";
    return "";
  };

  const renderUI = () => {
    if (!ui) return null;
    if (ui.type==="abundance") {
      return (
        <div className="opts">
          <div className="qnum">{ui.idx+1} of {STATEMENTS.length}</div>
          <div className="qlabel">{STATEMENTS[ui.idx]}</div>
          {ANS_OPTS.map(o=><button key={o.label} className="opt" onClick={()=>handleAbundance(o.label)}>{o.label}</button>)}
        </div>
      );
    }
    if (ui.type==="northstar") {
      return (
        <div className="opts">
          {STATEMENTS.map(s=><button key={s} className="opt" onClick={()=>handleNorthStar(s)}>{s}</button>)}
        </div>
      );
    }
    if (ui.type==="single") {
      return (
        <div className="opts">
          {ui.opts.map(o=><button key={o} className="opt" onClick={()=>handleSingle(o,ui.next)}>{o}</button>)}
        </div>
      );
    }
    if (ui.type==="nonmoney") {
      const nm = NON_MONEY[ui.idx];
      return (
        <div className="opts">
          <div style={{fontSize:10,fontWeight:500,letterSpacing:2,textTransform:"uppercase",color:GOLD,marginBottom:8}}>{nm.label}</div>
          {nm.opts.map(o=><button key={o} className="opt" onClick={()=>handleNonMoney(o)}>{o}</button>)}
        </div>
      );
    }
    if (ui.type==="multicat") return <MultiCat cats={PATTERN_CATS} onContinue={handlePatterns} />;
    if (ui.type==="costflat") return <MultiFlatCat items={COST_OPTS} onContinue={handleCostItems} />;
    if (ui.type==="hb") return <HBSelect cat={HB_CATS[ui.idx]} onContinue={handleHB} />;
    return null;
  };

  return (
    <>
      <style>{css}</style>
      <div className="app">
        <div className="hdr">
          <div className="hdr-eye">Kingdom Alignment Academy</div>
          <div className="hdr-title">Kingdom Abundance Assessment</div>
          <div className="hdr-sub">A personal clarity experience with Sarah Rachel</div>
        </div>

        {phase!=="init" && (
          <>
            <div className="pbar" style={{width:"100%",maxWidth:640}}><div className="pfill" style={{width:prog()+"%"}} /></div>
            <div className="plabel">{progLabel()}</div>
          </>
        )}

        <div className="chat">
          {msgs.map(m=>(
            <div key={m.id} className={`msg ${m.from==="u"?"user":""}`}>
              <div className={`av ${m.from==="s"?"s":"u"}`}>{m.from==="s"?"S":name?name[0].toUpperCase():"Y"}</div>
              <div className={`bub ${m.from==="s"?"s":"u"}`}>{m.text}</div>
            </div>
          ))}
          {typing && (
            <div className="msg">
              <div className="av s">S</div>
              <div className="typing"><span/><span/><span/></div>
            </div>
          )}
        </div>

        {phase==="name" && (
          <div className="inrow">
            <input className="txtin" placeholder="Your name..." value={nameInput} onChange={e=>setNameInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleName()} autoFocus />
            <button className="sndbtn" onClick={handleName}>→</button>
          </div>
        )}
        {phase==="prayer" && (
          <div className="inrow">
            <input className="txtin" placeholder="Type Next when ready..." value={nameInput} onChange={e=>setNameInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handlePrayer(nameInput)} autoFocus />
            <button className="sndbtn" onClick={()=>handlePrayer(nameInput)}>→</button>
          </div>
        )}

        {renderUI()}

        {showResults && (
          <Results
            name={name} tallies={tallies} hbScores={hbScores}
            incomeCeiling={incomeCeil} incomeNext={incNext}
            patterns={patterns} moneyOnHand={moneyHand}
            northStar={northStar} nonMoney={nonMoney} costItems={costItems}
          />
        )}

        <div ref={bottom} />
      </div>
    </>
  );
}
