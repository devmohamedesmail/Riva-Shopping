import React, { useState, useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { ShoppingCart, Heart, ShieldCheck, Truck, ArrowLeft, ArrowRight, Star, Plus, Minus } from 'lucide-react';
import Footer from '@/components/shared/footer';
import MainLayout from '@/layouts/main-layout';
import Breadcrumbs from './components/breadcrumbs';
import ProductGallery from './components/product-gallery';
import ProductInfo from './components/product-info';
import ProductActions from './components/product-actions';
import TrustedBadges from './components/trusted-badges';

export default function ProductDetails({ product }: { product: any }) {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.language === 'ar';


    // State
    const [activeImage, setActiveImage] = useState(product.images?.[0]?.image || '');
    const [quantity, setQuantity] = useState(1);
    const [selectedOptions, setSelectedOptions] = useState<Record<number, number>>({});








    // Handlers
    const handleOptionSelect = (attrId: number, valId: number) => {
        setSelectedOptions(prev => ({ ...prev, [attrId]: valId }));
    };




    return (
        <MainLayout>
            <Head title={`${product.title}`} />
            <div className="font-[Inter,sans-serif] bg-gray-50 min-h-screen flex flex-col">
                <main className="flex-1 container mx-auto py-8 px-4">
                    <Breadcrumbs product={product} />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <ProductGallery product={product} activeImage={activeImage} setActiveImage={setActiveImage} />

                        {/* Right: Product Details */}
                        <div className="flex flex-col">
                            <ProductInfo product={product} />

                            {/* Actions */}
                            <ProductActions product={product} quantity={quantity} setQuantity={setQuantity} />
                            <TrustedBadges />



                        </div>
                    </div>
                </main>


            </div>
        </MainLayout>
    );
}
