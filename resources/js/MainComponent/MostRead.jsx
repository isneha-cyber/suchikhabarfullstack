import React from 'react';

const MostRead = () => {
  const mostRead = [
    { id: 45, title: '६७१ जना उम्मेदवारले बैंक तथा वित्तीय संस्थामा चुनावी खाता खोले' },
    { id: 46, title: 'नेपाल र स्कटल्यान्डको क्रिकेट खेलमा नेपाल विजयी' },
    { id: 47, title: 'आचारसंहिता उल्लंघनमा सञ्चारमाध्यमलाई कारबाहीको निर्देशन' },
    { id: 48, title: 'पशुपतिमा साधुसन्त बिदाइ समारोह, हजारौं भक्त सहभागी' },
    { id: 49, title: 'दाङमा तोरीखेतीको क्षेत्रफल र उत्पादन बढ्दै' },
  ];

  return (
    <div>
      <p className="font-['Playfair_Display'] text-[0.88rem] font-bold border-b-2 border-[#1c1711] pb-2 mb-3 leading-none">सर्वाधिक पढिएको</p>
      {mostRead.map((item, i) => (
        <div key={item.id} className="flex items-start gap-3 py-2.5 border-b border-[rgba(28,23,17,0.07)] last:border-b-0 cursor-pointer group">
          <span className="font-['Playfair_Display'] text-[1.5rem] font-bold text-[#ddb8b8] leading-none w-5 flex-shrink-0 text-right mt-0.5">{i+1}</span>
          <p className="font-['Source_Serif_4'] text-[0.8rem] leading-snug font-semibold group-hover:text-[#8B0000] transition-colors text-[#1c1711]">
            {item.title}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MostRead;