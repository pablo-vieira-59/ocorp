import { User } from "./User";

export interface UserStatus{
    id :number;
    name :string;

    users :User[];
}