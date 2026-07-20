import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import VendorLayout from '@/layouts/vendor-layout';
import { Button } from '@/components/ui/button';
import { Category } from '@/types/product';
import { Store } from '@/types/store';
import StoreInfoSection from './components/store-info-section';
import StoreLocationSection from './components/store-location-section';
import StoreCategoriesSection from './components/store-categories-section';

interface Props {
    store: Store;
    categories: Category[];
    storeCategories: number[];
}



export default function UpdateStore({ store, categories, storeCategories }: Props) {
    const { t, i18n } = useTranslation();
    const [processing, setProcessing] = useState(false);
    const [selectedCats, setSelectedCats] = useState<number[]>(storeCategories);
    const [form, setForm] = useState({
        name: store.name ?? '',
        description: store.description ?? '',
        phone: store.phone ?? '',
        email: store.email ?? '',
        address: store.address ?? '',
        city: store.city ?? '',
        state: store.state ?? '',
        zip: store.zip ?? '',
        country: store.country ?? '',
    });

    const set = (key: keyof typeof form) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
            setForm(f => ({ ...f, [key]: e.target.value }));

    const toggleCat = (id: number) =>
        setSelectedCats(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);

    const parents = categories.filter(c => !c.parent_id);
    const getChildren = (pid: number) => categories.filter(c => c.parent_id === pid);

    const handleSubmit = (e: React.FormEvent) => {


        e.preventDefault();
        setProcessing(true);
        router.patch('/update/store/submit', { ...form, categories: selectedCats } as any, {
            onSuccess: () => toast.success(t('common.saved_success')),
            onError: () => toast.error(t('common.error')),
            onFinish: () => setProcessing(false),
        });
    };

    return (
        <VendorLayout title={t('vendor.settings.title')}>
            <Head title={`${store.name} — ${t('vendor_dashboard.settings.title')}`} />
            <div className="mb-6">
                <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">{t('vendor.settings.title')}</h2>
                <p className="text-sm text-gray-500 mt-0.5">{t('vendor.settings.subtitle')}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

                {/* Store Info */}
                <StoreInfoSection form={form} set={set} />

                {/* Location */}
                <StoreLocationSection form={form} set={set} />

                {/* Categories */}
                <StoreCategoriesSection selectedCats={selectedCats} categories={categories} parents={parents} getChildren={getChildren} toggleCat={toggleCat} />




                {/* <ImagePicker
                    label={t('create_store.media.logo')}
                    preview={logoPreview}
                    onFile={f => { setLogoFile(f); setLogoPreview(URL.createObjectURL(f)); }}
                    onClear={() => { setLogoFile(null); setLogoPreview(null); }}
                />

                <ImagePicker
                    label={t('create_store.media.cover')}
                    preview={coverPreview}
                    onFile={f => { setCoverFile(f); setCoverPreview(URL.createObjectURL(f)); }}
                    onClear={() => { setCoverFile(null); setCoverPreview(null); }}
                /> */}



                <div className="flex justify-end pt-2">
                    <Button


                        type="submit" disabled={processing} className="bg-orange-500 hover:bg-orange-600 text-white border-0 min-w-36">
                        {processing ? t('vendor.settings.saving') : t('vendor.settings.save')}
                    </Button>
                </div>
            </form>
        </VendorLayout>
    );
}
