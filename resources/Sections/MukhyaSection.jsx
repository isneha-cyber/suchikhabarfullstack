import React from 'react';

const NEWS = [
  { id: 11, title: 'तारिक रहमान बंगलादेशका नयाँ प्रधानमन्त्री, अपराह्न शपथ ग्रहण', category: 'अन्तर्राष्ट्रिय', image: 'https://shuchikhabar.com/public/uploads/699401175f89c.jpg', time: '०४ फागुन', excerpt: 'बंगलादेशमा राजनीतिक परिवर्तनपछि तारिक रहमानले नयाँ प्रधानमन्त्रीको रूपमा शपथ लिएका छन्।' },
  { id: 12, title: 'दाङमा तोरीखेतीको क्षेत्रफल र उत्पादन बढ्दै', category: 'कृषि', image: 'https://shuchikhabar.com/public/uploads/6993fdd82157a.jpg', time: '०४ फागुन', excerpt: 'दाङ जिल्लामा यस वर्ष तोरीखेतीको क्षेत्रफल उल्लेखनीय रूपमा बढेको छ।' },
  { id: 13, title: 'बंगलादेशका प्रधानमन्त्रीको सपथ समारोहमा परराष्ट्रमन्त्री शर्मा सहभागी हुने', category: 'समाचार', image: 'https://shuchikhabar.com/public/uploads/6992e059aaa83.jpg', time: '०३ फागुन', excerpt: 'नेपालका परराष्ट्रमन्त्री डा. आरजु राणा देउवा बंगलादेशको शपथ ग्रहण समारोहमा सहभागी हुन ढाका जाँदैछन्।' },
  { id: 14, title: 'चुरे संरक्षणलाई चुनावी एजेण्डाको प्राथमिकतामा राख्न माग', category: 'समाचार', image: 'https://shuchikhabar.com/public/uploads/69926f3089d64.jpg', time: '०३ फागुन', excerpt: 'नागरिक समाजले आगामी निर्वाचनमा चुरे संरक्षणको विषयलाई एजेण्डा बनाउन माग गरेको छ।' },
  { id: 44, title: 'काठमाडौं उपत्यकामा वायु प्रदूषण चरम सीमामा', category: 'समाचार', image: 'https://picsum.photos/seed/sam5/400/267', time: '०२ फागुन', excerpt: 'राजधानी काठमाडौंको वायु प्रदूषण विश्वकै सबैभन्दा खराब सूचीमा परेको छ।' },
  { id: 45, title: 'सरकारले बजेट संशोधन गर्ने तयारी, संसदमा छलफल', category: 'समाचार', image: 'https://picsum.photos/seed/sam6/400/267', time: '०१ फागुन', excerpt: 'चालु आर्थिक वर्षको बजेटमा संशोधन गर्नुपर्ने अवस्था आएको भन्दै सरकारले संसदमा प्रस्ताव पेस गर्दैछ।' },
  { id: 46, title: 'संसद अधिवेशन बोलाउने तयारी, प्रमुख दलहरूबीच छलफल', category: 'समाचार', image: 'https://picsum.photos/seed/sam7/400/267', time: '३० माघ', excerpt: 'प्रमुख राजनीतिक दलहरूबीच संसद अधिवेशन बोलाउने विषयमा छलफल भइरहेको छ।' },
  { id: 47, title: 'राष्ट्रपतिद्वारा नयाँ राजदूत नियुक्ति', category: 'समाचार', image: 'https://picsum.photos/seed/sam8/400/267', time: '२९ माघ', excerpt: 'राष्ट्रपतिले विभिन्न देशका लागि नयाँ राजदूतहरू नियुक्त गरेका छन्।' },
];

const BREAKING = [
  'निर्वाचन आयोगद्वारा मतदान केन्द्रको सूची सार्वजनिक',
  'प्रधानमन्त्रीले संसदमा विश्वासको मत लिने',
  'काठमाडौंमा थप मेट्रो स्टेशन निर्माण गर्ने घोषणा',
];

