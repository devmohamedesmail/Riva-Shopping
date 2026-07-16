import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ChevronRight, Truck } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function ShippingStep({ setStep, register }: any) {
    const { t } = useTranslation();
    return (
        <div>
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-5">
                <Truck size={18} className="text-orange-500" /> {t('checkout.shipping.heading')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(['name', 'phone', 'address'] as const).map(field => (
                    <div key={field} className={`space-y-1.5 ${['email', 'address', 'country'].includes(field) ? 'sm:col-span-2' : ''}`}>
                        <Label className="text-sm">{t(`checkout.shipping.${field}`)}</Label>
                        <Input placeholder={t(`checkout.shipping.${field}`)}
                            {...register(`${field}`)}

                        />
                    </div>
                ))}

                <div>
                    <Label>{t('checkout.shipping.note')}</Label>
                    <Textarea {...register('notes')}>

                    </Textarea>
                </div>

            </div>
            <label className="flex items-center gap-2 mt-4 text-sm text-gray-600 cursor-pointer">
                <input type="checkbox" className="accent-orange-500" />
                {t('checkout.shipping.save_address')}
            </label>
            <div className="flex justify-end mt-6">
                <Button onClick={() => setStep('payment')} className="bg-orange-500 hover:bg-orange-600 text-white gap-2 rounded-xl px-8">
                    {t('common.continue')} <ChevronRight size={16} />
                </Button>
            </div>
        </div>
    )
}
