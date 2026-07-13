import React from 'react'

export default function ProductTitle({ product }: any) {
    return (
        <div>
            <a href={`/products/${product.slug}`} className="text-sm font-semibold text-gray-800 hover:text-[#c96] transition-colors line-clamp-2 leading-snug mb-2 flex-1">
                {product.title}
            </a>
        </div>
    )
}
