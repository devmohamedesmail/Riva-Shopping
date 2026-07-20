<?php

namespace App\Http\Controllers\vendor;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use App\Models\Store;
use App\Services\ProductService;
use App\Traits\UploadsToCloudinary;
use Illuminate\Foundation\Exceptions\Renderer\Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VendorProductController extends Controller
{
    use UploadsToCloudinary;

    public function __construct(
        protected ProductService $productService
    ) {}

  
  
}
