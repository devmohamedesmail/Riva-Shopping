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

export default function Home({ stores, products, featuredProducts }: { stores: any, products: any, featuredProducts: any }) {
    const { settings } = usePage().props


    return (
        <>
            <Head title="Shopella — Shop Smart, Live Better">
                <meta name="description" content="Discover the best deals on fashion, electronics, home & living, and more at Shopella. Premium products at unbeatable prices." />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
            </Head>

            <div className="font-[Inter,sans-serif] bg-white min-h-screen">
                <TopBar />
                <Navbar />
                <main>
                    <HeroBanner />
                    <CategorySection />
                    {/* <FeaturedProducts featuredProducts={featuredProducts} /> */}
                    <ProductsSection products={products} />
                    {/* <PromoSection /> */}
                    {/* <SaleSection /> */}
                    <Newsletter />
                    {/* <StoresSection stores={stores} /> */}

                </main>
                <Footer />

            </div>
        </>
    );
}
