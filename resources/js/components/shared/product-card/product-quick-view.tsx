import { Button } from '@/components/ui/button'
import {Eye} from 'lucide-react'

export default function ProductQuickView() {
  return (
     <Button
                    className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-gray-500 hover:text-white transition-all duration-200"
                    title="Quick View"
                >
                    <Eye size={14} />
                </Button>
  )
}