const fb = (src, seed) => ({ src: src || `https://picsum.photos/seed/${seed}/400/267`, onError: (e) => { e.currentTarget.src = `https://picsum.photos/seed/${seed}/400/267`; } });
const fbSm = (src, seed) => ({ src: src || `https://picsum.photos/seed/${seed}/200/140`, onError: (e) => { e.currentTarget.src = `https://picsum.photos/seed/${seed}/200/140`; } });

const Badge = ({ label, color = '#1c4587' }) => (
  <span className="inline-block text-white text-[0.5rem] tracking-widest uppercase px-2 py-0.5 leading-none font-semibold" style={{ background: color }}>{label}</span>
);

const MukhyaSection = () => {
  const [featured, ...rest] = NEWS;

  return (
    <div className=" min-h-screen" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Source+Serif+4:wght@400;600&display=swap');`}</style>

      {/* ── Category Banner ── */}
      <div className="relative overflow-hidden mb-0 px-4 sm:px-6 lg:px-12 py-7" style={{ background: 'linear-gradient(135deg, #1c4587ee, #1c458788)' }}>
        <div className="absolute inset-0 opacity-[0.07]" style={{ background: 'repeating-linear-gradient(45deg,#fff,#fff 1px,transparent 1px,transparent 12px)' }} />
        <div className="relative z-10">
          <span className="text-[1.8rem] leading-none block mb-1">📰</span>
          <h1 className="font-['Playfair_Display'] text-2xl sm:text-3xl font-bold text-white">समाचार</h1>
          <p className="text-white/50 text-[0.6rem] tracking-[0.2em] uppercase mt-0.5">News</p>
        </div>
      </div>

      {/* ── Breaking ticker ── */}
      <div className="bg-[#1c4587] flex items-center overflow-hidden">
        <span className="bg-[#8B0000] text-white text-[0.54rem] tracking-widest uppercase px-3 py-2 flex-shrink-0 font-bold">ब्रेकिङ</span>
        <div className="flex items-center px-4 py-2 overflow-hidden">
          <p className="text-white text-[0.72rem] truncate">{BREAKING[0]}</p>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-12 py-7">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
          <div>
            {/* ── Featured story ── */}
            <article className="group cursor-pointer mb-8">
              <div className="relative overflow-hidden aspect-[21/9] bg-[#1c1711]">
                <img {...fb(featured.image, 'sam_feat')} alt={featured.title} className="w-full h-full object-cover opacity-85 group-hover:scale-[1.02] transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(12,8,4,0.88)] via-[rgba(12,8,4,0.1)] to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 text-white">
                  <Badge label={featured.category} />
                  <h2 className="font-['Playfair_Display'] text-xl sm:text-[1.6rem] font-bold leading-tight mt-2 mb-1.5 max-w-2xl">{featured.title}</h2>
                  <p className="text-[0.68rem] text-white/55 line-clamp-2 max-w-xl">{featured.excerpt}</p>
                  <p className="text-[0.56rem] text-white/35 mt-2">{featured.time}</p>
                </div>
              </div>
            </article>

            {/* ── Grid of cards ── */}
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-[3px] h-5 rounded-sm bg-[#1c4587]" />
              <h2 className="font-['Playfair_Display'] text-[1.05rem] font-bold text-[#1c1711]">ताजा समाचार</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {rest.slice(0, 3).map((n, i) => (
                <article key={n.id} className="group cursor-pointer flex flex-col bg-white hover:shadow-md transition-shadow duration-300">
                  <div className="relative overflow-hidden aspect-[3/2] flex-shrink-0">
                    <img {...fb(n.image, `sm_c${i}`)} alt={n.title} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500" />
                    <div className="absolute top-2 left-2"><Badge label={n.category} /></div>
                  </div>
                  <div className="p-3 flex flex-col flex-1">
                    <h3 className="font-['Playfair_Display'] text-[0.88rem] font-bold leading-snug text-[#1c1711] group-hover:text-[#1c4587] transition-colors flex-1">{n.title}</h3>
                    <p className="text-[0.64rem] text-[#a09488] mt-1.5 line-clamp-2">{n.excerpt}</p>
                    <p className="text-[0.54rem] text-[#c0b8b0] mt-2">{n.time}</p>
                  </div>
                </article>
              ))}
            </div>

            {/* ── List view ── */}
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-[3px] h-5 rounded-sm bg-[#1c4587]" />
              <h2 className="font-['Playfair_Display'] text-[1.05rem] font-bold text-[#1c1711]">थप समाचार</h2>
            </div>
            <div className="bg-white border border-[#ede8e2]">
              {rest.slice(3).map((n, i) => (
                <article key={n.id} className="flex gap-4 p-4 border-b border-[rgba(28,23,17,0.07)] last:border-b-0 cursor-pointer group hover:bg-[#faf8f5] transition-colors">
                  <div className="flex-shrink-0 overflow-hidden w-[100px] h-[70px]">
                    <img {...fbSm(n.image, `sm_l${i}`)} alt="" className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500" />
                  </div>
                  <div className="flex flex-col justify-between flex-1 min-w-0">
                    <div>
                      <Badge label={n.category} />
                      <h4 className="font-['Playfair_Display'] text-[0.82rem] font-semibold leading-snug text-[#1c1711] group-hover:text-[#1c4587] transition-colors mt-1">{n.title}</h4>
                      <p className="text-[0.62rem] text-[#a09488] mt-1 line-clamp-1 hidden sm:block">{n.excerpt}</p>
                    </div>
                    <p className="text-[0.54rem] text-[#c0b8b0]">{n.time}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* ── Sidebar ── */}
          <aside className="space-y-6">
            {/* Breaking news list */}
            <div className="bg-white border border-[#ede8e2] p-4">
              <p className="font-['Playfair_Display'] text-[0.88rem] font-bold border-b-2 border-[#1c4587] pb-2 mb-3">ब्रेकिङ समाचार</p>
              {BREAKING.map((b, i) => (
                <div key={i} className="flex gap-2 py-2.5 border-b border-[rgba(28,23,17,0.06)] last:border-b-0 cursor-pointer group">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#8B0000] mt-1.5 flex-shrink-0" />
                  <p className="text-[0.74rem] leading-snug text-[#1c1711] group-hover:text-[#1c4587] transition-colors">{b}</p>
                </div>
              ))}
            </div>
            {/* Most read */}
            <div className="bg-white border border-[#ede8e2] p-4">
              <p className="font-['Playfair_Display'] text-[0.88rem] font-bold border-b-2 border-[#1c1711] pb-2 mb-3">धेरै पढिएको</p>
              {NEWS.slice(0, 5).map((n, i) => (
                <div key={n.id} className="flex gap-2.5 py-2.5 border-b border-[rgba(28,23,17,0.06)] last:border-b-0 cursor-pointer group">
                  <span className="font-['Playfair_Display'] text-[1.4rem] font-bold text-[#ede8e2] leading-none w-6 flex-shrink-0 text-center">{i + 1}</span>
                  <p className="text-[0.72rem] font-medium leading-snug text-[#1c1711] group-hover:text-[#1c4587] transition-colors line-clamp-2">{n.title}</p>
                </div>
              ))}
            </div>
            {/* Ad */}
            <div className="relative overflow-hidden bg-gradient-to-br from-[#1c0f0f] to-[#2a0808] border border-[#8B0000]/30 p-4 cursor-pointer group">
              <span className="text-[0.42rem] tracking-widest uppercase text-[#c9a84c]/60 block mb-2">विज्ञापन</span>
              <p className="text-[0.5rem] tracking-[0.14em] uppercase text-[#c9a84c] mb-1">Buddha Air Nepal</p>
              <p className="font-['Playfair_Display'] text-[0.9rem] text-white font-bold leading-tight mb-3">काठमाडौं–पोखरा <span className="text-[#c9a84c]">रु. ३,९९९ देखि</span></p>
              <span className="text-[0.56rem] bg-[#8B0000] text-white px-3 py-1.5 uppercase tracking-wider group-hover:bg-[#a00000] transition-colors inline-block">बुक गर्नुहोस्</span>
              <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ background: 'repeating-linear-gradient(135deg,#fff,#fff 1px,transparent 1px,transparent 10px)' }} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default MukhyaSection;