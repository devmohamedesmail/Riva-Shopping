import { Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Plus, Package, ShoppingBag } from 'lucide-react'
import StatusBadge from './StatusBadge';
export default function LatestOrders() {
    const { t } = useTranslation();

    const MOCK_ORDERS = [
        { id: '#ORD-1001', customer: 'Ahmed Ali', date: 'Mar 5, 2026', total: 149.99, status: 'delivered' },
        { id: '#ORD-1002', customer: 'Sara Hassan', date: 'Mar 4, 2026', total: 89.00, status: 'processing' },
        { id: '#ORD-1003', customer: 'Omar Mahmoud', date: 'Mar 4, 2026', total: 320.50, status: 'pending' },
        { id: '#ORD-1004', customer: 'Nour Ibrahim', date: 'Mar 3, 2026', total: 45.00, status: 'cancelled' },
        { id: '#ORD-1005', customer: 'Yara Khaled', date: 'Mar 3, 2026', total: 210.00, status: 'delivered' },
    ];



    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xs overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{t('vendor.overview.recent_orders')}</h3>
                    <Link href="/vendor/orders" className="text-xs text-orange-500 hover:text-orange-600 font-medium flex items-center gap-1">
                        {t('vendor.overview.view_orders')} <ArrowRight size={12} />
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-xs text-gray-400 border-b border-gray-50 dark:border-gray-800">
                                <th className="px-5 py-3 text-start font-medium">{t('vendor.orders.order_id')}</th>
                                <th className="px-5 py-3 text-start font-medium">{t('vendor.orders.customer')}</th>
                                <th className="px-5 py-3 text-start font-medium hidden sm:table-cell">{t('vendor.orders.date')}</th>
                                <th className="px-5 py-3 text-start font-medium">{t('vendor.orders.total')}</th>
                                <th className="px-5 py-3 text-start font-medium">{t('vendor.orders.status')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                            {MOCK_ORDERS.map(order => (
                                <tr key={order.id} className="hover:bg-gray-50/60 dark:hover:bg-gray-800/40 transition-colors">
                                    <td className="px-5 py-3.5 font-mono text-xs text-orange-500 font-medium">{order.id}</td>
                                    <td className="px-5 py-3.5 text-gray-700 dark:text-gray-300">{order.customer}</td>
                                    <td className="px-5 py-3.5 text-gray-500 hidden sm:table-cell">{order.date}</td>
                                    <td className="px-5 py-3.5 font-semibold text-gray-900 dark:text-white">${order.total}</td>
                                    <td className="px-5 py-3.5"><StatusBadge status={order.status} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>


            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xs p-5">
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-4">{t('vendor.overview.quick_actions')}</h3>
                <div className="space-y-3">
                    {[
                        { label: t('vendor.overview.add_product'), href: '/vendor/products', icon: Plus, color: 'bg-orange-500 hover:bg-orange-600 text-white' },
                        { label: t('vendor.overview.manage_products'), href: '/vendor/products', icon: Package, color: 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200' },
                        { label: t('vendor.overview.view_orders'), href: '/vendor/orders', icon: ShoppingBag, color: 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200' },
                        { label: t('vendor.overview.edit_settings'), href: '/vendor/settings', icon: ArrowRight, color: 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200' },
                    ].map(action => {
                        const Icon = action.icon;
                        return (
                            <Link key={action.label} href={action.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${action.color}`}>
                                <Icon size={16} className="shrink-0" /> {action.label}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}
