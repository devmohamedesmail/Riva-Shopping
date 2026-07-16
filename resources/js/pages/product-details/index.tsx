import React, { useState, useMemo } from 'react';
import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import MainLayout from '@/layouts/main-layout';
import Breadcrumbs from './components/breadcrumbs';
import ProductGallery from './components/product-gallery';
import ProductInfo from './components/product-info';
import ProductActions from './components/product-actions';
import TrustedBadges from './components/trusted-badges';
import ProductOptions from './components/product-options';
import ProductStoreInfo from './components/product-store-info';

type SelectedAttributes = {
    [key: number]: number
}
export default function ProductDetails({ product }: { product: any }) {
    const [activeImage, setActiveImage] = useState(product.images?.[0]?.image || '');
    const [quantity, setQuantity] = useState(1);
    const [selectedAttributes, setSelectedAttributes] = useState<SelectedAttributes>({});
    const [selectedVariant, setSelectedVariant] = useState(null)
    const canAddToCart = product.attributes.length === 0 || selectedVariant !== null
    const [errors, setErrors] = useState<number[]>([])

const {t}=useTranslation()


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
                            <ProductInfo 
                            product={product}
                            selectedVariant={selectedVariant}
                            />

                            <ProductOptions
                                product={product}
                                selectedAttributes={selectedAttributes}
                                setSelectedAttributes={setSelectedAttributes}
                                setSelectedVariant={setSelectedVariant}
                                selectedVariant={selectedVariant}
                                canAddToCart={canAddToCart}
                                errors={errors}
                                setErrors={setErrors}
                            />

                            {/* Actions */}
                            <ProductActions
                                product={product}
                                quantity={quantity}
                                setQuantity={setQuantity}
                                selectedVariant={selectedVariant}
                                canAddToCart={canAddToCart}
                                selectedAttributes={selectedAttributes}
                                setErrors={setErrors}
                            />
                          <ProductStoreInfo product={product} />
                            <TrustedBadges />
                        </div>
                    </div>

                    <div>Tabs</div>
                </main>
            </div>
        </MainLayout>
    );
}
