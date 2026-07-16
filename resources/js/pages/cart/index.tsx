import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import MainLayout from '@/layouts/main-layout';
import CartHero from './components/cart-hero';
import { useSelector } from 'react-redux';
import CartEmpty from './components/cart-empty';
import CartSummery from './components/cart-summery';
import CartItem from '@/components/shared/cart-item';


export default function CartPage() {
    const { t } = useTranslation();
    const cart = useSelector((state:any)=> state.cart.products || [])
    return (
        <MainLayout>
             <Head title={t('cart.title')} />
             <CartHero />

            <div className="bg-gray-50 min-h-screen py-10 px-4">
                <div className="max-w-7xl mx-auto">

                    {cart.length === 0 ? (
                      
                      <CartEmpty />
                    ) : (
                        <div className="grid lg:grid-cols-3 gap-6">
                            {/* Items list */}
                            <div className="lg:col-span-2 space-y-4">
                                {cart.map((item:any) => (
                                  <CartItem key={item.id} item={item} />
                                ))}

                                {/* Continue */}
                                <Link href="/user/shop" className="inline-flex items-center gap-2 text-sm text-orange-500 font-semibold hover:gap-3 transition-all mt-2">
                                    ← {t('cart.continue_shopping')}
                                </Link>
                            </div>

                            {/* Summary */}
                          <CartSummery/>
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
