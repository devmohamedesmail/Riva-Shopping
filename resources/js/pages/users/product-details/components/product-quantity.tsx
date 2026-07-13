import { Button } from '@/components/ui/button'
import React from 'react'
import {Plus,Minus} from 'lucide-react'

export default function ProductQuantity({quantity,setQuantity}:any) {
    return (
        <div className="flex items-center justify-between border border-gray-200 rounded-xl bg-gray-50 h-14 px-2 sm:w-1/3">
            <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-white rounded-lg transition-colors disabled:opacity-50"
                // disabled={quantity <= 1 || isOutOfStock}
            >
                <Minus size={18} />
            </button>
            
            <span className="font-bold text-gray-900 w-8 text-center">{quantity}</span>
            <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-white rounded-lg transition-colors disabled:opacity-50"
                // disabled={quantity >= availableStock || isOutOfStock}
            >
                <Plus size={18} />
            </button>
        </div>
    )
}
