import React,{useState} from 'react'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tag, MoveRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from '@inertiajs/react';
export default function CartSummery() {
    const {t}=useTranslation()
     const [coupon, setCoupon] = useState('');
        const [couponApplied, setCouponApplied] = useState(false);
    return (
        <div className="space-y-4">
            {/* Coupon */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <p className="text-sm font-bold text-gray-700 flex items-center gap-2 mb-3">
                    <Tag size={14} className="text-orange-500" /> {t('cart.discount_code')}
                </p>
                <div className="flex gap-2">
                    <Input
                        value={coupon}
                        onChange={e => setCoupon(e.target.value)}
                        placeholder="SAVE10"
                        className="text-sm"
                    />
                    <Button
                        onClick={() => { if (coupon) setCouponApplied(true); }}
                        variant="outline"
                        className="shrink-0 text-orange-500 border-orange-300 hover:bg-orange-50 text-sm"
                    >
                        {t('cart.apply')}
                    </Button>
                </div>
                {couponApplied && <p className="text-xs text-emerald-600 font-medium mt-2">✓ 10% discount applied!</p>}
            </div>

            {/* Totals */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-3">
                <h3 className="font-bold text-gray-800 mb-4">{t('cart.order_summary')}</h3>
                <div className="flex justify-between text-sm text-gray-600">
                    <span>{t('cart.subtotal')}</span>
                    {/* <span className="font-medium">${subtotal.toFixed(2)}</span> */}
                </div>
                {couponApplied && (
                    <div className="flex justify-between text-sm text-emerald-600">
                        <span>{t('common.discount')}</span>
                        {/* <span>-${discount.toFixed(2)}</span> */}
                    </div>
                )}
                <div className="flex justify-between text-sm text-gray-600">
                    <span>{t('cart.shipping')}</span>
                    {/* <span className={shipping === 0 ? 'text-emerald-600 font-medium' : 'font-medium'}>
                        {shipping === 0 ? t('cart.free_shipping') : `$${shipping.toFixed(2)}`}
                    </span> */}
                </div>
                <div className="border-t border-gray-100 pt-3 flex justify-between text-base font-extrabold text-gray-900">
                    <span>{t('cart.grand_total')}</span>
                    {/* <span className="text-orange-600">${total.toFixed(2)}</span> */}
                </div>
                <Link href="/user/checkout">
                    <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white gap-2 rounded-xl py-3 font-bold mt-2">
                        {t('cart.checkout')} <MoveRight size={16} />
                    </Button>
                </Link>
                
            </div>
        </div>
    )
}
