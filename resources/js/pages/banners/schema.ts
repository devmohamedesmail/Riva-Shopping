import { z } from "zod";

export const bannerSchema = z.object({
    title_ar: z.string().optional(),
    title_en: z.string().optional(),
    description_ar: z.string().optional(),
    description_en: z.string().optional(),
    image: z.any().optional() || null,

});

export type BannerForm = z.infer<typeof bannerSchema>;