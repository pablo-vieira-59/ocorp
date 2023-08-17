export interface BatchStatus{
    id :number,
    name :string,
    color :string,
}

export enum BatchStatusEnum {
    EmTransito = 1,
    EmEstoque = 2,
    Cancelado = 3
}