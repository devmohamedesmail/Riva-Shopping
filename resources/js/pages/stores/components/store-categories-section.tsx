import React from 'react'
import SectionCard from './section-card'
import { CheckCircle, X, Tag as TagIcon} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Category } from '@/types/product';

export default function StoreCategoriesSection({selectedCats,categories,parents,getChildren,toggleCat}:any) {

    const { t, i18n } = useTranslation();
    const isRtl = i18n.language === 'ar';
    return (
        <SectionCard icon={TagIcon} title={t('vendor.settings.categories')}>
            <p className="text-xs text-gray-500 mb-4">{t('vendor.settings.categories_desc')}</p>
            {selectedCats.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4 p-3 bg-orange-50 dark:bg-orange-900/10 rounded-xl border border-orange-100 dark:border-orange-900/20">
                    {selectedCats.map((id:number) => {
                        const cat = categories.find((c:Category) => c.id === id);
                        return cat ? (
                            <span key={id} className="inline-flex items-center gap-1.5 text-xs bg-orange-500 text-white px-2.5 py-1 rounded-full font-medium">
                                {isRtl ? cat.name_ar : cat.name_en}
                                <button type="button" onClick={() => toggleCat(id)}><X size={10} /></button>
                            </span>
                        ) : null;
                    })}
                </div>
            )}
            <div className="space-y-2 max-h-72 overflow-y-auto">
                {parents.map((parent:Category) => {
                    const children = getChildren(parent.id);
                    const isSelected = selectedCats.includes(parent.id);
                    return (
                        <div key={parent.id} className="border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden">
                            <button type="button" onClick={() => toggleCat(parent.id)}
                                className={`w-full flex items-center justify-between px-4 py-3 text-start transition-colors text-sm font-semibold ${isSelected ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600' : 'bg-gray-50 dark:bg-gray-800/40 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                                {isRtl ? parent.name_ar : parent.name_en}
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${isSelected ? 'border-orange-500 bg-orange-500' : 'border-gray-300'}`}>
                                    {isSelected && <CheckCircle size={12} className="text-white" />}
                                </div>
                            </button>
                            {children.length > 0 && (
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-3 bg-white dark:bg-gray-900">
                                    {children.map((child:Category) => {
                                        const childSel = selectedCats.includes(child.id);
                                        return (
                                            <button key={child.id} type="button" onClick={() => toggleCat(child.id)}
                                                className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium border transition-all ${childSel ? 'border-orange-400 bg-orange-50 text-orange-600' : 'border-gray-100 dark:border-gray-700 text-gray-600 hover:border-orange-300'}`}>
                                                {isRtl ? child.name_ar : child.name_en}
                                                {childSel && <CheckCircle size={11} className="text-orange-500 ms-1 shrink-0" />}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </SectionCard>
    )
}
