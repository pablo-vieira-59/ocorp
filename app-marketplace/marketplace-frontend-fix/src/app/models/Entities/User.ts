import { Address_User } from "./Address_User";
import { Profile } from "./Profile";
import { UserAccess } from "./UserAccess";
import { UserStatus } from "./UserStatus";

export interface User {
    id :number;
    profileId :number;
    userStatusId :number;
    username :string;
    password :string;
    name :string;
    email :string;
    phoneNumber :string;
    documentNumber :string;
    createdAt :Date;
    lastLogin :Date;

    profile :Profile;
    userAccess :UserAccess;
    userStatus :UserStatus;

    address_user :Address_User[];
}