import { User } from "./User";

export interface Profile{
    id :number;
    name :string;

    users :User[];
}

export enum ProfileEnum{
    Admin = 1,
    Manager = 2,
    Employee = 3,
    Costumer = 4
}