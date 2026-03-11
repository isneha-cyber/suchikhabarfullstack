import React from 'react';

const SectionHeader = ({ title, link = 'थप सामाग्री →', href = '#' }) => (
  <div className="flex items-baseline gap-3 border-b-2 border-[#1c1711] pb-2 mb-4">
    <h2 className="font-['Playfair_Display'] text-[1.05rem] font-bold tracking-tight text-[#1c1711] leading-none">{title}</h2>
    <a href={href} className="ml-auto text-[0.66rem] text-[#8B0000] tracking-wider uppercase font-medium hover:underline whitespace-nowrap no-underline">{link}</a>
  </div>
);

export default SectionHeader;