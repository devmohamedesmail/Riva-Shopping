import React from 'react'
import SectionCard from './section-card'
import { CheckCircle, X, Store as StoreIcon, MapPin, Tag as TagIcon, Phone, Mail, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

export default function StoreLocationSection({form , set}:any) {
       const { t, i18n } = useTranslation();
          const isRtl = i18n.language === 'ar';
          const COUNTRIES = ['United States', 'United Kingdom', 'Canada', 'Saudi Arabia', 'UAE', 'Egypt', 'Jordan', 'Kuwait', 'Qatar', 'Oman', 'Bahrain'];


  return (
       <SectionCard icon={MapPin} title={t('vendor.settings.location')}>
                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <Label>{t('create_store.location.address')}</Label>
                            <div className="relative">
                                <MapPin size={13} className={`absolute ${isRtl ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-gray-400`} />
                                <Input value={form.address} onChange={set('address')} className={isRtl ? 'pr-8' : 'pl-8'} />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <Label>{t('create_store.location.city')}</Label>
                                <Input value={form.city} onChange={set('city')} />
                            </div>
                            <div className="space-y-1.5">
                                <Label>{t('create_store.location.state')}</Label>
                                <Input value={form.state} onChange={set('state')} />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <Label>{t('create_store.location.zip')}</Label>
                                <Input value={form.zip} onChange={set('zip')} />
                            </div>
                            <div className="space-y-1.5">
                                <Label>{t('create_store.location.country')}</Label>
                                <div className="relative">
                                    <Globe size={13} className={`absolute ${isRtl ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none`} />
                                    <select value={form.country} onChange={set('country')}
                                        className={`w-full ${isRtl ? 'pr-8' : 'pl-8'} py-2 text-sm border border-input rounded-md bg-white dark:bg-gray-900 dark:text-white h-9 outline-none`}>
                                        <option value="">{t('create_store.location.country_placeholder')}</option>
                                        {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </SectionCard>
  )
}
