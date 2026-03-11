import React from 'react';

const SideStoryCard = ({ story, isLast }) => {
  const img = (src, seed) => ({
    src: src || `https://picsum.photos/seed/${seed}/400/267`,
    onError: (e) => { e.currentTarget.src = `https://picsum.photos/seed/${seed}/400/267`; },
  });

  return (
    <article
      className={`flex flex-col flex-1 cursor-pointer group overflow-hidden ${!isLast ? 'border-b border-[#ede8e2]' : ''}`}
      style={{ minHeight: 0 }}
    >
      <div className="flex-1 overflow-hidden min-h-0">
        <img
          {...img(story.image, `side_${story.id}`)}
          alt={story.title}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 block"
        />
      </div>
      <div className="flex-shrink-0 p-3.5">
        <span className="text-[0.56rem] tracking-wider uppercase text-[#8B0000] font-medium leading-none block mb-1">{story.category}</span>
        <p className="font-['Source_Serif_4'] text-[0.86rem] font-semibold leading-snug text-[#1c1711] group-hover:text-[#8B0000] transition-colors">{story.title}</p>
        <p className="text-[0.58rem] text-[#a09488] mt-1 leading-none">{story.time}</p>
      </div>
    </article>
  );
};

export default SideStoryCard;