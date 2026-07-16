import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import VendorLayout from '@/layouts/vendor-layout';
import StoreStat from './components/StoreStat';
import NoStore from './components/no-store';

interface Store { id: number; name: string; logo?: string; currency: string; }
interface Props { store: Store; productCount: number; categoryCount: number; }




export default function VendorDashboard({ store, productCount = 0, categoryCount = 0 }: Props) {
  const { t } = useTranslation();

  if (!store) {
    return (
     <NoStore />
    );
  }

 



  return (
    <VendorLayout title={`${t('vendor.overview.welcome')}, ${store.name ?? ''}`}>
      <Head title={`${store.name ?? 'Dashboard'} — Dashboard`} />

      <div className="mb-6">
        <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">{t('vendor.overview.welcome')} ${store?.name} 👋</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{t('vendor.overview.subtitle')}</p>
      </div>

      <StoreStat productCount={productCount} categoryCount={categoryCount} />


     
    </VendorLayout>
  );
}
