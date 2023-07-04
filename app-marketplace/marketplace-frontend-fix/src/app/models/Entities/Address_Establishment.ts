import { Address } from "./Address";
import { Establishment } from "./Establishment";

export interface Address_Establishment{
    id :number;
    establishmentId: number;
    addressId: number;

    address :Address;
    establishment :Establishment;
}