import React from 'react';

const NewsCard = ({ item, seed = 'card' }) => {
  const img = (src, seed) => ({
    src: src || `https://picsum.photos/seed/${seed}/400/267`,
    onError: (e) => { e.currentTarget.src = `https://picsum.photos/seed/${seed}/400/267`; },
  });

  return (
    <article className="cursor-pointer group">
      <div className="overflow-hidden">
        <img {...img(item?.image, seed)} alt={item?.title || ''} className="w-full aspect-[3/2] object-cover group-hover:scale-[1.04] transition-transform duration-500 block" />
      </div>
      <div className="pt-2">
        <p className="text-[0.6rem] tracking-wider uppercase text-[#8B0000] font-medium leading-none mb-1">{item?.category || 'समाचार'}</p>
        <p className="font-['Source_Serif_4'] text-[0.875rem] font-semibold leading-snug text-[#1c1711] group-hover:text-[#8B0000] transition-colors">{item?.title}</p>
        <p className="text-[0.62rem] text-[#a09488] mt-1 leading-none">{item?.time}</p>
      </div>
    </article>
  );
};

export default NewsCard;