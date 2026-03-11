import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdLeaderboard = () => {
  const [banners, setBanners] = useState([]);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setLoading(true);
        
        // Simply use the current origin
        const response = await axios.get('/banner');
        
        // Check response structure
        let bannersData = [];
        if (response.data.success && response.data.data) {
          bannersData = response.data.data;
        } else if (Array.isArray(response.data)) {
          bannersData = response.data;
        }
        
        // Filter only rectangle banners
        const rectangleBanners = bannersData.filter(
          banner => banner.category?.toLowerCase() === 'rectangle'
        );
        
        setBanners(rectangleBanners);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching banners:', err);
        setError('Failed to load banners');
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  // Auto-rotate banners
  useEffect(() => {
    if (banners.length > 1) {
      const interval = setInterval(() => {
        setCurrentBannerIndex((prevIndex) => 
          prevIndex === banners.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [banners.length]);

  // Hide if loading, error, or no banners
  if (loading || error || banners.length === 0) {
    return null;
  }

  const currentBanner = banners[currentBannerIndex];

  return (
    <div className="w-full bg-[#fdfcfb] border-b border-[rgba(28,23,17,0.07)] py-2 flex justify-center px-2 sm:px-4">
      <a 
        href={currentBanner.link || '#'} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="no-underline w-full px-2 sm:px-8"
      >
        <div className="relative w-full overflow-hidden cursor-pointer group " style={{ aspectRatio: '728/90' }}>
          <img 
            src={currentBanner.image} 
            alt="Advertisement"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/728x90?text=Advertisement';
            }}
          />
          
        

          {/* Banner Indicators */}
          {banners.length > 1 && (
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1 z-10">
              {banners.map((_, index) => (
                <button
                  key={index}
                  className={`w-1.5 h-1.5 -full transition-all ${
                    index === currentBannerIndex 
                      ? 'bg-white w-3' 
                      : 'bg-white/50'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentBannerIndex(index);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </a>
    </div>
  );
};

export default AdLeaderboard;