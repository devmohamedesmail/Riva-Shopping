import React from 'react'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux'
import { ShoppingCart } from 'lucide-react'
import CartItem from '@/components/shared/cart-item';
export default function OrderSummary() {
    const cart = useSelector((state: any) => state.cart.products);
    const { t } = useTranslation();
    return (
        <div>
            <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-24">
                <h3 className="font-bold text-gray-800 mb-4">{t('cart.order_summary')}</h3>
                <div className="space-y-3 mb-4">
                    {cart?.map((item: any) => (
                        <CartItem key={item.id} item={item} />
                    ))}
                </div>
                <div className="border-t border-gray-100 pt-3 space-y-2 text-sm">
                    <div className="flex justify-between text-gray-600">
                        <span>{t('cart.subtotal')}</span><span>
                            {/* ${subtotal.toFixed(2)} */}
                        </span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span>{t('cart.shipping')}</span><span className="text-emerald-600">{t('cart.free_shipping')}</span>
                    </div>
                    <div className="flex justify-between font-extrabold text-gray-900 text-base pt-1 border-t border-gray-100">
                        <span>{t('cart.grand_total')}</span>
                        <span className="text-orange-600">
                            {/* ${total.toFixed(2)} */}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
