import { ProductItem } from '@/types/product'
import React from 'react'

export default function ProductGallery({ product, activeImage ,setActiveImage}: { product: ProductItem, activeImage: any,setActiveImage:any }) {

    return (
        <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden relative border border-gray-50 group">
                {/* {activeImage ? (
                    <img src={getImageSrc(activeImage)} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl">🛍️</div>
                )} */}
                {product.images ? <img src={product.images[0]?.image} alt={product.title} /> : null}
                {/* {discount && (
                    <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
                        -{discount}%
                    </span>
                )} */}
            </div>

            {/* Thumbnail gallery */}
            {product?.images && product?.images?.length > 1 && (
                <div className="grid grid-cols-5 gap-3">
                    {product.images.map((img: any) => (
                        <button
                            key={img.id}
                            onClick={() => setActiveImage(img.image)}
                            className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${activeImage === img.image ? 'border-primary ring-2 ring-primary/20' : 'border-transparent hover:border-gray-300'}`}
                        >
                            <img src={img.image} className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
