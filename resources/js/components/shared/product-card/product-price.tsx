import { ProductItem } from '@/types/product'
import React from 'react'

export default function ProductPrice({product}:{product:ProductItem}) {
    return (
        <div className="flex items-center gap-2">
            <span className="text-lg font-extrabold text-gray-900">price</span>
           <span className="text-sm text-gray-400 line-through">price</span>
        </div>
    )
}
