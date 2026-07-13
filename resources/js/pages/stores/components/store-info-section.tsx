import React from 'react'
import SectionCard from './section-card'
import { CheckCircle, X, Store as StoreIcon, MapPin, Tag as TagIcon, Phone, Mail, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

export default function StoreInfoSection({form , set}:any) {
 
   const { t, i18n } = useTranslation();
      const isRtl = i18n.language === 'ar';
    return (
    <SectionCard icon={StoreIcon} title={t('vendor.settings.store_info')}>
                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <Label>{t('create_store.info.name')} <span className="text-red-500">*</span></Label>
                            <Input value={form.name} onChange={set('name')} required />
                        </div>
                        <div className="space-y-1.5">
                            <Label>{t('create_store.info.description')}</Label>
                            <Textarea rows={3} value={form.description} onChange={set('description') as any} />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <Label>{t('create_store.info.phone')}</Label>
                                <div className="relative">
                                    <Phone size={13} className={`absolute ${isRtl ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-gray-400`} />
                                    <Input value={form.phone} onChange={set('phone')} className={isRtl ? 'pr-8' : 'pl-8'} />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <Label>{t('create_store.info.email')}</Label>
                                <div className="relative">
                                    <Mail size={13} className={`absolute ${isRtl ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-gray-400`} />
                                    <Input type="email" value={form.email} onChange={set('email')} className={isRtl ? 'pr-8' : 'pl-8'} />
                                </div>
                            </div>
                        </div>
                    </div>
                </SectionCard>
  )
}
