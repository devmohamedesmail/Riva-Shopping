import { usePage } from '@inertiajs/react'
import React from 'react'

export default function useBrands() {
    const { brands } = usePage().props
    return {
        brands
    }
}
