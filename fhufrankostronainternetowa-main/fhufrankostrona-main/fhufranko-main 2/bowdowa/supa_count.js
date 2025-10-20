/* Licznik z Supabase (active=true) – podmienia tylko badge "XX busów" */
(function(){
  const ready=(fn)=>(document.readyState==="complete"||document.readyState==="interactive")?setTimeout(fn,50):document.addEventListener("DOMContentLoaded",()=>setTimeout(fn,50),{once:true});
  const onAds=()=>location.pathname.toLowerCase().includes("ogloszenia");
  ready(()=>{
    if(!onAds()) return;
    const ENV=window.ENV||{}; const URL=ENV.SUPABASE_URL; const KEY=ENV.SUPABASE_ANON_KEY; const TABLE=ENV.SUPABASE_TABLE||"ogloszenia";
    const findBadge=()=>{
      const hdr=[...document.querySelectorAll("h1,h2,h3")].find(h=>(h.textContent||"").toLowerCase().includes("busy i samochody"));
      if(hdr){ const nb=[hdr,...(hdr.parentElement?hdr.parentElement.querySelectorAll("*"):[])]; const m=[...nb].find(n=>/\d+\s*bus(ów|y)/i.test((n.textContent||"").trim())); if(m) return m; }
      return [...document.querySelectorAll("span,div,strong,em,button")].find(n=>/\d+\s*bus(ów|y)/i.test((n.textContent||"").trim()))||null;
    };
    const update=(cnt)=>{ const el=findBadge(); if(!el) return; el.textContent=(el.textContent||"").replace(/\d+\s*bus(ów|y)/i,`${cnt} busów`); };
    const fetchCount=()=>{
      if(!URL||!KEY){ update(0); return; }
      const ep=URL.replace(/\/$/,"")+"/rest/v1/"+encodeURIComponent(TABLE)+"?active=eq.true&select=id";
      fetch(ep,{headers:{apikey:KEY,Authorization:"Bearer "+KEY,Prefer:"count=exact"},cache:"no-store"})
        .then(async r=>{ const cr=r.headers.get("Content-Range"); if(cr&&/\/\d+/.test(cr)){ const m=cr.match(/\/(\d+)/); update(m?parseInt(m[1],10):0); } else { const d=r.ok?await r.json():[]; update(Array.isArray(d)?d.length:0);} })
        .catch(()=>update(0));
    };
    fetchCount();
    const mo=new MutationObserver(()=>fetchCount());
    mo.observe(document.documentElement,{childList:true,subtree:true});
  });
})();
