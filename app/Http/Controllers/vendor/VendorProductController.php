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

    private function getStore()
    {
        return Store::where('user_id', auth()->id())->first();
    }

    public function index(Request $request)
    {
        $data =
            $this->productService
            ->getProductsPageData();


        if (!$data) {

            return redirect()
                ->route('create-store.page');
        }


        return Inertia::render(
            'vendor/products/index',
            $data
        );
    }

    public function store(StoreProductRequest $request)
    {

        $this->productService
            ->createProduct(
                $request->validated(),
                $request
            );


        return back();
    }

    public function update(
        UpdateProductRequest $request,
        Product $product
    ) {

        $this->productService->updateProduct(
            $product,
            $request->validated(),
            $request
        );


        return back();
    }

    public function destroy(Product $product)
    {
        $deleted =
            $this->productService
            ->deleteProduct($product);



        if (!$deleted) {

            return response()->json([
                'error' => 'Unauthorized'
            ], 403);
        }


        return back();
    }
}
