import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageUsersComponent } from './components/page-users/page-users.component';
import { PageLoginComponent } from './components/page-login/page-login.component';
import { PageProfilesComponent } from './components/page-profiles/page-profiles.component';
import { AuthGuard, RoleGuard } from './services/user.service';
import { PermissionEnum } from './models/Entities/Permission';
import { PageEstablishmentsComponent } from './components/page-establishments/page-establishments.component';
import { PageHomeComponent } from './components/page-home/page-home.component';
import { PageDashboardComponent } from './components/page-dashboard/page-dashboard.component';
import { PageProductsComponent } from './components/page-products/page-products.component';
import { PageBrandsComponent } from './components/page-brands/page-brands.component';
import { PageSuppliersComponent } from './components/page-suppliers/page-suppliers.component';
import { PageCategoriesComponent } from './components/page-categories/page-categories.component';
import { PageBatchesComponent } from './components/page-batches/page-batches.component';
import { PageUserEditComponent } from './components/page-users/pages/page-user-edit/page-user-edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: PageLoginComponent },
  { path: 'users', component: PageUsersComponent, canActivate: [AuthGuard, RoleGuard], data: { permissions: [PermissionEnum.Tela_Usuarios] } },
  { path: 'users/:guid/edit', component: PageUserEditComponent, canActivate: [AuthGuard, RoleGuard], data: { permissions: [PermissionEnum.Tela_Usuarios] } },
  { path: 'profiles', component: PageProfilesComponent, canActivate: [AuthGuard, RoleGuard], data: { permissions: [PermissionEnum.Tela_Perfis] } },
  { path: 'establishments', component: PageEstablishmentsComponent, canActivate: [AuthGuard, RoleGuard], data: { permissions: [PermissionEnum.Tela_Estabelecimentos] } },
  { path: 'dashboard', component: PageDashboardComponent, canActivate: [AuthGuard, RoleGuard], data: { permissions: [PermissionEnum.Tela_Dashboard] } },
  { path: 'products', component: PageProductsComponent, canActivate: [AuthGuard, RoleGuard], data: { permissions: [] } },
  { path: 'brands', component: PageBrandsComponent, canActivate: [AuthGuard, RoleGuard], data: { permissions: [] } },
  { path: 'suppliers', component: PageSuppliersComponent, canActivate: [AuthGuard, RoleGuard], data: { permissions: [] } },
  { path: 'categories', component: PageCategoriesComponent, canActivate: [AuthGuard, RoleGuard], data: { permissions: [] } },
  { path: 'batches', component: PageBatchesComponent, canActivate: [AuthGuard, RoleGuard], data: { permissions: [] } },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
