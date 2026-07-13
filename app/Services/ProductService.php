<?php

namespace App\Services;

use App\Models\AttributeValue;
use App\Models\Product;
use App\Models\Store;
use App\Services\CloudinaryService;
use App\Traits\UploadsToCloudinary;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class ProductService
{
    use UploadsToCloudinary;

    public function __construct(protected CloudinaryService $cloudinaryService){}


    public function getProductDetails(string $slug, int $id)
    {
        $product = Product::with([
            'category',
            'images',
            'attributes',
            'attributeValues.attribute',
            'variants.attributeValues.attribute',
        ])->where('id', $id)->firstOrFail();


        return $product;
    }




    public function deleteAllStoreProducts($id)
    {
        Product::where('store_id', $id)->delete();
        return true;
    }



    public function createProduct(array $data, $request)
    {
        $store = $this->getStore();
        if (! $store) return null;
        

        $data['store_id'] = $store->id;

        $data['slug'] = Str::slug($data['title'])  . '-' . uniqid();
        $product = Product::create($data);
        $this->uploadImages($product, $request);
        $this->handleAttributes(
            $product,
            $data['product_attributes'] ?? []
        );
        $this->handleVariants(
            $product,
            $data['variants'] ?? []
        );


        return $product;
    }























    // ---------------------------------------------------------------------------------------------------------------

    public function getStore()
    {
        return Store::where('user_id', Auth::id())->first();
    }



    public function getProductsPageData()
    {
        $store = $this->getStore();

        if (! $store) {
            return null;
        }


        return [
            'store' => $store,

            'products' => Product::where('store_id', $store->id)
                ->with([
                    'category:id,name_en,name_ar',
                    'images',
                    'variants.attributeValues.attribute'
                ])
                ->latest()
                ->paginate(15),


            'categories' => $store->categories()
                ->where('is_active', true)
                ->get([
                    'categories.id',
                    'categories.name_en',
                    'categories.name_ar',
                    'categories.parent_id'
                ]),


            'attributes' => \App\Models\Attribute::with('values')
                ->get()
        ];
    }






    private function uploadImages(Product $product, $request)
    {
        if (!$request->hasFile('images')) {
            return;
        }
        foreach ($request->file('images') as $index => $file) {
            $path = $this->cloudinaryService->uploadToCloudinary( $file, 'products');
            $product->images()->create([
                'image' => $path,
                'order' => $index
            ]);
        }
    }



    private function handleAttributes(Product $product, array $attributes)
    {

        if (empty($attributes)) {
            return;
        }


        $ids = collect($attributes)
            ->pluck('attribute_id')
            ->toArray();


        $product->attributes()->sync($ids);



        foreach ($attributes as $attr) {

            foreach ($attr['values'] ?? [] as $value) {

                AttributeValue::create([

                    'attribute_id' => $attr['attribute_id'],

                    'product_id' => $product->id,

                    'value' => $value,

                    'price' => 0

                ]);
            }
        }
    }




    private function handleVariants(Product $product, array $variants, array $attributeValuesMap = [])
    {
        if (empty($variants)) {
            return;
        }


        foreach ($variants as $vData) {

            $variant = $product->variants()->create([

                'sku'        => $vData['sku'] ?? null,

                'price'      => $vData['price'],

                'sale_price' => $vData['sale_price'] ?? null,

                'stock'      => $vData['stock'] ?? 0,

                'is_active'  => filter_var(
                    $vData['is_active'] ?? true,
                    FILTER_VALIDATE_BOOLEAN
                ),

            ]);



            $attributeValueIds = [];


        
            if (!empty($vData['options'])) {

                foreach ($vData['options'] as $attrId => $value) {


                    $attributeValue = AttributeValue::where([
                        'product_id' => $product->id,
                        'attribute_id' => $attrId,
                        'value' => $value,
                    ])->first();


                    if ($attributeValue) {

                        $attributeValueIds[] =
                            $attributeValue->id;
                    }
                }
            }



            // لو جاي IDs مباشرة
            if (!empty($vData['attribute_values'])) {

                $attributeValueIds = array_merge(
                    $attributeValueIds,
                    $vData['attribute_values']
                );
            }



            if (!empty($attributeValueIds)) {

                $variant->attributeValues()
                    ->attach(
                        array_unique($attributeValueIds)
                    );
            }
        }
    }





    public function updateProduct(Product $product, array $data, $request)
    {

        $store = $this->getStore();


        if (! $store || $product->store_id !== $store->id) {
            return null;
        }



        if ($product->title !== $data['title']) {

            $data['slug'] =
                Str::slug($data['title'])
                . '-' . uniqid();
        }



        $product->update($data);



        // images

        if ($request->hasFile('images')) {


            foreach ($request->file('images') as $index => $file) {


                $path = $this->uploadToCloudinary(
                    $file,
                    'products'
                );


                $product->images()->create([

                    'image' => $path,

                    'order' =>
                    $product->images()->max('order')
                        + 1
                        + $index,

                ]);
            }
        }




        // attributes

        $attributeValuesMap = [];


        AttributeValue::where(
            'product_id',
            $product->id
        )->delete();



        if (!empty($data['product_attributes'])) {


            $attributeIds =
                collect($data['product_attributes'])
                ->pluck('attribute_id')
                ->toArray();



            $product->attributes()
                ->sync($attributeIds);



            foreach ($data['product_attributes'] as $attr) {


                foreach ($attr['values'] ?? [] as $value) {


                    $created =
                        AttributeValue::create([

                            'attribute_id' => $attr['attribute_id'],

                            'product_id' => $product->id,

                            'value' => $value,

                            'price' => 0

                        ]);


                    $attributeValuesMap[$attr['attribute_id']][$value]
                        =
                        $created->id;
                }
            }
        } else {

            $product->attributes()->detach();
        }





        // variants

        if (
            $data['product_type'] === 'variant'
            &&
            !empty($data['variants'])
        ) {


            $product->variants()->delete();



            $this->handleVariants(
                $product,
                $data['variants'],
                $attributeValuesMap
            );
        } elseif (
            $data['product_type'] === 'simple'
        ) {

            $product->variants()->delete();
        }



        return $product;
    }

    public function deleteProduct(Product $product)
    {
        $store = $this->getStore();


        if (!$store || $product->store_id != $store->id) {

            return false;
        }


        $product->delete();


        return true;
    }
}
