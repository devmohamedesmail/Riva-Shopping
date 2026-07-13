import React from 'react'
import ProductQuantity from './product-quantity'
import { Heart, ShoppingCart } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { add_to_cart } from '@/redux/reducers/cart-slice';
import toast from 'react-hot-toast'
export default function ProductActions({ product, quantity, setQuantity }: any) {
    const { t } = useTranslation()
    const dispatch = useDispatch();
    const cart = useSelector((state: any) => state.cart.products || []);

   
    const handleAddToCart = () => {
       try {
         dispatch(add_to_cart({ 
            id:product.id,
            title:product.title,
            price:product.price,
            sale_price:product.sale_price,
            image:product.images[0].image,
            quantity: 1 
        }));
        toast.success(t('common.product_added'))
       } catch (error) {
        toast.error(t('cart.product_added'))
       }
    }
    return (
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
            {/* Quantity */}
            <ProductQuantity quantity={quantity} setQuantity={setQuantity} />

            {/* Add to cart */}
            <Button
                onClick={handleAddToCart}
                // disabled={isOutOfStock}
                className="flex-1 flex items-center justify-center gap-2 bg-black hover:bg-gray-900 text-white h-14 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
            >
                <ShoppingCart size={20} />
                {/* {isOutOfStock ? t('shop.out_of_stock', 'Out of Stock') : t('common.add_to_cart', 'Add to Cart')} */}
                {t('common.add_to_cart')}
            </Button>

            <Button
                className="flex-1 flex items-center justify-center gap-2 bg-black hover:bg-gray-900 text-white h-14 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
            >
                {t('common.buy_now')}
            </Button>

            <button className="flex items-center justify-center w-14 h-14 rounded-xl border border-gray-200 text-gray-500 hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-colors">
                <Heart size={24} />
            </button>
        </div>
    )
}
