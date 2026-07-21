<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('roles')->insert([
            [
                'name_ar' => 'مدير النظام',
                'name_en' => 'Administrator',
                'slug' => 'admin',
                'description' => 'Full access to the platform.',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name_ar' => 'صاحب المتجر',
                'name_en' => 'Vendor',
                'slug' => 'vendor',
                'description' => 'Store owner who manages products and orders.',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name_ar' => 'العميل',
                'name_en' => 'Customer',
                'slug' => 'customer',
                'description' => 'Customer who purchases products.',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name_ar' => 'مندوب التوصيل',
                'name_en' => 'Delivery Driver',
                'slug' => 'delivery-driver',
                'description' => 'Responsible for delivering customer orders.',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name_ar' => 'موظف المتجر',
                'name_en' => 'Store Staff',
                'slug' => 'store-staff',
                'description' => 'Employee who manages store operations.',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}