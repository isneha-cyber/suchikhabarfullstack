import React, { useState, useEffect } from 'react';
import SectionHeader from './SectionHeader';
import axios from 'axios';
import { router } from '@inertiajs/react';

const PhotoGallery = () => {
  const [categoryImages, setCategoryImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Handle gallery item click navigation with Inertia
  const handleGalleryClick = (category) => {
    if (category) {
      router.visit(`/category/${encodeURIComponent(category)}`);
    }
  };

  useEffect(() => {
    fetchCategoryImages();
  }, []);

  const fetchCategoryImages = async () => {
    try {
      const response = await axios.get('/ournews');
      console.log('API Response:', response.data); // Debug log
      
      if (response.data.status && response.data.data) {
        // Get unique categories with their latest news image
        const categories = {};
        
        response.data.data.forEach(news => {
          // Check if news has category and image
          if (news.category && news.image) {
            // Only add if this category hasn't been added yet (get first/latest image per category)
            if (!categories[news.category]) {
              // Extract just the filename if it's a full path
              let imagePath = news.image;
              
              // If the image is stored as a full path, get the filename
              if (imagePath.includes('/')) {
                const parts = imagePath.split('/');
                imagePath = parts[parts.length - 1];
              }
              
              categories[news.category] = {
                label: news.category,
                image: imagePath, // Store just the filename
                id: news.id,
                slug: news.slug,
                fullImagePath: news.image // Store original for debugging
              };
              
              console.log(`Added category: ${news.category} with image: ${imagePath}`); // Debug log
            }
          }
        });
        
        // Convert to array and limit to 5 categories
        const galleryData = Object.values(categories).slice(0, 5);
        console.log('Gallery Data:', galleryData); // Debug log
        setCategoryImages(galleryData);
      } else {
        console.log('No data or invalid response structure');
        setCategoryImages([]);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      setCategoryImages([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="mb-8">
        <SectionHeader title="फोटो ग्यालरी" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-0.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="relative overflow-hidden bg-gray-200 animate-pulse" style={{ aspectRatio: '1/1' }} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mb-8">
      <SectionHeader title="फोटो ग्यालरी" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-0.5">
        {categoryImages.length > 0 ? (
          categoryImages.map((category, index) => {
            // Construct the image URL based on how it's stored
            // Try different possible URL patterns
            const imageUrl = `/storage/news/images/${category.image}`;
            
            return (
              <div 
                key={index} 
                className="relative overflow-hidden cursor-pointer group" 
                style={{ aspectRatio: '1/1' }}
                onClick={() => handleGalleryClick(category.label)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleGalleryClick(category.label);
                  }
                }}
              >
                <img 
                  src={imageUrl}
                  alt={category.label}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 block"
                  onError={(e) => {
                    console.log(`Failed to load image for ${category.label}:`, imageUrl);
                    // Try alternative URL patterns if the first one fails
                    const altUrl1 = `/storage/${category.fullImagePath}`;
                    const altUrl2 = `/${category.image}`;
                    
                    // You could implement a retry logic here with different URLs
                    e.currentTarget.src = imageUrl; // Keep trying with original for now
                  }}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />
                <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-xs font-medium uppercase bg-[#8B0000] px-2 py-1 rounded">
                    {category.label}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center py-8 text-gray-500">
            No category images found
          </div>
        )}
      </div>
    </section>
  );
};

export default PhotoGallery;