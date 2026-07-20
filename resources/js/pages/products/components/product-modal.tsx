import React, { useRef, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react'
import { ProductImage, Variant } from '@/types/product';

import { Button } from '@/components/ui/button';
import GereralTab from './gereral-tab';
import ImagesTab from './images-tab';
import PricingTab from './pricing-tab';
import ShippingTab from './shipping-tab';
import VisibilityTab from './visibility-tab';
import VariantTab from './variant-tab';
import useImport from '@/hooks/use-import';



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
export default function ProductModal({ open, onClose, categories, attributes, editProduct, currency, processing, onSubmit }: any) {
    const { t, isRtl } = useImport()
    const [activeTab, setActiveTab] = useState<'general' | 'media' | 'inventory' | 'variants' | 'shipping' | 'visibility'>('general');
    const [previewImages, setPreviewImages] = useState<{ url: string, file?: File, existing?: boolean }[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [showOptionForm, setShowOptionForm] = useState(false);
    const [currentAttrId, setCurrentAttrId] = useState<string>("");
    const [currentAttrValue, setCurrentAttrValue] = useState("");

    const { register, handleSubmit, reset, control, watch, setValue, formState: { errors } } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            title: '',
            description: '',
            price: 0,
            sale_price: null,
            product_type: 'simple',
            product_kind: 'physical',
            stock: 0,
            sku: '',
            is_active: true,
            is_popular: false,
            is_featured: false,
            weight: null,
            length: null,
            width: null,
            height: null,
            tax: 0,
            shipping_cost: null,
            category_id: 0,
            variants: [],
            images: null,
        }
    });

    const productType = watch('product_type');
    const {
        fields: variantFields,
        append: appendVariant,
        remove: removeVariant } = useFieldArray({
            control,
            name: "variants"
        });

    const {
        fields: optionFields,
        append: appendOption,
        remove: removeOption,
        update: updateOption } = useFieldArray({
            control,
            name: "product_attributes"
        });

    React.useEffect(() => {
        if (open) {
            setActiveTab('general');
            setShowOptionForm(false);
            setCurrentAttrId("");
            setCurrentAttrValue("");

            if (editProduct) {
                const variantsParsed = editProduct.variants ? editProduct.variants.map((v: Variant) => {
                    const options: Record<string, string> = {};
                    if (v.attributeValues) {
                        v.attributeValues.forEach(av => {
                            // @ts-ignore
                            options[av.attribute_id.toString()] = av.value;
                        });
                    }
                    return {
                        id: v.id, sku: v.sku || '', price: v.price, sale_price: v.sale_price || null, stock: v.stock, is_active: v.is_active,
                        attribute_values: v.attributeValues ? v.attributeValues.map(av => av.id) : [],
                        options
                    };
                }) : [];

                const existingProductAttrs: Record<number, Set<string>> = {};
                if (editProduct.variants) {
                    editProduct.variants.forEach((v: Variant) => {
                        if (v.attributeValues) {
                            v.attributeValues.forEach(av => {
                                // @ts-ignore
                                if (!existingProductAttrs[av.attribute_id]) {
                                    // @ts-ignore
                                    existingProductAttrs[av.attribute_id] = new Set();
                                }
                                // @ts-ignore
                                existingProductAttrs[av.attribute_id].add(av.value);
                            });
                        }
                    });
                }
                const productAttrsParsed = Object.keys(existingProductAttrs).map(attrIdStr => ({
                    attribute_id: Number(attrIdStr),
                    values: Array.from(existingProductAttrs[Number(attrIdStr)])
                }));

                reset({
                    title: editProduct.title, description: editProduct.description || '',
                    price: editProduct.price, sale_price: editProduct.sale_price || null,
                    product_type: editProduct.product_type, product_kind: editProduct.product_kind,
                    stock: editProduct.stock, sku: editProduct.sku || '',
                    is_active: editProduct.is_active, is_popular: editProduct.is_popular, is_featured: editProduct.is_featured,
                    weight: editProduct.weight || null, length: editProduct.length || null, width: editProduct.width || null, height: editProduct.height || null,
                    tax: editProduct.tax || 0, shipping_cost: editProduct.shipping_cost || null,
                    category_id: editProduct.category_id || 0,
                    product_attributes: productAttrsParsed,
                    variants: variantsParsed,
                    images: null,
                });

                if (editProduct.images) {
                    setPreviewImages(editProduct.images.map((img: ProductImage) => ({
                        url: img.image.startsWith('http') ? img.image : `/storage/${img.image}`,
                        existing: true
                    })));
                } else {
                    setPreviewImages([]);
                }
            } else {
                reset({
                    title: '', description: '', price: 0, sale_price: null, product_type: 'simple', product_kind: 'physical',
                    stock: 0, sku: '', is_active: true, is_popular: false, is_featured: false,
                    weight: null, length: null, width: null, height: null, tax: 0, shipping_cost: null, category_id: 0,
                    product_attributes: [],
                    variants: [],
                    images: null,
                });
                setPreviewImages([]);
            }
        }
    }, [editProduct, open, reset]);

    if (!open) return null;

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files);
            setValue('images', newFiles);

            const newPreviews = newFiles.map(file => ({
                url: URL.createObjectURL(file),
                file: file,
                existing: false
            }));

            setPreviewImages(prev => [...prev.filter(p => p.existing), ...newPreviews]);
        }
    };

    const handleAddOptionValue = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const val = currentAttrValue.trim();
            if (val && currentAttrId) {
                const attrIdNum = Number(currentAttrId);
                const currentAttrs = watch('product_attributes') || [];
                const existingAttrIdx = currentAttrs.findIndex(a => a.attribute_id === attrIdNum);

                if (existingAttrIdx >= 0) {
                    const existingAttr = currentAttrs[existingAttrIdx];
                    if (!existingAttr.values.includes(val)) {
                        updateOption(existingAttrIdx, { ...existingAttr, values: [...existingAttr.values, val] });
                    }
                } else {
                    appendOption({ attribute_id: attrIdNum, values: [val] });
                }
                setCurrentAttrValue("");
            }
        }
    };

    const removeOptionValue = (attrIdx: number, valToRemove: string) => {
        const currentAttrs = watch('product_attributes') || [];
        const existingAttr = currentAttrs[attrIdx];
        if (existingAttr) {
            const newValues = existingAttr.values.filter(v => v !== valToRemove);
            if (newValues.length === 0) {
                removeOption(attrIdx);
            } else {
                updateOption(attrIdx, { ...existingAttr, values: newValues });
            }
        }
    };

    const generateVariants = () => {
        const attrs = watch('product_attributes') || [];
        if (attrs.length === 0) return;

        const combinations = attrs.reduce((acc, attr: any) => {
            if (acc.length === 0) {
                return attr.values.map((v: string) => ({ [attr.attribute_id.toString()]: v }));
            }
            return acc.flatMap(existing => {
                return attr.values.map((v: string) => ({ ...existing, [attr.attribute_id.toString()]: v }));
            });
        }, [] as Record<string, string>[]);

        setValue('variants', combinations.map(combo => ({
            price: Number(watch('price')) || 0,
            stock: 0,
            sale_price: null,
            sku: '',
            is_active: true,
            options: combo
        })));
    };

    const tabs = [
        { id: 'general', label: t('vendor.products.general') },
        { id: 'media', label: t('vendor.products.images') },
        { id: 'inventory', label: t('vendor.products.pricing') },
        { id: 'variants', label: t('vendor.products.variants'), hidden: productType === 'simple' },
        { id: 'shipping', label: t('vendor.products.shipping') },
        { id: 'visibility', label: t('vendor.products.visibility') }
    ].filter(t => !t.hidden);

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 transition-opacity" dir={isRtl ? 'rtl' : 'ltr'}>
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800 shrink-0">
                    <h2 className="font-bold text-gray-900 dark:text-white">
                        {editProduct ? t('vendor.products.edit_modal_title', 'Edit Product') : t('vendor.products.add_modal_title', 'Add Product')}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
                </div>

                <div className="flex px-6 border-b border-gray-100 dark:border-gray-800 shrink-0 overflow-x-auto no-scrollbar">
                    {tabs.map(tab => (
                        <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id as any)}
                            className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${activeTab === tab.id ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                            {tab.label}
                        </button>
                    ))}
                </div>

                <form id="product-form" onSubmit={handleSubmit(onSubmit)} className="p-6 overflow-y-auto space-y-6 flex-1 bg-white dark:bg-gray-900">
                    {/* GENERAL TAB */}

                    <GereralTab
                        activeTab={activeTab}
                        register={register}
                        errors={errors}
                        control={control}
                        categories={categories}
                    />

                    {/* MEDIA TAB */}

                    <ImagesTab
                        activeTab={activeTab}
                        previewImages={previewImages}
                        fileInputRef={fileInputRef}
                        handleImageChange={handleImageChange}
                        setPreviewImages={setPreviewImages} />

                    {/* INVENTORY & PRICING TAB */}

                    <PricingTab
                        activeTab={activeTab}
                        register={register}
                        errors={errors}
                        productType={productType} />

                    {/* VARIANTS TAB */}



                    <VariantTab
                        activeTab={activeTab}
                        productType={productType}
                        attributes={attributes}
                        currentAttrId={currentAttrId}
                        setCurrentAttrId={setCurrentAttrId}
                        currentAttrValue={currentAttrValue}
                        optionFields={optionFields}
                        setCurrentAttrValue={setCurrentAttrValue}
                        handleAddOptionValue={handleAddOptionValue}
                        generateVariants={generateVariants}
                        variantFields={variantFields}
                        removeOptionValue={removeOptionValue}
                        removeVariant={removeVariant} r
                        register={register}
                    />

                    {/* LOGISTICS TAB */}

                    <ShippingTab activeTab={activeTab} control={control} register={register} />

                    {/* VISIBILITY TAB */}
                    <VisibilityTab activeTab={activeTab} register={register} />
                </form>

                <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100 dark:border-gray-800 shrink-0 bg-gray-50 dark:bg-gray-900/50">
                    <Button type="button" variant="outline" onClick={onClose}>{t('vendor.products.cancel', 'Cancel')}</Button>
                    <Button type="submit" form="product-form" disabled={processing} className="bg-orange-500 hover:bg-orange-600 text-white border-0 shadow-sm">
                        {processing ? t('vendor.products.saving', 'Saving...') : t('vendor.products.save', 'Save Product')}
                    </Button>
                </div>
            </div>
        </div>
    )
}
