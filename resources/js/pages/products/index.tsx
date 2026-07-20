import React, { useState, useRef } from 'react';
import { Head } from '@inertiajs/react';
import VendorLayout from '@/layouts/vendor-layout';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import * as z from 'zod';

import { Category, Attribute, PaginatedProducts, Store } from '@/types/product';
import NoProducts from './components/no-products';
import VendorProductsHeader from './components/vendor-products-header';
import ProductModal from './components/product-modal';
import ProductsTable from './components/products-table';
import DeleteAllDialog from './components/delete-all-dialog';
import useCreateUpdateProduct from './hooks/usecreate-update-product';




interface Props {
    store: Store;
    products:
    PaginatedProducts;
    categories: Category[];
    attributes: Attribute[];
}



export default function VendorProducts({ store, products, categories, attributes }: Props) {
    const [search, setSearch] = useState('');
    const filtered = products.data.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
    const { t, setEditProduct, setModalOpen, modalOpen, editProduct, processing, handleSubmit, isRtl } = useCreateUpdateProduct();

    return (
        <VendorLayout title={t('vendor.products.title', 'Products')}>
            <Head title={`${store.name} — ${t('vendor.products.title', 'Products')}`} />
            <VendorProductsHeader setEditProduct={setEditProduct} setModalOpen={setModalOpen} />


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

                <div className='flex items-center gap-3'>
                    <div className="text-sm text-gray-500 font-medium bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 px-4 py-2 rounded-xl shadow-sm">
                        Total: <span className="text-gray-900 dark:text-white font-bold">{products.total}</span>
                    </div>

                    <DeleteAllDialog store={store} />
                </div>

            </div>

            {filtered.length === 0 ? (
                <NoProducts search setEditProduct setModalOpen />
            ) : (
                <ProductsTable
                    filtered={filtered}
                    products={products}
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    editProduct={editProduct}
                    setEditProduct={setEditProduct}
                    setModalOpen={setModalOpen}
                />
            )}



            <ProductModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                categories={categories} attributes={attributes}
                editProduct={editProduct}
                currency={store.currency}
                processing={processing}
                onSubmit={handleSubmit} />

        </VendorLayout>
    );
}
