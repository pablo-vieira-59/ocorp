export interface UserCreateDTO {
    password: string,
    name: string,
    email: string,
    phoneNumber: string,
    documentNumber: string,
    zipCode: string,
    addressName: string,
    number: string,
    neighborhood: string,
    city: string,
    state: string,
    profileId: 0,
    birthdayDate:string,
    isNewClient : true,
    clientName:string,
    imageGuid : string,
    companyName : string
}