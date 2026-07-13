import React from 'react'
import { Link } from '@inertiajs/react'
import { ShoppingCart } from 'lucide-react'
import { useTranslation } from 'react-i18next'


export default function ProductAddCart({ product }: any) {
    const {t}=useTranslation();
    return (
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <Link
                href={`/product/details/${product.slug}/product/${product.id}`}
                // onClick={handleAddToCart}
                className={`w-full bg-primary flex items-center justify-center gap-2 py-3 text-sm font-semibold text-white transition-all duration-200 `}
            >
                <ShoppingCart size={16} />
                {/* {addingToCart ? t('products.added') : t('products.add-to-cart')} */}
                {t('products.add-to-cart')}
            </Link>
        </div>
    )
}
