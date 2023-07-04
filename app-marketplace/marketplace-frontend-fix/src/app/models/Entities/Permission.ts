export interface Permission{
    id :number;
    name :string;
}

export enum PermissionEnum{
    Tela_Usuarios = 1,
    Tela_Permissoes = 2,
    Tela_Perfis = 3,
    Tela_Status_Usuario = 4,
    Componente_MenuLateral = 5,
    Tela_Estabelecimentos = 6,
}