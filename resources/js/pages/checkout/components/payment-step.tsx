import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ChevronRight, Truck ,CreditCard,Lock} from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function PaymentStep({setPayMethod,payMethod,setStep}:any) {
 
 const {t}=useTranslation()
    return (
       <div>
                        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-5">
                            <CreditCard size={18} className="text-orange-500" /> {t('checkout.payment.heading')}
                        </h2>
                        {/* Method selector */}
                        <div className="grid grid-cols-3 gap-3 mb-6">
                            {(['card', 'cod', 'paypal'] as const).map(m => (
                                <button
                                    key={m}
                                    onClick={() => setPayMethod(m)}
                                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 text-sm font-medium transition-all ${payMethod === m ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-gray-100 text-gray-600 hover:border-orange-300'}`}
                                >
                                    {m === 'card' && <CreditCard size={20} />}
                                    {m === 'cod' && <Truck size={20} />}
                                    {m === 'paypal' && <span className="text-base font-extrabold text-blue-600">P</span>}
                                    {t(`checkout.payment.${m}`)}
                                </button>
                            ))}
                        </div>
                        {payMethod === 'card' && (
                            <div className="space-y-4">
                                <div className="space-y-1.5">
                                    <Label>{t('checkout.payment.card_number')}</Label>
                                    <Input placeholder="1234 5678 9012 3456" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <Label>{t('checkout.payment.expiry')}</Label>
                                        <Input placeholder="MM / YY" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label>{t('checkout.payment.cvv')}</Label>
                                        <Input placeholder="123" />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <Label>{t('checkout.payment.name_on_card')}</Label>
                                    <Input placeholder="John Doe" />
                                </div>
                            </div>
                        )}
                        {payMethod !== 'card' && (
                            <div className="text-center py-8 text-gray-400 text-sm">
                                {payMethod === 'cod' ? '🚚 Pay when your order arrives.' : '🔵 You will be redirected to PayPal to complete payment.'}
                            </div>
                        )}
                        <p className="flex items-center gap-1.5 text-xs text-gray-400 mt-4">
                            <Lock size={11} /> {t('checkout.payment.secure_note')}
                        </p>
                        <div className="flex justify-between mt-6">
                            <Button variant="outline" onClick={() => setStep('shipping')} className="gap-2">{t('common.back')}</Button>
                            <Button onClick={() => setStep('review')} className="bg-orange-500 hover:bg-orange-600 text-white gap-2 rounded-xl px-8">
                                {t('common.continue')} <ChevronRight size={16} />
                            </Button>
                        </div>
                    </div>
  )
}
