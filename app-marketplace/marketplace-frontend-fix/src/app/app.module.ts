import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageUsersComponent } from './components/page-users/page-users.component';
import { HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { WindowComponent } from './components/common/window/window.component';
import { CommonModule } from '@angular/common';
import { LivroDetalheModalComponent } from './components/modals/livro-detalhe-modal/livro-detalhe-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { LivroCadastrarModalComponent } from './components/modals/livro-cadastrar-modal/livro-cadastrar-modal.component';
import { SpinnerBlackComponent } from './components/common/spinner-black/spinner-black.component';
import { LivroEditarModalComponent } from './components/modals/livro-editar-modal/livro-editar-modal.component';
import { LivroDeletarModalComponent } from './components/modals/livro-deletar-modal/livro-deletar-modal.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { PageLoginComponent } from './components/page-login/page-login.component';
import { SpinnerWhiteComponent } from './components/common/spinner-white/spinner-white.component';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { SearchfieldComponent } from './components/common/searchfield/searchfield.component';
import { PaginationComponent } from './components/common/pagination/pagination.component';
import { BasefieldComponent } from './components/common/searchfield/fields/basefield/basefield.component';
import { PageProfilesComponent } from './components/page-profiles/page-profiles.component';
import { ModalUserRegisterComponent } from './components/page-login/modals/modal-user-register/modal-user-register.component';
import { ProgressBarComponent } from './components/common/progress-bar/progress-bar.component';
import { MiddlewareService } from './services/middleware.service';
import { AuthGuard } from './services/user.service';
import { PageEstablishmentsComponent } from './components/page-establishments/page-establishments.component';
import { PageHomeComponent } from './components/page-home/page-home.component';
import { SlideButtonComponent } from './components/common/slide-button/slide-button.component';
import { ModalEstablishmentRegisterComponent } from './components/page-establishments/modals/modal-establishment-register/modal-establishment-register.component';
import { ModalUserRegisterInternalComponent } from './components/page-users/modals/modal-user-register/modal-user-register-internal.component';
import { PageDashboardComponent } from './components/page-dashboard/page-dashboard.component';
import { NgChartsModule } from 'ng2-charts';
import { BaseChartComponent } from './components/common/charts/base-chart/base-chart.component';
import { ProfileEditModalComponent } from './components/page-profiles/modals/profile-edit-modal/profile-edit-modal.component';
import { AddressFormComponent } from './components/common/forms/address-form/address-form.component';

export const options: Partial<null|IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AppComponent,
    PageUsersComponent,
    WindowComponent,
    LivroDetalheModalComponent,
    LivroCadastrarModalComponent,
    SpinnerBlackComponent,
    LivroEditarModalComponent,
    LivroDeletarModalComponent,
    PageLoginComponent,
    SpinnerWhiteComponent,
    NavbarComponent,
    SearchfieldComponent,
    PaginationComponent,
    BasefieldComponent,
    PageProfilesComponent,
    ModalUserRegisterComponent,
    ProgressBarComponent,
    PageEstablishmentsComponent,
    PageHomeComponent,
    SlideButtonComponent,
    ModalEstablishmentRegisterComponent,
    ModalUserRegisterInternalComponent,
    PageDashboardComponent,
    BaseChartComponent,
    ProfileEditModalComponent,
    AddressFormComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    NgSelectModule,
    NgxSpinnerModule,
    NgxMaskModule.forRoot(),
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    NgMultiSelectDropDownModule.forRoot(),
    ToastrModule.forRoot({timeOut:5000, preventDuplicates:false, autoDismiss:true, progressBar:true, maxOpened:5}),
    NgChartsModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [AuthGuard,{ provide: HTTP_INTERCEPTORS, useClass: MiddlewareService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
