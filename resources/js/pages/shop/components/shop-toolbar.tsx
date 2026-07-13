import React from 'react'
import { ArrowUpDown,Grid3X3,List } from 'lucide-react'
import { useTranslation } from 'react-i18next'
export default function ShopToolbar({ sort, setSort, setView, sorted, view }: any) {

    const { t } = useTranslation();
    return (
        <div className="flex items-center justify-between mb-5 bg-white rounded-xl border border-gray-100 px-4 py-3">
            <span className="text-sm text-gray-500">{sorted.length} {t('shop.title')}</span>
            <div className="flex items-center gap-3">
                {/* Sort */}
                <div className="flex items-center gap-2">
                    <ArrowUpDown size={14} className="text-gray-400" />
                    <select
                        value={sort}
                        onChange={e => setSort(e.target.value)}
                        className="text-sm text-gray-600 outline-none bg-transparent cursor-pointer"
                    >
                        <option value="newest">{t('shop.sort_options.newest')}</option>
                        <option value="price_asc">{t('shop.sort_options.price_asc')}</option>
                        <option value="price_desc">{t('shop.sort_options.price_desc')}</option>
                        <option value="popular">{t('shop.sort_options.popular')}</option>
                    </select>
                </div>
                {/* View toggle */}
                <div className="flex items-center gap-1 border border-gray-200 rounded-lg p-1">
                    <button onClick={() => setView('grid')} className={`p-1 rounded ${view === 'grid' ? 'bg-orange-500 text-white' : 'text-gray-400'}`}><Grid3X3 size={14} /></button>
                    <button onClick={() => setView('list')} className={`p-1 rounded ${view === 'list' ? 'bg-orange-500 text-white' : 'text-gray-400'}`}><List size={14} /></button>
                </div>
            </div>
        </div>
    )
}
