import { usePage } from '@inertiajs/react'
import React from 'react'

export default function useProducts() {
 
 const {products}=usePage().props
  return {
    products
  }
}
