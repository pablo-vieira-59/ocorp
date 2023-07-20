import { Establishment } from "./Establishment";
import { User } from "./User";

export interface User_Establishment{
    id :number;
    userId: number;
    establishmentId: number;

    address :Establishment;
    user :User;
}