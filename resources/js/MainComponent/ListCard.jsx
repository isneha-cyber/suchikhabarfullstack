import React from 'react';

const ListCard = ({ item, seed = 'list' }) => {
  const img = (src, seed) => ({
    src: src || `https://picsum.photos/seed/${seed}/400/267`,
    onError: (e) => { e.currentTarget.src = `https://picsum.photos/seed/${seed}/400/267`; },
  });

  return (
    <article className="flex gap-3 py-3 border-b border-[rgba(28,23,17,0.08)] last:border-b-0 cursor-pointer group">
      <div className="flex-shrink-0 overflow-hidden">
        <img {...img(item?.image, seed)} alt="" className="w-[86px] h-[60px] object-cover group-hover:scale-[1.04] transition-transform duration-500 block" />
      </div>
      <div className="min-w-0">
        <p className="text-[0.56rem] tracking-wider uppercase text-[#8B0000] font-medium leading-none mb-0.5">{item?.subcategory || item?.category || 'समाचार'}</p>
        <p className="font-['Source_Serif_4'] text-[0.84rem] font-semibold leading-snug group-hover:text-[#8B0000] transition-colors text-[#1c1711]">{item?.title}</p>
        <p className="text-[0.59rem] text-[#a09488] mt-1 leading-none">{item?.time}</p>
      </div>
    </article>
  );
};

export default ListCard;