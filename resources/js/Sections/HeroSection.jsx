import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HeroSection = ({ latestNews: propLatestNews = [] }) => {
  const [latestNews, setLatestNews] = useState(propLatestNews);
  const [loading, setLoading] = useState(!propLatestNews.length);

  useEffect(() => {
    // If no news were passed via props, fetch them directly
    if (!propLatestNews.length) {
      fetchLatestNews();
    }
  }, []);

  const fetchLatestNews = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/ournews'); // Your API endpoint
      if (response.data.status && response.data.data) {
        // Get latest 3 news
        const news = response.data.data.slice(0, 3);
        setLatestNews(news);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const mainNews = latestNews.length > 0 ? [latestNews[0]] : [];
  const secondaryMainNews = latestNews.slice(1, 3);


  console.log(latestNews)
  const SideStoryItem = ({ story, isLast }) => (
    <article
      className={`flex flex-col flex-1 cursor-pointer group overflow-hidden ${
        !isLast ? 'border-b border-[#ede8e2]' : ''
      }`}
      style={{ minHeight: 0 }}
      onClick={() => window.location.href = `/news/${story.slug}`}
    >
      <div className="flex-1 overflow-hidden min-h-0">
        <img
          src={`storage/${story.image}`}
          alt={story.heading || story.title}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 block"
        />

      </div>
      <div className="flex-shrink-0 p-3.5">
        <span className="text-[0.56rem] tracking-wider uppercase text-[#8B0000] font-medium leading-none block mb-1">
          {story.category || 'समाचार'}
        </span>
        <p className="font-['Source_Serif_4'] text-[0.86rem] font-semibold leading-snug text-[#1c1711] group-hover:text-[#8B0000] transition-colors">
          {story.heading || story.title}
        </p>
        <p className="text-[0.58rem] text-[#a09488] mt-1 leading-none">
          {story.published_at ? new Date(story.published_at).toLocaleDateString('ne-NP') : story.time}
        </p>
      </div>
    </article>
  );

  if (loading) {
    return <div className="pt-5 text-center">Loading news...</div>;
  }

  if (latestNews.length === 0) {
    return null;
  }

  return (
    <section className="pt-5">
      <div
        className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-0"
        style={{ background: '#ede8e2' }}
      >
        {/* Main Hero */}
        {mainNews.length > 0 && (
          <div
            className="relative overflow-hidden group cursor-pointer bg-[#1c1711] aspect-[16/10] lg:aspect-auto lg:h-full"
            style={{ minHeight: 0 }}
            onClick={() => window.location.href = `/news/${mainNews[0].slug}`}
          >
            <img
              src={`storage/${mainNews[0]?.image}`}
              alt={mainNews[0]?.heading}
              className="absolute inset-0 w-full h-full object-cover opacity-88 group-hover:scale-[1.03] group-hover:opacity-100 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(12,8,4,0.92)] via-[rgba(12,8,4,0.1)] to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 lg:p-7 text-white">
              <span className="inline-block bg-[#8B0000] text-[0.58rem] tracking-widest uppercase px-2.5 py-1 font-medium mb-2 leading-none">
                {mainNews[0]?.category || 'मुख्य समाचार'}
              </span>
              <h1 className="font-['Playfair_Display'] text-xl sm:text-2xl lg:text-[1.65rem] font-bold leading-tight mb-2 max-w-2xl">
                {mainNews[0]?.heading}
              </h1>
              <p className="text-[0.64rem] text-white/50 leading-none">
                {mainNews[0]?.blog_by || 'शुचि खबर संवाददाता'}&nbsp;·&nbsp;
                {mainNews[0]?.published_at ? new Date(mainNews[0].published_at).toLocaleDateString('ne-NP') : ''}
              </p>
            </div>
          </div>
        )}

        {/* Desktop Side Panel */}
        {secondaryMainNews.length > 0 && (
          <div className="hidden lg:flex flex-col h-full overflow-hidden">
            {secondaryMainNews.map((story, i, arr) => (
              <div key={story.id} className="flex-1 min-h-0 flex flex-col">
                <SideStoryItem story={story} isLast={i === arr.length - 1} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mobile: secondary stories stack below hero */}
      {secondaryMainNews.length > 0 && (
        <div className="lg:hidden grid grid-cols-2 gap-px">
          {secondaryMainNews.map((story, i, arr) => (
            <div key={story.id} className="">
              <SideStoryItem story={story} isLast={i === arr.length - 1} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default HeroSection;