import { Category } from '@/types/product'
import { usePage } from '@inertiajs/react'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function ShopSidebar({ selectedCats, setSelectedCats, toggleCat, setPriceMax, priceMax }: any) {
    const { categories , settings } = usePage().props as any
    const { t } = useTranslation();
    return (
        <aside className="hidden lg:block w-60 shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-24">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-800 text-sm">{t('shop.filter')}</h3>
                    {selectedCats.length > 0 && (
                        <button onClick={() => setSelectedCats([])} className="text-xs text-orange-500 hover:underline">{t('shop.clear_filters')}</button>
                    )}
                </div>
                {/* Categories */}
                <div className="mb-5">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">{t('common.all_categories')}</p>
                    <div className="space-y-2">
                        {categories.map((c: Category) => (
                            <label key={c.id} className="flex items-center gap-2.5 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={selectedCats.includes(c)}
                                    onChange={() => toggleCat(c)}
                                    className="accent-orange-500 w-3.5 h-3.5"
                                />
                                <span className="text-sm text-gray-600 group-hover:text-orange-500 transition-colors">{c.name_en}</span>
                            </label>
                        ))}
                    </div>
                </div>
                {/* Price */}
                <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">{t('shop.price_range')}</p>
                    <input
                        type="range" min={0} max={300} value={priceMax}
                        onChange={e => setPriceMax(+e.target.value)}
                        className="w-full accent-orange-500"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>{settings.currency_ar} 0</span><span className="font-semibold text-orange-600">{settings.currency_ar} {priceMax}</span>
                    </div>
                </div>
            </div>
        </aside>
    )
}
