import React from 'react'
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { increase_quantity, remove_from_cart, decrease_quantity } from '@/redux/reducers/cart-slice';
import { useDispatch } from 'react-redux';
import useCurrency from '@/hooks/use-currency';
export default function CartItem({ item }: any) {
    const { currency } = useCurrency();
    const dispatch = useDispatch();
    const handleRemoveFromCart = (item: any) => {
        dispatch(remove_from_cart(item.id));
    }


    const handleIncreaseQty = (item: any) => {
        dispatch(increase_quantity(item.id))
    }

    const handleDecreaseQty = (item: any) => {
        dispatch(decrease_quantity(item.id))
    }
    return (
        <div key={item.id} className="bg-white rounded-2xl border border-gray-100 p-4 flex gap-4 items-center hover:shadow-sm transition-shadow">
            {/* Thumbnail */}
            <div className="w-20 h-20 shrink-0 rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
                {item.image ? <img src={item.image} alt={item.title} /> : <ShoppingCart size={24} className="text-orange-300" />}
            </div>



            <div className="flex-1 min-w-0">
                <p className="text-[11px] text-orange-500 font-semibold uppercase tracking-wide">{item.category}</p>
                <p className="text-sm font-semibold text-gray-800 mt-0.5 line-clamp-1">{item.title}</p>
                <p className="text-sm font-bold text-gray-900 mt-1">{item.price * item.quantity} {currency}</p>

                {item?.attributes?.map((attr:any)=>(
                    <div>{attr.attribute_name} : {attr.value} </div>
                ))}
            </div>
            {/* Qty */}
            <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-1.5">
                <button onClick={() => handleDecreaseQty(item)} className="text-gray-500 hover:text-orange-500 transition-colors">
                    <Minus size={14} />
                </button>
                <span className="w-6 text-center text-sm font-bold">{item.quantity}</span>
                <button onClick={() => handleIncreaseQty(item)} className="text-gray-500 hover:text-orange-500 transition-colors">
                    <Plus size={14} />
                </button>
            </div>

            <button
                onClick={() => {
                    handleRemoveFromCart(item)

                }} className="p-2 border rounded-full border-red-700 text-red-700 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50">
                <Trash2 size={16} />
            </button>
        </div>
    )
}
