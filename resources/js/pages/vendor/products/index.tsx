import React, { useState, useRef } from 'react';
import { Head, router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import VendorLayout from '@/layouts/vendor-layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2, Search, Box, Image as ImageIcon } from 'lucide-react';
import * as z from 'zod';



import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ProductModal from '@/components/vendor/products/product-modal';
import DeleteDialog from '@/components/vendor/products/delete-modal';
import { Category, AttributeValue, Attribute, ProductImage, Variant, ProductItem, PaginatedProducts, Store } from '@/types/product';



interface Props { store: Store; products: PaginatedProducts; categories: Category[]; attributes: Attribute[]; }

const productAttributeSchema = z.object({
    attribute_id: z.coerce.number(),
    values: z.array(z.string()).min(1, "At least one value is required")
});

const variantSchema = z.object({
    id: z.number().optional(),
    sku: z.string().optional().nullable(),
    price: z.coerce.number().min(0, 'Price must be >= 0'),
    sale_price: z.coerce.number().optional().nullable().transform((val) => (val === 0 ? null : val)),
    stock: z.coerce.number().min(0).default(0),
    is_active: z.boolean().default(true),
    attribute_values: z.array(z.coerce.number()).optional(),
    options: z.record(z.string(), z.string()).optional(),
});

const productSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional().nullable(),
    price: z.coerce.number().min(0, 'Price must be >= 0'),
    sale_price: z.coerce.number().optional().nullable().transform((val) => (val === 0 ? null : val)),
    product_type: z.enum(['simple', 'variant']).default('simple'),
    product_kind: z.enum(['physical', 'digital']).default('physical'),
    stock: z.coerce.number().min(0).default(0),
    sku: z.string().optional().nullable(),
    is_active: z.boolean().default(true),
    is_popular: z.boolean().default(false),
    is_featured: z.boolean().default(false),
    weight: z.coerce.number().optional().nullable().transform((val) => (val === 0 ? null : val)),
    length: z.coerce.number().optional().nullable().transform((val) => (val === 0 ? null : val)),
    width: z.coerce.number().optional().nullable().transform((val) => (val === 0 ? null : val)),
    height: z.coerce.number().optional().nullable().transform((val) => (val === 0 ? null : val)),
    tax: z.coerce.number().min(0).default(0),
    shipping_cost: z.coerce.number().optional().nullable().transform((val) => (val === 0 ? null : val)),
    category_id: z.coerce.number().min(1, 'Category is required'),
    images: z.any().optional(),
    product_attributes: z.array(productAttributeSchema).optional(),
    variants: z.array(variantSchema).optional(),
});

type ProductFormData = z.input<typeof productSchema>;

function StatusBadge({ is_active }: { is_active: boolean }) {
    if (is_active) return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">Active</span>;
    return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">Inactive</span>;
}

