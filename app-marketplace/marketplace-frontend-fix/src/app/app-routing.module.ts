import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageUsersComponent } from './components/page-users/page-users.component';
import { PageLoginComponent } from './components/page-login/page-login.component';
import { PageProfilesComponent } from './components/page-profiles/page-profiles.component';
import { PagePermissionsComponent } from './components/page-permissions/page-permissions.component';
import { AuthGuard, RoleGuard } from './services/user.service';
import { PermissionEnum } from './models/Entities/Permission';
import { PageEstablishmentsComponent } from './components/page-establishments/page-establishments.component';
import { PageHomeComponent } from './components/page-home/page-home.component';
import { PageDashboardComponent } from './components/page-dashboard/page-dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: PageLoginComponent },
  { path: 'users', component: PageUsersComponent, canActivate: [AuthGuard, RoleGuard], data: { permissions: [PermissionEnum.Tela_Usuarios] } },
  { path: 'profiles', component: PageProfilesComponent, canActivate: [AuthGuard, RoleGuard], data: { permissions: [PermissionEnum.Tela_Perfis] } },
  { path: 'permissions', component: PagePermissionsComponent, canActivate: [AuthGuard, RoleGuard], data: { permissions: [PermissionEnum.Tela_Permissoes] } },
  { path: 'establishments', component: PageEstablishmentsComponent, canActivate: [AuthGuard, RoleGuard], data: { permissions: [PermissionEnum.Tela_Estabelecimentos] } },
  { path: 'dashboard', component: PageDashboardComponent, canActivate: [AuthGuard, RoleGuard], data: { permissions: [PermissionEnum.Tela_Dashboard] } },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
