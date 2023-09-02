export interface ProductCreateDTO{
    subcategoryId :string,
    name :string,
    description :string,
    price :string,
    imageGuid :string
    brandIds :number[],
}