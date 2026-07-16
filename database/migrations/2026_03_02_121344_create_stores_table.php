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
        Schema::create('stores', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('country_id')->nullable()->constrained('users')->onDelete('cascade');
            $table->string('name')->unique();
            $table->string('slug')->unique();
            $table->longText('logo')->nullable();
            $table->string('public_logo_id')->nullable();
            $table->longText('cover')->nullable();
            $table->string('public_cover_id')->nullable();
            $table->longText('description')->nullable();
            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->string('address')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('zip')->nullable();
            $table->string('country')->nullable();
            $table->string('currency')->nullable();
            $table->string('timezone')->nullable();
            $table->string('status')->default('active');

            // social media
            $table->longText('facebook')->nullable();
            $table->longText('titok')->nullable();
            $table->longText('instagram')->nullable();

            // SEO
            $table->longText('meta_title')->nullable();
            $table->longText('meta_description')->nullable();
          
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stores');
    }
};
