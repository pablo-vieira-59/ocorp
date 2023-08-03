import { Subcategory } from "./Subcategory";

export interface Category{
    id :number,
    clientId :number,
    name :string,
    color :string,

    subCategories :Subcategory[]
}   