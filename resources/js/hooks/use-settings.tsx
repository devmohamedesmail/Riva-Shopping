import { usePage } from '@inertiajs/react'
import React from 'react'

export default function useSettings() {
    const { settings } = usePage().props as any
    return {
        settings
    }
}
