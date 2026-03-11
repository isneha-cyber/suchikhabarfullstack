import NewsCard from '@/MainComponent/NewsCard';
import SectionHeader from '@/MainComponent/SectionHeader';
import React, { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';

const ManoranjanSection = () => {
  const [manoranjan, setManoranjan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Handle news click navigation with Inertia
  const handleNewsClick = (slug) => {
    if (slug) {
      router.visit(`/news/${slug}`);
    }
  };

  useEffect(() => {
    // Fetch news from the API for मनोरञ्जन category
    const fetchManoranjanNews = async () => {
      try {
        setLoading(true);
        const response = await fetch('/ournews');
        
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        
        const data = await response.json();
        
        if (data.status && data.data) {
          // Filter news for "मनोरञ्जन" category and take first 3
          const filteredManoranjan = data.data
            .filter(item => item.category === 'मनोरञ्जन')
            .slice(0, 3)
            .map(item => ({
              id: item.id,
              title: item.heading,
              image: item.image ? `/storage/${item.image}` : null,
              time: formatNepaliDate(item.published_at),
              category: item.category,
              slug: item.slug // Make sure to include the slug
            }));
          
          setManoranjan(filteredManoranjan);
        }
      } catch (err) {
        console.error('Error fetching manoranjan news:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchManoranjanNews();
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
    const year = date.getFullYear() - 57; // Convert to BS year (approximate)
    
    return `${day.toString().padStart(2, '0')} ${month}`;
  };

  // Show loading state
  if (loading) {
    return (
      <section>
        <SectionHeader title="मनोरञ्जन" href="/category/manoranjan" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 h-40 rounded-lg mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section>
        <SectionHeader title="मनोरञ्जन" href="/category/manoranjan" />
        <div className="text-center py-8 text-red-500 border border-[#ede8e2] rounded-lg">
          डाटा लोड गर्न समस्या भयो
        </div>
      </section>
    );
  }

  // Show message if no news
  if (manoranjan.length === 0) {
    return (
      <section>
        <SectionHeader title="मनोरञ्जन" href="/category/manoranjan" />
        <div className="text-center py-8 text-gray-500 border border-[#ede8e2] rounded-lg">
          कुनै मनोरञ्जन समाचार छैन
        </div>
      </section>
    );
  }

  return (
    <section>
      <SectionHeader title="मनोरञ्जन" href="/category/manoranjan" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {manoranjan.map((item, i) => (
          <div 
            key={item.id} 
            onClick={() => handleNewsClick(item.slug)}
            className="cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleNewsClick(item.slug);
              }
            }}
          >
            <NewsCard item={item} seed={`mr_${i}`} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ManoranjanSection;