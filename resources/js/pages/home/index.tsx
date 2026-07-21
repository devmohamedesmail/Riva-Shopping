import HeroBanner from './components/hero-banner';
import CategorySection from './components/categories-section';
import Newsletter from '@/components/shared/news-letter';
import StoresSection from './components/stores-section';
import ProductsSection from './components/products-section';
import MainLayout from '@/layouts/main-layout';
import useProducts from '@/hooks/use-products';

export default function Home({ stores, featuredProducts, banners }: { stores: any, featuredProducts: any, banners: any[] }) {
    const { products } = useProducts();

    return (
        <MainLayout>

            <HeroBanner banners={banners} />
            <CategorySection />
            {/* <FeaturedProducts featuredProducts={featuredProducts} /> */}
            <ProductsSection products={products} />
            {/* <PromoSection /> */}
            {/* <SaleSection /> */}
            <Newsletter />
            <StoresSection stores={stores} />
        </MainLayout>
    );
}
