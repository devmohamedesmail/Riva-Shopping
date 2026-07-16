import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
export default function VariantTab({ 
    activeTab, 
    productType, 
    attributes, 
    currentAttrId, 
    setCurrentAttrId, 
    currentAttrValue, 
    optionFields, 
    setCurrentAttrValue, 
    handleAddOptionValue, 
    generateVariants, 
    variantFields, 
    removeOptionValue, 
    removeVariant, 
    register
}: any) {

    const { t, i18n } = useTranslation();
    const isRtl = i18n.language === 'ar';

    return (
        <div className={activeTab === 'variants' && productType === 'variant' ? 'block space-y-4' : 'hidden'}>
            <div className="flex justify-between items-center mb-2">
                <div>
                    <h3 className="text-sm font-semibold">{t("common.product-options")}</h3>
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
                        {optionFields.map((field: any, index: any) => {
                            const attr = attributes.find((a: any) => a.id === field.attribute_id);
                            return (
                                <div key={field.id} className="flex flex-col sm:flex-row sm:items-center gap-3">
                                    <span className="text-sm font-semibold w-24">{attr ? (isRtl ? attr.name_ar : attr.name_en) : 'Unknown'}:</span>
                                    <div className="flex flex-wrap gap-2">
                                        {field.values.map((v: any, vIdx: any) => (
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
                    {variantFields.map((field: any, index: any) => {
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
    )
}
