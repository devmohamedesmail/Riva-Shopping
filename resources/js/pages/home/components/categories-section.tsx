
import { Link } from '@inertiajs/react';
import SectionTitle from '@/components/shared/section-title';
import useImport from '@/hooks/use-import';
import useCategories from '@/hooks/use-categories';
import { Category } from '@/types/product';

export default function CategorySection() {
    const{t,i18n}=useImport();
    const {categories}=useCategories()
   
    return (
        <section className="py-14 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                {/* Section Header */}
               
                <SectionTitle title={t('categories.explore')} subtitle= {t('categories.shop_by_category')} actiontitle=  {t('categories.view_all')} />

                {/* Categories Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
                    {categories?.map((category: Category) => (
                        <Link href={`/shop/page/${category.id}`} key={category.id} className='group flex flex-col items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 hover:border-transparent hover:shadow-lg hover:-translate-y-1 transition-all duration-300'>
                            <div className={`w-full h-full  rounded-xl  flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative overflow-hidden`}>
                                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity`} />
                                <img src={category?.image} alt={category?.name_ar} className="w-full h-full object-cover" />
                            </div>

                            <div className="text-center">
                                <div className="text-sm font-semibold text-gray-800 group-hover:text-priamry transition-colors leading-tight">
                                   
                                    {
                                        i18n.language === 'ar' ? category?.name_ar : category?.name_en
                                    }
                                </div>
                                {/* <div className="text-[10px] text-gray-400 mt-0.5">{count}</div> */}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
