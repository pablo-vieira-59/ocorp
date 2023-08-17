export interface LoginDto{
    username :string;
    password :string;
}

export interface LoginResponseDto{
    token :string,
    guid :string,
    email :string,
    clientName :string,
    name:string,
    image :string,
}