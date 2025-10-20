/* Bezpieczny render z Supabase – nie dotyka SPA, działa na "/" i "/ogloszenia" */
(function(){
  const ready = (fn)=> (document.readyState==="complete"||document.readyState==="interactive") ? setTimeout(fn,0) : document.addEventListener("DOMContentLoaded",fn,{once:true});
  const onPath = () => {
    const p = location.pathname.toLowerCase();
    return p === "/" || p.includes("ogloszenia");
  };
  ready(()=>{
    if(!onPath()) return;
    const ENV=window.ENV||{};
    const URL=ENV.SUPABASE_URL, KEY=ENV.SUPABASE_ANON_KEY, TABLE=ENV.SUPABASE_TABLE||"ogloszenia";
    const main=document.querySelector("main")||document.body;
    let root=document.getElementById("supa-ads-root");
    if(!root){ root=document.createElement("section"); root.id="supa-ads-root"; root.style.margin="16px 0"; main.prepend(root); }
    const render=(arr=[])=>{
      if(!arr.length){ root.textContent="nie ma jeszcze żadnych ogłoszeń"; return; }
      root.innerHTML=arr.map(it=>{
        const t=it.title??it.tytul??"Ogłoszenie";
        const d=it.description??it.opis??"";
        const p=it.price??it.cena??"";
        const img=it.image??it.zdjecie??"";
        return `<article style="border:1px solid #eee;border-radius:12px;padding:12px;margin:8px 0;display:flex;gap:12px;align-items:flex-start">
          ${img?`<img src="${img}" alt="" style="width:140px;height:100px;object-fit:cover;border-radius:8px">`:""}
          <div><h3 style="margin:0 0 6px 0;font-size:1.05rem">${t}</h3>
          ${d?`<p style="margin:0 0 6px 0">${d}</p>`:""}${p?`<div style="font-weight:600">${p}</div>`:""}</div>
        </article>`;
      }).join("");
    };
    if(!URL||!KEY){ render([]); return; }
    const endpoint = URL.replace(/\/$/,"")+`/rest/v1/${encodeURIComponent(TABLE)}?select=*,title,description,price,image,active,created_at&active=eq.true&order=created_at.desc`;
    fetch(endpoint,{headers:{apikey:KEY,Authorization:"Bearer "+KEY,"Content-Type":"application/json"},cache:"no-store"})
      .then(r=>r.ok?r.json():[])
      .then(a=>{
        const yes=v=>v===true||v==="true";
        const real=(Array.isArray(a)?a:[]).filter(x=>{
          const t=String((x.title||x.tytul||"")).toLowerCase();
          return !(yes(x.mock)||yes(x.isMock)||yes(x.fake)||yes(x.test)||t.includes("mock"));
        });
        render(real);
      })
      .catch(()=>render([]));
  });
})();
