import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { router } from '@inertiajs/react';
import ProductCard from './product-card';

export default function ProductsSection({ products }: { products: any }) {
    const { t } = useTranslation();
    const [productsData, setProductsData] = useState(products.data || []);
    const [nextPage, setNextPage] = useState(products.next_page_url);
    const [loading, setLoading] = useState(false);

    const loadMore = () => {
        if (!nextPage) return;
        setLoading(true);

        router.get(nextPage, {}, {
            preserveState: true,
            preserveScroll: true,
            only: ['products'],
            onSuccess: (page: any) => {
                const newProducts = page?.props?.products?.data || [];
                setProductsData((prev: any) => [...prev, ...newProducts]);
                setNextPage(page?.props?.products?.next_page_url);
                setLoading(false);
            },
            onError: () => setLoading(false)
        });
    };

    return (
        <section className="py-16 bg-gray-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <span className="text-sm font-bold uppercase tracking-widest text-primary mb-2 block">
                        {t('home.products.label', 'Discover')}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                        {t('home.products.title', 'All Products')}
                    </h2>
                    <p className="text-gray-500 text-sm md:text-base">
                        {t('home.products.subtitle', 'Explore our wide range of collections')}
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6">
                    {productsData?.map((product: any) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {/* Pagination */}
                {nextPage && (
                    <div className="mt-12 text-center">
                        <button
                            onClick={loadMore}
                            disabled={loading}
                            className={`inline-flex items-center gap-2 px-8 py-3.5 bg-black text-white font-medium rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    {t('common.loading', 'Loading...')}
                                </>
                            ) : (
                                t('home.products.load_more', 'Show More Products')
                            )}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
