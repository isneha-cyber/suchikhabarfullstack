import ListCard from '@/MainComponent/ListCard';
import SectionHeader from '@/MainComponent/SectionHeader';
import React, { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';

const SamacharSection = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Handle news click navigation with Inertia
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
        // You can create a specific API endpoint for category-based news
        // For now, we'll use the existing ournews endpoint and filter client-side
        const response = await fetch('/ournews');
        
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        
        const data = await response.json();
        
        if (data.status && data.data) {
          // Filter news for "समाचार" category and take first 4
          const samacharNews = data.data
            .filter(item => item.category === 'समाचार')
            .slice(0, 4)
            .map(item => ({
              id: item.id,
              title: item.heading,
              image: item.image ? `/storage/${item.image}` : null,
              subcategory: item.category,
              time: item.published_at ? new Date(item.published_at).toLocaleDateString('ne-NP', {
                day: 'numeric',
                month: 'long'
              }) : 'हालैको',
              slug: item.slug // Make sure to include the slug
            }));
          
          setNews(samacharNews);
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

  // Show loading state
  if (loading) {
    return (
      <section>
        <SectionHeader title="समाचार" href="/category/samachar" />
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
        <SectionHeader title="समाचार" href="/category/samachar" />
        <div className="text-center py-4 text-red-500">
          डाटा लोड गर्न समस्या भयो
        </div>
      </section>
    );
  }

  // Show message if no news
  if (news.length === 0) {
    return (
      <section>
        <SectionHeader title="समाचार" href="/category/samachar" />
        <div className="text-center py-4 text-gray-500">
          कुनै समाचार छैन
        </div>
      </section>
    );
  }

  return (
    <section>
      <SectionHeader title="समाचार" href="/category/samachar" />
      <div>
        {news.map((item, i) => (
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
            <ListCard item={item} seed={`sm_${i}`} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SamacharSection;