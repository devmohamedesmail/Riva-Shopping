import React from 'react'
import { ArrowLeftRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
export default function ProductCompare() {
    return (
        <Button
            className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-gray-500  hover:text-white transition-all duration-200"
            title="Compare"
        >
            <ArrowLeftRight size={13} />
        </Button>
    )
}
