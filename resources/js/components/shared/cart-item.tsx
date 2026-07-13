import React from 'react'
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { add_to_cart, remove_from_cart } from '@/redux/reducers/cart-slice';
import { useDispatch } from 'react-redux';
export default function CartItem({ item }: any) {
    const dispatch = useDispatch();
    const handleRemoveFromCart = (item: any) => {
        dispatch(remove_from_cart(item.id));
    }
    return (
        <div key={item.id} className="bg-white rounded-2xl border border-gray-100 p-4 flex gap-4 items-center hover:shadow-sm transition-shadow">
            {/* Thumbnail */}
            <div className="w-20 h-20 shrink-0 rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
                <ShoppingCart size={24} className="text-orange-300" />
                <img src={item.image} alt={item.title} />
            </div>
            {/* Info */}
            <div className="flex-1 min-w-0">
                <p className="text-[11px] text-orange-500 font-semibold uppercase tracking-wide">{item.category}</p>
                <p className="text-sm font-semibold text-gray-800 mt-0.5 line-clamp-1">{item.title}</p>
                <p className="text-sm font-bold text-gray-900 mt-1">${item.price}</p>
            </div>
            {/* Qty */}
            <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-1.5">
                {/* <button onClick={() => updateQty(item.id, -1)} className="text-gray-500 hover:text-orange-500 transition-colors">
                    <Minus size={14} />
                </button> */}
                <span className="w-6 text-center text-sm font-bold">{item.quantity}</span>
                {/* <button onClick={() => updateQty(item.id, 1)} className="text-gray-500 hover:text-orange-500 transition-colors">
                    <Plus size={14} />
                </button> */}
            </div>
            {/* Line total */}
            <p className="text-sm font-extrabold text-gray-900 w-16 text-right">${(item.price * item.qty).toFixed(2)}</p>
            {/* Remove */}
            <button
                onClick={() => {
                    handleRemoveFromCart(item)

                }} className="p-2 text-gray-300 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50">
                <Trash2 size={16} />
            </button>
        </div>
    )
}
