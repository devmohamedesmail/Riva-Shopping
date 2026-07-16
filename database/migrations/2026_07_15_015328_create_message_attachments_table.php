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
        Schema::create('message_attachments', function (Blueprint $table) {
            $table->id();
               $table->foreignId('message_id')->nullable()->constrained('messages')->onDelete('cascade');
               $table->string('public_id')->nullable();
               $table->string('url')->nullable();
               $table->string('original_name')->nullable();
               $table->string('mime_type')->nullable();
               $table->enum('type' ,['image' ,'video', 'fiel'])->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('message_attachments');
    }
};
