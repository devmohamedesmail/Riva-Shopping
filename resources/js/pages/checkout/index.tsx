import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
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
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import useAuth from '@/hooks/use-auth';
import { useSelector } from 'react-redux';



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
    const stepIndex = STEPS.indexOf(step);
    const { user } = useAuth()
    const cart = useSelector((state:any)=>state.cart.products || [])


    const CheckoutSchema = z.object({
        user_id: z.string(),
        name: z.string(),
        phone: z.string(),
        address: z.string(),
        notes: z.string(),
        payment_method:z.string()
        // items: z.array({
        //     quantity:z.number()
        // }),
    })

    type CheckoutFrom = z.infer<typeof CheckoutSchema>;

    const { register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({
        // resolver: zodResolver(CheckoutSchema),
        defaultValues: {
            user_id: `${user.id}`,
            name: `${user.name}`,
            phone: "",
            address: "",
            notes: "",
            payment_method:"cash",
            items: cart,
        }
    })

    const onSubmit = async (data: CheckoutFrom) => {

        router.post('/create/order', data, {
            preserveScroll: true,
            onSuccess: () => {
                alert("sucess")
            },
            onError: (erros) => {
                // Object.entries(errors).forEach(([key,value])=>{
                //     setError(key as keyof CheckoutFrom , {
                //         type:"server",
                //         message:value
                //     })
                // })
            }
        })
    }

    if (placed) {
        return (
            <>
                {/* <Head title={t('checkout.success_title')} />
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
                <Footer /> */}
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
                    <CheckoutForm
                        register={register}
                        onSubmit={onSubmit}
                        handleSubmit={handleSubmit}
                        step={step} setStep={setStep}
                        setPayMethod={setPayMethod}
                        payMethod={payMethod}
                        setPlaced={setPlaced} />

                    {/* Order summary sidebar */}
                    <OrderSummary />
                </div>
            </div>
        </MainLayout>
    );
}
