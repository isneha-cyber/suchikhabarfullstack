// resources/js/Pages/NewsDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import axios from 'axios';
import HeaderNavbar from '@/Wrapper/HeaderNavbar';
import Footer from '@/Wrapper/Footer';
import Ticker from '@/MainComponent/Ticker';

/* ─── Google Fonts ──────────────────────────────────────────────────────────── */
const Fonts = () => (
    <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600&family=Lora:ital,wght@0,400;0,500;1,400&family=DM+Mono:wght@400;500&display=swap');
    `}</style>
);

/* ─── Helpers ───────────────────────────────────────────────────────────────── */
function formatDate(str) {
    if (!str) return '';
    return new Date(str).toLocaleDateString('ne-NP', {
        year: 'numeric', month: 'long', day: 'numeric',
    });
}

function timeAgo(str) {
    if (!str) return '';
    const diff = Date.now() - new Date(str).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins} मिनेट अघि`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs} घण्टा अघि`;
    return `${Math.floor(hrs / 24)} दिन अघि`;
}

function thumb(article, w = 800, h = 450) {
    if (article?.image) {
        return `/storage/${article.image}`;
    }
    return `https://picsum.photos/seed/${article?.id ?? 1}/${w}/${h}`;
}

/* ─── Shared UI Primitives ──────────────────────────────────────────── */
const CategoryLabel = ({ label }) => (
    <span className="font-mono text-[0.6rem] font-semibold tracking-[0.18em] uppercase text-[#c0392b] border-b border-[#c0392b] pb-[1px]">
        {label}
    </span>
);

const SectionHeading = ({ title, action }) => (
    <div className="flex items-center gap-4 mb-6">
        <div className="w-1 h-5 bg-[#c0392b]" />
        <h2 className="font-mono text-[0.65rem] font-bold tracking-[0.2em] uppercase text-[#111]">
            {title}
        </h2>
        <div className="flex-1 h-px bg-[#e0e0e0]" />
        {action}
    </div>
);

const Datestamp = ({ date }) => (
    <time className="font-mono text-[0.6rem] tracking-widest text-[#aaa] uppercase">
        {date}
    </time>
);

