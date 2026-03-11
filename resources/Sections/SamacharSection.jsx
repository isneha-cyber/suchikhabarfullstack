import ListCard from '@/MainComponent/ListCard';
import SectionHeader from '@/MainComponent/SectionHeader';
import React from 'react';


const SamacharSection = () => {
  const samachar = [
    { id: 11, title: 'तारिक रहमान बंगलादेशका नयाँ प्रधानमन्त्री, अपराह्न शपथ ग्रहण', image: 'https://shuchikhabar.com/public/uploads/699401175f89c.jpg', subcategory: 'अन्तर्राष्ट्रिय', time: '०४ फागुन' },
    { id: 12, title: 'दाङमा तोरीखेतीको क्षेत्रफल र उत्पादन बढ्दै', image: 'https://shuchikhabar.com/public/uploads/6993fdd82157a.jpg', subcategory: 'कृषि', time: '०४ फागुन' },
    { id: 13, title: 'बंगलादेशका प्रधानमन्त्रीको सपथ समारोहमा परराष्ट्रमन्त्री शर्मा सहभागी हुने', image: 'https://shuchikhabar.com/public/uploads/6992e059aaa83.jpg', subcategory: 'समाचार', time: '०३ फागुन' },
    { id: 14, title: 'चुरे संरक्षणलाई चुनावी एजेण्डाको प्राथमिकतामा राख्न माग', image: 'https://shuchikhabar.com/public/uploads/69926f3089d64.jpg', subcategory: 'समाचार', time: '०३ फागुन' },
  ];

  return (
    <section>
      <SectionHeader title="समाचार" href="/category/samachar" />
      <div>
        {samachar.map((item, i) => <ListCard key={item.id} item={item} seed={`sm_${i}`} />)}
      </div>
    </section>
  );
};

export default SamacharSection;