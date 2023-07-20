import { Establishment } from "../Entities/Establishment";

export interface UserEditDTO{
    id :number,
    name :string,
    password :string,
    phoneNumber :string,
    profileId :number,
    email :string,
    documentNumber :string,
    birthdayDate :string

    userEstablishments :Establishment[];
}