import { Button } from '@/components/ui/button';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { Plus } from 'lucide-react'

export default function VendorProductsHeader({setEditProduct,setModalOpen}:any) {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">{t('vendor.products.title')}</h2>
               
            </div>
            <Button onClick={() => { setEditProduct(null); setModalOpen(true); }} className="bg-orange-500 hover:bg-orange-600 shadow-sm text-white border-0 gap-2 shrink-0 rounded-xl px-5">
                <Plus size={18} /> {t('vendor.products.add', 'Add Product')}
            </Button>

        </div>
    )
}
