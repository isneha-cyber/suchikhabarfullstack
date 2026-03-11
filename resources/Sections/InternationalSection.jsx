import ListCard from '@/MainComponent/ListCard';
import SectionHeader from '@/MainComponent/SectionHeader';
import React from 'react';


const InternationalSection = () => {
  const antarrashtriya = [
    { id: 36, title: 'तारिक रहमान बंगलादेशका प्रधानमन्त्री नियुक्त', image: 'https://shuchikhabar.com/public/uploads/699401175f89c.jpg', subcategory: 'अन्तर्राष्ट्रिय', time: '०४ फागुन' },
    { id: 37, title: 'भारत–पाकिस्तान सम्बन्धमा नयाँ तनाव, सीमा सुरक्षा कडाइ', image: 'https://picsum.photos/seed/int2s/200/140', subcategory: 'अन्तर्राष्ट्रिय', time: '०३ फागुन' },
    { id: 38, title: 'संयुक्त राष्ट्रसंघले जलवायु प्रतिवेदन सार्वजनिक गर्‍यो', image: 'https://picsum.photos/seed/int3s/200/140', subcategory: 'अन्तर्राष्ट्रिय', time: '०२ फागुन' },
  ];

  return (
    <section>
      <SectionHeader title="अन्तर्राष्ट्रिय" href="/category/antarrashtriya" />
      <div>
        {antarrashtriya.map((item, i) => <ListCard key={item.id} item={item} seed={`int_${i}`} />)}
      </div>
    </section>
  );
};

export default InternationalSection;