import React, { useState } from 'react';
import { Phone, Mail, ChevronDown, Check, LayoutDashboard, User, LogOut } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
    DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Link, router, usePage } from '@inertiajs/react';
import AuthMenu from './auth-menu';
import LanguageSelector from './language-selector';


export default function TopBar() {
    const { t, i18n } = useTranslation();
    const { settings }: any = usePage().props

    return (
        <div className="bg-[#333] text-white text-xs">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-9">
                {/* Left: promo + contact */}
                <div className="flex items-center gap-5">
                    <span className="hidden sm:block font-medium tracking-wide">
                        {t('common.free_shipping')}
                    </span>
                    <span className="hidden md:flex items-center gap-1 text-gray-300">
                        <Phone size={11} />
                        <a href={settings?.phone} className="hover:text-secondary transition-colors">{settings?.phone}
                            {/* {t('common.contact_phone')} */}
                        </a>
                    </span>
                    <span className="hidden md:flex items-center gap-1 text-gray-300">
                        <Mail size={11} />
                        <a href={`mailto:${settings?.email}`}
                            className="hover:text-secondary transition-colors">{settings?.email}</a>
                    </span>
                </div>

                {/* Right: currency, language, links */}
                <div className="flex items-center gap-4">
                    <LanguageSelector />
                    <AuthMenu />
                </div>
            </div>
        </div>
    );
}
