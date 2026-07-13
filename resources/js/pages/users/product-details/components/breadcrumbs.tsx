import React from 'react'
import { Head, Link } from '@inertiajs/react';
import { ShoppingCart, Heart, ShieldCheck, Truck, ArrowLeft, ArrowRight, Star, Plus, Minus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ProductItem } from '@/types/product';
export default function Breadcrumbs({product}:{product:ProductItem}) {
   
      const { t, i18n } = useTranslation();
        const isRtl = i18n.language === 'ar';
  return (
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                            <Link href="/" className="hover:text-primary transition-colors">{t('common.home', 'Home')}</Link>
                            {isRtl ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
                            <Link href="/shop" className="hover:text-primary transition-colors">{t('shop.title', 'Shop')}</Link>
                            {isRtl ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
                            <span className="text-gray-900 font-medium truncate max-w-xs">{product.title}</span>
                        </nav>
  )
}
