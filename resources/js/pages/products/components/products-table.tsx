import React, { useState, useRef } from 'react';
import { Head, router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, Image as ImageIcon } from 'lucide-react';




import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProductItem } from '@/types/product';
import StatusBadge from './status-badge';
import toast from 'react-hot-toast';
import DeleteProductDialog from './delete-product-modal';



export default function ProductsTable({ filtered, products }: any) {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.language === 'ar';
    const [modalOpen, setModalOpen] = useState(false);
    const [editProduct, setEditProduct] = useState<ProductItem | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<ProductItem | null>(null);
    const [processing, setProcessing] = useState(false);

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
        <>
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
                        {filtered.map((product: ProductItem) => (
                            <tr key={product.id} className="hover:bg-gray-50/60 dark:hover:bg-gray-800/40 transition-colors group">
                                <td className="px-6 py-4 flex items-center gap-3">
                                    {product.images && product.images.length > 0 ? (
                                        <img src={product.images[0].image ? product.images[0].image : `/storage/${product.images[0].image}`} className="w-10 h-10 rounded-md object-cover border border-gray-200 shrink-0" alt="Thumb" />
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
                                            <span className="font-bold text-gray-900 dark:text-white"> {product.sale_price || product.price}</span>
                                            {product.sale_price && <span className="text-xs text-gray-400 line-through"> {product.price}</span>}
                                        </div>
                                    )}
                                </td>
                                <td className="px-6 py-4 hidden sm:table-cell">
                                    {product.product_type === 'variant' ? (
                                        <span className="text-gray-500">—</span>
                                    ) : product.stock > 0
                                        ? <span className="font-medium text-gray-700 dark:text-gray-300">{product.stock}
                                            {t('common.stockin')}
                                            in stock</span>
                                        : <span className="font-medium text-red-500">
                                            {t('common.stockout')}
                                        </span>
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
                                                <DropdownMenuLabel>{t('common.actions')}</DropdownMenuLabel>
                                                <DropdownMenuItem
                                                    // onClick={() => { setEditProduct(product); setModalOpen(true); }} 

                                                    className="gap-2 cursor-pointer">
                                                    <Pencil size={14} className="text-gray-500" />{t('common.edit')}
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    onClick={() => setDeleteTarget(product)} 
                                                    className="text-red-500 gap-2 cursor-pointer hover:text-red-600 focus:text-red-600">
                                                    <Trash2 size={14} /> {t('common.delete')}
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
        
         <DeleteProductDialog open={!!deleteTarget} onCancel={() => setDeleteTarget(null)} onConfirm={handleDelete} processing={processing} /></>
       
    )
}
