import React, { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import {
    CreditCard, Truck, ClipboardCheck, CheckCircle, Lock,
} from 'lucide-react';
import MainLayout from '@/layouts/main-layout';
import CheckoutStepBar from './components/checkout-step-bar';
import CheckoutForm from './components/checkout-form';
import OrderSummary from './components/order-summary';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import useAuth from '@/hooks/use-auth';
import { useSelector, useDispatch } from 'react-redux';
import { reset_cart } from '@/redux/reducers/cart-slice';
import { Button } from '@/components/ui/button';
import { CartItem } from '@/types/cart';
import toast from 'react-hot-toast';

// ── Step configuration ─────────────────────────────────────────────────────
const STEPS = ['shipping', 'payment', 'review'] as const;
type Step = typeof STEPS[number];

const STEP_ICONS: Record<Step, React.ElementType> = {
    shipping: Truck,
    payment: CreditCard,
    review: ClipboardCheck,
};

// ── Zod schema ─────────────────────────────────────────────────────────────
const CheckoutSchema = z.object({
    name:           z.string().min(1, 'Name is required'),
    phone:          z.string().min(1, 'Phone is required'),
    address:        z.string().min(1, 'Address is required'),
    notes:          z.string().optional(),
    payment_method: z.enum(['cash', 'card', 'paypal']),
    items: z.array(z.object({
        product_id:       z.number(),
        store_id:         z.number(),
        quantity:         z.number().min(1),
        price:            z.number().min(0),
        variant_id:       z.number().nullable().optional(),
        selected_options: z.record(z.string(), z.any()).nullable().optional(),
    })).min(1, 'Cart is empty'),
});

type CheckoutForm = z.infer<typeof CheckoutSchema>;

// ── Helpers ────────────────────────────────────────────────────────────────

/** Map Redux CartItem shape → validated item shape the backend expects */
function cartItemsToPayload(cart: CartItem[]) {
    return cart.map((item) => ({
        product_id:       item.id,
        store_id:         item.store_id,
        quantity:         item.quantity,
        price:            parseFloat(item.sale_price || item.price),
        variant_id:       null,
        selected_options: item.attributes ?? null,
    }));
}


export default function CheckoutPage() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { user }  = useAuth();
    const cart: CartItem[] = useSelector((state: any) => state.cart.products ?? []);

    const [step, setStep]       = useState<Step>('shipping');
    const [placed, setPlaced]   = useState(false);
    const [payMethod, setPayMethod] = useState<'card' | 'cod' | 'paypal'>('cash' as any);

    const stepIndex = STEPS.indexOf(step);

    const {
        register,
        handleSubmit,
        setValue,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<CheckoutForm>({
        resolver: zodResolver(CheckoutSchema),
        defaultValues: {
            name:           user?.name ?? '',
            phone:          '',
            address:        '',
            notes:          '',
            payment_method: 'cash',
            items:          cartItemsToPayload(cart),
        },
    });

    const onSubmit = (data: CheckoutForm) => {
        // Keep items in sync with the current Redux cart at submit time
        const payload = { ...data, items: cartItemsToPayload(cart) };

        router.post('/create/order', payload, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(t('checkout.success_message'));
                dispatch(reset_cart());
                setPlaced(true);
            },
            onError: (serverErrors) => {
                console.log('Server Error', serverErrors);
                toast.error(t('checkout.error_message'));
                Object.entries(serverErrors).forEach(([key, message]) => {
                    setError(key as keyof CheckoutForm, { type: 'server', message });
                });
            },
        });
    };

    // ── Success screen ─────────────────────────────────────────────────────
    if (placed) {
        return (
            <MainLayout>
                <Head title={t('checkout.success_title')} />
                <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                    <div className="bg-white rounded-3xl shadow-lg p-10 max-w-md w-full text-center">
                        <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6">
                            <CheckCircle size={40} className="text-emerald-500" />
                        </div>
                        <h1 className="text-2xl font-extrabold text-gray-900 mb-2">
                            {t('checkout.success_title')}
                        </h1>
                        <p className="text-gray-500 text-sm mb-8">
                            {t('checkout.success_desc')}
                        </p>
                        <Link href="/">
                            <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-8">
                                {t('common.back_to_home')}
                            </Button>
                        </Link>
                    </div>
                </div>
            </MainLayout>
        );
    }

    // ── Checkout screen ────────────────────────────────────────────────────
    return (
        <MainLayout>
            <Head title={t('checkout.title')} />

            {/* Header banner */}
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
            <CheckoutStepBar
                STEPS={STEPS}
                STEP_ICONS={STEP_ICONS}
                stepIndex={stepIndex}
                step={step}
            />

            <div className="bg-gray-50 min-h-screen py-10 px-4">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-6">

                    {/* Form area */}
                    <CheckoutForm
                        register={register}
                        setValue={setValue}
                        errors={errors}
                        onSubmit={onSubmit}
                        handleSubmit={handleSubmit}
                        isSubmitting={isSubmitting}
                        step={step}
                        setStep={setStep}
                        setPayMethod={setPayMethod}
                        payMethod={payMethod}
                        setPlaced={setPlaced}
                    />

                    {/* Order summary sidebar */}
                    <OrderSummary />
                </div>
            </div>
        </MainLayout>
    );
}
