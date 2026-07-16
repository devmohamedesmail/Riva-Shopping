import React from 'react'
import { ShoppingCart, Trash2, Plus, Minus, Tag, ArrowRight, ShoppingBag, MoveRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
export default function CartEmpty() {
    const { t } = useTranslation()

    return (
        <div className="text-center py-24">
            <div className="w-28 h-28 rounded-full bg-orange-50 flex items-center justify-center mx-auto mb-6">
                <ShoppingBag size={44} className="text-orange-300" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('cart.empty_title')}</h2>
            <p className="text-gray-500 mb-8">{t('cart.empty_desc')}</p>
            <Link href="/">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white gap-2 rounded-full px-8">
                    {t('cart.empty_cta')} <ArrowRight size={16} />
                </Button>
            </Link>

        </div>
    )
}
