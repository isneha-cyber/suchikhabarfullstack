import ListCard from '@/MainComponent/ListCard';
import SectionHeader from '@/MainComponent/SectionHeader';
import React from 'react';


const KrishiSection = () => {
  const krishi = [
    { id: 23, title: 'दाङमा तोरीखेतीको क्षेत्रफल र उत्पादन बढ्दै, किसान खुसी', image: 'https://shuchikhabar.com/public/uploads/6993fdd82157a.jpg', subcategory: 'कृषि', time: '०४ फागुन' },
    { id: 24, title: 'जैविक मलको प्रयोग बढाउन सरकारको अनुदान कार्यक्रम सुरु', image: 'https://picsum.photos/seed/krishi2/200/140', subcategory: 'कृषि', time: '०३ फागुन' },
    { id: 25, title: 'चिया उत्पादनमा इलाम अग्रणी, निर्यातमा उल्लेखनीय वृद्धि', image: 'https://picsum.photos/seed/krishi3/200/140', subcategory: 'कृषि', time: '०२ फागुन' },
    { id: 26, title: 'धानको न्यूनतम समर्थन मूल्य बढाउने सरकारको निर्णय', image: 'https://picsum.photos/seed/krishi4/200/140', subcategory: 'कृषि', time: '०१ फागुन' },
  ];

  return (
    <section>
      <SectionHeader title="कृषि" href="/category/krishi" />
      <div>
        {krishi.map((item, i) => <ListCard key={item.id} item={item} seed={`kr_${i}`} />)}
      </div>
    </section>
  );
};

export default KrishiSection;