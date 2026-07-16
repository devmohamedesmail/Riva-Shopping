<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('site_name_ar')->nullable();
            $table->string('site_name_en')->nullable();
            $table->longText('site_description_ar')->nullable();
            $table->longText('site_description_en')->nullable();
            $table->longText('logo')->nullable();
            $table->string('public_logo_id')->nullable();
            $table->longText('favicon')->nullable();
            $table->string('public_favicon_id')->nullable();
            $table->string('currency_ar')->default('$');
            $table->string('currency_en')->default('$');
            $table->string('timezone')->default('Africa/Cairo');
            $table->boolean('maintenance_mode')->default(false);
            $table->boolean('registration_enabled')->default(true);
            $table->boolean('vendor_registration_enabled')->default(true);
            $table->string('meta_title')->nullable();
            $table->longText('meta_description')->nullable();
            $table->longText('meta_keywords')->nullable();
            $table->string('email')->nullable();
            $table->string('address')->nullable();
            $table->string('phone')->nullable();
            $table->string('support')->nullable();
            $table->longText('facebook')->nullable();
            $table->longText('instagram')->nullable();
            $table->string('twitter')->nullable();
            $table->string('youtube')->nullable();
            $table->string('linkedin')->nullable();
            $table->string('tiktok')->nullable();
            $table->string('whatsapp')->nullable();

            // shipping
            $table->boolean('free_shipping_enable')->default(false);
            $table->enum('free_shipping_type',['none','all_orders' ,'minium_order' , 'coupon'])->default('none');
            $table->decimal('free_shipping_min_order',12,2)->nullable();
            $table->timestamp('free_shipping_start_at')->nullable();
            $table->timestamp('free_shipping_end_at')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
