import React from 'react'
import { Link } from '@inertiajs/react'
import { ChevronRight, ShoppingCart, Star, Package } from 'lucide-react'
import { ProductItem } from '@/types/product'
import useImport from '@/hooks/use-import'
import useCurrency from '@/hooks/use-currency'

export default function ProductListView({ product }: { product: ProductItem }) {
    const { t, isRtl } = useImport()
    const { currency } = useCurrency()

    const image = product.images?.[0]?.image
    const categoryName = isRtl ? product.category?.name_ar : product.category?.name_en
    const hasDiscount = !!product.sale_price && parseFloat(String(product.sale_price)) < parseFloat(String(product.price))
    const discountPct = hasDiscount
        ? Math.round((1 - parseFloat(String(product.sale_price)) / parseFloat(String(product.price))) * 100)
        : 0

    return (
        <Link
            href={`/product/details/${product.slug}/product/${product.id}`}
            className="group flex items-center gap-4 bg-white rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-lg transition-all duration-300 p-3 sm:p-4"
        >
            {/* ── Image ── */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50">
                {image ? (
                    <img
                        src={image}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl">🛍️</div>
                )}

                {/* Discount badge */}
                {hasDiscount && (
                    <span className="absolute top-1.5 left-1.5 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                        -{discountPct}%
                    </span>
                )}
                {product.is_featured && (
                    <span className="absolute top-1.5 right-1.5 bg-orange-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                        ★
                    </span>
                )}
            </div>

            {/* ── Info ── */}
            <div className="flex-1 min-w-0">
                {/* Category */}
                {categoryName && (
                    <p className="text-xs font-semibold uppercase tracking-wide text-orange-500 mb-1">
                        {categoryName}
                    </p>
                )}

                {/* Title */}
                <p className="text-sm sm:text-base font-semibold text-gray-800 line-clamp-2 group-hover:text-orange-600 transition-colors mb-1.5">
                    {product.title}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1.5 mb-2">
                    <div className="flex">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                                key={s}
                                size={11}
                                className={s <= (product as any).rating || 4 ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}
                            />
                        ))}
                    </div>
                    <span className="text-xs text-gray-400">({(product as any).reviews || 0})</span>
                </div>

                {/* Stock */}
                <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Package size={11} />
                    <span>{product.stock > 0 ? t('products.in_stock') : t('products.out_of_stock')}</span>
                </div>
            </div>

            {/* ── Price + CTA ── */}
            <div className="flex flex-col items-end gap-3 flex-shrink-0">
                <div className="text-end">
                    {hasDiscount ? (
                        <>
                            <p className="text-base sm:text-lg font-extrabold text-gray-900">
                                {product.sale_price} {currency}
                            </p>
                            <p className="text-xs text-red-400 line-through">
                                {product.price} {currency}
                            </p>
                        </>
                    ) : (
                        <p className="text-base sm:text-lg font-extrabold text-gray-900">
                            {product.price} {currency}
                        </p>
                    )}
                </div>

                <span className="hidden sm:flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold px-3 py-2 rounded-xl transition-colors">
                    <ShoppingCart size={13} />
                    {t('products.add-to-cart')}
                </span>
            </div>

            <ChevronRight size={16} className="text-gray-300 group-hover:text-orange-400 transition-colors flex-shrink-0 hidden sm:block" />
        </Link>
    )
}
