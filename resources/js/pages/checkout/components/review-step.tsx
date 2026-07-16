import React from 'react'
import { ClipboardCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSelector } from 'react-redux'
import CartItem from '@/components/shared/cart-item'
import { useTranslation } from 'react-i18next'
export default function ReviewStep({ setPlaced, setStep ,handleSubmit,onSubmit}: any) {
    const cart = useSelector((state: any) => state.cart.products || [])
    const { t } = useTranslation();
    return (
        <div>
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-5">
                <ClipboardCheck size={18} className="text-orange-500" /> {t('checkout.review.heading')}
            </h2>
            <div className="space-y-3 mb-5">
                {cart?.map((item: any) => (
                    <CartItem key={item.id} item={item} />
                ))}

            </div>
            <div className="border-t border-gray-100 pt-4 flex justify-between font-extrabold text-gray-900">
                <span>Total</span>
                <span className="text-orange-600 text-lg">
                    {/* ${total.toFixed(2)} */}
                </span>
            </div>
            <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => setStep('payment')} className="gap-2">{t('common.back')}</Button>
                <Button 
                onClick={handleSubmit(onSubmit)}
                // onClick={() => setPlaced(true)}
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white gap-2 rounded-xl px-8 font-bold">
                    🚀 {t('checkout.place_order')}
                </Button>

            </div>
        </div>
    )
}
