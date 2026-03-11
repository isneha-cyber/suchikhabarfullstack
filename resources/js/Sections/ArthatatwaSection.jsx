import NewsCard from '@/MainComponent/NewsCard';
import SectionHeader from '@/MainComponent/SectionHeader';
import React, { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';

const ArthatatwaSection = () => {
  const [arthatatwa, setArthatatwa] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Handle news click navigation using Inertia
  const handleNewsClick = (slug) => {
    if (slug) {
      router.visit(`/news/${slug}`);
    }
  };

  useEffect(() => {
    // Fetch news from the API
    const fetchNews = async () => {
      try {
        setLoading(true);
        // Using the existing ournews endpoint and filtering for "अर्थतन्त्र" category
        const response = await fetch('/ournews');
        
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        
        const data = await response.json();
        
        if (data.status && data.data) {
          // Filter news for "अर्थतन्त्र" category and take first 4
          const arthatatwaNews = data.data
            .filter(item => item.category === 'अर्थतन्त्र')
            .slice(0, 4)
            .map(item => ({
              id: item.id,
              title: item.heading,
              image: item.image ? `/storage/${item.image}` : null,
              category: item.category,
              time: formatNepaliDate(item.published_at),
              slug: item.slug // Make sure to include slug in the mapped data
            }));
          
          setArthatatwa(arthatatwaNews);
        }
      } catch (err) {
        console.error('Error fetching news:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Helper function to format date in Nepali format
  const formatNepaliDate = (dateString) => {
    if (!dateString) return 'हालैको';
    
    const date = new Date(dateString);
    const nepaliMonths = [
      'बैशाख', 'जेठ', 'असार', 'साउन', 'भदौ', 'असोज',
      'कार्तिक', 'मंसिर', 'पुष', 'माघ', 'फागुन', 'चैत'
    ];
    
    const day = date.getDate();
    const month = nepaliMonths[date.getMonth()];
    return `${day} ${month}`;
  };

  // Show loading state
  if (loading) {
    return (
      <section>
        <SectionHeader title="अर्थतन्त्र" href="/category/arthatatwa" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 aspect-[3/2] w-full"></div>
              <div className="pt-2">
                <div className="h-3 bg-gray-200 w-16 mb-2"></div>
                <div className="h-4 bg-gray-200 w-full mb-2"></div>
                <div className="h-3 bg-gray-200 w-12"></div>
              </div>
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
        <SectionHeader title="अर्थतन्त्र" href="/category/arthatatwa" />
        <div className="text-center py-8 text-red-500">
          डाटा लोड गर्न समस्या भयो
        </div>
      </section>
    );
  }

  // Show message if no news
  if (arthatatwa.length === 0) {
    return (
      <section>
        <SectionHeader title="अर्थतन्त्र" href="/category/arthatatwa" />
        <div className="text-center py-8 text-gray-500">
          कुनै समाचार छैन
        </div>
      </section>
    );
  }

  return (
    <section>
      <SectionHeader title="अर्थतन्त्र" href="/category/arthatatwa" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {arthatatwa.map((item, i) => (
          <div 
            key={item.id} 
            onClick={() => handleNewsClick(item.slug)}
            className="cursor-pointer"
          >
            <NewsCard item={item} seed={`arth_${i}`} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ArthatatwaSection;