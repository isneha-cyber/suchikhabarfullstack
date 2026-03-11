import React from 'react';

const AdSidebarBox = () => (
  <div className="cursor-pointer group relative">
    <span className="absolute top-1.5 right-1.5 text-[0.4rem] tracking-[0.12em] uppercase text-[#a09488] z-10 leading-none">Ad</span>
    <div className="border border-[#ede8e2] group-hover:border-[#1c1711]/20 transition-all duration-300 p-4 bg-white">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 bg-[#1c1711] flex items-center justify-center flex-shrink-0 rounded-sm">
          <span className="text-[#c9a84c] text-xs font-bold leading-none">W</span>
        </div>
        <div>
          <p className="text-[0.56rem] font-semibold text-[#1c1711] leading-tight">WorldLink Nepal</p>
          <p className="text-[0.46rem] text-[#a09488] leading-tight">Internet Service Provider</p>
        </div>
      </div>
      <div className="bg-[#f7f3ed] p-3 mb-3 text-center">
        <p className="font-['Playfair_Display'] text-base font-bold text-[#1c1711] leading-none">200 Mbps</p>
        <p className="text-[0.54rem] text-[#a09488] uppercase tracking-wide mt-0.5">Fiber Broadband</p>
        <p className="text-[#8B0000] font-bold text-sm mt-1.5 leading-none">रु. १,१९९/महिना</p>
      </div>
      <div className="flex flex-wrap gap-x-2 gap-y-1 text-[0.54rem] text-[#1c1711] font-medium mb-3">
        <span>✓ Unlimited</span><span>✓ 24/7 Support</span><span>✓ Free Setup</span>
      </div>
      <button className="w-full bg-[#8B0000] text-white text-[0.58rem] py-2 tracking-wider uppercase group-hover:bg-[#6b0000] transition-colors cursor-pointer border-none font-medium">
        अहिले जडान गर्नुहोस्
      </button>
    </div>
  </div>
);

export default AdSidebarBox;