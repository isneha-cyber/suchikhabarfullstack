import React from 'react';

const AdSportsBanner = () => (
  <div className="cursor-pointer group relative overflow-hidden aspect-[2/1]">
    <div className="absolute inset-0 bg-gradient-to-br from-[#0d1b2a] via-[#1a2a18] to-[#0e1a08]" />
    <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ backgroundImage: 'radial-gradient(ellipse at 25% 50%,#c9a84c 0%,transparent 55%)' }} />
    <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'linear-gradient(0deg,transparent 24%,rgba(255,255,255,.06) 25%,rgba(255,255,255,.06) 26%,transparent 27%),linear-gradient(90deg,transparent 24%,rgba(255,255,255,.06) 25%,rgba(255,255,255,.06) 26%,transparent 27%)', backgroundSize: '28px 28px' }} />
    <div className="relative h-full flex flex-col justify-center p-5">
      <span className="text-[0.48rem] tracking-[0.2em] text-[#c9a84c] uppercase font-medium mb-2">Sponsored · DishHome Nepal</span>
      <p className="font-['Playfair_Display'] text-xl font-bold text-white leading-tight mb-2">
        खेलकुद च्यानल हेर्नुहोस्<br />
        <span className="text-[#c9a84c]">DishHome</span> मा
      </p>
      <p className="text-white/40 text-[0.64rem] mb-3">२०० भन्दा बढी च्यानल — मासिक रु. ३९९</p>
      <span className="inline-flex items-center gap-2 text-[#c9a84c] text-[0.58rem] uppercase tracking-wider group-hover:gap-3 transition-all font-medium">
        अहिले जडान गर्नुहोस् →
      </span>
    </div>
    <span className="absolute top-2 right-2 text-[0.4rem] text-white/15 uppercase tracking-widest">विज्ञापन</span>
  </div>
);

export default AdSportsBanner;