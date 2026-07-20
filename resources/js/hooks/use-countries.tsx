import { usePage } from '@inertiajs/react'
import React from 'react'

export default function useCountries() {
  const {countries}=usePage().props as any
    return{
        countries
    }
}
