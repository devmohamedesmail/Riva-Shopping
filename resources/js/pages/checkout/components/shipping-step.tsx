import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ChevronRight, Truck } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const SHIPPING_FIELDS = ['name', 'phone', 'address'] as const
type ShippingField = typeof SHIPPING_FIELDS[number]

const FULL_WIDTH_FIELDS: ShippingField[] = ['address']

export default function ShippingStep({ setStep, register, errors }: any) {
    const { t } = useTranslation()

    return (
        <div>
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-5">
                <Truck size={18} className="text-orange-500" />
                {t('checkout.shipping.heading')}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SHIPPING_FIELDS.map((field) => (
                    <div
                        key={field}
                        className={`space-y-1.5 ${FULL_WIDTH_FIELDS.includes(field) ? 'sm:col-span-2' : ''}`}
                    >
                        <Label className="text-sm">{t(`checkout.shipping.${field}`)}</Label>
                        <Input
                            placeholder={t(`checkout.shipping.${field}`)}
                            {...register(field)}
                            className={errors?.[field] ? 'border-red-400' : ''}
                        />
                        {errors?.[field] && (
                            <p className="text-xs text-red-500">{errors[field].message}</p>
                        )}
                    </div>
                ))}

                <div className="sm:col-span-2 space-y-1.5">
                    <Label>{t('checkout.shipping.note')}</Label>
                    <Textarea {...register('notes')} />
                </div>
            </div>

            <label className="flex items-center gap-2 mt-4 text-sm text-gray-600 cursor-pointer">
                <input type="checkbox" className="accent-orange-500" />
                {t('checkout.shipping.save_address')}
            </label>

            <div className="flex justify-end mt-6">
                <Button
                    type="button"
                    onClick={() => setStep('payment')}
                    className="bg-orange-500 hover:bg-orange-600 text-white gap-2 rounded-xl px-8"
                >
                    {t('common.continue')} <ChevronRight size={16} />
                </Button>
            </div>
        </div>
    )
}
