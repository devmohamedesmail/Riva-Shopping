import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import SectionTitle from '@/components/shared/section-title';
import StoreItem from './store-item';

export default function StoresSection({ stores }: { stores: any }) {
  const { t } = useTranslation();
  const [storesData, setStoresData] = useState(stores.data || []);
  const [nextPage, setNextPage] = useState(stores.next_page_url);
  const [loading, setLoading] = useState(false);

  const loadMore = () => {
    if (!nextPage) return;
    setLoading(true);

    router.get(nextPage, {}, {
      preserveState: true,
      preserveScroll: true,
      only: ['stores'],
      onSuccess: (page: any) => {
        const newStores = page?.props?.stores?.data || [];
        setStoresData((prev: any) => [...prev, ...newStores]);
        setNextPage(page?.props?.stores?.next_page_url);
        setLoading(false);
      },
      onError: () => setLoading(false)
    });
  };

  if (storesData?.length === 0) return null;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-sm font-bold uppercase tracking-widest text-[#7c3aed] mb-2 block">
            {t('home.stores.label', 'Top Partners')}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            {t('home.stores.title', 'Our Best Stores')}
          </h2>
          <p className="text-gray-500 text-sm md:text-base">
            {t('home.stores.subtitle', 'Shop directly from verified sellers and brands')}
          </p>
        </div>

      

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {storesData?.map((store: any) => (
         <StoreItem key={store?.id} store={store} />
          ))}
        </div>

        {/* Pagination */}
        {nextPage && (
          <div className="mt-12 text-center">
            <button
              onClick={loadMore}
              disabled={loading}
              className={`inline-flex items-center gap-2 px-8 py-3.5 border-2 border-gray-200 text-gray-700 font-medium rounded-full hover:border-gray-900 hover:text-gray-900 transition-all duration-300 ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t('common.loading', 'Loading...')}
                </>
              ) : (
                t('home.stores.show_more', 'Show More Stores')
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
