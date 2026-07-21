import React from 'react'
import { ClipboardCheck, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { CartItem } from '@/types/cart'

export default function ReviewStep({ setStep, isSubmitting, errors }: any) {
    const cart: CartItem[] = useSelector((state: any) => state.cart.products ?? [])
    const { t } = useTranslation()

    const subtotal = cart.reduce(
        (sum, item) => sum + parseFloat(item.sale_price || item.price) * item.quantity,
        0
    )

    return (
        <div>
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-5">
                <ClipboardCheck size={18} className="text-orange-500" />
                {t('checkout.review.heading')}
            </h2>

            {/* General order-level error (e.g. server-side failure) */}
            {errors?.order && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                    {errors.order.message}
                </div>
            )}

            {/* Items grouped by store */}
            <div className="space-y-4 mb-5">
                {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 text-sm">
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-12 h-12 rounded-lg object-cover border border-gray-100"
                        />
                        <div className="flex-1">
                            <p className="font-medium text-gray-800 line-clamp-1">{item.title}</p>
                            <p className="text-gray-400 text-xs">{item.store_name} · qty {item.quantity}</p>
                        </div>
                        <span className="font-semibold text-gray-700">
                            ${(parseFloat(item.sale_price || item.price) * item.quantity).toFixed(2)}
                        </span>
                    </div>
                ))}
            </div>

            <div className="border-t border-gray-100 pt-4 flex justify-between font-extrabold text-gray-900">
                <span>{t('cart.grand_total')}</span>
                <span className="text-orange-600 text-lg">${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between mt-6">
                <Button
                    variant="outline"
                    type="button"
                    onClick={() => setStep('payment')}
                    className="gap-2"
                >
                    {t('common.back')}
                </Button>

                {/* type="submit" propagates to the parent <form onSubmit={handleSubmit(onSubmit)}> */}
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-orange-500 hover:bg-orange-600 text-white gap-2 rounded-xl px-8 font-bold"
                >
                    {isSubmitting
                        ? <><Loader2 size={16} className="animate-spin" /> Placing order…</>
                        : <>🚀 {t('checkout.place_order')}</>
                    }
                </Button>
            </div>
        </div>
    )
}
