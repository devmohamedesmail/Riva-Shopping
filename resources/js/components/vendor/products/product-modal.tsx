import React, { useRef, useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash2, UploadCloud, X } from 'lucide-react'
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Category, ProductImage, Variant } from '@/types/product';

import { Button } from '@/components/ui/button';



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
    const { t, i18n } = useTranslation();
    const isRtl = i18n.language === 'ar';
    const [activeTab, setActiveTab] = useState<'general' | 'media' | 'inventory' | 'variants' | 'shipping' | 'visibility'>('general');
    const [previewImages, setPreviewImages] = useState<{ url: string, file?: File, existing?: boolean }[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [showOptionForm, setShowOptionForm] = useState(false);
    const [currentAttrId, setCurrentAttrId] = useState<string>("");
    const [currentAttrValue, setCurrentAttrValue] = useState("");

    const { register, handleSubmit, reset, control, watch, setValue, formState: { errors } } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            title: '', description: '', price: 0, sale_price: null, product_type: 'simple', product_kind: 'physical',
            stock: 0, sku: '', is_active: true, is_popular: false, is_featured: false,
            weight: null, length: null, width: null, height: null, tax: 0, shipping_cost: null, category_id: 0,
            variants: [],
            images: null,
        }
    });

    const productType = watch('product_type');
    const { fields: variantFields, append: appendVariant, remove: removeVariant } = useFieldArray({
        control,
        name: "variants"
    });

    const { fields: optionFields, append: appendOption, remove: removeOption, update: updateOption } = useFieldArray({
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
                    <div className={activeTab === 'general' ? 'block space-y-5' : 'hidden'}>
                        <div className="space-y-1.5">

                            <Label>{t('vendor.products.title', 'Title')} <span className="text-red-500">*</span></Label>
                            <Input {...register('title')} className={errors.title ? 'border-red-500' : ''} />
                            {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
                        </div>

                        <div className="space-y-1.5">
                            <Label>{t('vendor.products.description', 'Description')}</Label>
                            <Textarea rows={4} {...register('description')} className="resize-none" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <Label>{t('vendor.products.category', 'Category')} <span className="text-red-500">*</span></Label>
                                <Controller
                                    name="category_id"
                                    control={control}
                                    render={({ field }) => (
                                        <Select value={field.value?.toString() || ""} onValueChange={(val) => field.onChange(Number(val))}>
                                            <SelectTrigger className={errors.category_id ? 'border-red-500' : ''}>
                                                <SelectValue placeholder={t('vendor.products.select_category', 'Select Category')} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories.map((c: Category) => (
                                                    <SelectItem key={c.id} value={c.id.toString()}>
                                                        {isRtl ? c.name_ar : c.name_en}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.category_id && <p className="text-xs text-red-500">{errors.category_id.message}</p>}
                            </div>

                            <div className="space-y-1.5">
                                <Label>Product Type</Label>
                                <Controller
                                    name="product_type"
                                    control={control}
                                    render={({ field }) => (
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="simple">Simple Product</SelectItem>
                                                <SelectItem value="variant">Variant Product</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>
                        </div>
                    </div>

                    {/* MEDIA TAB */}
                    <div className={activeTab === 'media' ? 'block space-y-4' : 'hidden'}>
                        <div className="border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl p-8 text-center flex flex-col items-center justify-center bg-gray-50/50 dark:bg-gray-800/20">
                            <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                                <UploadCloud size={24} className="text-orange-500" />
                            </div>
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Click to upload images</h3>
                            <p className="text-xs text-gray-500 mb-4">PNG, JPG up to 2MB</p>
                            <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" multiple accept="image/*" />
                            <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()} className="bg-white">
                                Browse Files
                            </Button>
                        </div>

                        {previewImages.length > 0 && (
                            <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 mt-4">
                                {previewImages.map((img, idx) => (
                                    <div key={idx} className="relative aspect-square rounded-lg border border-gray-200 overflow-hidden bg-white shadow-sm group">
                                        <img src={img.url} className="w-full h-full object-cover" alt="Preview" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button type="button" onClick={() => setPreviewImages(p => p.filter((_, i) => i !== idx))} className="text-white hover:text-red-400 p-1">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* INVENTORY & PRICING TAB */}
                    <div className={activeTab === 'inventory' ? 'block space-y-5' : 'hidden'}>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <Label>{t('vendor.products.price', 'Price')} ({currency}) <span className="text-red-500">*</span></Label>
                                <Input type="number" min={0} step="0.01" {...register('price')} className={errors.price ? 'border-red-500' : ''} disabled={productType === 'variant'} />
                                {errors.price && <p className="text-xs text-red-500">{errors.price.message}</p>}
                                {productType === 'variant' && <p className="text-xs text-gray-400">Set base price. Variant prices can override this.</p>}
                            </div>
                            <div className="space-y-1.5">
                                <Label>{t('vendor.products.sale_price', 'Sale Price')} ({currency})</Label>
                                <Input type="number" min={0} step="0.01" {...register('sale_price')} disabled={productType === 'variant'} />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <Label>{t('vendor.products.stock', 'Stock Quantity')}</Label>
                                <Input type="number" min={0} {...register('stock')} disabled={productType === 'variant'} />
                            </div>
                            <div className="space-y-1.5">
                                <Label>{t('vendor.products.sku', 'SKU')}</Label>
                                <Input {...register('sku')} placeholder="e.g. PROD-1001" disabled={productType === 'variant'} />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <Label>Tax (%)</Label>
                            <Input type="number" min={0} step="0.01" {...register('tax')} />
                        </div>
                    </div>

                    {/* VARIANTS TAB */}
                    <div className={activeTab === 'variants' && productType === 'variant' ? 'block space-y-4' : 'hidden'}>
                        <div className="flex justify-between items-center mb-2">
                            <div>
                                <h3 className="text-sm font-semibold">Product Options</h3>
                                <p className="text-xs text-gray-500">Define attributes like Size or Color, then generate combos.</p>
                            </div>
                        </div>

                        {/* PRODUCT OPTIONS SECTION */}
                        <div className="bg-gray-50 dark:bg-gray-800/30 p-4 rounded-xl border border-gray-200 dark:border-gray-800 space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-end gap-3">
                                <div className="flex-1 space-y-1.5">
                                    <Label className="text-xs">Select Attribute</Label>
                                    <Select value={currentAttrId} onValueChange={setCurrentAttrId}>
                                        <SelectTrigger className="h-9 bg-white dark:bg-gray-900">
                                            <SelectValue placeholder="e.g. Size" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {attributes.map((a: any) => (
                                                <SelectItem key={a.id} value={a.id.toString()}>
                                                    {isRtl ? a.name_ar : a.name_en}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div style={{ flex: 2 }} className="space-y-1.5">
                                    <Label className="text-xs">Add Values (Press Enter or comma)</Label>
                                    <Input
                                        value={currentAttrValue}
                                        onChange={e => setCurrentAttrValue(e.target.value)}
                                        onKeyDown={handleAddOptionValue}
                                        placeholder="Type value and press enter..."
                                        className="h-9 bg-white dark:bg-gray-900"
                                        disabled={!currentAttrId}
                                    />
                                </div>
                                <Button type="button" onClick={() => {
                                    if (currentAttrValue && currentAttrId) {
                                        handleAddOptionValue({ key: 'Enter', preventDefault: () => { } } as any);
                                    }
                                }} size="sm" className="h-9" disabled={!currentAttrId || !currentAttrValue}>Add</Button>
                            </div>

                            {/* DISPLAY ADDED OPTIONS */}
                            {optionFields.length > 0 && (
                                <div className="space-y-3 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                    {optionFields.map((field, index) => {
                                        const attr = attributes.find((a: any) => a.id === field.attribute_id);
                                        return (
                                            <div key={field.id} className="flex flex-col sm:flex-row sm:items-center gap-3">
                                                <span className="text-sm font-semibold w-24">{attr ? (isRtl ? attr.name_ar : attr.name_en) : 'Unknown'}:</span>
                                                <div className="flex flex-wrap gap-2">
                                                    {field.values.map((v, vIdx) => (
                                                        <span key={vIdx} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm">
                                                            {v}
                                                            <button type="button" onClick={() => removeOptionValue(index, v)} className="text-gray-400 hover:text-red-500">
                                                                <X size={12} />
                                                            </button>
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <div className="pt-2">
                                        <Button type="button" onClick={generateVariants} className="w-full bg-black hover:bg-gray-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200 shadow-sm gap-2">
                                            Generate Variant Combinations
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* GENERATED VARIANTS LIST */}
                        {variantFields.length > 0 && (
                            <div className="space-y-4 mt-6">
                                <h4 className="text-sm font-semibold border-b border-gray-100 dark:border-gray-800 pb-2">Generated Variants ({variantFields.length})</h4>
                                {variantFields.map((field, index) => {
                                    const variantOptions = field.options || {};
                                    return (
                                        <div key={field.id} className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50/50 dark:bg-gray-800/30 relative">
                                            <button type="button" onClick={() => removeVariant(index)} className="absolute top-3 right-3 text-gray-400 hover:text-red-500 p-1">
                                                <X size={16} />
                                            </button>

                                            <div className="flex flex-wrap gap-2 mb-4 pr-8">
                                                {Object.keys(variantOptions).map(attrIdStr => {
                                                    const attr = attributes.find((a: any) => a.id.toString() === attrIdStr);
                                                    return (
                                                        <span key={attrIdStr} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-orange-100 text-orange-800 dark:bg-orange-500/20 dark:text-orange-300">
                                                            {attr ? (isRtl ? attr.name_ar : attr.name_en) : attrIdStr}: {variantOptions[attrIdStr]}
                                                        </span>
                                                    )
                                                })}
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 mb-4">
                                                <div className="space-y-1.5">
                                                    <Label className="text-xs">Variant Price *</Label>
                                                    <Input type="number" step="0.01" {...register(`variants.${index}.price`)} className="h-8 text-sm" />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <Label className="text-xs">Variant Sale Price</Label>
                                                    <Input type="number" step="0.01" {...register(`variants.${index}.sale_price`)} className="h-8 text-sm" />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-1.5">
                                                    <Label className="text-xs">Stock</Label>
                                                    <Input type="number" {...register(`variants.${index}.stock`)} className="h-8 text-sm" />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <Label className="text-xs">SKU</Label>
                                                    <Input {...register(`variants.${index}.sku`)} className="h-8 text-sm" />
                                                </div>
                                            </div>
                                            <div className="mt-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-3">
                                                <Label className="text-xs text-gray-500">Active Status</Label>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input type="checkbox" className="sr-only peer" {...register(`variants.${index}.is_active`)} />
                                                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-orange-500"></div>
                                                </label>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>

                    {/* LOGISTICS TAB */}
                    <div className={activeTab === 'shipping' ? 'block space-y-5' : 'hidden'}>
                        <div className="space-y-1.5">
                            <Label>Product Kind</Label>
                            <Controller
                                name="product_kind"
                                control={control}
                                render={({ field }) => (
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select kind" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="physical">Physical Product</SelectItem>
                                            <SelectItem value="digital">Digital Product</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <Label>Weight (kg)</Label>
                                <Input type="number" min={0} step="0.01" {...register('weight')} />
                            </div>
                            <div className="space-y-1.5">
                                <Label>Shipping Cost (Flat Rate)</Label>
                                <Input type="number" min={0} step="0.01" {...register('shipping_cost')} />
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-1.5">
                                <Label>Length (cm)</Label>
                                <Input type="number" min={0} step="0.01" {...register('length')} />
                            </div>
                            <div className="space-y-1.5">
                                <Label>Width (cm)</Label>
                                <Input type="number" min={0} step="0.01" {...register('width')} />
                            </div>
                            <div className="space-y-1.5">
                                <Label>Height (cm)</Label>
                                <Input type="number" min={0} step="0.01" {...register('height')} />
                            </div>
                        </div>
                    </div>

                    {/* VISIBILITY TAB */}
                    <div className={activeTab === 'visibility' ? 'block space-y-4' : 'hidden'}>
                        <div className="space-y-4 bg-gray-50 dark:bg-gray-800/50 p-5 rounded-xl border border-gray-100 dark:border-gray-800">
                            <div className="flex items-center justify-between">
                                <div>
                                    <Label className="text-base text-gray-900 dark:text-gray-100">Active Status</Label>
                                    <p className="text-xs text-gray-500 mt-0.5">Determine if the product is visible to customers.</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" {...register('is_active')} />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-500"></div>
                                </label>
                            </div>

                            <div className="h-px w-full bg-gray-200 dark:bg-gray-700"></div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <Label className="text-base text-gray-900 dark:text-gray-100">Mark as Popular</Label>
                                    <p className="text-xs text-gray-500 mt-0.5">Show this product in popular sections.</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" {...register('is_popular')} />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-500"></div>
                                </label>
                            </div>

                            <div className="h-px w-full bg-gray-200 dark:bg-gray-700"></div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <Label className="text-base text-gray-900 dark:text-gray-100">Mark as Featured</Label>
                                    <p className="text-xs text-gray-500 mt-0.5">Highlight this product on your store.</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" {...register('is_featured')} />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-500"></div>
                                </label>
                            </div>
                        </div>
                    </div>
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
