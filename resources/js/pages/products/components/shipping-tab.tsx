import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useTranslation } from 'react-i18next';
export default function ShippingTab({activeTab,control,register}:any) {
const {t}=useTranslation()
    return (
      <div className={activeTab === 'shipping' ? 'block space-y-5' : 'hidden'}>
                        <div className="space-y-1.5">
                            <Label>{t('common.product-kind')}</Label>
                            <Controller
                                name="product_kind"
                                control={control}
                                render={({ field }) => (
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select kind" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="physical">
                                                {t('common.physical-product')}
                                                </SelectItem>
                                            <SelectItem value="digital">
                                                {t('common.digital-product')}
                                                </SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <Label>{t('common.weight')} (kg)</Label>
                                <Input type="number" min={0} step="0.01" {...register('weight')} />
                            </div>
                            <div className="space-y-1.5">
                                <Label>{t('common.shipping-cost')} (Flat Rate)</Label>
                                <Input type="number" min={0} step="0.01" {...register('shipping_cost')} />
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-1.5">
                                <Label>{t('common.length')} (cm)</Label>
                                <Input type="number" min={0} step="0.01" {...register('length')} />
                            </div>
                            <div className="space-y-1.5">
                                <Label>{t('common.width')} (cm)</Label>
                                <Input type="number" min={0} step="0.01" {...register('width')} />
                            </div>
                            
                            <div className="space-y-1.5">
                                <Label>{t('common.height')} (cm)</Label>
                                <Input type="number" min={0} step="0.01" {...register('height')} />
                            </div>
                        </div>
                    </div>
  )
}
