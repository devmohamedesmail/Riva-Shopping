import { usePage } from '@inertiajs/react'
import { Category } from '@/types/product'

export default function useCategories() {
    const { categories } = usePage<{ categories: Category[] }>().props 
    return {
        categories
    }
}
