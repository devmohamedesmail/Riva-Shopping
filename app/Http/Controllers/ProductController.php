<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use App\Services\ProductService;
use Inertia\Inertia;

class ProductController extends Controller
{

    public function __construct(protected ProductService $productService) {}


    public function vendor_products_page()
    {
        $data =
            $this->productService
            ->getProductsPageData();


        if (!$data) {

            return redirect()
                ->route('create-store.page');
        }
        return Inertia::render('products/vendor-products', $data);
    }


    public function product_details(string $slug, int $id)
    {

        $product = $this->productService->getProductDetails($slug, $id);
        return Inertia::render('users/product-details/index', [
            'product' => $product,
        ]);
    }





    public function store(StoreProductRequest $request)
    {
           $this->productService->createProduct($request->validated(),  $request);
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


    public function delete_store_products(int $id){
        $this->productService->deleteAllStoreProducts($id);
    }
}
