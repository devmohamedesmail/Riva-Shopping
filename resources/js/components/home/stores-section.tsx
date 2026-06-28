import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

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
            <div key={store?.id} className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              {/* Card Header Background */}
              <div className="relative h-24 sm:h-32 bg-linear-to-r from-gray-100 to-gray-200 group-hover:from-[#7c3aed]/10 group-hover:to-[#c96]/10 transition-colors">
                {/* Logo Avatar overlayed */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                  <div className="w-20 h-20 bg-white rounded-2xl shadow-md p-1 rotate-3 group-hover:rotate-0 transition-transform duration-300">
                    <div className="w-full h-full rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center">
                      {store.logo ? (
                        <img src={store.logo} alt={store.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-gray-400 font-bold text-xl">{store.name?.charAt(0)}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="pt-12 pb-6 px-6 text-center flex flex-col flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-[#7c3aed] transition-colors">{store.name}</h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-6 flex-1">
                  {store?.description || 'Welcome to our official store on Shopella! Explore our latest collections.'}
                </p>
                <Link
                  href={`/stores/${store?.id}`}
                  className="block w-full py-2.5 px-4 bg-gray-50 hover:bg-[#7c3aed] text-gray-800 hover:text-white text-sm font-semibold rounded-xl transition-all duration-300"
                >
                  {t('home.stores.view_store', 'Visit Store')}
                </Link>
              </div>
            </div>
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
