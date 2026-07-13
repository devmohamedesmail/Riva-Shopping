import React from 'react'
import { useTranslation } from 'react-i18next';

export default function StatusBadge({ is_active }: { is_active: boolean }) {

    const {t}=useTranslation()
 if (is_active) return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">{t('common.active')}</span>;
    return (
    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">{t('common.inactive')}</span>
  )
}
