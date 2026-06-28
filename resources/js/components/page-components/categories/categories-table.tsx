import React from 'react'
import {
   Pencil, Trash2, Layers, ChevronLeft, ChevronRight,
  Search,
  ImageIcon
} from 'lucide-react';
import {Input } from '@/components/ui/input'
import { useTranslation } from 'react-i18next';
import { router } from '@inertiajs/react';
export default function CategoriesTable({search,setSearch,filtered,categories,openEdit,setDeleteId}:any) {
    const {t}=useTranslation()
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">

          {/* Search */}
          <div className="p-4 border-b border-gray-100 dark:border-gray-700">
            <div className="relative max-w-xs">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={t('common.search')}
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800 text-left">
                  <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">#</th>
                  <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t("common.image")}</th>
                  <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t("common.name_en")}</th>
                  <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t("common.name_ar")}</th>
                  <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t("common.slug")}</th>
                  <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t("common.parent")}</th>
                  <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t("common.status")}</th>                
                  <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t("common.actions")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-5 py-12 text-center text-gray-400 text-sm">
                      <Layers size={32} className="mx-auto mb-2 opacity-30" />
                     {t("categories.no-categories")}
                    </td>
                  </tr>
                ) : (
                  filtered.map((cat:any, i:any) => (
                    <tr key={cat.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="px-5 py-3.5 text-gray-400 text-xs">
                        {(categories?.current_page - 1) * categories?.per_page + i + 1}
                      </td>
                      <td className="px-5 py-3.5">
                        {cat.image ? (
                          <img src={cat.image} alt={cat.name_en} className="w-10 h-10 rounded-lg object-cover" />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                            <ImageIcon size={14} className="text-gray-400" />
                          </div>
                        )}
                      </td>
                      <td className="px-5 py-3.5 font-semibold text-gray-800 dark:text-gray-100">{cat.name_en}</td>
                      <td className="px-5 py-3.5 text-gray-700 dark:text-gray-300 text-right font-medium" dir="rtl">{cat.name_ar}</td>
                      <td className="px-5 py-3.5">
                        <code className="bg-gray-100 dark:bg-gray-700 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded text-xs">
                          {cat.slug}
                        </code>
                      </td>
                      <td className="px-5 py-3.5 text-gray-500 dark:text-gray-400 text-xs">
                        {cat.parent ? (
                          <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded text-xs font-medium">
                            {cat.parent.name_en}
                          </span>
                        ) : (
                          <span className="text-gray-400">Root</span>
                        )}
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${cat.is_active
                          ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                          }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${cat.is_active ? 'bg-green-500' : 'bg-red-500'}`} />
                          {cat.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                    
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => openEdit(cat)}
                            className="p-1.5 rounded-lg text-gray-500 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-900/30 transition-colors"
                            title="Edit"
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            onClick={() => setDeleteId(cat.id)}
                            className="p-1.5 rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/30 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {categories.last_page > 1 && (
            <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100 dark:border-gray-700">
              <p className="text-xs text-gray-500">Page {categories.current_page} of {categories.last_page} · {categories.total} results</p>
              <div className="flex gap-1">
                <button
                  disabled={categories.current_page === 1}
                  onClick={() => router.get(`/admin/categories?page=${categories.current_page - 1}`)}
                  className="p-1.5 rounded text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={15} />
                </button>
                <button
                  disabled={categories.current_page === categories.last_page}
                  onClick={() => router.get(`/admin/categories?page=${categories.current_page + 1}`)}
                  className="p-1.5 rounded text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          )}
        </div>
  )
}
