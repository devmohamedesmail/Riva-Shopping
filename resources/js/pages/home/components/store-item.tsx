import useImport from '@/hooks/use-import'
import { Link } from '@inertiajs/react'


export default function StoreItem({ store }: { store: any }) {
    const { t } = useImport();
    return (
        <div key={store?.id} className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
            {/* Card Header Background */}
            <div className="relative h-24 sm:h-32 bg-linear-to-r from-gray-100 to-gray-200 group-hover:from-[#7c3aed]/10 group-hover:to-[#c96]/10 transition-colors">
                {/* Logo Avatar overlayed */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                    <div className="w-20 h-20 bg-white rounded-2xl shadow-md p-1 rotate-3 group-hover:rotate-0 transition-transform duration-300">
                        <div className="w-full h-full rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center">
                            {store.logo ? (
                                <img src={store.logo} alt={store.name} className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-gray-400 font-bold text-xl">{store.name?.charAt(0)}</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Card Body */}
            <div className="pt-12 pb-6 px-6 text-center flex flex-col flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-[#7c3aed] transition-colors">{store.name}</h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-6 flex-1">
                    {store?.description || 'Welcome to our official store on Shopella! Explore our latest collections.'}
                </p>
                <Link
                    href={`/store/${store?.id}`}
                    className="block w-full py-2.5 px-4 bg-gray-50 hover:bg-primary text-gray-800 hover:text-white text-sm font-semibold rounded-xl transition-all duration-300"
                >
                    {t('home.stores.view_store', 'Visit Store')}
                </Link>
            </div>
        </div>
    )
}
