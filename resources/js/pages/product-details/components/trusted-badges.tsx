import React from 'react'
import { ReceiptEuro, RefreshCcw, ShieldCheck, Truck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
export default function TrustedBadges() {
    const { t } = useTranslation();
    return (
        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                    <Truck size={20} />
                </div>
                <div>
                    <div className="text-sm font-bold text-gray-900">{t('feature.free_shipping', 'Free Shipping')}</div>
                    <div className="text-xs text-gray-500">{t('feature.free_shipping_desc', 'On all orders')}</div>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center shrink-0">
                    <ShieldCheck size={20} />
                </div>
                <div>
                    <div className="text-sm font-bold text-gray-900">{t('feature.secure_payment', 'Secure Payment')}</div>
                    <div className="text-xs text-gray-500">{t('feature.secure_payment_desc', '100% protected')}</div>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center shrink-0">
                    <RefreshCcw size={20} />
                </div>
                <div>
                    <div className="text-sm font-bold text-gray-900">{t('feature.secure_payment', 'Secure Payment')}</div>
                    <div className="text-xs text-gray-500">{t('feature.secure_payment_desc', '100% protected')}</div>
                </div>
            </div>
        </div>
    )
}
