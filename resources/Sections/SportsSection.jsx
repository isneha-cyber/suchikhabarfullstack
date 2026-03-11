import AdSportsBanner from '@/Ads/AdSportsBanner';
import NewsCard from '@/MainComponent/NewsCard';
import SectionHeader from '@/MainComponent/SectionHeader';
import React from 'react';

const SportsSection = () => {
  const sports = [
    { id: 19, title: 'नेपाल र स्कटल्यान्डको खेल आज', image: 'https://shuchikhabar.com/public/uploads/6993fd86c9e54.jpg', time: '०४ फागुन', category: 'खेलकुद' },
    { id: 20, title: 'टी–२० विश्वकपः पाकिस्तानलाई ६१ रनले हराउँदै भारत सुपर ८ मा', image: 'https://shuchikhabar.com/public/uploads/69926e99ab47d.png', time: '०३ फागुन', category: 'खेलकुद' },
    { id: 21, title: 'टी–२० विश्वकप: पहिलो जितको खोजीमा नेपाल र इटाली', image: 'https://shuchikhabar.com/public/uploads/698d83fda9373.jpg', time: '२९ माघ', category: 'खेलकुद' },
    { id: 22, title: "'टाइगर कप भलिबल'को उपाधि गण्डकी प्रदेशलाई", image: 'https://shuchikhabar.com/public/uploads/697ebad575c9e.jpg', time: '२५ माघ', category: 'खेलकुद' },
  ];

  return (
    <section className="mb-8">
      <SectionHeader title="खेलकुद" href="/category/khelkud" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <NewsCard item={sports[0]} seed="sp_0" />
        <NewsCard item={sports[1]} seed="sp_1" />
        <div className="sm:col-span-2 lg:col-span-2">
          <AdSportsBanner />
        </div>
        <div className="sm:col-span-1 lg:col-span-2">
          <NewsCard item={sports[2]} seed="sp_2" />
        </div>
        <div className="sm:col-span-1 lg:col-span-2">
          <NewsCard item={sports[3]} seed="sp_3" />
        </div>
      </div>
    </section>
  );
};

export default SportsSection;