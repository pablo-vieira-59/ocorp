import { Address } from "./Address";
import { BatchStatus } from "./BatchStatus";
import { Client } from "./Client";
import { Product } from "./Product";
import { Supplier } from "./Supplier";

export interface Batch {
    id :number,
    clientId : number,
    supplierId :number,
    productId :number,
    addressId :number,
    batchStatusId :number,
    serial :string,
    description :string,
    totalPrice :number,
    unitPrice :number,
    totalUnits :number,

    fabricatedAt :Date,
    validUntil :Date | null,
    orderedAt :Date | null,
    receivedAt :Date | null,

    batchStatus :BatchStatus,
    product :Product,
    supplier :Supplier,
    address :Address,
    client :Client
}