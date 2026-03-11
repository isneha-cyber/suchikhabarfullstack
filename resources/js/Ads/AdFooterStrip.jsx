import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdFooterStrip = () => {
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRectangleBanner();
  }, []);

  const fetchRectangleBanner = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/banner');
      
      if (response.data.success) {
        const rectangleBanners = response.data.data.filter(
          banner => banner.category === 'Rectangle'
        );
        
        if (rectangleBanners.length > 0) {
          setBanner(rectangleBanners[0]);
        }
      }
    } catch (err) {
      console.error('Error fetching banner:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBannerClick = () => {
    if (banner?.link) {
      window.open(banner.link, '_blank');
    }
  };

  // Don't render anything while loading or if no banner
  if (loading || !banner) {
    return null;
  }

  return (
    <div 
      className="w-full cursor-pointer bg-[#1c1711] border-t-2 border-[#8B0000] relative overflow-hidden"
      onClick={handleBannerClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleBannerClick();
        }
      }}
    >
      {/* Banner Image */}
      <img 
        src={banner.image} 
        alt="Advertisement Banner"
        className="w-full h-auto object-cover"
        style={{ maxHeight: '120px' }} // Adjust this height as needed
      />
      
      {/* Optional: Small "Advertisement" text */}
      <span className="absolute bottom-1 right-3 text-[0.4rem] text-white/50 uppercase tracking-widest z-10">
        विज्ञापन
      </span>
    </div>
  );
};

export default AdFooterStrip;