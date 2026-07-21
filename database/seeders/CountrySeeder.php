<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CountrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('countries')->truncate();

        DB::table('countries')->insert([
            [
                'name_en' => 'Egypt',
                'name_ar' => 'مصر',
                'currency_en' => 'Egyptian Pound',
                'currency_ar' => 'جنيه مصري',
                'code' => 'EG',
                'default_locale' => 'ar',
                'flag' => '🇪🇬',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name_en' => 'Saudi Arabia',
                'name_ar' => 'المملكة العربية السعودية',
                'currency_en' => 'Saudi Riyal',
                'currency_ar' => 'ريال سعودي',
                'code' => 'SA',
                'default_locale' => 'ar',
                'flag' => '🇸🇦',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name_en' => 'United Arab Emirates',
                'name_ar' => 'الإمارات العربية المتحدة',
                'currency_en' => 'UAE Dirham',
                'currency_ar' => 'درهم إماراتي',
                'code' => 'AE',
                'default_locale' => 'ar',
                'flag' => '🇦🇪',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name_en' => 'Kuwait',
                'name_ar' => 'الكويت',
                'currency_en' => 'Kuwaiti Dinar',
                'currency_ar' => 'دينار كويتي',
                'code' => 'KW',
                'default_locale' => 'ar',
                'flag' => '🇰🇼',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name_en' => 'Qatar',
                'name_ar' => 'قطر',
                'currency_en' => 'Qatari Riyal',
                'currency_ar' => 'ريال قطري',
                'code' => 'QA',
                'default_locale' => 'ar',
                'flag' => '🇶🇦',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name_en' => 'Bahrain',
                'name_ar' => 'البحرين',
                'currency_en' => 'Bahraini Dinar',
                'currency_ar' => 'دينار بحريني',
                'code' => 'BH',
                'default_locale' => 'ar',
                'flag' => '🇧🇭',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name_en' => 'Oman',
                'name_ar' => 'سلطنة عمان',
                'currency_en' => 'Omani Rial',
                'currency_ar' => 'ريال عماني',
                'code' => 'OM',
                'default_locale' => 'ar',
                'flag' => '🇴🇲',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}