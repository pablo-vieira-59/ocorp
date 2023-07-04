import { Address } from "./Address";
import { User } from "./User";

export interface Address_User{
    id :number;
    userId: number;
    addressId: number;

    address :Address;
    user :User;
}