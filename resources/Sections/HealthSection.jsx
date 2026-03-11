import ListCard from '@/MainComponent/ListCard';
import SectionHeader from '@/MainComponent/SectionHeader';
import React from 'react';


const HealthSection = () => {
  const swastha = [
    { id: 33, title: 'काठमाडौंको वायु प्रदूषणबाट बच्न विशेषज्ञको सुझाव', image: 'https://picsum.photos/seed/sw1s/200/140', subcategory: 'स्वास्थ्य', time: 'आज' },
    { id: 34, title: 'डेंगी रोगको प्रकोप बढ्दो, ७ जिल्लामा अलर्ट जारी', image: 'https://picsum.photos/seed/sw2s/200/140', subcategory: 'स्वास्थ्य', time: 'हिजो' },
    { id: 35, title: 'सरकारी अस्पतालमा निःशुल्क स्वास्थ्य शिविर आयोजना', image: 'https://picsum.photos/seed/sw3s/200/140', subcategory: 'स्वास्थ्य', time: 'हिजो' },
  ];

  return (
    <section>
      <SectionHeader title="स्वास्थ्य" href="/category/swasthya" />
      <div>
        {swastha.map((item, i) => <ListCard key={item.id} item={item} seed={`sw_${i}`} />)}
      </div>
    </section>
  );
};

export default HealthSection;