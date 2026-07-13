import React from 'react'
import { Star } from 'lucide-react';
export default function ProductRating({ product }: any) {
    return (
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
    )
}
