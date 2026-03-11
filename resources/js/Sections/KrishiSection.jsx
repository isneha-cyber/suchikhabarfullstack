import ListCard from '@/MainComponent/ListCard';
import SectionHeader from '@/MainComponent/SectionHeader';
import React, { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';

const KrishiSection = () => {
  const [krishi, setKrishi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Handle news click navigation with Inertia
  const handleNewsClick = (slug) => {
    if (slug) {
      router.visit(`/news/${slug}`);
    }
  };

  useEffect(() => {
    // Fetch news from the API for कृषि category
    const fetchKrishiNews = async () => {
      try {
        setLoading(true);
        const response = await fetch('/ournews');
        
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        
        const data = await response.json();
        
        if (data.status && data.data) {
          // Filter news for "कृषि" category and take first 4
          const krishiNews = data.data
            .filter(item => item.category === 'कृषि')
            .slice(0, 4)
            .map(item => ({
              id: item.id,
              title: item.heading,
              image: item.image ? `/storage/${item.image}` : null,
              subcategory: item.category,
              time: formatNepaliDate(item.published_at),
              slug: item.slug // Make sure to include the slug
            }));
          
          setKrishi(krishiNews);
        }
      } catch (err) {
        console.error('Error fetching krishi news:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchKrishiNews();
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
        <SectionHeader title="कृषि" href="/category/krishi" />
        <div className="text-center py-4 text-gray-500">
          लोड हुँदैछ...
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section>
        <SectionHeader title="कृषि" href="/category/krishi" />
        <div className="text-center py-4 text-red-500">
          डाटा लोड गर्न समस्या भयो
        </div>
      </section>
    );
  }

  // Show message if no news
  if (krishi.length === 0) {
    return (
      <section>
        <SectionHeader title="कृषि" href="/category/krishi" />
        <div className="text-center py-4 text-gray-500">
          कुनै कृषि समाचार छैन
        </div>
      </section>
    );
  }

  return (
    <section>
      <SectionHeader title="कृषि" href="/category/krishi" />
      <div>
        {krishi.map((item, i) => (
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
            <ListCard item={item} seed={`kr_${i}`} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default KrishiSection;