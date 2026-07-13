import { Button } from '@/components/ui/button';
import { Box } from 'lucide-react'
import { useTranslation } from 'react-i18next';

export default function NoProducts({ search, setEditProduct, setModalOpen }: any) {
    const { t } = useTranslation()
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 border-dashed">
            <div className="w-20 h-20 rounded-full bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center mb-5"><Box size={32} className="text-orange-400" /></div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{t('vendor.products.no_search_results')}</h3>
            <p className="text-gray-500 text-sm max-w-sm mx-auto">{search ? t('vendor.products.no_search_results') : t('vendor.products.no_products')}</p>
            {!search && (
                <Button onClick={() => { setEditProduct(null); setModalOpen(true); }} variant="outline" className="mt-6 border-gray-200 shadow-sm text-gray-700 bg-white hover:bg-gray-50">
                    {t('vendor.products.add')}
                </Button>

            )}
        </div>
    )
}
