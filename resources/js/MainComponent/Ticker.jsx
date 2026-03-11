import React, { useState } from 'react';

const Ticker = () => {
  const [tickerPause, setTickerPause] = useState(false);
  
  const TICKER = [
    '६७१ जना उम्मेदवारले बैंक तथा वित्तीय संस्थामा चुनावी खाता खोले',
    'नेपाल र स्कटल्यान्डको क्रिकेट खेल आज हुँदैछ',
    'आचारसंहिता उल्लंघनमा निर्वाचन आयोगको कारबाही',
    'तारिक रहमान बंगलादेशका नयाँ प्रधानमन्त्री',
    '९ अर्ब ३५ करोड रूपैयाँ लगानी गर्दै राष्ट्र बैंक',
    'पेट्रोलियम पदार्थको मूल्य बढ्यो',
    'टी–२० विश्वकपः भारत सुपर ८ मा',
  ];

  return (
    <>
      <style>
        {`
          @keyframes ticker {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
      <div
        className="bg-[#1c1711] text-[#f0ece6] text-[0.67rem] tracking-wide overflow-hidden flex items-center select-none"
        style={{ height: '30px' }}
        onMouseEnter={() => setTickerPause(true)}
        onMouseLeave={() => setTickerPause(false)}
      >
        <span className="bg-[#8B0000] text-white font-semibold px-3 h-full flex items-center whitespace-nowrap uppercase tracking-widest text-[0.6rem] flex-shrink-0">
          ताजा
        </span>
        <div className="overflow-hidden flex-1 h-full flex items-center">
          <div
            className="flex gap-10 whitespace-nowrap"
            style={{ animation: tickerPause ? 'none' : 'ticker 36s linear infinite' }}
          >
            {[...TICKER, ...TICKER].map((t, i) => (
              <span key={i} className="hover:text-[#c9a84c] transition-colors cursor-default">• {t}</span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Ticker;