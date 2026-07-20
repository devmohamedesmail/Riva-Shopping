import React, { useState } from 'react';
import { Heart, Star, ShoppingCart, Eye, ArrowLeftRight } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

export interface Product {
    id: number;
    title: string;
    slug: string;
    price: number | string;
    sale_price?: number | string | null;
    is_new?: boolean;
    is_featured?: boolean;
    images?: { image: string }[];
    category?: { id: number, name_en: string, name_ar: string };
    rating?: number; // fallback stats
    reviews?: number; // fallback stats
}

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const [wishlisted, setWishlisted] = useState(false);
    const [addingToCart, setAddingToCart] = useState(false);
    const {t}=useTranslation()

    const numericPrice = Number(product.price);
    const numericSalePrice = product.sale_price ? Number(product.sale_price) : null;
    const isSale = numericSalePrice !== null && numericSalePrice < numericPrice;

    const discount = isSale && numericSalePrice
        ? Math.round(((numericPrice - numericSalePrice) / numericPrice) * 100)
        : null;

    const currentPrice = isSale ? numericSalePrice : numericPrice;
    const oldPrice = isSale ? numericPrice : null;

    const handleAddToCart = () => {
        setAddingToCart(true);
        setTimeout(() => setAddingToCart(false), 1200);
    };

    return (
        <div className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
            {/* Image Container */}
            <div className="relative overflow-hidden bg-gray-50 aspect-4/3">
                {/* Product Image */}
                {product.images && product.images.length > 0 ? (
                    <img
                        src={product.images[0].image.startsWith('http') ? product.images[0].image : `/storage/${product.images[0].image}`}
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
                    {discount && (
                        <span className="bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                            -{discount}%
                        </span>
                    )}
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
                    <Button
                        onClick={() => setWishlisted(!wishlisted)}
                        className={`w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center  hover:text-white transition-all duration-200 ${wishlisted ? 'text-red-500 bg-red-50' : 'text-gray-500'}`}
                        title="Wishlist"
                    >
                        <Heart size={15} fill={wishlisted ? 'currentColor' : 'none'} />
                    </Button>
                    <Button
                        className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-gray-500  hover:text-white transition-all duration-200"
                        title="Compare"
                    >
                        <ArrowLeftRight size={13} />
                    </Button>
                    <Button
                        className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-gray-500 hover:text-white transition-all duration-200"
                        title="Quick View"
                    >
                        <Eye size={14} />
                    </Button>
                </div>

                {/* Add to Cart - slides up on hover */}
                <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <Link
                         href={`/product/details/${product.slug}/product/${product.id}`}
                        // onClick={handleAddToCart}
                        className={`w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold text-white transition-all duration-200 ${addingToCart ? 'bg-green-500' : 'bg-primary hover:bg-secondary'}`}
                    >
                        <ShoppingCart size={16} />
                        {addingToCart ? t('products.added') : t('products.add-to-cart')}
                    </Link>
                </div>
            </div>

            {/* Info */}
            <div className="p-4 flex flex-col flex-1">
                <p className="text-[11px] text-gray-400 uppercase tracking-wider font-medium mb-1">
                    {product.category?.name_en || 'Category'}
                </p>
                <a href={`/products/${product.slug}`} className="text-sm font-semibold text-gray-800 hover:text-[#c96] transition-colors line-clamp-2 leading-snug mb-2 flex-1">
                    {product.title}
                </a>

                {/* Rating (Placeholder) */}
                <div className="flex items-center gap-1.5 mb-3">
                    <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                size={12}
                                className={star <= (product.rating || 5) ? 'text-amber-400' : 'text-gray-200'}
                                fill={star <= (product.rating || 5) ? 'currentColor' : 'currentColor'}
                            />
                        ))}
                    </div>
                    <span className="text-xs text-gray-400">({product.reviews || 0})</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2">
                    <span className="text-lg font-extrabold text-gray-900">${currentPrice.toFixed(2)}</span>
                    {oldPrice && (
                        <span className="text-sm text-gray-400 line-through">${oldPrice.toFixed(2)}</span>
                    )}
                </div>
            </div>
        </div>
    );
}
