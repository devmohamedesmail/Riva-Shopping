import React, { useState } from 'react'
import * as z from 'zod';
import {  ProductItem } from '@/types/product';
import toast from 'react-hot-toast';
import { router } from '@inertiajs/react';
import useImport from '@/hooks/use-import';
export default function useCreateUpdateProduct() {
    const { t, isRtl } = useImport()
    const [modalOpen, setModalOpen] = useState(false);
    const [editProduct, setEditProduct] = useState<ProductItem | null>(null);
    const [processing, setProcessing] = useState(false);






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
        // title: z.string().min(1, t('validation.required')),
        title: z.string({error:"fdsfadf"}).min(1, t('validation.required')),
        description: z.string().optional().nullable(),
        price: z.coerce.number().positive('Price must be >= 0'),
        sale_price: z.coerce.number().optional().nullable().transform((val) => (val === 0 ? null : val)),
        product_type: z.enum(['simple', 'variant']).default('simple'),
        product_kind: z.enum(['physical', 'digital']).default('physical'),
        // stock: z.coerce.number().min(0).default(10),
        stock: z.coerce.number({ error: "dfasdf" }).positive('Stock should ne '),
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


    const handleSubmit = (data: ProductFormData) => {
        setProcessing(true);

        const fd = new FormData();
        if (editProduct) {
            fd.append('_method', 'PUT');
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

    return {
        t, setEditProduct, setModalOpen, modalOpen, editProduct, processing, handleSubmit, isRtl
    }
}
