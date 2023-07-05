export interface Permission{
    id :number;
    name :string;
}

export enum PermissionEnum{
    Tela_Usuarios = 1,
    Tela_Permissoes = 2,
    Tela_Perfis = 3,
    Componente_MenuLateral = 4,
    Tela_Estabelecimentos = 5,
    Tela_Dashboard = 6
}