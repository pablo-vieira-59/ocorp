import { Address_Establishment } from "./Address_Establishment";
import { EstablishmentStatus } from "./EstablishmentStatus";

export interface Establishment {
    id: number;
    establishmentStatusId :number;
    corporateName :string;
    fantasyName :string;
    documentNumber :string;
    email :string;
    phoneNumber :string;
    url :string;
    createdAt :Date;

    establishmentStatus :EstablishmentStatus;
    address_establishments :Address_Establishment[];
    //products :Product[];
}