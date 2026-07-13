import { Label } from '@/components/ui/label'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function VisibilityTab({ activeTab, register }: any) {
    const { t } = useTranslation()
    return (
        <div className={activeTab === 'visibility' ? 'block space-y-4' : 'hidden'}>
            <div className="space-y-4 bg-gray-50 dark:bg-gray-800/50 p-5 rounded-xl border border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-between">
                    <div>
                        <Label className="text-base text-gray-900 dark:text-gray-100">
                            {t("common.active-status")}
                            </Label>
                        <p className="text-xs text-gray-500 mt-0.5">
                            Determine if the product is visible to customers.
                        </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" {...register('is_active')} />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-500"></div>
                    </label>
                </div>

                <div className="h-px w-full bg-gray-200 dark:bg-gray-700"></div>

                <div className="flex items-center justify-between">
                    <div>
                        <Label className="text-base text-gray-900 dark:text-gray-100">
                             {t("common.mark-as-popular")}
                           </Label>
                        <p className="text-xs text-gray-500 mt-0.5">Show this product in popular sections.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" {...register('is_popular')} />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-500"></div>
                    </label>
                </div>

                <div className="h-px w-full bg-gray-200 dark:bg-gray-700"></div>

                <div className="flex items-center justify-between">
                    <div>
                        <Label className="text-base text-gray-900 dark:text-gray-100">
                             {t("common.mark-as-featured")}
                           </Label>
                        <p className="text-xs text-gray-500 mt-0.5">Highlight this product on your store.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" {...register('is_featured')} />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-500"></div>
                    </label>
                </div>
            </div>
        </div>
    )
}
