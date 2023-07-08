import { Establishment } from "./Establishment";

export interface EstablishmentStatus {
    id: number;
    name: string;
    establishments: Establishment[];
}

export enum EstablishmentStatusEnum {
    Active = 1,
    Inactive = 2,
}