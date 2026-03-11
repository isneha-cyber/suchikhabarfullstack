import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import HeaderNavbar from '@/Wrapper/HeaderNavbar';
import Footer from '@/Wrapper/Footer';
import Ticker from '@/MainComponent/Ticker';

/* ---------------- Helpers ---------------- */

function formatDate(str) {
    if (!str) return '';
    return new Date(str).toLocaleDateString('ne-NP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

function stripHtml(html = '') {
    return html.replace(/<[^>]*>/g, '').slice(0, 120);
}

function thumb(article) {
    return article.image
        ? `/storage/${article.image}`
        : `https://picsum.photos/seed/${article.id}/600/340`;
}

/* ---------------- Small UI Components ---------------- */

const Badge = ({ label }) => (
    <span className="inline-flex text-[0.55rem] font-bold tracking-[0.1em] uppercase px-2 py-0.5 bg-[rgba(139,0,0,0.09)] text-[#8B0000]">
        {label}
    </span>
);

const SectionDivider = ({ title, accent = '#8B0000' }) => (
    <div className="flex items-center gap-3 mb-4 mt-1">
        <span className="w-[3px] h-[18px] rounded-full" style={{ background: accent }} />
        <h2 className="text-[0.63rem] font-bold tracking-[0.15em] uppercase text-[#1c1711]">
            {title}
        </h2>
        <div className="flex-1 h-px bg-[rgba(28,23,17,0.08)]" />
    </div>
);

/* ---------------- Cards ---------------- */

const FeaturedCard = ({ article }) => (
    <Link href={`/news/${article.slug}`} className="group block relative overflow-hidden no-underline">
        <div className="aspect-[16/9] overflow-hidden">
            <img
                src={thumb(article)}
                alt={article.heading}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
        </div>
        <div className="p-3 bg-white">
            <Badge label={article.category} />
            <h2 className="font-bold mt-2 text-[#1c1711] line-clamp-2 group-hover:text-[#8B0000]">
                {article.heading}
            </h2>
            <p className="text-[0.7rem] text-[#6b5f55] mt-1 line-clamp-2">
                {stripHtml(article.description || article.content)}
            </p>
        </div>
    </Link>
);

const GridCard = ({ article }) => (
    <Link href={`/news/${article.slug}`} className="group block bg-white border p-3 no-underline">
        <div className="aspect-[16/9] overflow-hidden mb-2">
            <img
                src={thumb(article)}
                alt={article.heading}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
        </div>
        <Badge label={article.category} />
        <h3 className="font-bold text-[0.85rem] mt-1 line-clamp-2 group-hover:text-[#8B0000]">
            {article.heading}
        </h3>
        <span className="text-[0.6rem] text-[#a09488]">
            {formatDate(article.published_at || article.created_at)}
        </span>
    </Link>
);

/* ---------------- MAIN PAGE ---------------- */

export default function CategoryPage() {
    const { slug, category, news } = usePage().props;

    const featured = news.data.slice(0, 2);
    const rest = news.data.slice(2);
    const grid = rest.slice(0, 9);

    return (
        <div className="min-h-screen bg-[#faf9f7]">
            <Ticker />
            <HeaderNavbar />

            {/* Banner */}
            <div className="bg-white border-b py-6 px-6">
                <h1 className="text-2xl font-bold text-[#1c1711]">
                    {category.name}
                </h1>
            </div>

            {/* Body */}
            <div className="px-6 py-8">

                {/* Featured */}
                {featured.length > 0 && (
                    <div className="grid sm:grid-cols-2 gap-4 mb-8">
                        {featured.map((a) => (
                            <FeaturedCard key={a.id} article={a} />
                        ))}
                    </div>
                )}

                {/* Grid */}
                {grid.length > 0 && (
                    <>
                        <SectionDivider title="ताजा समाचार" />
                        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
                            {grid.map((a) => (
                                <GridCard key={a.id} article={a} />
                            ))}
                        </div>
                    </>
                )}

                {/* Pagination */}
                {news.last_page > 1 && (
                    <div className="flex justify-center gap-2 mt-8">
                        {news.links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url || '#'}
                                preserveScroll
                                preserveState
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className={`px-4 py-2 border text-sm ${
                                    link.active
                                        ? 'bg-[#8B0000] text-white border-[#8B0000]'
                                        : 'border-gray-300 text-gray-700'
                                }`}
                            />
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}