export default function VendorProducts({ store, products, categories, attributes }: Props) {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.language === 'ar';
    const [modalOpen, setModalOpen] = useState(false);
    const [editProduct, setEditProduct] = useState<ProductItem | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<ProductItem | null>(null);
    const [processing, setProcessing] = useState(false);
    const [search, setSearch] = useState('');

    const filtered = products.data.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

    const handleSubmit = (data: ProductFormData) => {
        setProcessing(true);

        const fd = new FormData();
        if (editProduct) {
            fd.append('_method', 'PUT'); // required for Laravel file uploads on updates
        }

        Object.keys(data).forEach(key => {
            if (key === 'images' && data.images) {
                Array.from(data.images).forEach((file: any) => {
                    fd.append(`images[]`, file as Blob);
                });
            } else if (key === 'product_attributes' && data.product_attributes) {
                data.product_attributes.forEach((attr, i) => {
                    fd.append(`product_attributes[${i}][attribute_id]`, String(attr.attribute_id));
                    attr.values.forEach((v, j) => {
                        fd.append(`product_attributes[${i}][values][${j}]`, v);
                    });
                });
            } else if (key === 'variants' && data.variants) {
                data.variants.forEach((v, i) => {
                    fd.append(`variants[${i}][price]`, String(v.price));
                    fd.append(`variants[${i}][stock]`, String(v.stock));
                    if (v.sale_price !== null && v.sale_price !== undefined) fd.append(`variants[${i}][sale_price]`, String(v.sale_price));
                    if (v.sku) fd.append(`variants[${i}][sku]`, v.sku);
                    fd.append(`variants[${i}][is_active]`, v.is_active ? '1' : '0');
                    if (v.attribute_values) {
                        v.attribute_values.forEach((attrId, j) => {
                            fd.append(`variants[${i}][attribute_values][${j}]`, String(attrId));
                        });
                    }
                    if (v.options) {
                        Object.entries(v.options).forEach(([attrId, optVal]) => {
                            fd.append(`variants[${i}][options][${attrId}]`, optVal);
                        });
                    }
                });
            } else {
                const val = (data as any)[key];
                if (val !== null && val !== undefined) {
                    fd.append(key, typeof val === 'boolean' ? (val ? '1' : '0') : val.toString());
                }
            }
        });

        const opts = {
            onSuccess: () => { toast.success(t('vendor.products.save_success', 'Product saved!')); setModalOpen(false); },
            onError: (errors: any) => {
                toast.error(t('common.error', 'Something went wrong.'));
                console.error(errors);
            },
            onFinish: () => setProcessing(false),
        };

        if (editProduct) {
            router.post(`/vendor/products/${editProduct.id}`, fd, opts);
        } else {
            router.post('/vendor/products', fd, opts);
        }
    };

    const handleDelete = () => {
        if (!deleteTarget) return;
        setProcessing(true);
        router.delete(`/vendor/products/${deleteTarget.id}`, {
            onSuccess: () => { toast.success(t('vendor.products.delete_success', 'Product deleted!')); setDeleteTarget(null); },
            onError: () => toast.error(t('common.error', 'Something went wrong.')),
            onFinish: () => setProcessing(false),
        });
    };

    return (
        <VendorLayout title={t('vendor.products.title', 'Products')}>
            <Head title={`${store.name} — ${t('vendor.products.title', 'Products')}`} />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">{t('vendor.products.title', 'Products')}</h2>
                    <p className="text-sm text-gray-500 mt-1 max-w-xl">Manage your catalog, variants, and product visibility across your digital storefront.</p>
                </div>
                <Button onClick={() => { setEditProduct(null); setModalOpen(true); }} className="bg-orange-500 hover:bg-orange-600 shadow-sm text-white border-0 gap-2 shrink-0 rounded-xl px-5">
                    <Plus size={18} /> {t('vendor.products.add', 'Add Product')}
                </Button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                <div className="relative w-full sm:w-80">
                    <Search size={16} className={`absolute top-1/2 -translate-y-1/2 ${isRtl ? 'right-3' : 'left-3'} text-gray-400`} />
                    <Input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder={t('vendor.products.search', 'Search products by title...')}
                        className={`rounded-xl border-gray-200 shadow-sm ${isRtl ? 'pr-10' : 'pl-10'} h-10 w-full`}
                    />
                </div>
                <div className="text-sm text-gray-500 font-medium bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 px-4 py-2 rounded-xl shadow-sm">
                    Total: <span className="text-gray-900 dark:text-white font-bold">{products.total}</span>
                </div>
            </div>

            {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 border-dashed">
                    <div className="w-20 h-20 rounded-full bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center mb-5"><Box size={32} className="text-orange-400" /></div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No Products Found</h3>
                    <p className="text-gray-500 text-sm max-w-sm mx-auto">{search ? t('vendor.products.no_search_results', 'No products match your search query.') : t('vendor.products.no_products', 'Get started by creating your first product to display on your storefront.')}</p>
                    {!search && (
                        <Button onClick={() => { setEditProduct(null); setModalOpen(true); }} variant="outline" className="mt-6 border-gray-200 shadow-sm text-gray-700 bg-white hover:bg-gray-50">
                            Create First Product
                        </Button>
                    )}
                </div>
            ) : (
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-xs text-gray-500 uppercase tracking-wider bg-gray-50/80 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
                                    <th className="px-6 py-4 text-start font-semibold">{t('vendor.products.title')}</th>
                                    <th className="px-6 py-4 text-start font-semibold hidden lg:table-cell">{t('vendor.products.category')}</th>
                                    <th className="px-6 py-4 text-start font-semibold">{t('vendor.products.price', 'Pricing')}</th>
                                    <th className="px-6 py-4 text-start font-semibold hidden sm:table-cell">{t('vendor.products.stock')}</th>
                                    <th className="px-6 py-4 text-start font-semibold">{t('vendor.products.status')}</th>
                                    <th className="px-6 py-4 text-end font-semibold">{t('vendor.orders.actions')}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {filtered.map(product => (
                                    <tr key={product.id} className="hover:bg-gray-50/60 dark:hover:bg-gray-800/40 transition-colors group">
                                        <td className="px-6 py-4 flex items-center gap-3">
                                            {product.images && product.images.length > 0 ? (
                                                <img src={product.images[0].image.startsWith('http') ? product.images[0].image : `/storage/${product.images[0].image}`} className="w-10 h-10 rounded-md object-cover border border-gray-200 shrink-0" alt="Thumb" />
                                            ) : (
                                                <div className="w-10 h-10 rounded-md border border-gray-200 bg-gray-50 shrink-0 flex items-center justify-center text-gray-400">
                                                    <ImageIcon size={16} />
                                                </div>
                                            )}
                                            <div>
                                                <p className="font-semibold text-gray-900 dark:text-white truncate max-w-[200px]">{product.title}</p>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    {product.sku && <span className="text-[10px] text-gray-400 font-mono bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">{product.sku}</span>}
                                                    <span className="text-[10px] text-gray-400 uppercase tracking-wide">{product.product_type}</span>
                                                    {product.product_type === 'variant' && <span className="text-[10px] text-orange-500 font-medium">{product.variants?.length || 0} variants</span>}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 hidden lg:table-cell">
                                            <span className="inline-flex items-center px-2 py-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md text-xs text-gray-600 dark:text-gray-300">
                                                {product.category ? (isRtl ? product.category.name_ar : product.category.name_en) : 'Uncategorized'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {product.product_type === 'variant' ? (
                                                <span className="font-semibold text-gray-700 dark:text-gray-300">See variants</span>
                                            ) : (
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-gray-900 dark:text-white">{store.currency} {product.sale_price || product.price}</span>
                                                    {product.sale_price && <span className="text-xs text-gray-400 line-through">{store.currency} {product.price}</span>}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 hidden sm:table-cell">
                                            {product.product_type === 'variant' ? (
                                                <span className="text-gray-500">—</span>
                                            ) : product.stock > 0
                                                ? <span className="font-medium text-gray-700 dark:text-gray-300">{product.stock} in stock</span>
                                                : <span className="font-medium text-red-500">Out of stock</span>
                                            }
                                        </td>
                                        <td className="px-6 py-4"><StatusBadge is_active={product.is_active} /></td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-1 opacity-100 transition-opacity">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0 text-gray-500">
                                                            <span className="sr-only">Open menu</span>
                                                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.625 2.5C8.625 3.12132 8.12132 3.625 7.5 3.625C6.87868 3.625 6.375 3.12132 6.375 2.5C6.375 1.87868 6.87868 1.375 7.5 1.375C8.12132 1.375 8.625 1.87868 8.625 2.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM7.5 13.625C8.12132 13.625 8.625 13.1213 8.625 12.5C8.625 11.8787 8.12132 11.375 7.5 11.375C6.87868 11.375 6.375 11.8787 6.375 12.5C6.375 13.1213 6.87868 13.625 7.5 13.625Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-40">
                                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                        <DropdownMenuItem onClick={() => { setEditProduct(product); setModalOpen(true); }} className="gap-2 cursor-pointer">
                                                            <Pencil size={14} className="text-gray-500" /> Edit Details
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem onClick={() => setDeleteTarget(product)} className="text-red-500 gap-2 cursor-pointer hover:text-red-600 focus:text-red-600">
                                                            <Trash2 size={14} /> Delete Product
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {products.last_page > 1 && (
                        <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 flex items-center justify-between">
                            <p className="text-sm text-gray-600">Showing page {products.current_page} of {products.last_page}</p>
                        </div>
                    )}
                </div>
            )}



            <ProductModal open={modalOpen} onClose={() => setModalOpen(false)} categories={categories} attributes={attributes} editProduct={editProduct} currency={store.currency} processing={processing} onSubmit={handleSubmit} />
            <DeleteDialog open={!!deleteTarget} onCancel={() => setDeleteTarget(null)} onConfirm={handleDelete} processing={processing} />
        </VendorLayout>
    );
}
