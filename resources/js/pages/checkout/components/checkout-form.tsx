import { useTranslation } from 'react-i18next'
import ShippingStep from './shipping-step'
import PaymentStep from './payment-step'
import ReviewStep from './review-step'
export default function CheckoutForm({ step,setStep,setPayMethod,payMethod,setPlaced,register,onSubmit, handleSubmit}: any) {
    const { t } = useTranslation();
    return (
        <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 p-6">

               <form onSubmit={handleSubmit(onSubmit)}>
                 {/* ── Shipping ── */}
                {step === 'shipping' && (
                    <ShippingStep setStep={setStep} register={register} />
                )}

                {/* ── Payment ── */}
                {step === 'payment' && (
                 <PaymentStep setPayMethod={setPayMethod} payMethod={payMethod} setStep={setStep} />
                )}

                {/* ── Review ── */}
                {step === 'review' && (
                  <ReviewStep setPlaced={setPlaced} handleSubmit={handleSubmit} onSubmit={onSubmit} />
                )}
               </form>
            </div>
        </div>
    )
}
