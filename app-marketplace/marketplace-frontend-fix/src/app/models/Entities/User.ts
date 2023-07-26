import { Address_User } from "./Address_User";
import { Profile } from "./Profile";
import { UserAccess } from "./UserAccess";
import { UserStatus } from "./UserStatus";
import { User_Establishment } from "./User_Establishment";

export interface User {
    id :number;
    clientId :number;
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
    birthdayDate :Date;

    profile :Profile;
    userAccess :UserAccess;
    userStatus :UserStatus;

    address_user :Address_User[];
    user_establishments :User_Establishment[];
}