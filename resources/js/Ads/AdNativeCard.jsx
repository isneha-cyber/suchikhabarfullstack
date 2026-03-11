import React from 'react';

const AdNativeCard = () => (
  <div className="cursor-pointer group relative border border-[#ede8e2] hover:border-[#8B0000]/40 transition-all duration-300 bg-[#fff8f2]">
    <span className="absolute top-2 right-2 text-[0.42rem] tracking-[0.12em] uppercase text-[#a09488] bg-[#ede8e2] px-1.5 py-0.5 z-10 rounded-sm leading-none">Sponsored</span>
    <div className="w-full aspect-[3/2] bg-[#e8f0ff] flex items-center justify-center overflow-hidden p-4">
      <img 
        src="https://shuchikhabar.com/images/sait.gif" 
        alt="SAIT Nepal" 
        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
        onError={(e) => { e.currentTarget.src = 'https://picsum.photos/seed/sait_ad/400/267'; }}
      />
    </div>
    <div className="p-3">
      <div className="flex items-center gap-1.5 mb-1.5">
        <div className="w-4 h-4 bg-[#8B0000] flex items-center justify-center flex-shrink-0 rounded-sm">
          <span className="text-white text-[0.46rem] font-bold leading-none">S</span>
        </div>
        <span className="text-[0.56rem] text-[#a09488] font-medium">SAIT Nepal</span>
      </div>
      <p className="font-['Source_Serif_4'] text-[0.86rem] font-semibold leading-tight text-[#1c1711] group-hover:text-[#8B0000] transition-colors">
        IT सेवाहरूका लागि नेपालको भरपर्दो साझेदार
      </p>
      <p className="text-[0.56rem] text-[#a09488] mt-1">Software · Hardware · Networking</p>
    </div>
  </div>
);

export default AdNativeCard;