import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function PricingTab({activeTab,register,errors,productType}:any) {
  const {t}=useTranslation()
    return (
     <div className={activeTab === 'inventory' ? 'block space-y-5' : 'hidden'}>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <Label>{t('vendor.products.price', 'Price')} <span className="text-red-500">*</span></Label>
                                <Input type="number" min={0} step="0.01" {...register('price')} className={errors.price ? 'border-red-500' : ''} disabled={productType === 'variant'} />
                                {errors.price && <p className="text-xs text-red-500">{errors.price.message}</p>}
                                {productType === 'variant' && <p className="text-xs text-gray-400">Set base price. Variant prices can override this.</p>}
                            </div>
                            <div className="space-y-1.5">
                                <Label>{t('vendor.products.sale_price', 'Sale Price')}</Label>
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
  )
}
