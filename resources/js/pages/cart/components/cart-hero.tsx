
import { ShoppingCart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
export default function CartHero() {
    const { t } = useTranslation();
    return (
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-10 px-4">
            <div className="max-w-7xl mx-auto flex justify-center items-center gap-3">
                <ShoppingCart size={26} className="text-orange-400" />
                <div>
                    <h1 className="text-2xl font-extrabold">{t('cart.title')}</h1>
                    <p className="text-gray-400 text-sm">{t('cart.subtitle')}</p>
                </div>
            </div>
        </div>
    )
}
