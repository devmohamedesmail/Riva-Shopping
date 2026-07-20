import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import TopBar from '@/components/shared/top-header';
import Navbar from '@/components/shared/navbar';
import HeroBanner from './components/hero-banner';
import CategorySection from './components/categories-section';
import FeaturedProducts from './components/featured-products';
import PromoSection from './components/promo-section';
import SaleSection from './components/sale-section';
import Newsletter from '@/components/shared/news-letter';
import StoresSection from './components/stores-section';
import ProductsSection from './components/products-section';
import Footer from '@/components/shared/footer';
import MainLayout from '@/layouts/main-layout';
import useProducts from '@/hooks/use-products';

export default function Home({ stores, featuredProducts }: { stores: any,  featuredProducts: any }) {
const {products}=useProducts();

    return (
        <MainLayout>
            
               <HeroBanner />
                    <CategorySection />
                    {/* <FeaturedProducts featuredProducts={featuredProducts} /> */}
                    <ProductsSection products={products} />
                    {/* <PromoSection /> */}
                    {/* <SaleSection /> */}
                    <Newsletter />
                    {/* <StoresSection stores={stores} /> */}
        </MainLayout>
    );
}
