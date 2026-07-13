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



export default function GereralTab({activeTab , register , errors , control , categories}:any) {
 const { t, i18n } = useTranslation();
    const isRtl = i18n.language === 'ar';

    return (
     <div className={activeTab === 'general' ? 'block space-y-5' : 'hidden'}>
                        <div className="space-y-1.5">

                            <Label>{t('vendor.products.product_name')} <span className="text-red-500">*</span></Label>
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
                                <Label>{t('vendor.products.product_type')}</Label>
                                <Controller
                                    name="product_type"
                                    control={control}
                                    render={({ field }) => (
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="simple">{t('vendor.products.simple')}</SelectItem>
                                                <SelectItem value="variant">{t('vendor.products.variant')}</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
  )
}
