import { Brand } from "./Brand";
import { Product } from "./Product";

export interface Brand_Product{
    id :number,
    brandId :number,
    productId :number,

    brand :Brand,
    product :Product
}