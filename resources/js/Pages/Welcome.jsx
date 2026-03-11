// import AdFooterStrip from '@/Ads/AdFooterStrip';
import AdLeaderboard from '@/Ads/AdLeaderboard';
import AdMidStrip from '@/Ads/AdMidStrip';
import AdSidebarBox from '@/Ads/AdSidebarBox';
import AdSkyscraper from '@/Ads/AdSkyscraper';
import MostRead from '@/MainComponent/MostRead';
import PhotoGallery from '@/MainComponent/PhotoGallery';
import Ticker from '@/MainComponent/Ticker';
import Weather from '@/MainComponent/Weather';
import Footer from '@/Wrapper/Footer';

import React, { useState } from 'react';
import ArthatatwaSection from '@/Sections/ArthatatwaSection';
import DharmicSection from '@/Sections/DharmicSection';
import HealthSection from '@/Sections/HealthSection';
import HeroSection from '@/Sections/HeroSection';
import InternationalSection from '@/Sections/InternationalSection';
import KrishiSection from '@/Sections/KrishiSection';
import ManoranjanSection from '@/Sections/ManoranjanSection';
import MukhyaSection from '@/Sections/MukhyaSection';
import OpinionSection from '@/Sections/OpinionSection';
import SamacharSection from '@/Sections/SamacharSection';
import SportsSection from '@/Sections/SportsSection';
import VideoSection from '@/Sections/VideoSection';
import HeaderNavbar from '@/Wrapper/HeaderNavbar';

const Welcome = ({ latestNews, todayNews, categoryNews, categoryBanners }) => {
  const [activeNav, setActiveNav] = useState(0);

  console.log(latestNews)

  return (
    <div className="min-h-screen bg-[#fdfcfb]">
      {/* Ticker */}
      <Ticker />

      {/* Ad Leaderboard */}
      <AdLeaderboard />

<HeaderNavbar/>
     

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-12">
        {/* Hero Section */}
         <HeroSection latestNews={latestNews} />

        {/* Mukhya Section with Ad */}
        <MukhyaSection />

        {/* Mid Strip Ad */}
        <AdMidStrip />

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8 lg:gap-10">
          {/* Main Column */}
          <div className="flex flex-col space-y-7 min-w-0">
            <SamacharSection />
            <ArthatatwaSection />
            <KrishiSection />
            <OpinionSection />
            <ManoranjanSection />
          </div>

          {/* Sidebar */}
          <aside className="lg:border-l lg:border-[rgba(28,23,17,0.07)] lg:pl-6 pt-0 flex flex-col space-y-6">
            <Weather />
            <AdSidebarBox />
            <MostRead />
            <AdSkyscraper />
            <DharmicSection />
            <VideoSection />
          </aside>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#ede8e2] my-7" />

        {/* Sports Section */}
        <SportsSection />

        {/* Health and International */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 mb-8">
          <HealthSection />
          <InternationalSection />
        </div>

        {/* Photo Gallery */}
        <PhotoGallery />
      </main>

      {/* Footer Ad */}
      {/* <AdFooterStrip /> */}

      {/* Footer */}
      <Footer />

      {/* Global Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Source+Serif+4:ital,wght@0,300;0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        body { margin: 0; background: #fdfcfb; }
        ::-webkit-scrollbar { height: 0; width: 0; }
        scrollbar-width: none;
        img { display: block; }
        a { text-decoration: none; }
        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default Welcome;