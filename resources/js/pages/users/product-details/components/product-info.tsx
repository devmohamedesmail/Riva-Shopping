import { ProductItem } from '@/types/product'
import { ShoppingCart, Heart, ShieldCheck, Truck, ArrowLeft, ArrowRight, Star, Plus, Minus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function ProductInfo({ product }: { product: ProductItem }) {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.language === 'ar';

    return (
        <>

            <div className="flex items-center gap-3 mb-3">
                <span className="text-sm text-primary font-semibold uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-full">
                    {isRtl ? product.category?.name_ar : product.category?.name_en}
                </span>
                <div className="flex items-center gap-1 text-sm bg-gray-100 px-2 py-1 rounded-md text-gray-600 font-medium">
                    <Star size={14} className="text-amber-400" fill="currentColor" />
                    <span>4.8</span>
                    <span className="text-gray-400 font-normal">(124)</span>
                </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                {product.title}
            </h1>

            <h1 className="text-md sm:text-2xl text-gray-900 mb-4 leading-tight">
                {product.description}
            </h1>

           
           

            {product.product_type === "simple" ? (<>
                {product.sale_price ? (
                    <div className='flex items-center gap-4'>
                        <p className='line-through text-red-600 text-xl'>{product.price}</p>
                        <p className='text-2xl'>{product.sale_price}</p>

                    </div>) : (<div> <p>{product.price}</p></div>)}
            </>) : (<>slect option</>)}

            {/* Variations Selector */}
            {/* {isVariant && Object.keys(attributesMap).length > 0 && (
                <div className="space-y-6 mb-8">
                    {Object.values(attributesMap).map((attr: any) => (
                        <div key={attr.id} className="flex flex-col gap-3">
                            <div className="flex justify-between items-center text-sm">
                                <span className="font-semibold text-gray-900">{isRtl ? attr.name_ar : attr.name_en}</span>
                                <span className="text-gray-400">
                                    {selectedOptions[attr.id] ? attr.values.find((v: any) => v.id === selectedOptions[attr.id])?.value : ''}
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {attr.values.map((v: any) => (
                                    <button
                                        key={v.id}
                                        onClick={() => handleOptionSelect(attr.id, v.id)}
                                        className={`px-5 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 ${selectedOptions[attr.id] === v.id
                                            ? 'border-primary bg-primary text-white shadow-md shadow-primary/20'
                                            : 'border-gray-200 text-gray-700 bg-white hover:border-gray-300 hover:bg-gray-50'
                                            }`}
                                    >
                                        {v.value}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )} */}

            {/* Stock Status */}
            {/* <div className={`text-sm font-medium mb-6 flex items-center gap-2 ${isOutOfStock ? 'text-red-500' : 'text-green-600'}`}>
                <div className={`w-2 h-2 rounded-full ${isOutOfStock ? 'bg-red-500' : 'bg-green-500'}`}></div>
                {isOutOfStock
                    ? t('shop.out_of_stock', 'Out of Stock')
                    : t('shop.in_stock_count', '{{count}} in stock', { count: availableStock })}
            </div> */}

        </>
    )
}
