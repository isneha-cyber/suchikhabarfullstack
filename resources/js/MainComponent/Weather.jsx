import React from 'react';

const Weather = () => (
  <div>
    <div className="bg-[#1c1711] text-[#fdfcfb] px-4 py-3.5 flex items-center justify-between">
      <div>
        <p className="text-[0.58rem] tracking-[0.16em] uppercase text-white/38 leading-none mb-1.5">काठमाडौं</p>
        <p className="font-['Playfair_Display'] text-4xl font-light leading-none">14°</p>
        <p className="text-[0.66rem] text-white/48 mt-1.5 leading-none">धुम्मिलो</p>
      </div>
      <div className="text-right">
        <span className="text-3xl">🌥</span>
        <p className="text-[0.52rem] text-white/28 mt-1 leading-none">AQI: 245</p>
      </div>
    </div>
    <div className="grid grid-cols-3 bg-[#110f0a] text-white">
      {[['बिहान','11°','☁️'],['दिउँसो','17°','⛅'],['बेलुका','13°','🌙']].map(([t,d,e], i) => (
        <div key={i} className={`text-center py-2 ${i < 2 ? 'border-r border-white/10' : ''}`}>
          <p className="text-[0.5rem] text-white/30 uppercase tracking-wide leading-none mb-1">{t}</p>
          <p className="text-sm leading-none mb-0.5">{e}</p>
          <p className="text-[0.62rem] font-semibold leading-none">{d}</p>
        </div>
      ))}
    </div>
  </div>
);

export default Weather;