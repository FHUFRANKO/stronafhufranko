/* Agresywne, ale bezpieczne ukrycie siatki mocków na /ogloszenia */
(function(){
  const isAds=()=>location.pathname.toLowerCase().includes("ogloszenia");
  const looksCard=(el)=>{const t=(el.textContent||"").toLowerCase(); return /(pln|zł|km|rocznik|szczegóły)/.test(t)&&(el.querySelector("img")||el.querySelector("picture"));};
  const hideOnce=()=>{
    if(!isAds()) return false;
    // celuj po przycisku „Szczegóły”
    const ctas=[...document.querySelectorAll("a,button")].filter(n=>(n.textContent||"").trim().toLowerCase().includes("szczegóły"));
    const score=new Map();
    ctas.forEach(btn=>{
      let n=btn;
      for(let i=0;i<8&&n&&n!==document.body;i++){
        n=n.parentElement; if(!n) break;
        const kids=[...n.children];
        const manyCards = kids.length>=3 && kids.filter(looksCard).length>=3;
        const manyCtas = [...n.querySelectorAll("a,button")].filter(x=>(x.textContent||"").trim().toLowerCase().includes("szczegóły")).length>=3;
        if(manyCards||manyCtas){ score.set(n,(score.get(n)||0)+1); }
      }
    });
    // fallback
    document.querySelectorAll("main section,main div,main ul").forEach(box=>{
      const kids=[...box.children];
      if(kids.length>=6 && kids.filter(looksCard).length>=6){ score.set(box,(score.get(box)||0)+1); }
    });
    if(!score.size) return false;
    const best=[...score.entries()].sort((a,b)=>b[1]-a[1])[0][0];
    best.style.setProperty("display","none","important");
    best.setAttribute("data-hidden-by","supa-hide");
    return true;
  };
  const start=()=>{
    let tries=0; const max=70; const iv=setInterval(()=>{ if(hideOnce()||++tries>=max) clearInterval(iv); },300);
    const mo=new MutationObserver(()=>hideOnce());
    mo.observe(document.documentElement,{childList:true,subtree:true});
  };
  if(document.readyState==="complete"||document.readyState==="interactive") setTimeout(start,0);
  else document.addEventListener("DOMContentLoaded",start,{once:true});
})();
