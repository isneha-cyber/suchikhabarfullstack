import React from 'react';

const VideoSection = () => {
  const img = (src, seed) => ({
    src: src || `https://picsum.photos/seed/${seed}/400/225`,
    onError: (e) => { e.currentTarget.src = `https://picsum.photos/seed/${seed}/400/225`; },
  });

  return (
    <div>
      <p className="font-['Playfair_Display'] text-[0.88rem] font-bold border-b-2 border-[#1c1711] pb-2 mb-3 leading-none">भिडियो</p>
      <div className="relative aspect-video overflow-hidden cursor-pointer group bg-[#1c1711]">
        <img {...img('https://picsum.photos/seed/suchi_vid1/400/225', 'vid1')} alt="" className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity block" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 bg-[#8B0000] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3" /></svg>
          </div>
        </div>
      </div>
      <p className="font-['Source_Serif_4'] text-[0.82rem] font-semibold leading-snug cursor-pointer hover:text-[#8B0000] transition-colors text-[#1c1711] mt-2">
        महाशिवरात्रि: पशुपतिनाथमा विशेष पूजाको दृश्य
      </p>
      <p className="text-[0.58rem] text-[#a09488] mt-1 leading-none">२ घन्टा अगाडि · ०८:४५</p>
    </div>
  );
};

export default VideoSection;