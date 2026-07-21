
import { Link } from '@inertiajs/react';
import SectionTitle from '@/components/shared/section-title';
import useImport from '@/hooks/use-import';
import useCategories from '@/hooks/use-categories';
import { Category } from '@/types/product';

export default function CategorySection() {
    const { t, i18n } = useImport();
    const { categories } = useCategories()

    return (
        <section className="py-14 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                {/* Section Header */}

                <SectionTitle title={t('categories.explore')} subtitle={t('categories.shop_by_category')} actiontitle={t('categories.view_all')} />

                {/* Categories Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
                    {categories?.map((category: Category) => (
                        // <Link href={`/shop/page/${category.id}`} key={category.id} className='group flex flex-col items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 hover:border-transparent hover:shadow-lg hover:-translate-y-1 transition-all duration-300'>
                        //     <div className={`w-full h-full  rounded-xl  flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative overflow-hidden`}>
                        //         <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity`} />
                        //         <img src={category?.image} alt={category?.name_ar} className="w-full h-full object-cover" />
                        //     </div>

                        //     <div className="text-center">
                        //         <div className="text-sm font-semibold text-gray-800 group-hover:text-priamry transition-colors leading-tight">

                        //             {
                        //                 i18n.language === 'ar' ? category?.name_ar : category?.name_en
                        //             }
                        //         </div>

                        //     </div>
                        // </Link>
                        <Link
                            href={`/shop/page/${category.id}`}
                            key={category.id}
                            className="group flex flex-col items-center"
                        >
                            {/* Circle Image */}
                            <div className="relative">
                                {/* Glow */}
                                <div className="absolute inset-0 rounded-full bg-orange-500/10 scale-90 group-hover:scale-110 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />

                                {/* Circle */}
                                <div className="relative w-28 h-28 rounded-full bg-white border border-gray-200 shadow-sm overflow-hidden transition-all duration-300 group-hover:border-orange-500 group-hover:shadow-xl group-hover:-translate-y-1">
                                    <img
                                        src={category.image}
                                        alt={i18n.language === "ar" ? category.name_ar : category.name_en}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>

                                {/* Optional Badge */}
                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center border border-orange-100 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                    <span className="text-orange-500 text-sm">→</span>
                                </div>
                            </div>

                            {/* Name */}
                            <h3 className="mt-5 text-sm font-semibold text-center text-gray-800 transition-colors duration-300 group-hover:text-orange-500">
                                {i18n.language === "ar"
                                    ? category.name_ar
                                    : category.name_en}
                            </h3>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
