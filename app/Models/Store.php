<?php

namespace App\Models;

use App\Models\Category;
use App\Models\Country;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
    /** @use HasFactory<\Database\Factories\StoreFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'logo',
        'cover',
        'description',
        'phone',
        'email',
        'address',
        'city',
        'state',
        'zip',
        'country',
        'currency',
        'timezone',
        'status',
        'user_id',
        'country_id',
        'public_logo_id',
        'public_cover_id'
    ];

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'category_store');
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

     public function country()
    {
        return $this->belongsTo(Country::class);
    }
}