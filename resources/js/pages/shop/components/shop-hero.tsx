import React from 'react'
import { useTranslation } from 'react-i18next'

export default function ShopHero() {
 const {t}=useTranslation()
    return (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-3xl md:text-4xl font-extrabold mb-2">{t('shop.title')}</h1>
                    <p className="text-gray-400 text-sm mb-6">{t('shop.subtitle')}</p>
                    {/* Search */}
                    {/* <div className="flex max-w-xl mx-auto border-2 border-orange-500 rounded-full overflow-hidden bg-white">
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder={t('common.search_placeholder')}
                            className="flex-1 px-5 py-3 text-sm text-gray-800 outline-none"
                        />
                        <button className="bg-orange-500 hover:bg-orange-600 px-6 transition-colors">
                            <Search size={18} className="text-white" />
                        </button>
                    </div> */}
                </div>
            </div>
  )
}
