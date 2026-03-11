import React, { useState, useEffect } from 'react';
import { Megaphone } from 'lucide-react';

const AdMidStrip = () => {
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBanner();
  }, []);

  const fetchBanner = async () => {
    try {
      setLoading(true);
      const response = await fetch('/banner');
      const result = await response.json();
      
      if (result.success && result.data) {
        // Filter for rectangle banners only and get the most recent one
        const rectangleBanners = result.data.filter(b => b.category === 'Rectangle');
        if (rectangleBanners.length > 0) {
          // Get the latest rectangle banner (assuming the last one in array is newest)
          setBanner(rectangleBanners[rectangleBanners.length - 1]);
        }
      }
    } catch (err) {
      setError('Failed to load banner');
      console.error('Error fetching banner:', err);
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="my-10">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="flex items-center gap-1 text-[#a09488]">
            <Megaphone size={9} strokeWidth={2} />
            <span className="text-[0.48rem] tracking-[0.22em] uppercase font-semibold">
              विज्ञापन · Sponsored
            </span>
          </div>
          <div className="flex-1 h-px bg-[#ddd4c4]" />
          <span className="text-[0.44rem] tracking-wide text-[#c0b8b0] uppercase">
            Ad
          </span>
        </div>
        
        <div className="relative h-[120px] sm:h-[150px] bg-gradient-to-r from-[#1c0f0f] via-[#2d0f0f] to-[#1a0808] border border-[#8B0000]/40 flex items-center justify-center">
          <div className="text-white/50 text-sm">Loading banner...</div>
        </div>
      </div>
    );
  }

  // Error or no banner state
  if (error || !banner) {
    return (
      <div className="my-10">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="flex items-center gap-1 text-[#a09488]">
            <Megaphone size={9} strokeWidth={2} />
            <span className="text-[0.48rem] tracking-[0.22em] uppercase font-semibold">
              विज्ञापन · Sponsored
            </span>
          </div>
          <div className="flex-1 h-px bg-[#ddd4c4]" />
          <span className="text-[0.44rem] tracking-wide text-[#c0b8b0] uppercase">
            Ad
          </span>
        </div>
        
        <div className="relative h-[120px] sm:h-[150px] bg-gradient-to-r from-[#1c0f0f] via-[#2d0f0f] to-[#1a0808] border border-[#8B0000]/40 flex items-center justify-center">
          <p className="text-white/50 text-sm">No banner available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-10 cursor-pointer group select-none">
      {/* AD LABEL ROW */}
      <div className="flex items-center gap-2 mb-1.5">
        <div className="flex items-center gap-1 text-[#a09488]">
          <Megaphone size={9} strokeWidth={2} />
          <span className="text-[0.48rem] tracking-[0.22em] uppercase font-semibold">
            विज्ञापन · Sponsored
          </span>
        </div>
        <div className="flex-1 h-px bg-[#ddd4c4]" />
        <span className="text-[0.44rem] tracking-wide text-[#c0b8b0] uppercase">
          Ad
        </span>
      </div>

      {/* Full Width Banner Image */}
      <a 
        href={banner.link || '#'} 
        target={banner.link ? "_blank" : "_self"}
        rel={banner.link ? "noopener noreferrer" : ""}
        className="block w-full overflow-hidden border border-[#8B0000]/40 group-hover:border-[#8B0000]/70 transition-all duration-300"
      >
        <img 
          src={banner.image} 
          alt="Advertisement"
          className="w-full h-auto object-cover"
          style={{ 
            display: 'block',
            maxHeight: '200px', // Adjust this value based on your needs
            width: '100%'
          }}
        />
      </a>

      {/* Bottom disclaimer line */}
      <p className="text-[0.42rem] text-[#c0b8b0] tracking-wide mt-1 text-right">
        यो विज्ञापन हो। सामग्री बाह्य विज्ञापनदाताद्वारा प्रदान गरिएको।
      </p>
    </div>
  );
};

export default AdMidStrip;