import React, { useEffect, useState } from 'react';
import AdSportsBanner from '@/Ads/AdSportsBanner';
import NewsCard from '@/MainComponent/NewsCard';
import SectionHeader from '@/MainComponent/SectionHeader';
import { router } from '@inertiajs/react';

const SportsSection = () => {
  const [sportsNews, setSportsNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Handle news click navigation with Inertia
  const handleNewsClick = (slug) => {
    if (slug) {
      router.visit(`/news/${slug}`);
    }
  };

  useEffect(() => {
    // Fetch news from the API for खेलकुद category
    const fetchSportsNews = async () => {
      try {
        setLoading(true);
        const response = await fetch('/ournews');
        
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        
        const data = await response.json();
        
        if (data.status && data.data) {
          // Filter news for "खेलकुद" category and take first 4
          const filteredSports = data.data
            .filter(item => item.category === 'खेलकुद')
            .slice(0, 4)
            .map(item => ({
              id: item.id,
              title: item.heading,
              image: item.image ? `/storage/${item.image}` : null,
              category: item.category,
              time: formatNepaliDate(item.published_at),
              slug: item.slug // Make sure to include the slug
            }));
          
          setSportsNews(filteredSports);
        }
      } catch (err) {
        console.error('Error fetching sports news:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSportsNews();
  }, []);

  // Helper function to format date in Nepali format
  const formatNepaliDate = (dateString) => {
    if (!dateString) return 'हालैको';
    
    const date = new Date(dateString);
    const nepaliMonths = [
      'बैशाख', 'जेठ', 'असार', 'साउन', 'भदौ', 'असोज',
      'कात्तिक', 'मंसिर', 'पुष', 'माघ', 'फागुन', 'चैत'
    ];
    
    const day = date.getDate();
    const month = nepaliMonths[date.getMonth()];
    
    return `${day.toString().padStart(2, '0')} ${month}`;
  };

  // Show loading state
  if (loading) {
    return (
      <section className="mb-8">
        <SectionHeader title="खेलकुद" href="/category/khelkud" />
        <div className="text-center py-8 text-gray-500">
          लोड हुँदैछ...
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section className="mb-8">
        <SectionHeader title="खेलकुद" href="/category/khelkud" />
        <div className="text-center py-8 text-red-500">
          डाटा लोड गर्न समस्या भयो
        </div>
      </section>
    );
  }

  // Show message if no news
  if (sportsNews.length === 0) {
    return (
      <section className="mb-8">
        <SectionHeader title="खेलकुद" href="/category/khelkud" />
        <div className="text-center py-8 text-gray-500">
          कुनै खेलकुद समाचार छैन
        </div>
      </section>
    );
  }

  return (
    <section className="mb-8">
      <SectionHeader title="खेलकुद" href="/category/khelkud" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* First sports card */}
        {sportsNews[0] && (
          <div 
            onClick={() => handleNewsClick(sportsNews[0].slug)}
            className="cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleNewsClick(sportsNews[0].slug);
              }
            }}
          >
            <NewsCard item={sportsNews[0]} seed="sp_0" />
          </div>
        )}
        
        {/* Second sports card */}
        {sportsNews[1] && (
          <div 
            onClick={() => handleNewsClick(sportsNews[1].slug)}
            className="cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleNewsClick(sportsNews[1].slug);
              }
            }}
          >
            <NewsCard item={sportsNews[1]} seed="sp_1" />
          </div>
        )}
        
        {/* Ad Banner - always visible, not clickable for navigation */}
        <div className="sm:col-span-2 lg:col-span-2">
          <AdSportsBanner />
        </div>
        
        {/* Third sports card */}
        {sportsNews[2] && (
          <div 
            className="sm:col-span-1 lg:col-span-2 cursor-pointer"
            onClick={() => handleNewsClick(sportsNews[2].slug)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleNewsClick(sportsNews[2].slug);
              }
            }}
          >
            <NewsCard item={sportsNews[2]} seed="sp_2" />
          </div>
        )}
        
        {/* Fourth sports card */}
        {sportsNews[3] && (
          <div 
            className="sm:col-span-1 lg:col-span-2 cursor-pointer"
            onClick={() => handleNewsClick(sportsNews[3].slug)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleNewsClick(sportsNews[3].slug);
              }
            }}
          >
            <NewsCard item={sportsNews[3]} seed="sp_3" />
          </div>
        )}
      </div>
    </section>
  );
};

export default SportsSection;