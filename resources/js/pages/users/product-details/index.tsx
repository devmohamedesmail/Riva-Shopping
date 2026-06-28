import React, { useState, useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { ShoppingCart, Heart, ShieldCheck, Truck, ArrowLeft, ArrowRight, Star, Plus, Minus } from 'lucide-react';
import TopBar from '@/components/home/top-header';
import Navbar from '@/components/home/navbar';
import Footer from '@/components/home/footer';

export default function ProductDetails({ product }: { product: any }) {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.language === 'ar';
   

    // State
    const [activeImage, setActiveImage] = useState(product.images?.[0]?.image || '');
    const [quantity, setQuantity] = useState(1);
    const [selectedOptions, setSelectedOptions] = useState<Record<number, number>>({}); // attr_id -> attr_value_id

    // Derived Data
    const isVariant = product.product_type === 'variant' && product.variants?.length > 0;

    // Group attribute values by attribute for the selector UI
    const attributesMap = useMemo(() => {
        const map: any = {};
        if (product.attributes && product.attribute_values) {
            product.attributes.forEach((attr: any) => {
                map[attr.id] = {
                    ...attr,
                    values: product.attribute_values.filter((v: any) => v.attribute_id === attr.id)
                };
            });
        }
        return map;
    }, [product]);

    // Find the currently active variant based on selected options
    const activeVariant = useMemo(() => {
        if (!isVariant) return null;

        // Find a variant that has exactly the selected attribute value IDs
        const selectedValueIds = Object.values(selectedOptions);

        if (selectedValueIds.length === Object.keys(attributesMap).length) {
            return product.variants.find((v: any) => {
                const variantValueIds = v.attribute_values.map((av: any) => av.id);
                // Check if all selected values are in this variant's values
                return selectedValueIds.every(id => variantValueIds.includes(id)) &&
                    variantValueIds.length === selectedValueIds.length;
            });
        }
        return null;
    }, [selectedOptions, product.variants, isVariant, attributesMap]);

    // Pricing Logic
    const basePrice = Number(product.price);
    const baseSalePrice = product.sale_price ? Number(product.sale_price) : null;

    const displayPrice = isVariant && activeVariant
        ? Number(activeVariant.sale_price || activeVariant.price)
        : (baseSalePrice || basePrice);

    const displayOldPrice = isVariant && activeVariant
        ? (activeVariant.sale_price ? Number(activeVariant.price) : null)
        : (baseSalePrice ? basePrice : null);

    const discount = displayOldPrice && displayPrice < displayOldPrice
        ? Math.round(((displayOldPrice - displayPrice) / displayOldPrice) * 100)
        : null;

    const availableStock = activeVariant ? activeVariant.stock : product.stock;
    const isOutOfStock = availableStock <= 0;

    // Handlers
    const handleOptionSelect = (attrId: number, valId: number) => {
        setSelectedOptions(prev => ({ ...prev, [attrId]: valId }));
    };

    const handleAddToCart = () => {
        if (isVariant && !activeVariant) {
            alert(t('shop.select_options', 'Please select all options before adding to cart.'));
            return;
        }
        // TODO: Implement cart functionality
        console.log("Adding to cart:", { product_id: product.id, variant_id: activeVariant?.id, quantity });
    };

    const getImageSrc = (path: string) => path.startsWith('http') ? path : `/storage/${path}`;

    return (
        <>
            <Head title={`${product.title} | Shopella`} />
            <div className="font-[Inter,sans-serif] bg-gray-50 min-h-screen flex flex-col">
                <TopBar />
                <Navbar />

                <main className="flex-1 py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                        {/* Breadcrumbs */}
                        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                            <Link href="/" className="hover:text-primary transition-colors">{t('common.home', 'Home')}</Link>
                            {isRtl ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
                            <Link href="/shop" className="hover:text-primary transition-colors">{t('shop.title', 'Shop')}</Link>
                            {isRtl ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
                            <span className="text-gray-900 font-medium truncate max-w-xs">{product.title}</span>
                        </nav>

                        {/* Product Layout Grid */}
                        <div className="bg-white rounded-3xl shadow-xs border border-gray-100 p-6 md:p-10">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                                {/* Left: Images */}
                                <div className="space-y-4">
                                    <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden relative border border-gray-50 group">
                                        {activeImage ? (
                                            <img src={getImageSrc(activeImage)} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-6xl">🛍️</div>
                                        )}
                                        {discount && (
                                            <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
                                                -{discount}%
                                            </span>
                                        )}
                                    </div>

                                    {/* Thumbnail gallery */}
                                    {product.images && product.images.length > 1 && (
                                        <div className="grid grid-cols-5 gap-3">
                                            {product.images.map((img: any) => (
                                                <button
                                                    key={img.id}
                                                    onClick={() => setActiveImage(img.image)}
                                                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${activeImage === img.image ? 'border-primary ring-2 ring-primary/20' : 'border-transparent hover:border-gray-300'}`}
                                                >
                                                    <img src={getImageSrc(img.image)} className="w-full h-full object-cover" />
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Right: Product Details */}
                                <div className="flex flex-col">
                                    {/* Badges & Category */}
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-sm text-primary font-semibold uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-full">
                                            {isRtl ? product.category?.name_ar : product.category?.name_en}
                                        </span>
                                        <div className="flex items-center gap-1 text-sm bg-gray-100 px-2 py-1 rounded-md text-gray-600 font-medium">
                                            <Star size={14} className="text-amber-400" fill="currentColor" />
                                            <span>4.8</span>
                                            <span className="text-gray-400 font-normal">(124)</span>
                                        </div>
                                    </div>

                                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                                        {product.title}
                                    </h1>

                                    {/* Pricing */}
                                    <div className="flex items-end gap-3 mb-6 pb-6 border-b border-gray-100">
                                        <div className="text-4xl font-black text-gray-900">
                                            ${displayPrice.toFixed(2)}
                                        </div>
                                        {displayOldPrice && (
                                            <div className="text-xl text-gray-400 line-through mb-1 font-medium">
                                                ${displayOldPrice.toFixed(2)}
                                            </div>
                                        )}
                                        {isVariant && !activeVariant && Object.keys(attributesMap).length > 0 && (
                                            <div className="text-sm text-gray-500 mb-2 ml-2">
                                                {t('shop.select_variation_price', '(Select options for exact price)')}
                                            </div>
                                        )}
                                    </div>

                                    {/* Short Description */}
                                    <div className="prose prose-sm text-gray-500 mb-8 max-w-none line-clamp-4">
                                        {product.description || 'No description available for this product.'}
                                    </div>

                                    {/* Variations Selector */}
                                    {isVariant && Object.keys(attributesMap).length > 0 && (
                                        <div className="space-y-6 mb-8">
                                            {Object.values(attributesMap).map((attr: any) => (
                                                <div key={attr.id} className="flex flex-col gap-3">
                                                    <div className="flex justify-between items-center text-sm">
                                                        <span className="font-semibold text-gray-900">{isRtl ? attr.name_ar : attr.name_en}</span>
                                                        <span className="text-gray-400">
                                                            {selectedOptions[attr.id] ? attr.values.find((v: any) => v.id === selectedOptions[attr.id])?.value : ''}
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-wrap gap-2">
                                                        {attr.values.map((v: any) => (
                                                            <button
                                                                key={v.id}
                                                                onClick={() => handleOptionSelect(attr.id, v.id)}
                                                                className={`px-5 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 ${selectedOptions[attr.id] === v.id
                                                                        ? 'border-primary bg-primary text-white shadow-md shadow-primary/20'
                                                                        : 'border-gray-200 text-gray-700 bg-white hover:border-gray-300 hover:bg-gray-50'
                                                                    }`}
                                                            >
                                                                {v.value}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Stock Status */}
                                    <div className={`text-sm font-medium mb-6 flex items-center gap-2 ${isOutOfStock ? 'text-red-500' : 'text-green-600'}`}>
                                        <div className={`w-2 h-2 rounded-full ${isOutOfStock ? 'bg-red-500' : 'bg-green-500'}`}></div>
                                        {isOutOfStock
                                            ? t('shop.out_of_stock', 'Out of Stock')
                                            : t('shop.in_stock_count', '{{count}} in stock', { count: availableStock })}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-col sm:flex-row gap-4 mb-8">
                                        {/* Quantity */}
                                        <div className="flex items-center justify-between border border-gray-200 rounded-xl bg-gray-50 h-14 px-2 sm:w-1/3">
                                            <button
                                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-white rounded-lg transition-colors disabled:opacity-50"
                                                disabled={quantity <= 1 || isOutOfStock}
                                            >
                                                <Minus size={18} />
                                            </button>
                                            <span className="font-bold text-gray-900 w-8 text-center">{quantity}</span>
                                            <button
                                                onClick={() => setQuantity(quantity + 1)}
                                                className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-white rounded-lg transition-colors disabled:opacity-50"
                                                disabled={quantity >= availableStock || isOutOfStock}
                                            >
                                                <Plus size={18} />
                                            </button>
                                        </div>

                                        {/* Add to cart */}
                                        <button
                                            onClick={handleAddToCart}
                                            disabled={isOutOfStock}
                                            className="flex-1 flex items-center justify-center gap-2 bg-black hover:bg-gray-900 text-white h-14 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
                                        >
                                            <ShoppingCart size={20} />
                                            {isOutOfStock ? t('shop.out_of_stock', 'Out of Stock') : t('common.add_to_cart', 'Add to Cart')}
                                        </button>

                                        <button className="flex items-center justify-center w-14 h-14 rounded-xl border border-gray-200 text-gray-500 hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-colors">
                                            <Heart size={24} />
                                        </button>
                                    </div>

                                    {/* Trust Badges */}
                                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                                                <Truck size={20} />
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-gray-900">{t('feature.free_shipping', 'Free Shipping')}</div>
                                                <div className="text-xs text-gray-500">{t('feature.free_shipping_desc', 'On all orders')}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center shrink-0">
                                                <ShieldCheck size={20} />
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-gray-900">{t('feature.secure_payment', 'Secure Payment')}</div>
                                                <div className="text-xs text-gray-500">{t('feature.secure_payment_desc', '100% protected')}</div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}
