import useCurrency from '@/hooks/use-currency'
import { ProductItem } from '@/types/product'

export default function ProductPrice({ product }: { product: ProductItem }) {
  const {currency}=useCurrency()

    return (
        <div className="flex items-center gap-2">

            {product.product_type === "simple" ? (<>

                {product.sale_price ? (
                <div className='flex gap-3 items-center'>
                    <span className="text-lg font-extrabold text-gray-900">{product.sale_price} {currency} </span>
                    <span className="text-sm text-gray-400 line-through text-red-600">{product.price} {currency} </span>
                </div>) : (
                    <div>
                       <span className="text-lg font-extrabold text-gray-900">{product.price} {currency} </span>
                    </div>)}
            </>) : (<></>)}
        </div>
    )
}
