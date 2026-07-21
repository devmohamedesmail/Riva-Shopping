<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BannerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('banners')->truncate();

        DB::table('banners')->insert([
            [
                'title_en' => 'Mega Summer Sale',
                'title_ar' => 'تخفيضات الصيف الكبرى',
                'description_en' => 'Up to 70% off on thousands of products.',
                'description_ar' => 'خصومات تصل إلى 70٪ على آلاف المنتجات.',
                'image' => 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg',
                'public_id' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title_en' => 'Latest Electronics',
                'title_ar' => 'أحدث الإلكترونيات',
                'description_en' => 'Discover the newest smartphones, laptops and accessories.',
                'description_ar' => 'اكتشف أحدث الهواتف وأجهزة اللابتوب والإكسسوارات.',
                'image' => 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg',
                'public_id' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title_en' => 'Fashion Collection',
                'title_ar' => 'أحدث صيحات الموضة',
                'description_en' => 'New arrivals for men, women and kids.',
                'description_ar' => 'أحدث تشكيلات الملابس للرجال والنساء والأطفال.',
                'image' => 'https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg',
                'public_id' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title_en' => 'Home & Kitchen',
                'title_ar' => 'المنزل والمطبخ',
                'description_en' => 'Everything you need for your home.',
                'description_ar' => 'كل ما تحتاجه لمنزلك ومطبخك.',
                'image' => 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
                'public_id' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title_en' => 'Beauty & Personal Care',
                'title_ar' => 'الجمال والعناية الشخصية',
                'description_en' => 'Top beauty brands with amazing offers.',
                'description_ar' => 'أفضل ماركات التجميل بأفضل العروض.',
                'image' => 'https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg',
                'public_id' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title_en' => 'Sports & Fitness',
                'title_ar' => 'الرياضة واللياقة',
                'description_en' => 'Premium sportswear and fitness equipment.',
                'description_ar' => 'ملابس ومعدات رياضية عالية الجودة.',
                'image' => 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg',
                'public_id' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}