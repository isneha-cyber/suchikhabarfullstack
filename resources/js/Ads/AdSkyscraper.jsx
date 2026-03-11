import React from 'react';

const AdSkyscraper = () => (
  <div className="cursor-pointer group relative overflow-hidden">
    <span className="absolute top-2 left-2 text-[0.42rem] text-white/45 uppercase tracking-widest z-10 bg-black/20 px-1.5 py-0.5">विज्ञापन</span>
    <div className="w-full bg-gradient-to-b from-[#8B0000] via-[#9a0000] to-[#6b0000] flex flex-col items-center justify-between p-5 text-white gap-4" style={{ paddingTop: '2.5rem', paddingBottom: '1.5rem' }}>
      <div className="text-center">
        <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-3">
          <span className="font-['Playfair_Display'] text-xl font-bold text-[#c9a84c]">N</span>
        </div>
        <p className="text-[0.54rem] tracking-[0.2em] uppercase text-red-200 mb-1">NIC Asia Bank</p>
        <p className="font-['Playfair_Display'] text-lg font-bold leading-tight">बचत खाता खोल्नुहोस्</p>
      </div>
      <div className="w-full h-px bg-white/15" />
      <div className="text-center w-full">
        <p className="text-[0.68rem] text-white/65 leading-relaxed mb-3">७.५% सम्म व्याजदर<br />नेपालभरका शाखाहरूमा</p>
        <div className="bg-[#c9a84c] text-[#1c1711] text-[0.62rem] px-4 py-2 font-semibold tracking-wide uppercase group-hover:bg-[#e0be6e] transition-colors w-full text-center cursor-pointer">
          अहिले सम्पर्क गर्नुहोस्
        </div>
      </div>
    </div>
  </div>
);

export default AdSkyscraper;