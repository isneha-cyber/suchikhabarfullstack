import React, { useEffect, useState } from 'react';

const fb = (src, seed) => ({ 
  src: src || `https://picsum.photos/seed/${seed}/400/267`, 
  onError: (e) => { 
    e.currentTarget.src = `https://picsum.photos/seed/${seed}/400/267`; 
  } 
});

const fbSm = (src, seed) => ({ 
  src: src || `https://picsum.photos/seed/${seed}/200/140`, 
  onError: (e) => { 
    e.currentTarget.src = `https://picsum.photos/seed/${seed}/200/140`; 
  } 
});

const Badge = ({ label, color = '#1c4587' }) => (
  <span className="inline-block text-white text-[0.5rem] tracking-widest uppercase px-2 py-0.5 leading-none font-semibold" style={{ background: color }}>{label}</span>
);

const MukhyaSection = ({ category = null }) => {
  const [news, setNews] = useState([]);
  const [breakingNews, setBreakingNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featured, setFeatured] = useState(null);
  const [restNews, setRestNews] = useState([]);
  const [squareBanners, setSquareBanners] = useState([]);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  useEffect(() => {
    fetchNews();
    fetchSquareBanners();
  }, [category]);

  // Rotate banners every 5 seconds if there are multiple banners
  useEffect(() => {
    if (squareBanners.length > 1) {
      const interval = setInterval(() => {
        setCurrentBannerIndex((prevIndex) => 
          prevIndex === squareBanners.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [squareBanners]);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await fetch('/ournews');
      const data = await response.json();
      
      if (data.status && data.data) {
        let filteredNews = data.data;
        
        if (category) {
          filteredNews = filteredNews.filter(item => item.category === category);
        }
        
        setNews(filteredNews);
        
        if (filteredNews.length > 0) {
          const [first, ...remaining] = filteredNews;
          setFeatured(first);
          setRestNews(remaining);
        }
      }
      
      if (data.data && data.data.length > 0) {
        const breaking = data.data.slice(0, 3).map(item => item.heading);
        setBreakingNews(breaking);
      }
      
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSquareBanners = async () => {
    try {
      const response = await fetch('/banner');
      const data = await response.json();
      
      if (data.success && data.data) {
        // Filter only square banners
        const squares = data.data.filter(banner => banner.category === 'Square');
        setSquareBanners(squares);
      }
    } catch (error) {
      console.error('Error fetching banners:', error);
    }
  };

  const handleBannerClick = () => {
    if (squareBanners[currentBannerIndex]?.link) {
      window.open(squareBanners[currentBannerIndex].link, '_blank');
    }
  };

  const handleNewsClick = (slug) => {
    window.location.href = `/news/${slug}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#1c4587] border-r-transparent"></div>
          <p className="mt-2 text-gray-600">लोड हुँदैछ...</p>
        </div>
      </div>
    );
  }

  if (!featured) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600">कुनै समाचार उपलब्ध छैन</p>
      </div>
    );
  }

  console.log(featured);

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Source+Serif+4:wght@400;600&display=swap');`}</style>

      {/* ── Breaking ticker ── */}
      <div className="bg-[#1c4587] flex items-center overflow-hidden">
        <span className="bg-[#8B0000] text-white text-[0.54rem] tracking-widest uppercase px-3 py-2 flex-shrink-0 font-bold">ब्रेकिङ</span>
        <div className="flex items-center px-4 py-2 overflow-hidden">
          <p className="text-white text-[0.72rem] truncate">
            {breakingNews[0] || 'नवीनतम समाचार'}
          </p>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-12 py-7">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
          <div>
            {/* ── Featured story ── */}
            <article 
              className="group cursor-pointer mb-8"
              onClick={() => handleNewsClick(featured.slug)}
            >
              <div className="relative overflow-hidden aspect-[21/9] bg-[#1c1711]">
                <img 
                  src={`storage/${featured.image}`}
                  alt={featured.heading} 
                  className="w-full h-full object-cover opacity-85 group-hover:scale-[1.02] transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(12,8,4,0.88)] via-[rgba(12,8,4,0.1)] to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 text-white">
                  <Badge label={featured.category || 'समाचार'} />
                  <h2 className="font-['Playfair_Display'] text-xl sm:text-[1.6rem] font-bold leading-tight mt-2 mb-1.5 max-w-2xl">
                    {featured.heading}
                  </h2>
                  <p className="text-[0.68rem] text-white/55 line-clamp-2 max-w-xl">
                    {featured.description?.replace(/<[^>]*>/g, '').substring(0, 150)}...
                  </p>
                  <p className="text-[0.56rem] text-white/35 mt-2">
                    {featured.published_at ? new Date(featured.published_at).toLocaleDateString('ne-NP') : ''}
                  </p>
                </div>
              </div>
            </article>

            {/* ── Grid of cards ── */}
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-[3px] h-5 rounded-sm bg-[#1c4587]" />
              <h2 className="font-['Playfair_Display'] text-[1.05rem] font-bold text-[#1c1711]">ताजा समाचार</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {restNews.slice(0, 3).map((n, i) => (
                <article 
                  key={n.id} 
                  className="group cursor-pointer flex flex-col bg-white hover:shadow-md transition-shadow duration-300"
                  onClick={() => handleNewsClick(n.slug)}
                >
                  <div className="relative overflow-hidden aspect-[3/2] flex-shrink-0">
                    <img 
                      src={`storage/${n.image}`} 
                      alt={n.heading} 
                      className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500" 
                    />
                    <div className="absolute top-2 left-2">
                      <Badge label={n.category || 'समाचार'} />
                    </div>
                  </div>
                  <div className="p-3 flex flex-col flex-1">
                    <h3 className="font-['Playfair_Display'] text-[0.88rem] font-bold leading-snug text-[#1c1711] group-hover:text-[#1c4587] transition-colors flex-1">
                      {n.heading}
                    </h3>
                    <p className="text-[0.64rem] text-[#a09488] mt-1.5 line-clamp-2">
                      {n.description?.replace(/<[^>]*>/g, '').substring(0, 100)}...
                    </p>
                    <p className="text-[0.54rem] text-[#c0b8b0] mt-2">
                      {n.published_at ? new Date(n.published_at).toLocaleDateString('ne-NP') : ''}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            {/* ── List view (commented out but fixed for future use) ── */}
           <div className="flex items-center gap-2.5 mb-4">
  <div className="w-[3px] h-5 rounded-sm bg-[#1c4587]" />
  <h2 className="font-['Playfair_Display'] text-[1.05rem] font-bold text-[#1c1711]">थप समाचार</h2>
</div>
<div className="bg-white border border-[#ede8e2]">
  {restNews.slice(3, 7).map((n, i) => (
    <article 
      key={n.id} 
      className="flex gap-4 p-4 border-b border-[rgba(28,23,17,0.07)] last:border-b-0 cursor-pointer group hover:bg-[#faf8f5] transition-colors"
      onClick={() => handleNewsClick(n.slug)}
    >
      <div className="flex-shrink-0 overflow-hidden w-[100px] h-[70px]">
        <img src={`storage/${n.image}`} alt="" className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500" />
      </div>
      <div className="flex flex-col justify-between flex-1 min-w-0">
        <div>
          <Badge label={n.category || 'समाचार'} />
          <h4 className="font-['Playfair_Display'] text-[0.82rem] font-semibold leading-snug text-[#1c1711] group-hover:text-[#1c4587] transition-colors mt-1">
            {n.heading}
          </h4>
          <p className="text-[0.62rem] text-[#a09488] mt-1 line-clamp-1 hidden sm:block">
            {n.description?.replace(/<[^>]*>/g, '').substring(0, 80)}...
          </p>
        </div>
        <p className="text-[0.54rem] text-[#c0b8b0]">
          {n.published_at ? new Date(n.published_at).toLocaleDateString('ne-NP') : ''}
        </p>
      </div>
    </article>
  ))}
</div>
          </div>

          {/* ── Sidebar ── */}
          <aside className="space-y-6">
            {/* Breaking news list */}
            <div className="bg-white border border-[#ede8e2] p-4">
              <p className="font-['Playfair_Display'] text-[0.88rem] font-bold border-b-2 border-[#1c4587] pb-2 mb-3">ब्रेकिङ समाचार</p>
              {breakingNews.map((b, i) => (
                <div key={i} className="flex gap-2 py-2.5 border-b border-[rgba(28,23,17,0.06)] last:border-b-0 cursor-pointer group">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#8B0000] mt-1.5 flex-shrink-0" />
                  <p className="text-[0.74rem] leading-snug text-[#1c1711] group-hover:text-[#1c4587] transition-colors">{b}</p>
                </div>
              ))}
            </div>
            
            {/* Most read */}
            <div className="bg-white border border-[#ede8e2] p-4">
              <p className="font-['Playfair_Display'] text-[0.88rem] font-bold border-b-2 border-[#1c1711] pb-2 mb-3">धेरै पढिएको</p>
              {news.slice(0, 5).map((n, i) => (
                <div 
                  key={n.id} 
                  className="flex gap-2.5 py-2.5 border-b border-[rgba(28,23,17,0.06)] last:border-b-0 cursor-pointer group"
                  onClick={() => handleNewsClick(n.slug)}
                >
                  <span className="font-['Playfair_Display'] text-[1.4rem] font-bold text-[#ede8e2] leading-none w-6 flex-shrink-0 text-center">{i + 1}</span>
                  <p className="text-[0.72rem] font-medium leading-snug text-[#1c1711] group-hover:text-[#1c4587] transition-colors line-clamp-2">{n.heading}</p>
                </div>
              ))}
            </div>
            
            {/* Square Banner Ad - Only show if square banners exist */}
            {squareBanners.length > 0 && (
              <div 
                className="relative overflow-hidden bg-gradient-to-br from-[#1c0f0f] to-[#2a0808] border border-[#8B0000]/30 p-4 cursor-pointer group aspect-square flex flex-col"
                onClick={handleBannerClick}
              >
                {/* Banner Image */}
                <div className="w-full h-40 mb-3 overflow-hidden rounded-lg">
                  <img 
                    src={squareBanners[currentBannerIndex]?.image} 
                    alt={`Banner ${currentBannerIndex + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <span className="text-[0.42rem] tracking-widest uppercase text-[#c9a84c]/60 block mb-2">विज्ञापन</span>
                
                {/* Banner Indicator Dots */}
                {squareBanners.length > 1 && (
                  <div className="flex justify-center gap-1 mt-auto pt-2">
                    {squareBanners.map((_, index) => (
                      <div 
                        key={index}
                        className={`w-1.5 h-1.5 rounded-full transition-colors ${
                          index === currentBannerIndex ? 'bg-[#c9a84c]' : 'bg-[#c9a84c]/30'
                        }`}
                      />
                    ))}
                  </div>
                )}
                
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ background: 'repeating-linear-gradient(135deg,#fff,#fff 1px,transparent 1px,transparent 10px)' }} />
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};

export default MukhyaSection;