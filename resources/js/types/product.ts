
export interface Category { id: number; name_en: string; name_ar: string; parent_id: number | null; }
export interface ProductImage { id: number; image: string; order: number; }
export interface Variant { id?: number; sku?: string; price: number; sale_price?: number; stock: number; is_active: boolean; attributeValues?: { id: number; attribute_id: number; value: string; }[]; }
export interface AttributeValue { id: number; attribute_id: number; value: string; price: number; }
export interface Attribute { id: number; name_en: string; name_ar: string; values: AttributeValue[]; }
export interface ProductItem {
    id: number;
    title: string;
    slug?: string;
    description?: string;
    price: number;
    sale_price?: number;
    product_type: 'simple' | 'variant';
    product_kind: 'physical' | 'digital';
    stock: number;
    sku?: string;
    is_active: boolean;
    is_popular: boolean;
    is_featured: boolean;
    weight?: number;
    length?: number;
    width?: number;
    height?: number;
    tax: number;
    shipping_cost?: number;
    category_id: number;
    category?: Category;
    images?: ProductImage[];
    variants?: Variant[];
    attributes: Attribute[];
    store: Store
}

export interface PaginatedProducts { data: ProductItem[]; current_page: number; last_page: number; total: number; }
export interface Store { id: number; name: string; currency: string; }