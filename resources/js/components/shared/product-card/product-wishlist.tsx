import React from 'react'
import { Button } from '@/components/ui/button'
export default function ProductWishlist() {
    return (
        <Button
            // onClick={() => setWishlisted(!wishlisted)}
            className={`w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center  hover:text-white transition-all duration-200 `}
            title="Wishlist"
        >
            {/* <Heart size={15} fill={wishlisted ? 'currentColor' : 'none'} /> */}
        </Button>
    )
}
