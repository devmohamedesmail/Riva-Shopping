import { ProductItem } from '@/types/product'
import { Button } from '@/components/ui/button';
import useImport from '@/hooks/use-import';
import {MessageCircle} from 'lucide-react'
import { Link } from '@inertiajs/react';
export default function ProductStoreInfo({product}:{product:ProductItem}) {
   const {t}=useImport()
    return (
        <div className='flex items-center gap-10'>
            <h2>{t('common.store-name')}{product?.store.name}</h2>
            <Button className='bg-black'>
                <span>{t('common.message-vendor')}</span>
                <MessageCircle />
            </Button>
            <Link href={`/store/${product.store.id}`}>{t('common.visit-vendor-store')}</Link>
        </div>
    )
}
