import { Button } from '@/components/ui/button'
import { Goal } from 'lucide-react';
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function GoogleLogin() {
    const { t } = useTranslation();
    return (
        <div className='flex justify-center items-center'>
            <Button className='bg-black w-full h-12'>
                <Goal />
                {t('auth.google-loign')}
            </Button>
        </div>
    )
}
