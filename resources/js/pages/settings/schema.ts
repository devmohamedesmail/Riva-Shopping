import { z } from "zod";

export const settingSchema = z.object({
    site_name_ar: z.string().optional(),
    site_name_en: z.string().optional(),

    site_description_ar: z.string().optional(),
    site_description_en: z.string().optional(),

    currency_ar: z.string().optional(),
    currency_en: z.string().optional(),

    timezone: z.string(),

    email: z.string().email().optional().or(z.literal("")),
    phone: z.string().optional(),
    support: z.string().optional(),
    address: z.string().optional(),

    facebook: z.string().optional(),
    instagram: z.string().optional(),

    meta_title: z.string().optional(),
    meta_description: z.string().optional(),
    meta_keywords: z.string().optional(),

    maintenance_mode: z.boolean(),
    registration_enabled: z.boolean(),
    vendor_registration_enabled: z.boolean(),

    logo: z.any().optional(),
    favicon: z.any().optional(),
});

export type SettingForm = z.infer<typeof settingSchema>;