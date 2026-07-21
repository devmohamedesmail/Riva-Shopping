import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { CartItem } from '@/types/cart'

export default function OrderSummary() {
    const cart: CartItem[] = useSelector((state: any) => state.cart.products ?? [])
    const { t } = useTranslation()

    const subtotal = cart.reduce(
        (sum, item) => sum + parseFloat(item.sale_price || item.price) * item.quantity,
        0
    )
    // Extend these with real shipping / discount logic when available
    const shipping = 0
    const total    = subtotal + shipping

    return (
        <div>
            <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-24">
                <h3 className="font-bold text-gray-800 mb-4">{t('cart.order_summary')}</h3>

                {/* Item list */}
                <div className="space-y-3 mb-4">
                    {cart.map((item) => (
                        <div key={item.id} className="flex items-center gap-3 text-sm">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-10 h-10 rounded-lg object-cover border border-gray-100 flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-800 truncate">{item.title}</p>
                                <p className="text-gray-400 text-xs">{item.store_name} · ×{item.quantity}</p>
                            </div>
                            <span className="font-semibold text-gray-700 flex-shrink-0">
                                ${(parseFloat(item.sale_price || item.price) * item.quantity).toFixed(2)}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Totals */}
                <div className="border-t border-gray-100 pt-3 space-y-2 text-sm">
                    <div className="flex justify-between text-gray-600">
                        <span>{t('cart.subtotal')}</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span>{t('cart.shipping')}</span>
                        <span className="text-emerald-600">
                            {shipping === 0 ? t('cart.free_shipping') : `$${shipping.toFixed(2)}`}
                        </span>
                    </div>
                    <div className="flex justify-between font-extrabold text-gray-900 text-base pt-1 border-t border-gray-100">
                        <span>{t('cart.grand_total')}</span>
                        <span className="text-orange-600">${total.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
