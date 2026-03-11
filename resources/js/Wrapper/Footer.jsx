import React from 'react';

const Footer = () => (
  <footer className="bg-[#1c1711] text-[#c8bfb4]">
    {/* Main Footer Content */}
    <div className="px-4 sm:px-6 lg:px-12 py-8 md:py-9">
      {/* Mobile: Single column, Tablet/Desktop: Multi-column */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-7 border-b border-white/8 pb-8">
        
        {/* Brand Section - Full width on mobile */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-1">
          <img
            src="/images/logo.png"
            alt="Shuchikhabar"
            className="h-10 sm:h-9 w-auto object-contain mb-3 brightness-0 invert"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextSibling.style.display = 'block';
            }}
          />
          <p className="font-['Playfair_Display'] text-xl sm:text-[1.1rem] text-[#fdfcfb] font-bold hidden mb-1">
            शुचि<span className="text-[#8B0000]">खबर</span>
          </p>
          <p className="text-[0.6rem] sm:text-[0.54rem] tracking-[0.18em] text-[#a09488] uppercase mb-3">
            Best Newsportal in Nepal
          </p>
          <p className="text-sm sm:text-[0.71rem] leading-relaxed text-white/38 mb-5 max-w-xs sm:max-w-none">
            शुचि खबर — सत्य, तथ्य र निष्पक्ष समाचारको लागि नेपालको विश्वसनीय समाचार पोर्टल।
          </p>
          
          {/* Social Icons - Horizontal scroll on mobile if needed */}
          <div className="flex flex-wrap gap-2">
            {['fb', 'tw', 'yt', 'in'].map((s, i) => (
              <div 
                key={i} 
                className="w-8 h-8 sm:w-7 sm:h-7 border border-white/12 flex items-center justify-center text-xs sm:text-[0.52rem] text-white/36 cursor-pointer hover:border-[#8B0000] hover:text-white transition-all uppercase font-bold"
                role="button"
                tabIndex={0}
                aria-label={`Social media ${s}`}
              >
                {s}
              </div>
            ))}
          </div>
        </div>

        {/* Category Sections - Responsive grid for mobile */}
        {[
          { title: 'विभाग', links: ['मुख्य', 'समाचार', 'अर्थतन्त्र', 'खेलकुद', 'मनोरञ्जन', 'कृषि'] },
          { title: 'थप', links: ['स्वास्थ्य', 'धार्मिक', 'विचार', 'अन्तर्राष्ट्रिय', 'फोटो', 'भिडियो'] },
          { title: 'सम्पर्क', links: ['हाम्रोबारे', 'सम्पर्क गर्नुहोस्', 'विज्ञापन', 'गोपनीयता नीति', 'प्रयोग सर्त'] },
        ].map((col, index) => (
          <div key={col.title} className={index === 2 ? "sm:col-span-2 lg:col-span-1" : ""}>
            <p className="text-sm sm:text-[0.58rem] tracking-[0.16em] uppercase text-[#fdfcfb] font-medium mb-4 sm:mb-3">
              {col.title}
            </p>
            
            {/* Mobile: 2 column layout for links, Desktop: Single column */}
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-2 sm:gap-0">
              {col.links.map((l, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="text-sm sm:text-[0.74rem] mb-0 sm:mb-2 text-[#9e9188] hover:text-[#fdfcfb] transition-colors no-underline py-1 sm:py-0"
                >
                  {l}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Copyright Bar - Stack on mobile, row on larger screens */}
    <div className="px-4 sm:px-6 lg:px-12 py-4 sm:py-3.5">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-2 text-xs sm:text-[0.62rem] text-white/20 text-center sm:text-left">
        <span>© २०८२ शुचि खबर। सर्वाधिकार सुरक्षित।</span>
        <span className="text-white/30 sm:text-white/20">shuchikhabar.com — Best Newsportal in Nepal</span>
      </div>
    </div>
  </footer>
);

export default Footer;