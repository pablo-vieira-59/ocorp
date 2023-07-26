import { Brand_Product } from "./Brand_Product";

export interface Product{
    id :number,
    clientId :number,
    subCategoryId :number,
    name :string,
    description :string,
    price :number,
    imageUrl :string,

    // subcategory :Subcategory,
    // client :Client,

    // supplier_Products :Supplier_Products[],
    brand_Products :Brand_Product[],
    // product_Establishments :Product_Establishments[],

    // batches :Batch[]
}