/* ─── Share Bar ─────────────────────────────────────────────────────────────── */
const ShareBar = ({ title }) => {
    const [copied, setCopied] = useState(false);
    const url = typeof window !== 'undefined' ? window.location.href : '';
    
    const copy = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-[#aaa]">
                साझा:
            </span>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
                target="_blank" rel="noopener noreferrer"
                className="font-mono text-[0.6rem] font-semibold tracking-[0.08em] px-3.5 py-1.5 bg-[#1877F2] text-white hover:opacity-90 transition-opacity">
                FB
            </a>
            <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
                target="_blank" rel="noopener noreferrer"
                className="font-mono text-[0.6rem] font-semibold tracking-[0.08em] px-3.5 py-1.5 bg-[#1DA1F2] text-white hover:opacity-90 transition-opacity">
                TW
            </a>
            <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + url)}`}
                target="_blank" rel="noopener noreferrer"
                className="font-mono text-[0.6rem] font-semibold tracking-[0.08em] px-3.5 py-1.5 bg-[#25D366] text-white hover:opacity-90 transition-opacity">
                WA
            </a>
            <button onClick={copy}
                className="font-mono text-[0.6rem] font-semibold tracking-[0.08em] px-3.5 py-1.5 bg-transparent text-[#555] border border-[#ccc] hover:border-[#c0392b] hover:text-[#c0392b] transition-colors">
                {copied ? '✓ कपी' : 'लिङ्क'}
            </button>
        </div>
    );
};

/* ─── Related Card (sidebar) ────────────────────────────────────────────────── */
const RelatedCard = ({ article }) => (
    <Link href={`/news/${article.slug}`}
        className="flex gap-3 no-underline pb-4 mb-4 border-b border-[#ebebeb] last:border-0 last:mb-0 last:pb-0 group">
        <div className="flex-shrink-0 w-20 h-[62px] overflow-hidden">
            <img src={thumb(article, 300, 200)} alt={article.heading}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.07]" />
        </div>
        <div className="min-w-0">
            <CategoryLabel label={article.category} />
            <p className="font-playfair text-[0.82rem] font-bold leading-tight my-1 text-[#111] line-clamp-2 group-hover:text-[#c0392b] transition-colors duration-200">
                {article.heading}
            </p>
            <Datestamp date={timeAgo(article.created_at)} />
        </div>
    </Link>
);

/* ─── More Card (bottom grid) ───────────────────────────────────────────────── */
const MoreCard = ({ article }) => (
    <Link href={`/news/${article.slug}`}
        className="block border border-[#ebebeb] bg-white no-underline group hover:border-[#c0392b] transition-colors duration-200">
        <div className="aspect-video overflow-hidden">
            <img src={thumb(article, 400, 225)} alt={article.heading}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]" />
        </div>
        <div className="p-4">
            <CategoryLabel label={article.category} />
            <p className="font-playfair text-[0.88rem] font-bold leading-tight my-1.5 text-[#111] line-clamp-2 group-hover:text-[#c0392b] transition-colors duration-200">
                {article.heading}
            </p>
            <Datestamp date={timeAgo(article.created_at)} />
        </div>
    </Link>
);

/* ─── Banner Ad Component ─────────────────────────────────────────────────── */
const BannerAd = ({ banner, height = 250 }) => {
    if (!banner) return (
        <div 
            style={{ height: `${height}px` }}
            className="border border-dashed border-[#ddd] bg-[#f7f6f4] flex items-center justify-center"
        >
            <span className="font-mono text-[0.55rem] tracking-[0.2em] uppercase text-[#ccc]">
                विज्ञापन
            </span>
        </div>
    );

    const BannerContent = () => (
        <img 
            src={banner.image} 
            alt="Advertisement"
            className="w-full h-full object-cover"
        />
    );

    if (banner.link) {
        return (
            <a 
                href={banner.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ height: `${height}px` }}
                className="block border border-[#ddd] bg-[#f7f6f4] overflow-hidden hover:opacity-95 transition-opacity"
            >
                <BannerContent />
            </a>
        );
    }

    return (
        <div 
            style={{ height: `${height}px` }}
            className="border border-[#ddd] bg-[#f7f6f4] overflow-hidden"
        >
            <BannerContent />
        </div>
    );
};

/* ─── MAIN PAGE ──────────────────────────────────────────────────────────────── */
export default function NewsDetails() {
    const { slug, newsdetails } = usePage().props;

    const [article, setArticle] = useState(newsdetails || null);
    const [related, setRelated] = useState([]);
    const [squareBanners, setSquareBanners] = useState([]);
    const [loading, setLoading] = useState(!newsdetails);
    const [error, setError] = useState(null);
    const [bannerLoading, setBannerLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;
        
        // If we already have newsdetails from props, we still might want to fetch related articles
        if (newsdetails) {
            fetchRelatedArticles();
        } else {
            fetchFullArticle();
        }
        
        // Fetch square banners
        fetchSquareBanners();
        
        window.scrollTo(0, 0);
    }, [slug]);

    const fetchSquareBanners = async () => {
        setBannerLoading(true);
        try {
            const { data } = await axios.get('/banner');
            if (data.success && data.data) {
                // Filter only square banners
                const squares = data.data.filter(banner => banner.category === 'Square');
                setSquareBanners(squares);
            }
        } catch (err) {
            console.error('Error fetching banners:', err);
            setSquareBanners([]);
        } finally {
            setBannerLoading(false);
        }
    };

    const fetchRelatedArticles = async () => {
        try {
            const { data } = await axios.get(`/api/news/${encodeURIComponent(slug)}`);
            if (data.related) {
                setRelated(data.related);
            }
        } catch (err) {
            console.error('Error fetching related articles:', err);
        }
    };

    const fetchFullArticle = async () => {
        setLoading(true);
        setError(null);
        
        try {
            const { data } = await axios.get(`/api/news/${encodeURIComponent(slug)}`);
            setArticle(data.data);
            setRelated(data.related || []);
        } catch (err) {
            setError('समाचार लोड गर्न सकिएन।');
            console.error('Error fetching article:', err);
        } finally {
            setLoading(false);
        }
    };

    // Get banners for different positions
    const getBannerForPosition = (position) => {
        if (!squareBanners.length) return null;
        
        // Simple round-robin distribution based on position
        // You can implement more sophisticated logic here
        const index = position % squareBanners.length;
        return squareBanners[index];
    };

    // Process content into paragraphs
    const paragraphs = article
        ? article.description
            ? article.description
                .replace(/<\/p>/gi, '\n')
                .replace(/<[^>]*>/g, '')
                .split('\n')
                .map((s) => s.trim())
                .filter(Boolean)
            : []
        : [];

    // Parse tags if they exist
    const tags = article?.tags
        ? (Array.isArray(article.tags) ? article.tags : 
           typeof article.tags === 'string' ? JSON.parse(article.tags) : [])
        : [];

    // Show loading state
    if (loading) {
        return (
            <>
                <Fonts />
                <div className="min-h-screen bg-[#f7f6f4] font-lora">
                    <Ticker />
                    <HeaderNavbar />
                    <div className="flex flex-col items-center justify-center py-24 gap-3">
                        <div className="w-7 h-7 border-2 border-[#c0392b] border-t-transparent rounded-full animate-spin" />
                        <span className="font-mono text-[0.65rem] text-[#aaa] tracking-[0.15em]">
                            लोड हुँदैछ...
                        </span>
                    </div>
                    <Footer />
                </div>
            </>
        );
    }

    // Show error state
    if (error) {
        return (
            <>
                <Fonts />
                <div className="min-h-screen bg-[#f7f6f4] font-lora">
                    <Ticker />
                    <HeaderNavbar />
                    <div className="text-center py-16">
                        <p className="text-[#c0392b] font-mono text-[0.75rem]">{error}</p>
                    </div>
                    <Footer />
                </div>
            </>
        );
    }

    // Show nothing if no article
    if (!article) return null;

    return (
        <>
            <Fonts />
            <div className="min-h-screen bg-[#f7f6f4] font-lora">
                <Ticker />
                <HeaderNavbar />

                {/* Breadcrumb */}
                <div className="bg-white border-b border-[#e5e5e5]">
                    <div className="max-w-7xl mx-auto px-6 py-2.5 flex items-center gap-2 font-mono text-[0.6rem] tracking-[0.1em] text-[#aaa] overflow-x-auto">
                        <Link href="/" className="text-[#aaa] hover:text-[#c0392b] whitespace-nowrap">गृहपृष्ठ</Link>
                        <span>›</span>
                        {article?.category && (
                            <>
                                <Link href={`/category/${article.category}`} className="text-[#aaa] hover:text-[#c0392b] whitespace-nowrap">
                                    {article.category}
                                </Link>
                                <span>›</span>
                            </>
                        )}
                        <span className="text-[#777] truncate max-w-xs">
                            {article?.heading?.slice(0, 45)}...
                        </span>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-6 py-10">
                    <div className="flex flex-col lg:flex-row gap-12 items-start">
                        {/* Article */}
                        <article className="flex-1 min-w-0">
                            {/* Category + meta */}
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                <Link href={`/category/${article.category}`}
                                    className="font-mono text-[0.6rem] font-semibold tracking-[0.18em] uppercase bg-[#111] text-white px-3 py-1.5">
                                    {article.category}
                                </Link>
                                <span className="font-mono text-[0.6rem] text-[#aaa] tracking-[0.08em]">
                                    👁 {(article.views ?? 0).toLocaleString('ne-NP')}
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="font-playfair text-[clamp(1.5rem,3vw,2rem)] font-extrabold leading-tight tracking-tight text-[#111] mb-5">
                                {article.heading}
                            </h1>

                            {/* Thick rule */}
                            <div className="h-[3px] w-12 bg-[#111] mb-5" />

                            {/* Author bar */}
                            <div className="flex flex-wrap items-center gap-3 py-3 border-t border-b border-[#e5e5e5] mb-7">
                                <div className="w-9 h-9 bg-[#111] flex items-center justify-center text-white flex-shrink-0 font-playfair font-bold text-[0.9rem]">
                                    {article.blog_by?.charAt(0) ?? 'श'}
                                </div>
                                <div>
                                    <p className="m-0 text-[0.78rem] font-semibold text-[#111] leading-tight">
                                        {article.blog_by || 'शुचिखबर'}
                                    </p>
                                    <p className="m-0 mt-0.5 font-mono text-[0.55rem] text-[#aaa] tracking-[0.1em]">
                                        संवाददाता, शुचिखबर
                                    </p>
                                </div>
                                <div className="ml-auto text-right">
                                    <p className="m-0 font-mono text-[0.62rem] text-[#555] tracking-[0.06em]">
                                        {formatDate(article.published_at || article.created_at)}
                                    </p>
                                    <p className="m-0 mt-0.5 font-mono text-[0.55rem] text-[#aaa]">
                                        {timeAgo(article.published_at || article.created_at)}
                                    </p>
                                </div>
                            </div>

                            {/* Hero image */}
                            <div className="relative overflow-hidden mb-8">
                                <img src={thumb(article, 1200, 600)} alt={article.heading}
                                    className="w-full aspect-video object-cover" />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/45 to-transparent p-6 pb-2.5">
                                    <p className="m-0 font-mono text-[0.55rem] text-white/55 tracking-[0.1em]">
                                        तस्बिर: शुचिखबर
                                    </p>
                                </div>
                            </div>

                            {/* Article body */}
                            <div className="prose prose-lg max-w-none">
                                {paragraphs.length > 0 ? (
                                    paragraphs.map((para, i) => (
                                        <p key={i} className="text-[clamp(0.85rem,1.5vw,0.92rem)] leading-relaxed text-[#3d3530] mb-4">
                                            {para}
                                        </p>
                                    ))
                                ) : (
                                    <div dangerouslySetInnerHTML={{ __html: article.description }} />
                                )}
                            </div>

                            {/* Tags */}
                            {tags.length > 0 && (
                                <div className="flex flex-wrap items-center gap-2 mt-7 pt-5 border-t border-[#e5e5e5]">
                                    <span className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-[#aaa]">
                                        ट्याग:
                                    </span>
                                    {tags.map((tag) => (
                                        <span key={tag} className="font-mono text-[0.62rem] px-3 py-1.5 border border-[#ddd] text-[#555] cursor-pointer hover:border-[#c0392b] hover:text-[#c0392b] transition-colors">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Share */}
                            <div className="mt-6 pt-5 border-t border-[#e5e5e5]">
                                <ShareBar title={article.heading} />
                            </div>

                            {/* Comments */}
                            <section className="mt-12 pt-8 border-t-2 border-[#111]">
                                <SectionHeading title="टिप्पणीहरू" />
                                <div className="bg-white border border-[#ebebeb] p-6">
                                    <p className="m-0 mb-3 text-[0.75rem] text-[#777]">
                                        तपाईंको विचार साझा गर्नुहोस्
                                    </p>
                                    <textarea rows={3}
                                        placeholder="यहाँ लेख्नुहोस्..."
                                        className="w-full border border-[#e0e0e0] p-2.5 text-[0.82rem] text-[#111] resize-none outline-none bg-[#f7f6f4] focus:border-[#c0392b] transition-colors"
                                    />
                                    <div className="flex justify-end mt-3">
                                        <button className="font-mono text-[0.65rem] font-semibold tracking-[0.12em] uppercase px-6 py-2.5 bg-[#111] text-white hover:bg-[#c0392b] transition-colors">
                                            पठाउनुहोस्
                                        </button>
                                    </div>
                                </div>
                            </section>
                        </article>

                        {/* Sidebar */}
                        <aside className="w-80 flex-shrink-0 hidden lg:flex flex-col gap-6">
                            {/* Top Banner - Square */}
                            {!bannerLoading && (
                                <BannerAd 
                                    banner={getBannerForPosition(0)} 
                                    height={250}
                                />
                            )}
                            
                            {related.length > 0 && (
                                <div className="bg-white border border-[#ebebeb] p-5">
                                    <SectionHeading title="सम्बन्धित समाचार" />
                                    {related.map((a) => <RelatedCard key={a.id} article={a} />)}
                                </div>
                            )}
                            
                            {/* Bottom Banner - Square */}
                            {!bannerLoading && (
                                <BannerAd 
                                    banner={getBannerForPosition(1)} 
                                    height={280}
                                />
                            )}
                        </aside>
                    </div>
                </div>

                {/* More from category */}
                {related.length > 0 && (
                    <section className="bg-white border-t-2 border-[#111] mt-4">
                        <div className="max-w-7xl mx-auto px-6 py-10">
                            <SectionHeading
                                title={`${article.category} — थप समाचार`}
                                action={
                                    <Link href={`/category/${article.category}`}
                                        className="font-mono text-[0.6rem] tracking-[0.1em] text-[#c0392b]">
                                        सबै हेर्नुहोस् →
                                    </Link>
                                }
                            />
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                                {related.slice(0, 4).map((a) => <MoreCard key={a.id} article={a} />)}
                            </div>
                        </div>
                    </section>
                )}

                <Footer />
            </div>
        </>
    );
}