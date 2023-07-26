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
    Tela_Dashboard = 6,
    Cadastro_Admin = 7,
    Cadastro_Diretor = 8,
    Cadastro_Gerente = 9,
    Cadastro_Funcionario = 10,
}