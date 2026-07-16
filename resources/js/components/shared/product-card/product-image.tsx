import React from 'react'
import { useTranslation } from 'react-i18next'
import ProductAddCart from './product-add-cart';
import ProductQuickView from './product-quick-view';
import ProductCompare from './product-compare';
import ProductWishlist from './product-wishlist';

export default function ProductImage({ product }: any) {
    const { t } = useTranslation();
    return (
        <div className="relative overflow-hidden bg-gray-50 aspect-4/3">
            {/* Product Image */}
            {product.images && product.images.length > 0 ? (
                <img
                    src={product.images[0].image ? product.images[0].image : `/storage/${product.images[0].image}`}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
            ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-linear-to-br from-gray-100 to-gray-200 group-hover:scale-105 transition-transform duration-500">
                    <div className="text-5xl mb-1">🛍️</div>
                    <div className="text-xs text-gray-400">{product.category?.name_en || 'Product'}</div>
                </div>
            )}

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                {product.is_new && (
                    <span className="bg-teal-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">New</span>
                )}
                {/* {discount && (
                        <span className="bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                            -{discount}%
                        </span>
                    )} */}
                {product.is_featured && (
                    <span
                        className="text-white text-[9px] font-bold px-2 py-0.5 rounded-full bg-primary"

                    >
                        {t('products.featured')}
                    </span>
                )}
            </div>

            {/* Action buttons */}
            <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-10 group-hover:translate-x-0 transition-transform duration-300">
               <ProductWishlist />
               <ProductCompare />
               <ProductQuickView />
            </div>

            {/* Add to Cart - slides up on hover */}
            
         <ProductAddCart product={product} />
        </div>
    )
}
