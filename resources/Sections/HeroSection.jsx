import SideStoryCard from '@/MainComponent/SideStoryCard';
import React from 'react';

const HeroSection = () => {
  const mainNews = [
    {
      id: 1,
      title: '६७१ जना उम्मेदवारले बैंक तथा वित्तीय संस्थामा चुनावी खाता खोले',
      category: 'मुख्य',
      author: 'शुचि खबर संवाददाता',
      image: 'https://shuchikhabar.com/public/uploads/6993fee614d7a.jpg',
      time: '०४ फागुन २०८२, मंगलबार',
      url: '/news/671-jana',
    },
  ];

  const secondaryMainNews = [
    {
      id: 6,
      title: 'दाङमा तोरीखेतीको क्षेत्रफल र उत्पादन बढ्दै',
      category: 'कृषि',
      image: 'https://shuchikhabar.com/public/uploads/6993fdd82157a.jpg',
      time: '०४ फागुन २०८२',
      url: '/news/dang-tori',
    },
    {
      id: 7,
      title: 'बंगलादेशका प्रधानमन्त्रीको सपथ समारोहमा परराष्ट्रमन्त्री शर्मा सहभागी हुने',
      category: 'अन्तर्राष्ट्रिय',
      image: 'https://shuchikhabar.com/public/uploads/6992e059aaa83.jpg',
      time: '०३ फागुन २०८२',
      url: '/news/sharma-bangladesh',
    },
  ];

  const img = (src, seed) => ({
    src: src || `https://picsum.photos/seed/${seed}/400/267`,
    onError: (e) => {
      e.currentTarget.src = `https://picsum.photos/seed/${seed}/400/267`;
    },
  });

  return (
    <section className="pt-5">
      {/*
        Key fixes:
        1. The grid uses `grid-rows-1` so both columns share the same row height
        2. Side panel uses `h-full flex flex-col` — it stretches to exactly match the hero height
        3. Each SideStoryCard gets `flex-1 min-h-0` so they split the available space equally
           and never overflow or leave a gap
        4. The main hero image wrapper uses `aspect-[16/10]` on mobile (natural ratio),
           but on lg+ it drops aspect-ratio and uses `h-full` so it fills the grid row
      */}
      <div
        className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-0"
        style={{ background: '#ede8e2' }}
      >
        {/* ── Main Hero ─────────────────────────────────────────────────── */}
        <div
          className="relative overflow-hidden group cursor-pointer bg-[#1c1711] aspect-[16/10] lg:aspect-auto lg:h-full"
          style={{ minHeight: 0 }}
        >
          <img
            {...img(mainNews[0]?.image, 'hero_main')}
            alt={mainNews[0]?.title}
            className="absolute inset-0 w-full h-full object-cover opacity-88 group-hover:scale-[1.03] group-hover:opacity-100 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(12,8,4,0.92)] via-[rgba(12,8,4,0.1)] to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 lg:p-7 text-white">
            <span className="inline-block bg-[#8B0000] text-[0.58rem] tracking-widest uppercase px-2.5 py-1 font-medium mb-2 leading-none">
              {mainNews[0]?.category}
            </span>
            <h1 className="font-['Playfair_Display'] text-xl sm:text-2xl lg:text-[1.65rem] font-bold leading-tight mb-2 max-w-2xl">
              {mainNews[0]?.title}
            </h1>
            <p className="text-[0.64rem] text-white/50 leading-none">
              {mainNews[0]?.author}&nbsp;·&nbsp;{mainNews[0]?.time}
            </p>
          </div>
        </div>

        {/* ── Side Panel ────────────────────────────────────────────────── */}
        {/*
          hidden on mobile (shows below hero on mobile via a second block if needed),
          on lg: h-full so it matches the hero row height exactly,
          flex-col so cards stack vertically and fill all space
        */}
        <div className="hidden lg:flex flex-col h-full  overflow-hidden">
          {secondaryMainNews.slice(0, 2).map((story, i, arr) => (
            /*
              Pass flex-1 and min-h-0 via a wrapper so each card
              takes exactly 50% of the panel height — no gap at bottom
            */
            <div key={story.id} className="flex-1 min-h-0 flex flex-col">
              <SideStoryCard
                story={story}
                isLast={i === arr.length - 1}
                className="flex-1 min-h-0"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Mobile: secondary stories stack below hero ──────────────────── */}
      <div className="lg:hidden grid grid-cols-2 gap-px ">
        {secondaryMainNews.slice(0, 2).map((story, i, arr) => (
          <div key={story.id} className="">
            <SideStoryCard story={story} isLast={i === arr.length - 1} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;