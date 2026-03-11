import NewsCard from '@/MainComponent/NewsCard';
import SectionHeader from '@/MainComponent/SectionHeader';
import React from 'react';


const ManoranjanSection = () => {
  const manoranjan = [
    { id: 27, title: 'नेपाली चलचित्र "छक्का पञ्जा ५" को सुटिङ सुरु, चर्चामा', image: 'https://picsum.photos/seed/mn1s/400/267', time: 'आज', category: 'मनोरञ्जन' },
    { id: 28, title: 'लोकप्रिय गायिका पुजा शर्माको नयाँ एल्बम रिलिज', image: 'https://picsum.photos/seed/mn2s/400/267', time: 'हिजो', category: 'मनोरञ्जन' },
    { id: 29, title: 'काठमाडौंमा तीन दिने अन्तर्राष्ट्रिय संगीत महोत्सव', image: 'https://picsum.photos/seed/mn3s/400/267', time: 'हिजो', category: 'मनोरञ्जन' },
  ];

  return (
    <section>
      <SectionHeader title="मनोरञ्जन" href="/category/manoranjan" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {manoranjan.map((item, i) => <NewsCard key={item.id} item={item} seed={`mr_${i}`} />)}
      </div>
    </section>
  );
};

export default ManoranjanSection;