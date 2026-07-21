<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('settings')->updateOrInsert(
            ['id' => 1],
            [
                'site_name_ar' => 'ريفا شوبينج',
                'site_name_en' => 'Riva Shopping',

                'site_description_ar' => 'منصة تسوق إلكتروني متعددة البائعين توفر آلاف المنتجات من أفضل البائعين.',
                'site_description_en' => 'A modern multi-vendor marketplace offering thousands of products from trusted sellers.',

                // Temporary logo
                'logo' => 'https://placehold.co/512x512/png?text=Riva+Shopping',
                'public_logo_id' => null,

                // Temporary favicon
                'favicon' => 'https://placehold.co/64x64/png?text=R',
                'public_favicon_id' => null,

                'currency_ar' => 'جنيه مصري',
                'currency_en' => 'Egyptian Pound',

                'timezone' => 'Africa/Cairo',

                'maintenance_mode' => false,
                'registration_enabled' => true,
                'vendor_registration_enabled' => true,

                'meta_title' => 'Riva Shopping | Multi Vendor Marketplace',

                'meta_description' => 'Shop electronics, fashion, beauty, home appliances, groceries, sports, toys and more from trusted vendors.',

                'meta_keywords' => 'shopping,ecommerce,multivendor,marketplace,egypt,electronics,fashion,beauty,grocery',

                'email' => 'info@rivashopping.com',

                'address' => 'Cairo, Egypt',

                'phone' => '+201000000000',

                'support' => 'support@rivashopping.com',

                'facebook' => 'https://facebook.com/rivashopping',

                'instagram' => 'https://instagram.com/rivashopping',

                'twitter' => 'https://twitter.com/rivashopping',

                'youtube' => 'https://youtube.com/@rivashopping',

                'linkedin' => 'https://linkedin.com/company/rivashopping',

                'tiktok' => 'https://tiktok.com/@rivashopping',

                'whatsapp' => '+201000000000',

                'free_shipping_enable' => true,

                // price | quantity
                'free_shipping_type' => 'price',

                'free_shipping_min_order' => 1000,

                'free_shipping_start_at' => null,
                'free_shipping_end_at' => null,

                'created_at' => now(),
                'updated_at' => now(),
            ]
        );
    }
}