import React from 'react'
import { Button } from '@/components/ui/button';
import { Layers, Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next';

export default function CategoriesHeader({ categories, openCreate }: any) {
    const {t} = useTranslation()
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Layers size={22} className="text-emerald-500" />
                    {t("categories.management")}
                </h1>
                <p className="text-sm text-gray-500 mt-0.5">{categories.total} {t("categories.total")}</p>
            </div>
            <Button
                onClick={openCreate}
            >
                <Plus size={16} /> {t('categories.add')}
            </Button>
        </div>
    )
}
