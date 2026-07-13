import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Textarea } from "@/components/ui/textarea";
import ImagePicker from "@/components/ui/image-picker";
import { useState } from "react";
import { bannerSchema, BannerForm } from "./schema";
import { Head, router } from "@inertiajs/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AppLayout from "@/layouts/app-layout";
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';

export default function index() {
    const { t } = useTranslation();
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        setValue,
        watch,
    } = useForm<BannerForm>({
        resolver: zodResolver(bannerSchema),

    });

    const onSubmit = (values: BannerForm) => {
        console.log(values)
        router.post('/banner/store', values, {
            forceFormData: true,
            onSuccess: () => {
                toast.success(t('common.success'))
            },

            onError: () => {
                toast.error(t('common.error_happended'))
            }
        })


    };
    return (
        <div className='container'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Label>{t("common.title_ar")}</Label>
                    <Input  {...register("title_ar")} />
                </div>
                <div>
                    <Label>{t("common.title_en")}</Label>
                    <Input  {...register("title_en")} />
                </div>
                <div>
                    <Label>{t("common.description_ar")}</Label>
                    <Input  {...register("description_ar")} />
                </div>
                <div>
                    <Label>{t("common.description_en")}</Label>
                    <Input  {...register("description_en")} />
                </div>


                <ImagePicker
                    label={t('settings.fields.logo')}
                    preview={imagePreview}
                    onFile={(file) => {
                        setValue("logo", file );
                        setImagePreview(URL.createObjectURL(file));
                    }}
                    onClear={() => {
                        setValue("logo", undefined);
                        setImagePreview(null);
                    }}
                />
                <Button type='submit'>{t('common.save')}</Button>
            </form>
        </div>
    )
}
