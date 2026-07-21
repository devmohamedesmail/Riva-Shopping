import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import useImport from '@/hooks/use-import';

import {
    Truck,
    RotateCcw,
    ShieldCheck,
    Headset
} from 'lucide-react';

export default function HeroBanner({ banners }: { banners: any[] }) {
    const [current, setCurrent] = useState(0);
    const [transitioning, setTransitioning] = useState(false);
    const { t, i18n } = useImport()

    const goTo = (index: number) => {
        if (transitioning) return;
        setTransitioning(true);
        setTimeout(() => {
            setCurrent(index);
            setTransitioning(false);
        }, 300);
    };


    const prev = () => goTo((current - 1 + banners.length) % banners.length);

    const next = () => goTo((current + 1) % banners.length);


    useEffect(() => {
        const timer = setInterval(next, 5000);
        return () => clearInterval(timer);
    }, [current]);



    return (
        <section className="relative overflow-hidden">
            {/* Main Slide */}
            <div className="relative h-[550px] md:h-[650px] overflow-hidden rounded-3xl">
                {banners.map((banner, index) => {
                    const title =
                        i18n.language === "ar"
                            ? banner.title_ar
                            : banner.title_en;

                    const description =
                        i18n.language === "ar"
                            ? banner.description_ar
                            : banner.description_en;

                    return (
                        <div
                            key={banner.id}
                            className={`absolute inset-0 transition-all duration-700 ${current === index
                                    ? "opacity-100 scale-100 z-10"
                                    : "opacity-0 scale-105 z-0"
                                }`}
                        >
                            {/* Background */}
                            <img
                                src={banner.image}
                                alt={title}
                                className="absolute inset-0 h-full w-full object-cover"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/20" />

                            {/* Content */}
                            <div className="relative z-10 flex h-full items-center">
                                <div className="mx-auto max-w-7xl px-6 w-full">
                                    <div className="max-w-2xl text-white">

                                        <span className="mb-5 inline-flex rounded-full bg-orange-500/20 px-4 py-2 text-sm font-semibold text-orange-300 backdrop-blur">
                                            🔥 New Collection
                                        </span>

                                        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                                            {title}
                                        </h1>

                                        <p className="mt-6 text-lg text-gray-200 leading-8">
                                            {description}
                                        </p>

                                        <div className="mt-10 flex gap-4">
                                            <button className="rounded-full bg-orange-500 px-8 py-4 font-semibold hover:bg-orange-600 transition">
                                                Shop Now
                                            </button>

                                            <button className="rounded-full border border-white/40 px-8 py-4 hover:bg-white/10 transition">
                                                Explore
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {/* Arrows */}
                <button
                    onClick={prev}
                    className="absolute left-5 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-3 backdrop-blur hover:bg-white/20"
                >
                    <ChevronLeft className="text-white" />
                </button>

                <button
                    onClick={next}
                    className="absolute right-5 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-3 backdrop-blur hover:bg-white/20"
                >
                    <ChevronRight className="text-white" />
                </button>

                {/* Dots */}
                <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3">
                    {banners.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goTo(index)}
                            className={`h-2 rounded-full transition-all duration-300 ${current === index
                                    ? "w-10 bg-orange-500"
                                    : "w-2 bg-white/50"
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Feature Pills below hero */}
            <div className="bg-white border-b border-gray-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
                        {/* {[
                            { icon: '🚚', title: t('feature.free_shipping'), desc: t('feature.free_shipping_desc') },
                            { icon: '🔄', title: t('feature.easy_returns'), desc: t('feature.easy_returns_desc') },
                            { icon: '🔒', title: t('feature.secure_payment'), desc: t('feature.secure_payment_desc') },
                            { icon: '🎧', title: t('feature.24_7_support'), desc: t('feature.24_7_support_desc') },
                        ].map((f) => (
                            <div key={f.title} className="flex items-center gap-3 px-6 py-4 hover:bg-orange-50 transition-colors cursor-default">
                                <span className="text-2xl">{f.icon}</span>
                                <div>
                                    <div className="text-sm font-semibold text-gray-800">{f.title}</div>
                                    <div className="text-xs text-gray-500">{f.desc}</div>
                                </div>
                            </div>
                        ))} */}

                        {[
    {
        icon: Truck,
        title: t("feature.free_shipping"),
        desc: t("feature.free_shipping_desc"),
    },
    {
        icon: RotateCcw,
        title: t("feature.easy_returns"),
        desc: t("feature.easy_returns_desc"),
    },
    {
        icon: ShieldCheck,
        title: t("feature.secure_payment"),
        desc: t("feature.secure_payment_desc"),
    },
    {
        icon: Headset,
        title: t("feature.24_7_support"),
        desc: t("feature.24_7_support_desc"),
    },
].map((f) => {
    const Icon = f.icon;

    return (
        <div
            key={f.title}
            className="group flex items-center gap-4 px-6 py-5 hover:bg-orange-50 transition-colors"
        >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition-all">
                <Icon size={24} strokeWidth={2} />
            </div>

            <div>
                <h3 className="text-sm font-semibold text-gray-900">
                    {f.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                    {f.desc}
                </p>
            </div>
        </div>
    );
})}
                    </div>
                </div>
            </div>
        </section>
    );
}
