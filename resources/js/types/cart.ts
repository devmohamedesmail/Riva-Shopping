export interface CartItem {
    id:number,
    title:string,
    image:string,
    price:string,
    sale_price:string,
    quantity:number,
    attributes:any,
    product_type:string,
    store_id:number,
    store_name:string
}
export interface CartState{
    products: CartItem[]
}


 