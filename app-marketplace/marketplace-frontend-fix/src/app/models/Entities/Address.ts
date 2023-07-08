import { Address_User } from "./Address_User";

export interface Address{
    id :number;
    zipCode :string;
    addressName :string;
    number :string;
    neighborhood :string;
    city :string;
    state :string;
    country :string;

    address_user :Address_User[];
}