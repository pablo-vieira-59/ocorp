import { User } from "./User";

export interface UserAccess{
    id :number;
    userId :number;
    token :string;
    tokenValidUntil :Date;

    user :User;
}