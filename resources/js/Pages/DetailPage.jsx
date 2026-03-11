// resources/js/Pages/NewsDetailPage.jsx
// Route: shuchikhabar.com/news/{slug}

import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import axios from 'axios';
import HeaderNavbar from '@/Wrapper/HeaderNavbar';
import Footer from '@/Wrapper/Footer';
import Ticker from '@/MainComponent/Ticker';

// ─── Helpers ─────────────────────────────────────────────────────────────────
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
function thumb(a, w = 800, h = 450) {
    return a?.image ? `/storage/${a.image}` : `https://picsum.photos/seed/${a?.id ?? 1}/${w}/${h}`;
}

// ─── Share Buttons ────────────────────────────────────────────────────────────
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
            <span className="text-[0.58rem] tracking-[0.12em] uppercase text-[#a09488]">साझा:</span>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer"
                className="px-3 py-1.5 text-white text-[0.6rem] font-bold no-underline" style={{ background: '#1877F2' }}>FB</a>
            <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`} target="_blank" rel="noopener noreferrer"
                className="px-3 py-1.5 text-white text-[0.6rem] font-bold no-underline" style={{ background: '#1DA1F2' }}>TW</a>
            <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + url)}`} target="_blank" rel="noopener noreferrer"
                className="px-3 py-1.5 text-white text-[0.6rem] font-bold no-underline" style={{ background: '#25D366' }}>WA</a>
            <button onClick={copy}
                className="px-3 py-1.5 text-[0.6rem] font-medium border border-[rgba(28,23,17,0.18)] text-[#6b5f55] bg-transparent cursor-pointer hover:bg-[rgba(28,23,17,0.04)] transition-colors">
                {copied ? '✓ कपी' : 'लिङ्क'}
            </button>
        </div>
    );
};

// ─── Related card ─────────────────────────────────────────────────────────────
const RelatedCard = ({ article }) => (
    <Link href={`/news/${article.slug}`} className="group flex gap-3 no-underline">
        <div className="flex-shrink-0 w-[76px] h-[58px] overflow-hidden">
            <img src={thumb(article, 300, 200)} alt={article.heading}
                className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105" />
        </div>
        <div className="flex-1 min-w-0">
            <span className="inline-flex text-[0.53rem] font-bold tracking-[0.1em] uppercase px-1.5 py-0.5 bg-[rgba(139,0,0,0.08)] text-[#8B0000]">
                {article.category?.name}
            </span>
            <p className="font-['Playfair_Display'] text-[0.73rem] font-bold text-[#1c1711] line-clamp-2 leading-snug mt-0.5 group-hover:text-[#8B0000] transition-colors">
                {article.heading}
            </p>
            <span className="text-[#a09488] text-[0.56rem] mt-0.5 block">{timeAgo(article.created_at)}</span>
        </div>
    </Link>
);

