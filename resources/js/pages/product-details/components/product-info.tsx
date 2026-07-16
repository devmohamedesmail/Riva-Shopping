import useCurrency from '@/hooks/use-currency';
import { ProductItem } from '@/types/product'
import { ShoppingCart, Heart, ShieldCheck, Truck, ArrowLeft, ArrowRight, Star, Plus, Minus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ProductOptions from './product-options';

export default function ProductInfo({ product ,selectedVariant }: { product: ProductItem ,selectedVariant:any}) {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.language === 'ar';
    const {currency}=useCurrency()

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

           
           

          <div className='mb-10'>
              {product.product_type === "simple" ? (<>
                {product.sale_price ? (
                    <div className='flex items-center gap-4'>
                        <p className='line-through text-red-600 text-xl'>{product.price} {currency}</p>
                        <p className='text-2xl'>{product.sale_price} {currency}</p>

                    </div>) : (<div> <p>{product.price} {currency}</p></div>)}
            </>) : (
            <div>
                
                 <p className='text-2xl'>{selectedVariant?.price} {currency}</p>
            </div>)}
          </div>
        </>
    )
}
