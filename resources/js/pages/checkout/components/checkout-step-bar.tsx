import React from 'react'
import { useTranslation } from 'react-i18next';
import { CheckCircle, ChevronRight } from 'lucide-react'

export default function CheckoutStepBar({ STEPS, STEP_ICONS, stepIndex, step }: any) {
    const { t } = useTranslation()
    return (
        <div className="bg-white border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex items-center justify-center gap-2">
                    {STEPS.map((s: any, i: any) => {
                        const Icon = STEP_ICONS[s];
                        const done = i < stepIndex;
                        const active = s === step;
                        return (
                            <React.Fragment key={s}>
                                <div className="flex items-center gap-2">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${done ? 'bg-emerald-500 text-white' : active ? 'bg-orange-500 text-white ring-4 ring-orange-100' : 'bg-gray-100 text-gray-400'}`}>
                                        {done ? <CheckCircle size={14} /> : <Icon size={14} />}
                                    </div>
                                    <span className={`text-sm font-medium hidden sm:block ${active ? 'text-orange-600' : done ? 'text-emerald-600' : 'text-gray-400'}`}>
                                        {t(`checkout.steps.${s}`)}
                                    </span>
                                </div>
                                {i < STEPS.length - 1 && <ChevronRight size={14} className="text-gray-300 mx-1" />}
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}
