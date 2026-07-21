import { useTranslation } from 'react-i18next'
import ShippingStep from './shipping-step'
import PaymentStep from './payment-step'
import ReviewStep from './review-step'

export default function CheckoutForm({
    step, setStep, setPayMethod, payMethod, setPlaced,
    register, setValue, errors, onSubmit, handleSubmit, isSubmitting,
}: any) {
    const { t } = useTranslation();

    return (
        <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <form onSubmit={handleSubmit(onSubmit)}>

                    {/* ── Shipping ── */}
                    {step === 'shipping' && (
                        <ShippingStep setStep={setStep} register={register} errors={errors} />
                    )}

                    {/* ── Payment ── */}
                    {step === 'payment' && (
                        <PaymentStep
                            setPayMethod={setPayMethod}
                            payMethod={payMethod}
                            setStep={setStep}
                            setValue={setValue}
                        />
                    )}

                    {/* ── Review ── */}
                    {step === 'review' && (
                        <ReviewStep
                            setStep={setStep}
                            setPlaced={setPlaced}
                            handleSubmit={handleSubmit}
                            onSubmit={onSubmit}
                            isSubmitting={isSubmitting}
                            errors={errors}
                        />
                    )}

                </form>
            </div>
        </div>
    )
}
