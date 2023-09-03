import { Brand_Product } from "./Brand_Product";
import { Subcategory } from "./Subcategory";

export interface Product{
    id :number,
    clientId :number,
    subCategoryId :number,
    name :string,
    description :string,
    price :number,
    imageGuid :string,
    createdAt :Date,
    units :number,

    subCategory :Subcategory,
    // client :Client,

    // supplier_Products :Supplier_Products[],
    brand_Products :Brand_Product[],
    // product_Establishments :Product_Establishments[],

    // batches :Batch[]
}