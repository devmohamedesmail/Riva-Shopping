import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import React from 'react'
import { useTranslation } from 'react-i18next';

export default function DeleteDialog({ open, onCancel, onConfirm, processing }: any) {
    const { t, i18n } = useTranslation();
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 transition-opacity" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-sm p-6 transform scale-100 transition-transform">
                <div className="flex flex-col items-center text-center gap-3 mb-6">
                    <div className="w-14 h-14 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center">
                        <AlertTriangle size={26} className="text-red-500" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Delete Product?</h3>
                        <p className="text-sm text-gray-500">{t('vendor_dashboard.products.delete_confirm', 'Are you sure you want to delete this product? This action cannot be undone.')}</p>
                    </div>
                </div>

                <div className="flex gap-3">
                    <Button variant="outline" className="flex-1 border-gray-200" onClick={onCancel}>{t('vendor_dashboard.products.cancel', 'Cancel')}</Button>
                    <Button className="flex-1 bg-red-500 hover:bg-red-600 shadow-sm text-white border-0" disabled={processing} onClick={onConfirm}>{t('vendor_dashboard.products.delete', 'Delete')}</Button>
                </div>
            </div>
        </div>
    )
}
