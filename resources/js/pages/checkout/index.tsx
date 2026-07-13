import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import {
    CreditCard, Truck, ClipboardCheck, CheckCircle,
    Lock, ChevronRight, ShoppingCart, AlertCircle
} from 'lucide-react';
import TopBar from '@/components/shared/top-header';
import Navbar from '@/components/shared/navbar';
import Footer from '@/components/shared/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import MainLayout from '@/layouts/main-layout';
import CheckoutStepBar from './components/checkout-step-bar';
import CheckoutForm from './components/checkout-form';
import OrderSummary from './components/order-summary';

const ORDER_ITEMS = [
    { name: 'Premium Wireless Headphones', price: 89.99, qty: 1 },
    { name: 'Classic Leather Wallet', price: 34.99, qty: 2 },
];

const STEPS = ['shipping', 'payment', 'review'] as const;
type Step = typeof STEPS[number];

const STEP_ICONS: Record<Step, React.ElementType> = {
    shipping: Truck,
    payment: CreditCard,
    review: ClipboardCheck,
};

export default function CheckoutPage() {
    const { t } = useTranslation();
    const [step, setStep] = useState<Step>('shipping');
    const [placed, setPlaced] = useState(false);
    const [payMethod, setPayMethod] = useState<'card' | 'cod' | 'paypal'>('card');

    const subtotal = ORDER_ITEMS.reduce((s, i) => s + i.price * i.qty, 0);
    const shipping = 0;
    const total = subtotal + shipping;

    const stepIndex = STEPS.indexOf(step);

    if (placed) {
        return (
            <>
                <Head title={t('checkout.success_title')} />
                <TopBar />
                <Navbar />
                <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                    <div className="bg-white rounded-3xl shadow-lg p-10 max-w-md w-full text-center">
                        <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6">
                            <CheckCircle size={40} className="text-emerald-500" />
                        </div>
                        <h1 className="text-2xl font-extrabold text-gray-900 mb-2">{t('checkout.success_title')}</h1>
                        <p className="text-gray-500 text-sm mb-8">{t('checkout.success_desc')}</p>
                        <Link href="/">
                            <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-8">
                                Back to Home
                            </Button>
                        </Link>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <MainLayout>

            <Head title={t('checkout.title')} />
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-10 px-4">
                <div className="max-w-7xl mx-auto flex justify-center items-center gap-3">
                    <Lock size={22} className="text-orange-400" />
                    <div>
                        <h1 className="text-2xl font-extrabold">{t('checkout.title')}</h1>
                        <p className="text-gray-400 text-sm">{t('checkout.subtitle')}</p>
                    </div>
                </div>
            </div>

            {/* Step bar */}
           <CheckoutStepBar STEPS={STEPS} STEP_ICONS={STEP_ICONS} stepIndex={stepIndex} step={step} />

            <div className="bg-gray-50 min-h-screen py-10 px-4">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-6">

                    {/* Form area */}
                  <CheckoutForm step={step} setStep={setStep} setPayMethod={setPayMethod} payMethod={payMethod} setPlaced={setPlaced} />

                    {/* Order summary sidebar */}
                   <OrderSummary />
                </div>
            </div>
        </MainLayout>
    );
}
