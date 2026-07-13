import React from 'react'
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
type props={
    title:string,
    subtitle?:string
    actiontitle?:string
}
export default function SectionTitle({title,subtitle,actiontitle}:props) {
    const {t,i18n}=useTranslation()
    return (
        <div className={`flex  ${i18n.language === "ar" ? "items-start" :"items-end"} justify-between mb-8`}>
            <div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2 block">{title}</span>
                <h2 className="text-3xl font-extrabold text-gray-900">
                    {subtitle}
                </h2>
            </div>
            <a
                href="#"
                className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-3 transition-all"
            >
                {actiontitle}
                <ArrowRight size={16} />
            </a>
        </div>
    )
}
