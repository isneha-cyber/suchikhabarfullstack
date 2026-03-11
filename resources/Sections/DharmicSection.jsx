import React from 'react';

const DharmicSection = () => {
  const dharmic = [
    { id: 30, title: 'महाशिवरात्रिमा पशुपतिनाथ मन्दिरमा विशेष पूजाआजा', image: 'https://shuchikhabar.com/public/uploads/6994008ef3755.jpg', subcategory: 'धार्मिक', time: '०४ फागुन' },
    { id: 31, title: 'लुम्बिनीमा बुद्ध जयन्तीको तयारी सुरु, विदेशी भक्तजन आउने', image: 'https://picsum.photos/seed/dh2s/200/140', subcategory: 'धार्मिक', time: '०३ फागुन' },
    { id: 32, title: 'पशुपतिमा नागा बाबासहित साधुसन्त, हजारौं दर्शनार्थी', image: 'https://shuchikhabar.com/public/uploads/6994008ef3755.jpg', subcategory: 'धार्मिक', time: '०४ फागुन' },
  ];

  const img = (src, seed) => ({
    src: src || `https://picsum.photos/seed/${seed}/200/140`,
    onError: (e) => { e.currentTarget.src = `https://picsum.photos/seed/${seed}/200/140`; },
  });

  return (
    <div>
      <p className="font-['Playfair_Display'] text-[0.88rem] font-bold border-b-2 border-[#1c1711] pb-2 mb-3 leading-none">धार्मिक</p>
      {dharmic.map((item, i) => (
        <div key={item.id} className="flex gap-2.5 py-2.5 border-b border-[rgba(28,23,17,0.07)] last:border-b-0 cursor-pointer group">
          <div className="flex-shrink-0 overflow-hidden">
            <img {...img(item.image, `dh_${i}`)} alt="" className="w-[76px] h-[54px] object-cover group-hover:scale-[1.04] transition-transform duration-500 block" />
          </div>
          <p className="font-['Source_Serif_4'] text-[0.77rem] font-semibold leading-snug group-hover:text-[#8B0000] transition-colors text-[#1c1711]">
            {item.title}
          </p>
        </div>
      ))}
    </div>
  );
};

export default DharmicSection;