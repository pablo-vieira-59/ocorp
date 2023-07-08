import { User } from "./User";

export interface Profile{
    id :number;
    name :string;

    users :User[];
}