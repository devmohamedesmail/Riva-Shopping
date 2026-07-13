import React from 'react'

export default function ProductCategory({ product }: any) {
    return (
        <div>
            <p className="text-[11px] text-gray-400 uppercase tracking-wider font-medium mb-1">
                {product.category?.name_en || 'Category'}
            </p>
        </div>
    )
}
