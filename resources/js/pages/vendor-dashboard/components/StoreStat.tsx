import React from 'react'
import { useTranslation } from 'react-i18next';
import StatCard from './StatCard';
import { Package, Tag } from 'lucide-react'
export default function StoreStat({ productCount, categoryCount }: any) {
    const { t } = useTranslation();
    const stats = [
        { label: t('vendor.overview.total_products'), value: productCount, icon: Package, color: 'bg-linear-to-br from-orange-400 to-orange-600' },
        { label: t('vendor.overview.total_categories'), value: categoryCount, icon: Tag, color: 'bg-linear-to-br from-violet-400 to-violet-600' },
        // { label: t('vendor.overview.total_orders'), value: mockOrders, icon: ShoppingBag, color: 'bg-linear-to-br from-blue-400 to-blue-600' },
        // { label: t('vendor.overview.total_revenue'), value: `$${mockRevenue}`, icon: TrendingUp, color: 'bg-linear-to-br from-emerald-400 to-emerald-600' },
    ];
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
            {stats.map(s => <StatCard key={s.label} {...s} />)}
        </div>
    )
}
