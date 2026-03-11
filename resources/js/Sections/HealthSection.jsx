import React, { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';
import ListCard from '@/MainComponent/ListCard';
import SectionHeader from '@/MainComponent/SectionHeader';

const HealthSection = () => {
  const [healthNews, setHealthNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Handle news click navigation using Inertia
  const handleNewsClick = (slug) => {
    if (slug) {
      router.visit(`/news/${slug}`);
    }
  };

  useEffect(() => {
    // Fetch news from the API for स्वास्थ्य category
    const fetchHealthNews = async () => {
      try {
        setLoading(true);
        const response = await fetch('/ournews');
        
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        
        const data = await response.json();
        
        if (data.status && data.data) {
          // Filter news for "स्वास्थ्य" category and take first 3
          const filteredHealth = data.data
            .filter(item => item.category === 'स्वास्थ्य')
            .slice(0, 3)
            .map(item => ({
              id: item.id,
              title: item.heading,
              image: item.image ? `/storage/${item.image}` : null,
              subcategory: item.category,
              time: formatNepaliDate(item.published_at),
              slug: item.slug // Add slug to the mapped data
            }));
          
          setHealthNews(filteredHealth);
        }
      } catch (err) {
        console.error('Error fetching health news:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHealthNews();
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
      <section>
        <SectionHeader title="स्वास्थ्य" href="/category/swasthya" />
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
        <SectionHeader title="स्वास्थ्य" href="/category/swasthya" />
        <div className="text-center py-4 text-red-500">
          डाटा लोड गर्न समस्या भयो
        </div>
      </section>
    );
  }

  // Show message if no news
  if (healthNews.length === 0) {
    return (
      <section>
        <SectionHeader title="स्वास्थ्य" href="/category/swasthya" />
        <div className="text-center py-4 text-gray-500">
          कुनै स्वास्थ्य समाचार छैन
        </div>
      </section>
    );
  }

  return (
    <section>
      <SectionHeader title="स्वास्थ्य" href="/category/swasthya" />
      <div>
        {healthNews.map((item, i) => (
          <div
            key={item.id}
            onClick={() => handleNewsClick(item.slug)}
            className="cursor-pointer"
          >
            <ListCard item={item} seed={`sw_${i}`} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default HealthSection;