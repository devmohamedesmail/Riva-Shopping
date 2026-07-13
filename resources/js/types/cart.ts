export interface CartItem {
    id:number,
    title:string,
    image:string,
    price:string,
    sale_price:string,
    quantity:number
}
export interface CartState{
    products: CartItem[]
}


 