export interface BatchCreateDTO{
    supplierId :number,
    productId :number,
    addressId :number,
    serial :string,
    freightPrice :number,
    unitPrice :number,
    totalUnits :number,
    fabricatedAt :string,
    validUntil :string,
    invoiceImageGuid :string,
    paymentProofImageGuid :string
}