// ─── Bottom "more from category" card ────────────────────────────────────────
const MoreCard = ({ article }) => (
    <Link href={`/news/${article.slug}`} className="group block no-underline overflow-hidden border border-[rgba(28,23,17,0.08)] hover:border-[rgba(139,0,0,0.2)] bg-[#faf9f7] hover:bg-white transition-all">
        <div className="overflow-hidden aspect-[16/9]">
            <img src={thumb(article, 400, 225)} alt={article.heading}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        </div>
        <div className="p-3">
            <span className="inline-flex text-[0.53rem] font-bold tracking-[0.1em] uppercase text-[#8B0000]">
                {article.category?.name}
            </span>
            <p className="font-['Playfair_Display'] text-[0.78rem] font-bold text-[#1c1711] line-clamp-2 leading-snug mt-1 group-hover:text-[#8B0000] transition-colors">
                {article.heading}
            </p>
            <span className="text-[#a09488] text-[0.56rem] mt-1 block">{timeAgo(article.created_at)}</span>
        </div>
    </Link>
);

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function DetailPage() {
    const { slug } = usePage().props;  // from Inertia::render('NewsDetailPage', ['slug' => $slug])

    const [article, setArticle]   = useState(null);
    const [related, setRelated]   = useState([]);
    const [loading, setLoading]   = useState(true);
    const [error, setError]       = useState(null);

    useEffect(() => {
        if (!slug) return;
        setLoading(true);
        setError(null);
        window.scrollTo(0, 0);

        axios.get(`/api/v1/news/${encodeURIComponent(slug)}`)
            .then(({ data }) => {
                setArticle(data.data);
                setRelated(data.related || []);
            })
            .catch(() => setError('समाचार लोड गर्न सकिएन।'))
            .finally(() => setLoading(false));
    }, [slug]);

    // Build paragraphs from content (supports plain text or HTML)
    const paragraphs = article
        ? article.content
            .replace(/<\/p>/gi, '\n')
            .replace(/<[^>]*>/g, '')
            .split('\n')
            .map((s) => s.trim())
            .filter(Boolean)
        : [];

    // Extract tags from heading words as fallback (replace with real tags field)
    const tags = article?.tags
        ? (Array.isArray(article.tags) ? article.tags : JSON.parse(article.tags))
        : [];

    return (
        <div className="min-h-screen bg-[#faf9f7]" style={{ fontFamily: "'Noto Serif Devanagari', serif" }}>
            <Ticker />
            <HeaderNavbar />

            {/* Breadcrumb */}
            <div className="bg-white border-b border-[rgba(28,23,17,0.08)]">
                <div className="px-4 sm:px-6 lg:px-12 py-2.5 flex items-center gap-2 text-[0.6rem] text-[#a09488] overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
                    <Link href="/" className="hover:text-[#8B0000] no-underline whitespace-nowrap">गृहपृष्ठ</Link>
                    <span>›</span>
                    {article?.category && (
                        <>
                            <Link href={`/${article.category.slug}`} className="hover:text-[#8B0000] no-underline whitespace-nowrap">
                                {article.category.name}
                            </Link>
                            <span>›</span>
                        </>
                    )}
                    <span className="text-[#6b5f55] line-clamp-1 max-w-xs truncate">
                        {article?.heading?.slice(0, 40)}...
                    </span>
                </div>
            </div>

            {/* Body */}
            <div className="px-4 sm:px-6 lg:px-12 py-6 sm:py-8">

                {loading && (
                    <div className="flex flex-col items-center justify-center py-24 gap-3">
                        <div className="w-8 h-8 border-2 border-[#8B0000] border-t-transparent rounded-full animate-spin" />
                        <span className="text-[0.72rem] text-[#a09488]">लोड हुँदैछ...</span>
                    </div>
                )}

                {error && (
                    <div className="text-center py-16">
                        <p className="text-[#8B0000] text-sm">{error}</p>
                    </div>
                )}

                {!loading && !error && article && (
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 max-w-[1280px] mx-auto">

                        {/* ── Article ──────────────────────────── */}
                        <article className="flex-1 min-w-0">

                            {/* Category + meta */}
                            <div className="flex flex-wrap items-center gap-2.5 mb-3">
                                <Link href={`/${article.category?.slug}`}
                                    className="inline-flex text-[0.56rem] font-bold tracking-[0.12em] uppercase px-2 py-1 bg-[#8B0000] text-white no-underline">
                                    {article.category?.name}
                                </Link>
                                <span className="flex items-center gap-1 text-[0.58rem] text-[#a09488]">⏱ {article.read_time} पढ्ने</span>
                                <span className="flex items-center gap-1 text-[0.58rem] text-[#a09488]">
                                    👁 {(article.views ?? 0).toLocaleString('ne-NP')}
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="font-['Playfair_Display'] text-[#1c1711] text-xl sm:text-2xl md:text-[1.75rem] font-bold leading-snug mb-4">
                                {article.heading}
                            </h1>

                            {/* Author bar */}
                            <div className="flex flex-wrap items-center gap-3 py-3 border-y border-[rgba(28,23,17,0.1)] mb-5">
                                <div className="w-9 h-9 bg-[#8B0000] flex items-center justify-center text-white text-[0.75rem] font-bold flex-shrink-0">
                                    {article.author?.charAt(0) ?? 'श'}
                                </div>
                                <div>
                                    <p className="text-[0.75rem] font-semibold text-[#1c1711] leading-none">{article.author}</p>
                                    <p className="text-[0.58rem] text-[#a09488] mt-0.5">संवाददाता, शुचिखबर</p>
                                </div>
                                <div className="ml-auto text-right">
                                    <p className="text-[0.63rem] text-[#1c1711] font-medium">{formatDate(article.created_at)}</p>
                                    <p className="text-[0.56rem] text-[#a09488] mt-0.5">{timeAgo(article.created_at)}</p>
                                </div>
                            </div>

                            {/* Hero image */}
                            <div className="relative mb-5 overflow-hidden">
                                <img src={thumb(article, 1200, 600)} alt={article.heading}
                                    className="w-full aspect-[16/9] object-cover" />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/40 to-transparent px-4 py-2">
                                    <p className="text-white/60 text-[0.56rem]">तस्बिर: शुचिखबर</p>
                                </div>
                            </div>

                            {/* Content */}
                            <div>
                                {paragraphs.map((para, i) => (
                                    <React.Fragment key={i}>
                                        {/* Pull quote at paragraph 3 */}
                                        {i === 2 && paragraphs[0] && (
                                            <blockquote className="my-5 border-l-[4px] border-[#8B0000] pl-5 pr-4 py-2 bg-[rgba(139,0,0,0.03)]">
                                                <p className="font-['Playfair_Display'] text-[#8B0000] text-[0.95rem] italic leading-relaxed font-semibold">
                                                    "{paragraphs[0].slice(0, 90)}..."
                                                </p>
                                            </blockquote>
                                        )}
                                        <p className="text-[#3d3530] text-[0.83rem] sm:text-[0.87rem] leading-[1.95] mb-4">
                                            {para}
                                        </p>
                                    </React.Fragment>
                                ))}
                            </div>

                            {/* Tags */}
                            {tags.length > 0 && (
                                <div className="flex flex-wrap items-center gap-2 mt-5 pt-5 border-t border-[rgba(28,23,17,0.1)]">
                                    <span className="text-[0.58rem] tracking-[0.12em] uppercase text-[#a09488]">ट्याग:</span>
                                    {tags.map((tag) => (
                                        <span key={tag} className="px-2.5 py-1 text-[0.63rem] text-[#6b5f55] border border-[rgba(28,23,17,0.14)] hover:border-[#8B0000] hover:text-[#8B0000] transition-colors cursor-pointer">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Share */}
                            <div className="mt-5 pt-5 border-t border-[rgba(28,23,17,0.1)]">
                                <ShareBar title={article.heading} />
                            </div>

                            {/* Comment box */}
                            <section className="mt-8 pt-6 border-t border-[rgba(28,23,17,0.1)]">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="w-[3px] h-5 bg-[#8B0000] rounded-full" />
                                    <h3 className="text-[0.65rem] font-bold tracking-[0.14em] uppercase text-[#1c1711]">टिप्पणीहरू</h3>
                                </div>
                                <div className="bg-white border border-[rgba(28,23,17,0.1)] p-4">
                                    <p className="text-[0.7rem] text-[#6b5f55] mb-3">तपाईंको विचार साझा गर्नुहोस्</p>
                                    <textarea rows={3} placeholder="यहाँ लेख्नुहोस्..."
                                        className="w-full border border-[rgba(28,23,17,0.14)] px-3 py-2.5 text-[0.78rem] text-[#1c1711] resize-none outline-none focus:border-[#8B0000] transition-colors bg-[#faf9f7] placeholder:text-[#c0b8b0]"
                                        style={{ fontFamily: "'Noto Serif Devanagari', serif" }}
                                    />
                                    <div className="flex justify-end mt-3">
                                        <button className="px-5 py-2 bg-[#8B0000] text-white text-[0.66rem] font-medium tracking-wide uppercase hover:bg-[#6d0000] transition-colors cursor-pointer border-none"
                                            style={{ fontFamily: "'Noto Serif Devanagari', serif" }}>
                                            पठाउनुहोस्
                                        </button>
                                    </div>
                                </div>
                            </section>
                        </article>

                        {/* ── Sidebar ───────────────────────────── */}
                        <aside className="w-full lg:w-[272px] xl:w-[290px] flex-shrink-0 flex flex-col gap-5">

                            {/* Ad */}
                            <div className="bg-[rgba(28,23,17,0.03)] border border-dashed border-[rgba(28,23,17,0.14)] flex items-center justify-center h-[250px]">
                                <span className="text-[0.56rem] tracking-[0.12em] uppercase text-[#c0b8b0]">विज्ञापन</span>
                            </div>

                            {/* Related */}
                            {related.length > 0 && (
                                <div className="bg-white border border-[rgba(28,23,17,0.08)] p-4">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="w-[3px] h-5 bg-[#8B0000] rounded-full" />
                                        <h3 className="text-[0.63rem] font-bold tracking-[0.14em] uppercase text-[#1c1711]">सम्बन्धित समाचार</h3>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        {related.map((a) => <RelatedCard key={a.id} article={a} />)}
                                    </div>
                                </div>
                            )}

                            {/* Second ad */}
                            <div className="bg-[rgba(28,23,17,0.03)] border border-dashed border-[rgba(28,23,17,0.14)] flex items-center justify-center aspect-square">
                                <span className="text-[0.56rem] tracking-[0.12em] uppercase text-[#c0b8b0]">विज्ञापन</span>
                            </div>
                        </aside>
                    </div>
                )}
            </div>

            {/* More from category */}
            {!loading && article && related.length > 0 && (
                <section className="bg-white border-t border-[rgba(28,23,17,0.1)] mt-4">
                    <div className="px-4 sm:px-6 lg:px-12 py-7">
                        <div className="flex items-center gap-3 mb-5">
                            <span className="w-[3px] h-5 bg-[#c9a84c] rounded-full" />
                            <h3 className="text-[0.65rem] font-bold tracking-[0.14em] uppercase text-[#1c1711]">
                                {article.category?.name} — थप समाचार
                            </h3>
                            <div className="flex-1 h-px bg-[rgba(28,23,17,0.08)]" />
                            <Link href={`/${article.category?.slug}`} className="text-[0.6rem] text-[#8B0000] hover:underline no-underline">
                                सबै हेर्नुहोस् →
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {related.slice(0, 4).map((a) => <MoreCard key={a.id} article={a} />)}
                        </div>
                    </div>
                </section>
            )}

            <Footer />
        </div>
    );
}