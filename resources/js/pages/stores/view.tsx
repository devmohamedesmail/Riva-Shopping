import React, { useState, useMemo } from 'react'
import { Head, Link } from '@inertiajs/react'
import {
    Search, Share2, MapPin, Phone, Mail, Package,
    ShoppingBag, Tag, X, CheckCircle2, Store,
    Grid3X3, LayoutList, Star, ChevronRight, SlidersHorizontal,
} from 'lucide-react'
import MainLayout from '@/layouts/main-layout'
import ProductCardView from '@/components/shared/product-card/product-card-view'
import ProductListView from '@/components/shared/product-card/product-list-view'
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
    const { t, i18n, isRtl } = useImport()
    const [search, setSearch]                   = useState('')
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
    const [view, setView]                       = useState<'grid' | 'list'>('grid')
    const [copied, setCopied]                   = useState(false)

    const productList = products?.data ?? []

    // ── Filter ─────────────────────────────────────────────────────────────────
    const filtered = useMemo(() => {
        return productList.filter((p: ProductItem) => {
            const matchSearch =
                !search || p.title?.toLowerCase().includes(search.toLowerCase())
            const matchCat =
                selectedCategory === null || p.category_id === selectedCategory
            return matchSearch && matchCat
        })
    }, [productList, search, selectedCategory])

    // ── Share ──────────────────────────────────────────────────────────────────
    const handleShare = async () => {
        const url = window.location.href
        if (navigator.share) {
            try { await navigator.share({ title: store.name, url }) } catch (_) {}
        } else {
            await navigator.clipboard.writeText(url)
            setCopied(true)
            setTimeout(() => setCopied(false), 2500)
        }
    }

    const getCategoryLabel = (cat: Category) => isRtl ? cat.name_ar : cat.name_en

    return (
        <MainLayout>
            <Head title={`${store.name} — ${t('store.store_profile')}`}>
                <meta
                    name="description"
                    content={store.description ?? `${t('store.browse_products_from')} ${store.name}`}
                />
            </Head>

            {/* ════════════════════════════════════════════════════════════════
                  HERO  — cover + store identity + search bar
             ════════════════════════════════════════════════════════════════ */}
            <div className="relative w-full h-[420px] md:h-[500px] overflow-hidden">

                {/* Background */}
                {store.cover ? (
                    <img
                        src={store.cover}
                        alt={store.name}
                        className="absolute inset-0 w-full h-full object-cover scale-105"
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-orange-950 to-gray-900" />
                )}

                {/* Layered overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

                {/* Decorative glows */}
                <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-orange-400/10 blur-3xl pointer-events-none" />

                {/* Share button */}
                <button
                    onClick={handleShare}
                    className="absolute top-5 end-5 z-10 flex items-center gap-2 bg-white/15 backdrop-blur-md text-white border border-white/25 px-4 py-2 rounded-full text-sm font-medium hover:bg-white/25 transition-all"
                >
                    {copied
                        ? <><CheckCircle2 size={14} className="text-green-300" /><span>{t('store.link_copied')}</span></>
                        : <><Share2 size={14} /><span>{t('store.share_store')}</span></>
                    }
                </button>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 pb-10">

                    {/* Store logo */}
                    <div className="mb-5 ring-4 ring-white/20 rounded-2xl shadow-2xl">
                        <div className="w-24 h-24 rounded-2xl overflow-hidden bg-white shadow-xl">
                            {store.logo ? (
                                <img src={store.logo} alt={store.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                                    <Store size={36} className="text-white" />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Store name + badge */}
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight drop-shadow-lg">
                            {store.name}
                        </h1>
                        {store.status === 'active' && (
                            <span className="flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold px-3 py-1 rounded-full backdrop-blur">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                {t('common.active')}
                            </span>
                        )}
                    </div>

                    {/* Description */}
                    {store.description && (
                        <p className="text-gray-300 text-sm text-center max-w-lg mb-2 line-clamp-2">
                            {store.description}
                        </p>
                    )}

                    {/* Meta row */}
                    <div className="flex flex-wrap items-center justify-center gap-4 text-gray-400 text-xs mb-8">
                        {store.city && (
                            <span className="flex items-center gap-1">
                                <MapPin size={12} className="text-orange-400" />
                                {store.city}{store.country ? `, ${store.country}` : ''}
                            </span>
                        )}
                        {store.phone && (
                            <a href={`tel:${store.phone}`} className="flex items-center gap-1 hover:text-white transition-colors">
                                <Phone size={12} className="text-orange-400" /> {store.phone}
                            </a>
                        )}
                        {store.email && (
                            <a href={`mailto:${store.email}`} className="flex items-center gap-1 hover:text-white transition-colors">
                                <Mail size={12} className="text-orange-400" /> {store.email}
                            </a>
                        )}
                        <span className="flex items-center gap-1">
                            <Package size={12} className="text-orange-400" />
                            {products?.total ?? productList.length} {t('store.products')}
                        </span>
                        <span className="flex items-center gap-1">
                            <Tag size={12} className="text-orange-400" />
                            {categories.length} {t('store.categories')}
                        </span>
                    </div>

                    {/* ── Search bar (hero) ── */}
                    <div className="w-full max-w-2xl">
                        <div className="relative flex items-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden group focus-within:border-orange-400/60 transition-all duration-300">
                            <div className="flex items-center px-5">
                                <Search size={18} className="text-white/60 group-focus-within:text-orange-400 transition-colors" />
                            </div>
                            <input
                                type="text"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder={t('store.search_placeholder')}
                                className="flex-1 bg-transparent text-white placeholder-white/50 py-4 pe-4 text-sm focus:outline-none"
                            />
                            {search && (
                                <button
                                    onClick={() => setSearch('')}
                                    className="p-2 me-2 text-white/60 hover:text-white rounded-lg hover:bg-white/10 transition-all"
                                >
                                    <X size={16} />
                                </button>
                            )}
                            <button className="m-1.5 px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-colors">
                                {t('common.search')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ════════════════════════════════════════════════════════════════
                  CATEGORIES GRID
             ════════════════════════════════════════════════════════════════ */}
            {categories.length > 0 && (
                <div className="bg-white border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-gray-900">{t('store.filter_by_category')}</h2>
                            {selectedCategory !== null && (
                                <button
                                    onClick={() => setSelectedCategory(null)}
                                    className="text-xs text-orange-500 hover:text-orange-600 font-medium flex items-center gap-1"
                                >
                                    <X size={12} /> {t('store.clear_filters')}
                                </button>
                            )}
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {/* All pill */}
                            <button
                                onClick={() => setSelectedCategory(null)}
                                className={`group flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-200 ${
                                    selectedCategory === null
                                        ? 'bg-orange-500 border-orange-500 text-white shadow-md shadow-orange-200'
                                        : 'bg-white border-gray-200 text-gray-600 hover:border-orange-300 hover:text-orange-600'
                                }`}
                            >
                                <ShoppingBag size={14} />
                                {t('common.all_categories')}
                                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                    selectedCategory === null ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                                }`}>
                                    {productList.length}
                                </span>
                            </button>

                            {categories.map(cat => {
                                const count   = productList.filter((p: ProductItem) => p.category_id === cat.id).length
                                const active  = selectedCategory === cat.id
                                const label   = getCategoryLabel(cat)

                                return (
                                    <button
                                        key={cat.id}
                                        onClick={() => setSelectedCategory(active ? null : cat.id)}
                                        className={`group relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-200 overflow-hidden ${
                                            active
                                                ? 'bg-orange-500 border-orange-500 text-white shadow-md shadow-orange-200'
                                                : 'bg-white border-gray-200 text-gray-600 hover:border-orange-300 hover:text-orange-600'
                                        }`}
                                    >
                                        {/* Category thumbnail */}
                                        {cat.image && (
                                            <div className={`w-6 h-6 rounded-lg overflow-hidden flex-shrink-0 ring-1 ${active ? 'ring-white/40' : 'ring-gray-100'}`}>
                                                <img src={cat.image} alt={label} className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                        <span>{label}</span>
                                        <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
                                            active ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                                        }`}>
                                            {count}
                                        </span>
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* ════════════════════════════════════════════════════════════════
                  PRODUCTS AREA
             ════════════════════════════════════════════════════════════════ */}
            <div className="bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                    {/* Toolbar */}
                    <div className="flex items-center justify-between mb-6 bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-3 gap-3 flex-wrap">
                        <div className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
                            <Package size={15} className="text-orange-500" />
                            <span>
                                <span className="font-bold text-gray-900">{filtered.length}</span>
                                {' '}{t('store.products_found')}
                            </span>

                            {/* Active filter chips */}
                            {selectedCategory !== null && (
                                <span className="flex items-center gap-1 bg-orange-100 text-orange-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                    {getCategoryLabel(categories.find(c => c.id === selectedCategory)!)}
                                    <button onClick={() => setSelectedCategory(null)} className="ms-1 hover:text-orange-900">
                                        <X size={11} />
                                    </button>
                                </span>
                            )}
                            {search && (
                                <span className="flex items-center gap-1 bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                    "{search}"
                                    <button onClick={() => setSearch('')} className="ms-1 hover:text-gray-900">
                                        <X size={11} />
                                    </button>
                                </span>
                            )}
                        </div>

                        {/* View toggle */}
                        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
                            <button
                                onClick={() => setView('grid')}
                                className={`p-1.5 rounded-lg transition-all ${view === 'grid' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                <Grid3X3 size={16} />
                            </button>
                            <button
                                onClick={() => setView('list')}
                                className={`p-1.5 rounded-lg transition-all ${view === 'list' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                <LayoutList size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Mobile category chips */}
                    {/* {categories.length > 0 && (
                        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-5 scrollbar-hide -mx-1 px-1">
                            <button
                                onClick={() => setSelectedCategory(null)}
                                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                                    selectedCategory === null
                                        ? 'bg-orange-500 text-white border-orange-500'
                                        : 'bg-white text-gray-600 border-gray-200 hover:border-orange-400'
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
                                            ? 'bg-orange-500 text-white border-orange-500'
                                            : 'bg-white text-gray-600 border-gray-200 hover:border-orange-400'
                                    }`}
                                >
                                    {getCategoryLabel(cat)}
                                </button>
                            ))}
                        </div>
                    )} */}

                    {/* Products */}
                    {filtered.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-gray-100 shadow-sm">
                            <div className="w-20 h-20 rounded-full bg-orange-50 flex items-center justify-center mb-4">
                                <ShoppingBag size={32} className="text-orange-300" />
                            </div>
                            <p className="text-lg font-semibold text-gray-700">{t('store.no_products_found')}</p>
                            <p className="text-sm text-gray-400 mt-1">{t('store.try_different_search')}</p>
                            {(search || selectedCategory !== null) && (
                                <button
                                    onClick={() => { setSearch(''); setSelectedCategory(null) }}
                                    className="mt-4 text-sm text-orange-500 font-medium hover:underline"
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
                                <ProductListView key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    )
}
