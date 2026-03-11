import NewsCard from '@/MainComponent/NewsCard';
import SectionHeader from '@/MainComponent/SectionHeader';
import React from 'react';


const ArthatatwaSection = () => {
  const arthatatwa = [
    { id: 15, title: '९ अर्ब ३५ करोड रूपैयाँ लगानी गर्दै राष्ट्र बैंक', image: 'https://shuchikhabar.com/public/uploads/6992da9d953ff.jpg', time: '०३ फागुन', category: 'अर्थतन्त्र' },
    { id: 16, title: 'घरजग्गा कारोबारबाट गत माघमा पाँच अर्ब राजस्व सङ्कलन', image: 'https://shuchikhabar.com/public/uploads/69926bed7c842.jpg', time: '०३ फागुन', category: 'अर्थतन्त्र' },
    { id: 17, title: 'पेट्रोलियम पदार्थको मूल्य बढ्यो, आम उपभोक्तामा असर', image: 'https://shuchikhabar.com/public/uploads/69926c4923253.jpg', time: '०३ फागुन', category: 'अर्थतन्त्र' },
    { id: 18, title: 'तोलामा १ सय घट्यो सुनको मूल्य', image: 'https://shuchikhabar.com/public/uploads/698d859b5c0fd.jpg', time: '२९ माघ', category: 'अर्थतन्त्र' },
  ];

  return (
    <section>
      <SectionHeader title="अर्थतन्त्र" href="/category/arthatatwa" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {arthatatwa.map((item, i) => <NewsCard key={item.id} item={item} seed={`arth_${i}`} />)}
      </div>
    </section>
  );
};

export default ArthatatwaSection;