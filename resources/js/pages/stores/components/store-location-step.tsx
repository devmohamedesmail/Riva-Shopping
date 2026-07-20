import React from 'react'
import { MapPin, Globe } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import ErrorMsg from '@/components/ui/error-message';
import useCountries from '@/hooks/use-countries'
import useImport from '@/hooks/use-import'
import { Controller } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function StoreLocationStep({ register, errors, control }: any) {

    const { countries } = useCountries()
    const { t, isRtl } = useImport()
    console.log("Erros" ,errors)
    return (
        <div className="space-y-5">
            <div className="flex items-center gap-2 mb-1">
                <MapPin size={18} className="text-orange-500" />
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">{t('create_store.location.heading')}</h2>
            </div>

            <div className="space-y-1.5">
                <Label>{t('create_store.location.address')}</Label>
                <div className="relative">
                    <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Input {...register('address')} placeholder={t('create_store.location.address_placeholder')} className="pl-8" />
                </div>
                <ErrorMsg message={errors.address?.message} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <Label>{t('create_store.location.city')}</Label>
                    <Input {...register('city')} placeholder={t('create_store.location.city_placeholder')} />
                    <ErrorMsg message={errors.city?.message} />
                </div>
                <div className="space-y-1.5">
                    <Label>{t('create_store.location.state')}</Label>
                    <Input {...register('state')} placeholder={t('create_store.location.state_placeholder')} />
                    <ErrorMsg message={errors.state?.message} />
                </div>
            </div>

            <div className="space-y-1.5 w-full">
                <Label>{t('create_store.location.country')} <span className="text-red-500">*</span></Label>
                <Controller
                    name="country_id"
                    control={control}
                    render={({ field }) => (
                        <Select
                            value={field.value?.toString() || ""} onValueChange={(val) => field.onChange(String(val))}>
                            <SelectTrigger className={`w-full ${errors.country_id ? 'border-red-500 ' : ''}`}>
                                <SelectValue placeholder={t('create_store.location.country_placeholder')} />
                            </SelectTrigger>
                            <SelectContent>
                                {countries.map((c: any) => (
                                    <SelectItem key={c.id} value={c.id.toString()}>
                                        {isRtl ? c.name_ar : c.name_en}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                />
             <ErrorMsg message={errors.country_id?.message} />
                {/* {errors.country_id && <p className="text-xs text-red-500">{errors.country_id.message}</p>} */}
            </div>


        </div>
    )
}
