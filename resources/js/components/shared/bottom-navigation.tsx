import { Link } from '@inertiajs/react'
import { Heart, Home, ShoppingCart, Store, User } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'



function NavigationIcon({ title, icon, href }: any) {
    return (
        <Link href={href} 
        
        className='flex flex-col items-center justify-center flex-1'>
            <p>{icon}</p>
            <p className='text-xs mt-1'>{title}</p>
        </Link>
    )
}

export default function BottomNavigation() {
    const {t}=useTranslation();
    return (
        <div className='fixed bottom-0 right-0 left-0 h-18 bg-gray-100 flex justify-between z-50 items-center lg:hidden '>
            <div className="flex justify-between items-center w-full gap-2 px-3">
                <NavigationIcon title={t('common.home')} icon={<Home size={20} />} href={'/'} />
                <NavigationIcon title={t('common.cart')} icon={<ShoppingCart size={20} />} href={'/cart/page'} />
                <NavigationIcon title={t('common.shop')} icon={<Store size={20} />} href={'/store/page'} />
                <NavigationIcon title={t('common.wishlist')} icon={<Heart size={20} />} href={'/wishlist/page'} />
                <NavigationIcon title={t('common.account')} icon={<User size={20} />} href={'/account'} />
            </div>
        </div>
    )
}
