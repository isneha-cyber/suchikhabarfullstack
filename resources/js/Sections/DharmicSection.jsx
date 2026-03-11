import React, { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';

const DharmicSection = () => {
  const [dharmicNews, setDharmicNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Handle news click navigation using Inertia
  const handleNewsClick = (slug) => {
    if (slug) {
      router.visit(`/news/${slug}`);
    }
  };

  useEffect(() => {
    // Fetch news from the API for धार्मिक category
    const fetchDharmicNews = async () => {
      try {
        setLoading(true);
        const response = await fetch('/ournews');
        
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        
        const data = await response.json();
        
        if (data.status && data.data) {
          // Filter news for "धार्मिक" category and take first 3
          const filteredDharmic = data.data
            .filter(item => item.category === 'धार्मिक')
            .slice(0, 3)
            .map(item => ({
              id: item.id,
              title: item.heading,
              image: item.image ? `/storage/${item.image}` : null,
              subcategory: item.category,
              time: formatNepaliDate(item.published_at),
              slug: item.slug // Add slug to the mapped data
            }));
          
          setDharmicNews(filteredDharmic);
        }
      } catch (err) {
        console.error('Error fetching dharmic news:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDharmicNews();
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

  // Helper function for image with fallback
  const img = (src, seed) => ({
    src: src || `https://picsum.photos/seed/${seed}/200/140`,
    onError: (e) => { e.currentTarget.src = `https://picsum.photos/seed/${seed}/200/140`; },
  });

  // Show loading state
  if (loading) {
    return (
      <div>
        <p className="font-['Playfair_Display'] text-[0.88rem] font-bold border-b-2 border-[#1c1711] pb-2 mb-3 leading-none">
          धार्मिक
        </p>
        <div className="text-center py-4 text-gray-500 text-sm">
          लोड हुँदैछ...
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div>
        <p className="font-['Playfair_Display'] text-[0.88rem] font-bold border-b-2 border-[#1c1711] pb-2 mb-3 leading-none">
          धार्मिक
        </p>
        <div className="text-center py-4 text-red-500 text-sm">
          डाटा लोड गर्न समस्या भयो
        </div>
      </div>
    );
  }

  // Show message if no news
  if (dharmicNews.length === 0) {
    return (
      <div>
        <p className="font-['Playfair_Display'] text-[0.88rem] font-bold border-b-2 border-[#1c1711] pb-2 mb-3 leading-none">
          धार्मिक
        </p>
        <div className="text-center py-4 text-gray-500 text-sm">
          कुनै धार्मिक समाचार छैन
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="font-['Playfair_Display'] text-[0.88rem] font-bold border-b-2 border-[#1c1711] pb-2 mb-3 leading-none">
        धार्मिक
      </p>
      {dharmicNews.map((item, i) => (
        <div 
          key={item.id} 
          onClick={() => handleNewsClick(item.slug)}
          className="flex gap-2.5 py-2.5 border-b border-[rgba(28,23,17,0.07)] last:border-b-0 cursor-pointer group"
        >
          <div className="flex-shrink-0 overflow-hidden">
            <img 
              {...img(item.image, `dh_${i}`)} 
              alt={item.title} 
              className="w-[76px] h-[54px] object-cover group-hover:scale-[1.04] transition-transform duration-500 block" 
            />
          </div>
          <p className="font-['Source_Serif_4'] text-[0.77rem] font-semibold leading-snug group-hover:text-[#8B0000] transition-colors text-[#1c1711]">
            {item.title}
          </p>
        </div>
      ))}
    </div>
  );
};

export default DharmicSection;