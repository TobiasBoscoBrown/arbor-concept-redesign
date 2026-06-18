/* Arbor concept redesign — BuildMyTribe. Lightweight vanilla JS. */
(function(){
  "use strict";
  var mem = {};
  var store = {
    get:function(k){ try{ return localStorage.getItem(k);}catch(e){ return mem[k]||null; } },
    set:function(k,v){ try{ localStorage.setItem(k,v);}catch(e){ mem[k]=v; } }
  };

  window.ARBOR_PRODUCTS = {
    "p1":{name:"Heritage Oak Engineered Flooring",cat:"Flooring",price:4.29,unit:"/sq ft",was:5.49,rating:5,tag:"Trade Price",icon:"floor",desc:"Wide-plank engineered oak with a 4mm wear layer and a matte, scratch-resistant finish. Floating click-lock install over most subfloors. Sold by the square foot, boxed and shipped to your door.",reviews:163},
    "p2":{name:"Brushed Brass Kitchen Faucet",cat:"Bath & Faucet",price:189,was:249,rating:5,tag:"Best Seller",tagGreen:true,icon:"faucet",desc:"Solid-brass body with a brushed, fingerprint-resistant finish and a pull-down spray head. Ceramic-disc cartridge rated for 500,000 cycles. Ships ready to install with all hardware and a lifetime finish warranty.",reviews:214},
    "p3":{name:"Matte Black Cabinet Pull Set (10)",cat:"Hardware",price:34,was:0,rating:4,tag:"",icon:"hardware",desc:"Set of ten solid-zinc cabinet pulls in a soft matte-black finish. 5-inch hole spacing with mounting screws included. A fast, high-impact upgrade for kitchens and baths.",reviews:88},
    "p4":{name:"Premium Interior Paint, Sage",cat:"Paint",price:42,was:0,rating:5,tag:"Low VOC",tagGreen:true,icon:"paint",desc:"Low-VOC interior paint and primer in one, in a soft heritage sage. Washable matte finish with excellent coverage. One gallon covers up to 400 square feet.",reviews:341},
    "p5":{name:"Cedar Raised Garden Bed Kit",cat:"Lawn & Garden",price:129,was:159,rating:5,tag:"",icon:"garden",desc:"Naturally rot-resistant western cedar raised bed. Tool-free corner brackets, a 4x4 footprint and 11 inches of depth. Ships flat and assembles in minutes.",reviews:57},
    "p6":{name:"Frameless LED Bathroom Mirror",cat:"Bath & Faucet",price:215,was:0,rating:4,tag:"New",icon:"mirror",desc:"Frameless wall mirror with built-in anti-fog LED lighting and a touch dimmer. Hardwired or plug-in, with vertical or horizontal mounting.",reviews:46},
    "p7":{name:"Soft-Close Drawer Slide Pair",cat:"Hardware",price:18,was:24,rating:5,tag:"",icon:"hardware",desc:"Pair of full-extension, soft-close ball-bearing drawer slides rated to 100 lbs. Side-mount, 18-inch length with screws included.",reviews:129},
    "p8":{name:"Luxury Vinyl Plank, Coastal Grey",cat:"Flooring",price:3.19,unit:"/sq ft",was:0,rating:5,tag:"Trade Price",icon:"floor",desc:"Waterproof rigid-core luxury vinyl plank in a weathered coastal grey. 20-mil wear layer with attached underlayment and a click-lock install. Sold by the square foot.",reviews:202}
  };

  var G='#045C3C', T='#D9772E';
  window.ARBOR_ICONS = {
    floor:'<svg viewBox="0 0 100 100" fill="none" stroke="'+G+'" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="14" y="26" width="32" height="14" rx="2"/><rect x="54" y="26" width="32" height="14" rx="2"/><rect x="30" y="44" width="32" height="14" rx="2"/><rect x="68" y="44" width="14" height="14" rx="2"/><rect x="14" y="62" width="32" height="14" rx="2"/><rect x="54" y="62" width="32" height="14" rx="2"/><path d="M22 33h6M62 33h6M38 51h6M22 69h6M62 69h6" stroke="'+T+'"/></svg>',
    faucet:'<svg viewBox="0 0 100 100" fill="none" stroke="'+G+'" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M30 70h40"/><path d="M38 70V52a12 12 0 0 1 12-12h14"/><path d="M64 34c4 0 6 3 6 6s-2 6-6 6"/><path d="M44 70v8M56 70v8" stroke="'+T+'"/><path d="M64 30v10" stroke="'+T+'"/></svg>',
    hardware:'<svg viewBox="0 0 100 100" fill="none" stroke="'+G+'" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><rect x="26" y="40" width="48" height="20" rx="10"/><circle cx="36" cy="50" r="3" stroke="'+T+'"/><circle cx="64" cy="50" r="3" stroke="'+T+'"/><path d="M30 60v6M70 60v6"/></svg>',
    paint:'<svg viewBox="0 0 100 100" fill="none" stroke="'+G+'" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><rect x="30" y="34" width="40" height="42" rx="3"/><path d="M30 44h40"/><path d="M44 34c0-5 12-5 12 0"/><path d="M62 40c8-3 12 0 12 6s-5 8-10 7" stroke="'+T+'"/></svg>',
    garden:'<svg viewBox="0 0 100 100" fill="none" stroke="'+G+'" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="22" y="52" width="56" height="22" rx="2"/><path d="M22 60h56"/><path d="M40 52c-2-12 4-20 10-22 2 10-2 18-10 22z" stroke="'+T+'"/><path d="M50 52c2-8 8-12 14-12-1 8-6 12-14 12z"/></svg>',
    mirror:'<svg viewBox="0 0 100 100" fill="none" stroke="'+G+'" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><rect x="32" y="20" width="36" height="60" rx="18"/><path d="M40 34c0-4 4-7 8-7" stroke="'+T+'"/></svg>'
  };

  function getCart(){ try{ return JSON.parse(store.get("arbor_cart")||"[]"); }catch(e){ return []; } }
  function saveCart(c){ store.set("arbor_cart", JSON.stringify(c)); updateBadge(); }
  function cartCount(){ return getCart().reduce(function(n,i){return n+i.qty;},0); }
  function updateBadge(){
    var n=cartCount();
    document.querySelectorAll(".cart-badge").forEach(function(b){ b.textContent=n; b.style.display=n>0?"flex":"none"; });
  }
  window.ArborCart = {
    add:function(id,qty){
      qty=qty||1; var c=getCart(), found=false;
      c.forEach(function(i){ if(i.id===id){ i.qty+=qty; found=true; } });
      if(!found) c.push({id:id,qty:qty});
      saveCart(c);
      var p=window.ARBOR_PRODUCTS[id];
      toast((p?p.name:"Item")+" added to cart");
    },
    seed:function(arr){ saveCart(arr); },           // silent (no toast)
    remove:function(id){ saveCart(getCart().filter(function(i){return i.id!==id;})); },
    setQty:function(id,qty){ var c=getCart(); c.forEach(function(i){ if(i.id===id) i.qty=Math.max(1,qty); }); saveCart(c); },
    get:getCart, count:cartCount
  };

  var toastEl;
  function toast(msg){
    if(!toastEl){ toastEl=document.createElement("div"); toastEl.className="toast"; document.body.appendChild(toastEl); }
    toastEl.textContent="✓  "+msg; toastEl.classList.add("show");
    clearTimeout(toastEl._t); toastEl._t=setTimeout(function(){ toastEl.classList.remove("show"); },2200);
  }
  window.arborToast = toast;

  function initReveal(){
    var els=document.querySelectorAll(".reveal");
    if(!("IntersectionObserver" in window)){ els.forEach(function(e){e.classList.add("in");}); return; }
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target); } });
    },{threshold:.12,rootMargin:"0px 0px -40px 0px"});
    els.forEach(function(e){ io.observe(e); });
  }
  function initMenu(){
    var t=document.querySelector(".menu-toggle"), m=document.querySelector(".mobile-menu");
    if(!t||!m) return;
    t.addEventListener("click",function(){ m.classList.add("open"); });
    var c=m.querySelector(".close"); if(c) c.addEventListener("click",function(){ m.classList.remove("open"); });
    m.querySelectorAll("a").forEach(function(a){ a.addEventListener("click",function(){ m.classList.remove("open"); }); });
  }
  function initAddButtons(){
    document.querySelectorAll("[data-add]").forEach(function(btn){
      btn.addEventListener("click",function(e){
        e.preventDefault();
        var id=btn.getAttribute("data-add"), qty=1, qEl=document.getElementById("qtyVal");
        if(btn.hasAttribute("data-usexqty")&&qEl) qty=parseInt(qEl.textContent,10)||1;
        window.ArborCart.add(id,qty);
      });
    });
  }
  document.addEventListener("DOMContentLoaded",function(){
    updateBadge(); initReveal(); initMenu(); initAddButtons();
    document.querySelectorAll("form[data-news]").forEach(function(f){
      f.addEventListener("submit",function(e){ e.preventDefault(); toast("Thanks! You're on the list."); f.reset(); });
    });
  });
})();
