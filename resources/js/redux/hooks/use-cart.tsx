import React from 'react'
import { useSelector } from 'react-redux'

export default function useCart() {
 const cart = useSelector((state:any)=> state.cart.products || [])
 const cartItems = cart?.length || 0
    return {
        cart,
        cartItems
    }
}
