import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ProductCard, { Product } from './product-card';
import SectionTitle from '../ui/section-title';
import { Button } from '../ui/button';

export default function FeaturedProducts({ featuredProducts }: { featuredProducts: Product[] }) {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.language === 'ar';
    const [activeTab, setActiveTab] = useState('All');

    // Build dynamic tabs from the categories of the featured products
    const uniqueCategories = Array.from(
        new Set(
            featuredProducts?.map(p => p.category ? (isRtl ? p.category.name_ar : p.category.name_en) : null)
                .filter(Boolean)
        )
    ) as string[];

    const tabs = ['All', ...uniqueCategories];

    const filtered = activeTab === 'All'
        ? featuredProducts
        : featuredProducts?.filter(p => {
            const catName = p.category ? (isRtl ? p.category.name_ar : p.category.name_en) : null;
            return catName === activeTab;
        });

    return (
        <section className="py-14 bg-white">
            <div className="max-w-7xl mx-auto px-4">



                <SectionTitle title={t('home.featured.label')} subtitle={t('home.featured.title', 'Handpicked')} actiontitle={t('home.featured.view_all', 'View All Products')} />
                {/* Tab Filters */}
                <div className="flex gap-2 flex-wrap mb-8">
                    {tabs.map((tab) => (
                        <Button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-5 py-2 text-sm font-medium rounded-full border transition-all duration-200 ${activeTab === tab
                                ? ' text-white  shadow-md shadow-amber-200'
                                : 'text-gray-600 border-gray-200 hover:border-[#c96] hover:text-white bg-white'
                                }`}
                        >
                            {tab}
                        </Button>
                    ))}
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-5">
                    {filtered?.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {/* Load More */}
                <div className="text-center mt-10">
                    <a href="/shop" className="group inline-flex items-center gap-2 px-8 py-3 border-2 border-primary text-primary font-semibold text-sm rounded-full hover:bg-primary hover:text-white transition-all duration-300">
                        {t('home.featured.load_more')}
                        {isRtl ? <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> : <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                    </a>
                </div>
            </div>
        </section>
    );
}
