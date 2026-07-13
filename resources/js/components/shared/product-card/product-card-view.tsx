import { ProductItem } from '@/types/product'
import React from 'react'
import ProductImage from './product-image'
import ProductTitle from './product-title'
import ProductPrice from './product-price'
import ProductRating from './product-rating'

export default function ProductCardView({product}:{product:ProductItem}) {
  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
      <ProductImage product={product} />
      <ProductTitle product={product}  />
      <ProductPrice product={product} />
      <ProductRating  product={product} />
    </div>
  )
}
