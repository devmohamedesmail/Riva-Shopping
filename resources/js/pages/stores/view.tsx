import React, { useState, useMemo } from 'react'
import { Head } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import {
    Search, Share2, MapPin, Phone, Mail, Globe, Package,
    ShoppingBag, Tag, X, CheckCircle2, Store, ChevronRight, Grid3X3, LayoutList, Star
} from 'lucide-react'
import MainLayout from '@/layouts/main-layout'
import ProductCardView from '@/components/shared/product-card/product-card-view'
import { ProductItem, Category, PaginatedProducts } from '@/types/product'
import useImport from '@/hooks/use-import'

interface StoreData {
    id: number
    name: string
    slug: string
    logo: string | null
    cover: string | null
    description: string | null
    phone: string | null
    email: string | null
    address: string | null
    city: string | null
    state: string | null
    country: string | null
    currency: string
    status: string
    user_id: number
}

interface Props {
    store: StoreData
    products: PaginatedProducts
    categories: Category[]
}

export default function ViewVendorStore({ store, products, categories }: Props) {
    const { t, isRtl } = useImport()
    const [search, setSearch] = useState('')
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
    const [view, setView] = useState<'grid' | 'list'>('grid')
    const [copied, setCopied] = useState(false)

    const productList = products?.data ?? []

    // ─── Filter products ───────────────────────────────────────────────────────
    const filtered = useMemo(() => {
        return productList.filter((p: ProductItem) => {
            const matchSearch =
                !search ||
                p.title?.toLowerCase().includes(search.toLowerCase())
            const matchCategory =
                selectedCategory === null || p.category_id === selectedCategory
            return matchSearch && matchCategory
        })
    }, [productList, search, selectedCategory])

    // ─── Share handler ─────────────────────────────────────────────────────────
    const handleShare = async () => {
        const url = window.location.href
        if (navigator.share) {
            try {
                await navigator.share({ title: store.name, url })
            } catch (_) {
                /* user cancelled */
            }
        } else {
            await navigator.clipboard.writeText(url)
            setCopied(true)
            setTimeout(() => setCopied(false), 2500)
        }
    }

    // ─── Category label helper ─────────────────────────────────────────────────
    const getCategoryLabel = (cat: Category) =>
        isRtl ? cat.name_ar : cat.name_en

    return (
        <MainLayout>
            <Head title={`${store.name} — ${t('store.store_profile')}`}>
                <meta
                    name="description"
                    content={store.description ?? `${t('store.browse_products_from')} ${store.name}`}
                />
            </Head>

            {/* ═══════════════════════════════════════════════════════════════
                  COVER / HERO
             ═══════════════════════════════════════════════════════════════ */}
            <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden">
                {store.cover ? (
                    <img
                        src={store.cover}
                        alt={store.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900" />
                )}
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Share button */}
                <button
                    onClick={handleShare}
                    className="absolute top-4 end-4 flex items-center gap-2 bg-white/20 backdrop-blur-md text-white border border-white/30 px-4 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition-all duration-200 shadow-lg"
                >
                    {copied ? (
                        <>
                            <CheckCircle2 size={15} className="text-green-300" />
                            <span>{t('store.link_copied')}</span>
                        </>
                    ) : (
                        <>
                            <Share2 size={15} />
                            <span>{t('store.share_store')}</span>
                        </>
                    )}
                </button>
            </div>

            {/* ═══════════════════════════════════════════════════════════════
                  STORE PROFILE HEADER
             ═══════════════════════════════════════════════════════════════ */}
            <div className="bg-white border-b border-gray-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5 -mt-14 pb-6 relative z-10">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <div className="w-28 h-28 rounded-2xl border-4 border-white shadow-xl overflow-hidden bg-white">
                                {store.logo ? (
                                    <img
                                        src={store.logo}
                                        alt={store.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                                        <Store size={40} className="text-white" />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Store info */}
                        <div className="flex-1 min-w-0 pt-14 sm:pt-0">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                <div>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                                            {store.name}
                                        </h1>
                                        {store.status === 'active' && (
                                            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-emerald-200">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                                {t('common.active')}
                                            </span>
                                        )}
                                    </div>
                                    {store.description && (
                                        <p className="mt-1 text-sm text-gray-500 max-w-xl line-clamp-2">
                                            {store.description}
                                        </p>
                                    )}
                                </div>

                                {/* Stats pills */}
                                <div className="flex gap-3 flex-wrap">
                                    <div className="flex items-center gap-1.5 bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full text-sm font-medium border border-indigo-100">
                                        <Package size={14} />
                                        <span>{products?.total ?? productList.length} {t('store.products')}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-purple-50 text-purple-700 px-3 py-1.5 rounded-full text-sm font-medium border border-purple-100">
                                        <Tag size={14} />
                                        <span>{categories.length} {t('store.categories')}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Contact info row */}
                            <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-3">
                                {store.city && (
                                    <span className="flex items-center gap-1 text-xs text-gray-500">
                                        <MapPin size={12} className="text-gray-400" />
                                        {store.city}{store.country ? `, ${store.country}` : ''}
                                    </span>
                                )}
                                {store.phone && (
                                    <a
                                        href={`tel:${store.phone}`}
                                        className="flex items-center gap-1 text-xs text-gray-500 hover:text-indigo-600 transition-colors"
                                    >
                                        <Phone size={12} className="text-gray-400" />
                                        {store.phone}
                                    </a>
                                )}
                                {store.email && (
                                    <a
                                        href={`mailto:${store.email}`}
                                        className="flex items-center gap-1 text-xs text-gray-500 hover:text-indigo-600 transition-colors"
                                    >
                                        <Mail size={12} className="text-gray-400" />
                                        {store.email}
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ═══════════════════════════════════════════════════════════════
                  MAIN CONTENT
             ═══════════════════════════════════════════════════════════════ */}
            <div className="bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col lg:flex-row gap-6">

                        {/* ─── SIDEBAR ───────────────────────────────────────── */}
                        <aside className="lg:w-64 flex-shrink-0 space-y-4">

                            {/* Search */}
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                    <Search size={14} />
                                    {t('store.search_in_store')}
                                </h3>
                                <div className="relative">
                                    <Search size={15} className="absolute start-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={e => setSearch(e.target.value)}
                                        placeholder={t('store.search_placeholder')}
                                        className="w-full ps-9 pe-8 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 bg-gray-50 placeholder-gray-400 transition-all"
                                    />
                                    {search && (
                                        <button
                                            onClick={() => setSearch('')}
                                            className="absolute end-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            <X size={14} />
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Categories filter */}
                            {categories.length > 0 && (
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                                    <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                        <ShoppingBag size={14} />
                                        {t('store.filter_by_category')}
                                    </h3>
                                    <div className="space-y-1">
                                        {/* All */}
                                        <button
                                            onClick={() => setSelectedCategory(null)}
                                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all duration-150 ${
                                                selectedCategory === null
                                                    ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                                                    : 'text-gray-600 hover:bg-gray-50 hover:text-indigo-600'
                                            }`}
                                        >
                                            <span>{t('common.all_categories')}</span>
                                            <span className={`text-xs px-2 py-0.5 rounded-full ${selectedCategory === null ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>
                                                {productList.length}
                                            </span>
                                        </button>
                                        {categories.map(cat => {
                                            const count = productList.filter((p: ProductItem) => p.category_id === cat.id).length
                                            return (
                                                <button
                                                    key={cat.id}
                                                    onClick={() => setSelectedCategory(cat.id === selectedCategory ? null : cat.id)}
                                                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all duration-150 ${
                                                        selectedCategory === cat.id
                                                            ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                                                            : 'text-gray-600 hover:bg-gray-50 hover:text-indigo-600'
                                                    }`}
                                                >
                                                    <span className="truncate text-start">{getCategoryLabel(cat)}</span>
                                                    <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ms-2 ${selectedCategory === cat.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>
                                                        {count}
                                                    </span>
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Store info card */}
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-3">
                                <h3 className="text-sm font-semibold text-gray-700">{t('store.store_info')}</h3>
                                {store.address && (
                                    <div className="flex items-start gap-2 text-xs text-gray-500">
                                        <MapPin size={13} className="text-indigo-400 mt-0.5 flex-shrink-0" />
                                        <span>{store.address}{store.city ? `, ${store.city}` : ''}{store.state ? `, ${store.state}` : ''}</span>
                                    </div>
                                )}
                                {store.email && (
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <Mail size={13} className="text-indigo-400 flex-shrink-0" />
                                        <a href={`mailto:${store.email}`} className="hover:text-indigo-600 transition-colors truncate">{store.email}</a>
                                    </div>
                                )}
                                {store.phone && (
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <Phone size={13} className="text-indigo-400 flex-shrink-0" />
                                        <a href={`tel:${store.phone}`} className="hover:text-indigo-600 transition-colors">{store.phone}</a>
                                    </div>
                                )}
                                {/* Share button inside sidebar */}
                                <button
                                    onClick={handleShare}
                                    className="w-full flex items-center justify-center gap-2 mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold py-2.5 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-sm hover:shadow-md"
                                >
                                    {copied ? (
                                        <>
                                            <CheckCircle2 size={15} />
                                            {t('store.link_copied')}
                                        </>
                                    ) : (
                                        <>
                                            <Share2 size={15} />
                                            {t('store.share_store')}
                                        </>
                                    )}
                                </button>
                            </div>
                        </aside>

                        {/* ─── PRODUCTS AREA ─────────────────────────────────── */}
                        <div className="flex-1 min-w-0">

                            {/* Toolbar */}
                            <div className="flex items-center justify-between mb-5 bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-3">
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Package size={15} className="text-indigo-500" />
                                    <span>
                                        <span className="font-bold text-gray-900">{filtered.length}</span>
                                        {' '}{t('store.products_found')}
                                    </span>
                                    {selectedCategory !== null && (
                                        <span className="flex items-center gap-1 bg-indigo-100 text-indigo-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                            {getCategoryLabel(categories.find(c => c.id === selectedCategory)!)}
                                            <button onClick={() => setSelectedCategory(null)} className="ms-1 hover:text-indigo-900">
                                                <X size={11} />
                                            </button>
                                        </span>
                                    )}
                                    {search && (
                                        <span className="flex items-center gap-1 bg-purple-100 text-purple-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                            "{search}"
                                            <button onClick={() => setSearch('')} className="ms-1 hover:text-purple-900">
                                                <X size={11} />
                                            </button>
                                        </span>
                                    )}
                                </div>
                                {/* View toggle */}
                                <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
                                    <button
                                        onClick={() => setView('grid')}
                                        className={`p-1.5 rounded-lg transition-all ${view === 'grid' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                                    >
                                        <Grid3X3 size={16} />
                                    </button>
                                    <button
                                        onClick={() => setView('list')}
                                        className={`p-1.5 rounded-lg transition-all ${view === 'list' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                                    >
                                        <LayoutList size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Category chips — mobile horizontal scroll */}
                            {categories.length > 0 && (
                                <div className="flex lg:hidden items-center gap-2 overflow-x-auto pb-3 mb-4 scrollbar-hide">
                                    <button
                                        onClick={() => setSelectedCategory(null)}
                                        className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                                            selectedCategory === null
                                                ? 'bg-indigo-600 text-white border-indigo-600'
                                                : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-400'
                                        }`}
                                    >
                                        {t('common.all_categories')}
                                    </button>
                                    {categories.map(cat => (
                                        <button
                                            key={cat.id}
                                            onClick={() => setSelectedCategory(cat.id === selectedCategory ? null : cat.id)}
                                            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                                                selectedCategory === cat.id
                                                    ? 'bg-indigo-600 text-white border-indigo-600'
                                                    : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-400'
                                            }`}
                                        >
                                            {getCategoryLabel(cat)}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Products grid / list */}
                            {filtered.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                    <div className="w-20 h-20 rounded-full bg-indigo-50 flex items-center justify-center mb-4">
                                        <ShoppingBag size={32} className="text-indigo-300" />
                                    </div>
                                    <p className="text-lg font-semibold text-gray-700">{t('store.no_products_found')}</p>
                                    <p className="text-sm text-gray-400 mt-1">{t('store.try_different_search')}</p>
                                    {(search || selectedCategory !== null) && (
                                        <button
                                            onClick={() => { setSearch(''); setSelectedCategory(null) }}
                                            className="mt-4 text-sm text-indigo-600 font-medium hover:underline"
                                        >
                                            {t('store.clear_filters')}
                                        </button>
                                    )}
                                </div>
                            ) : view === 'grid' ? (
                                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                                    {filtered.map((product: ProductItem) => (
                                        <ProductCardView key={product.id} product={product} />
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    {filtered.map((product: ProductItem) => (
                                        <ProductListRow key={product.id} product={product} isRtl={isRtl} t={t} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

/* ─── Product list row (list view) ─────────────────────────────────────────── */
function ProductListRow({ product, isRtl, t }: { product: ProductItem; isRtl: boolean; t: any }) {
    const image = product.images?.[0]?.image

    return (
        <div className="group bg-white rounded-2xl border border-gray-100 hover:border-indigo-200 hover:shadow-lg transition-all duration-300 flex items-center gap-4 p-3">
            {/* Image */}
            <div className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50">
                {image ? (
                    <img src={image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl">🛍️</div>
                )}
            </div>
            {/* Info */}
            <div className="flex-1 min-w-0">
                <p className="text-xs text-indigo-500 font-semibold uppercase tracking-wide mb-0.5">
                    {isRtl ? product.category?.name_ar : product.category?.name_en}
                </p>
                <p className="text-sm font-semibold text-gray-800 line-clamp-1">{product.title}</p>
                {/* Stars placeholder */}
                <div className="flex items-center gap-0.5 mt-1">
                    {[1,2,3,4,5].map(s => (
                        <Star key={s} size={10} className="text-amber-400 fill-amber-400" />
                    ))}
                </div>
            </div>
            {/* Price */}
            <div className="text-end flex-shrink-0">
                {product.sale_price ? (
                    <div>
                        <p className="text-base font-extrabold text-gray-900">{product.sale_price} {product.store?.currency}</p>
                        <p className="text-xs text-red-400 line-through">{product.price} {product.store?.currency}</p>
                    </div>
                ) : (
                    <p className="text-base font-extrabold text-gray-900">{product.price} {product.store?.currency}</p>
                )}
            </div>
            <ChevronRight size={16} className="text-gray-300 group-hover:text-indigo-400 transition-colors flex-shrink-0" />
        </div>
    )
}
