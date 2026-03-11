import SectionHeader from '@/MainComponent/SectionHeader';
import React from 'react';


const OpinionSection = () => {
  const opinions = [
    { id: 40, title: 'निर्वाचनी राजनीति र युवा पुस्ताको भूमिका', author: 'डा. टीकाराम भट्टराई', role: 'राजनीतिक विश्लेषक', avatar: 'https://picsum.photos/seed/op1s/80/80' },
    { id: 41, title: 'कृषि क्षेत्रमा लगानी र खाद्य सुरक्षाको प्रश्न', author: 'प्रा. सरिता खनाल', role: 'अर्थशास्त्री', avatar: 'https://picsum.photos/seed/op2s/80/80' },
    { id: 42, title: 'प्रेस स्वतन्त्रता र जवाफदेहिता: नेपालको सन्दर्भ', author: 'गणेश बहादुर थापा', role: 'वरिष्ठ पत्रकार', avatar: 'https://picsum.photos/seed/op3s/80/80' },
  ];

  const img = (src, seed) => ({
    src: src || `https://picsum.photos/seed/${seed}/80/80`,
    onError: (e) => { e.currentTarget.src = `https://picsum.photos/seed/${seed}/80/80`; },
  });

  return (
    <section>
      <SectionHeader title="विचार" href="/category/vichar" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {opinions.map((op, i) => (
          <article key={op.id} className="p-4 border border-[#ede8e2] cursor-pointer group hover:border-[#8B0000]/40 hover:-translate-y-0.5 transition-all">
            <div className="flex items-center gap-2.5 mb-2.5">
              <img {...img(op.avatar, `av_${i}`)} alt="" className="w-9 h-9 rounded-full object-cover border-2 border-[#ede8e2] flex-shrink-0" />
              <div>
                <p className="text-[0.66rem] font-medium text-[#1c1711] leading-tight">{op.author}</p>
                <p className="text-[0.54rem] text-[#a09488] leading-tight">{op.role}</p>
              </div>
            </div>
            <p className="font-['Playfair_Display'] text-[0.88rem] font-semibold leading-snug italic text-[#1c1711] group-hover:text-[#8B0000] transition-colors">
              {op.title}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default OpinionSection;