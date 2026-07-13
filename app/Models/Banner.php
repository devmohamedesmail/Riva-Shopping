<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Banner extends Model
{
    /** @use HasFactory<\Database\Factories\BannerFactory> */
    use HasFactory;


    protected $fillable = [
        'description_en',
        'description_ar',
        'title_en',
        'title_ar',
        'image'
    ];
}
