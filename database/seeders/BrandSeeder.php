<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('brands')->truncate();

        $brands = [
            ['name_en' => 'Samsung', 'name_ar' => 'سامسونج'],
            ['name_en' => 'Apple', 'name_ar' => 'آبل'],
            ['name_en' => 'Huawei', 'name_ar' => 'هواوي'],
            ['name_en' => 'Xiaomi', 'name_ar' => 'شاومي'],
            ['name_en' => 'Oppo', 'name_ar' => 'أوبو'],
            ['name_en' => 'Vivo', 'name_ar' => 'فيفو'],
            ['name_en' => 'Realme', 'name_ar' => 'ريلمي'],
            ['name_en' => 'Honor', 'name_ar' => 'هونر'],
            ['name_en' => 'Nokia', 'name_ar' => 'نوكيا'],
            ['name_en' => 'Google', 'name_ar' => 'جوجل'],
            ['name_en' => 'Microsoft', 'name_ar' => 'مايكروسوفت'],
            ['name_en' => 'Amazon', 'name_ar' => 'أمازون'],
            ['name_en' => 'Sony', 'name_ar' => 'سوني'],
            ['name_en' => 'LG', 'name_ar' => 'إل جي'],
            ['name_en' => 'Panasonic', 'name_ar' => 'باناسونيك'],
            ['name_en' => 'Philips', 'name_ar' => 'فيليبس'],
            ['name_en' => 'Bosch', 'name_ar' => 'بوش'],
            ['name_en' => 'Canon', 'name_ar' => 'كانون'],
            ['name_en' => 'Nikon', 'name_ar' => 'نيكون'],
            ['name_en' => 'GoPro', 'name_ar' => 'غو برو'],
            ['name_en' => 'DJI', 'name_ar' => 'دي جي آي'],
            ['name_en' => 'Lenovo', 'name_ar' => 'لينوفو'],
            ['name_en' => 'Dell', 'name_ar' => 'ديل'],
            ['name_en' => 'HP', 'name_ar' => 'إتش بي'],
            ['name_en' => 'Acer', 'name_ar' => 'إيسر'],
            ['name_en' => 'ASUS', 'name_ar' => 'أسوس'],
            ['name_en' => 'MSI', 'name_ar' => 'إم إس آي'],
            ['name_en' => 'Intel', 'name_ar' => 'إنتل'],
            ['name_en' => 'AMD', 'name_ar' => 'إيه إم دي'],
            ['name_en' => 'NVIDIA', 'name_ar' => 'إنفيديا'],
            ['name_en' => 'Logitech', 'name_ar' => 'لوجيتك'],
            ['name_en' => 'Anker', 'name_ar' => 'أنكر'],
            ['name_en' => 'Belkin', 'name_ar' => 'بيلكن'],
            ['name_en' => 'Kingston', 'name_ar' => 'كينغستون'],
            ['name_en' => 'SanDisk', 'name_ar' => 'سانديسك'],
            ['name_en' => 'Seagate', 'name_ar' => 'سيجيت'],
            ['name_en' => 'Western Digital', 'name_ar' => 'ويسترن ديجيتال'],

            // Fashion
            ['name_en' => 'Nike', 'name_ar' => 'نايكي'],
            ['name_en' => 'Adidas', 'name_ar' => 'أديداس'],
            ['name_en' => 'Puma', 'name_ar' => 'بوما'],
            ['name_en' => 'Reebok', 'name_ar' => 'ريبوك'],
            ['name_en' => 'Skechers', 'name_ar' => 'سكيتشرز'],
            ['name_en' => 'New Balance', 'name_ar' => 'نيو بالانس'],
            ['name_en' => 'Converse', 'name_ar' => 'كونفرس'],
            ['name_en' => 'Vans', 'name_ar' => 'فانز'],
            ['name_en' => 'Zara', 'name_ar' => 'زارا'],
            ['name_en' => 'H&M', 'name_ar' => 'إتش آند إم'],
            ['name_en' => 'Uniqlo', 'name_ar' => 'يونيكلو'],
            ['name_en' => 'Mango', 'name_ar' => 'مانجو'],
            ['name_en' => "Levi's", 'name_ar' => 'ليفايز'],
            ['name_en' => 'Tommy Hilfiger', 'name_ar' => 'تومي هيلفيغر'],
            ['name_en' => 'Lacoste', 'name_ar' => 'لاكوست'],
            ['name_en' => 'Ralph Lauren', 'name_ar' => 'رالف لورين'],
            ['name_en' => 'Guess', 'name_ar' => 'جيس'],

            // Beauty
            ['name_en' => "L'Oreal", 'name_ar' => 'لوريال'],
            ['name_en' => 'Nivea', 'name_ar' => 'نيفيا'],
            ['name_en' => 'Garnier', 'name_ar' => 'غارنييه'],
            ['name_en' => 'Dove', 'name_ar' => 'دوف'],
            ['name_en' => 'Neutrogena', 'name_ar' => 'نيتروجينا'],
            ['name_en' => 'CeraVe', 'name_ar' => 'سيرافي'],
            ['name_en' => 'La Roche-Posay', 'name_ar' => 'لاروش بوزيه'],
            ['name_en' => 'Maybelline', 'name_ar' => 'مايبيلين'],
            ['name_en' => 'MAC', 'name_ar' => 'ماك'],
            ['name_en' => 'Dior', 'name_ar' => 'ديور'],
            ['name_en' => 'Chanel', 'name_ar' => 'شانيل'],

            // Home & Kitchen
            ['name_en' => 'Tefal', 'name_ar' => 'تيفال'],
            ['name_en' => 'Braun', 'name_ar' => 'براون'],
            ['name_en' => 'Kenwood', 'name_ar' => 'كينوود'],
            ['name_en' => 'Moulinex', 'name_ar' => 'مولينكس'],
            ['name_en' => 'Black+Decker', 'name_ar' => 'بلاك آند ديكر'],
            ['name_en' => 'IKEA', 'name_ar' => 'إيكيا'],
            ['name_en' => 'Home Centre', 'name_ar' => 'هوم سنتر'],

            // Automotive
            ['name_en' => 'Toyota', 'name_ar' => 'تويوتا'],
            ['name_en' => 'Hyundai', 'name_ar' => 'هيونداي'],
            ['name_en' => 'Kia', 'name_ar' => 'كيا'],
            ['name_en' => 'Nissan', 'name_ar' => 'نيسان'],
            ['name_en' => 'Ford', 'name_ar' => 'فورد'],
            ['name_en' => 'Chevrolet', 'name_ar' => 'شيفروليه'],
            ['name_en' => 'BMW', 'name_ar' => 'بي إم دبليو'],
            ['name_en' => 'Mercedes-Benz', 'name_ar' => 'مرسيدس'],
            ['name_en' => 'Michelin', 'name_ar' => 'ميشلان'],
            ['name_en' => 'Bridgestone', 'name_ar' => 'بريدجستون'],

            // Watches & Jewelry
            ['name_en' => 'Rolex', 'name_ar' => 'روليكس'],
            ['name_en' => 'Casio', 'name_ar' => 'كاسيو'],
            ['name_en' => 'Fossil', 'name_ar' => 'فوسيل'],
            ['name_en' => 'Pandora', 'name_ar' => 'باندورا'],
            ['name_en' => 'Hugo Boss', 'name_ar' => 'هوجو بوس'],

            // Toys
            ['name_en' => 'LEGO', 'name_ar' => 'ليغو'],
            ['name_en' => 'Mattel', 'name_ar' => 'ماتيل'],
            ['name_en' => 'Barbie', 'name_ar' => 'باربي'],
            ['name_en' => 'Hot Wheels', 'name_ar' => 'هوت ويلز'],
            ['name_en' => 'Hasbro', 'name_ar' => 'هاسبرو'],
            ['name_en' => 'Disney', 'name_ar' => 'ديزني'],
        ];

        foreach ($brands as $brand) {
            DB::table('brands')->insert([
                'name_en' => $brand['name_en'],
                'name_ar' => $brand['name_ar'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}