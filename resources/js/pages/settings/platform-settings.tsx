import { Head, router } from "@inertiajs/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AppLayout from "@/layouts/app-layout";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ImagePicker from "@/components/ui/image-picker";
import { z } from "zod";

// import { settingSchema, SettingForm } from "./schema";
import { useState } from "react";
import { settingSchema,SettingForm } from "./schema";
import { useTranslation } from "react-i18next";
import { Checkbox } from "@/components/ui/checkbox";
import toast from "react-hot-toast";

export default function PlatformSettings() {
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [faviconPreview, setFaviconPreview] = useState<string | null>(null);
    const {t}=useTranslation();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
    } = useForm<SettingForm>({
        resolver: zodResolver(settingSchema),
        defaultValues: {
            timezone: "Africa/Cairo",

            maintenance_mode: false,
            registration_enabled: true,
            vendor_registration_enabled: true,

            currency_ar: "ج.م",
            currency_en: "EGP",
        },
    });

    const onSubmit = (values: SettingForm) => {
    
        router.post('/update/settings' , values , {
            forceFormData: true,
            onSuccess:()=>{
                toast.success(t('common.success'))
            },
            onError:()=>{
                toast.error(t('common.error_happended'))
            }
        })

       
    };

    return (
        <AppLayout>
            <Head title="Platform Settings" />

           <div className="container mx-auto px-10 py-10">
             <form
                onSubmit={handleSubmit(onSubmit)}
                className="mx-auto"
            >
                <div className="grid md:grid-cols-2 gap-6">

                    <div>
                        <Label>{t('settings.fields.site_name_ar')}</Label>
                        <Input {...register("site_name_ar")} />
                    </div>

                    <div>
                        <Label>{t('settings.fields.site_name_en')}</Label>
                        <Input {...register("site_name_en")} />
                    </div>

                    <div>
                        <Label>{t('settings.fields.site_description_ar')}</Label>
                        <Textarea {...register("site_description_ar")} />
                    </div>

                    <div>
                        <Label>{t('settings.fields.site_description_en')}</Label>
                        <Textarea {...register("site_description_en")} />
                    </div>

                    <div>
                        <Label>{t('settings.fields.currency_ar')}</Label>
                        <Input {...register("currency_ar")} />
                    </div>

                    <div>
                        <Label>{t('settings.fields.currency_en')}</Label>
                        <Input {...register("currency_en")} />
                    </div>

                    <div>
                        <Label>{t('settings.fields.timezone')}</Label>
                        <Input {...register("timezone")} />
                    </div>

                    <div>
                        <Label>{t('settings.fields.email')}</Label>
                        <Input {...register("email")} />
                    </div>

                    <div>
                        <Label>{t('settings.fields.phone')}</Label>
                        <Input {...register("phone")} />
                    </div>

                    <div>
                        <Label>{t('settings.fields.support')}</Label>
                        <Input {...register("support")} />
                    </div>

                    <div className="md:col-span-2">
                        <Label>{t('settings.fields.address')}</Label>
                        <Input {...register("address")} />
                    </div>

                    <div>
                        <Label>{t('settings.fields.facebook')}</Label>
                        <Input {...register("facebook")} />
                    </div>

                    <div>
                        <Label>{t('settings.fields.instagram')}</Label>
                        <Input {...register("instagram")} />
                    </div>

                    <div>
                        <Label>{t('settings.fields.meta_title')}</Label>
                        <Input {...register("meta_title")} />
                    </div>

                    <div>
                        <Label>{t('settings.fields.meta_keywords')}</Label>
                        <Input {...register("meta_keywords")} />
                    </div>

                    <div className="md:col-span-2">
                        <Label>{t('settings.fields.meta_description')}</Label>
                        <Textarea {...register("meta_description")} />
                    </div>

                    <ImagePicker
                        label={t('settings.fields.logo')}
                        preview={logoPreview}
                        onFile={(file) => {
                            setValue("logo", file);
                            setLogoPreview(URL.createObjectURL(file));
                        }}
                        onClear={() => {
                            setValue("logo", undefined);
                            setLogoPreview(null);
                        }}
                    />

                    <ImagePicker
                        label={t('settings.fields.favicon')}
                        preview={faviconPreview}
                        onFile={(file) => {
                            setValue("favicon", file);
                            setFaviconPreview(URL.createObjectURL(file));
                        }}
                        onClear={() => {
                            setValue("favicon", undefined);
                            setFaviconPreview(null);
                        }}
                    />

                </div>

                <div className="space-y-3">

                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={watch("maintenance_mode")}
                            onChange={(e) =>
                                setValue(
                                    "maintenance_mode",
                                    e.target.checked
                                )
                            }
                        />
                       {t('settings.system.maintenance_mode')}
                    </label>
                    

                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={watch("registration_enabled")}
                            onChange={(e) =>
                                setValue(
                                    "registration_enabled",
                                    e.target.checked
                                )
                            }
                        />
                         {t('settings.system.registration_enabled')}
                    </label>

                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={watch(
                                "vendor_registration_enabled"
                            )}
                            onChange={(e) =>
                                setValue(
                                    "vendor_registration_enabled",
                                    e.target.checked
                                )
                            }
                        />
                        {t('settings.system.vendor_registration_enabled')}
                    </label>

                </div>

                <div className="mt-10">
                    <Button type="submit">
                  {t('settings.buttons.save')}
                </Button>
                </div>
            </form>
           </div>
        </AppLayout>
    );
}