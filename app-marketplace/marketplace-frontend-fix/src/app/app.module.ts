import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageUsersComponent } from './components/page-users/page-users.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { ModalUserEditComponent } from './components/page-users/modals/modal-user-edit/modal-user-edit.component';
import { PageProductsComponent } from './components/page-products/page-products.component';
import { ProductCardComponent } from './components/common/product-card/product-card.component';
import { LOCALE_ID } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { PageBrandsComponent } from './components/page-brands/page-brands.component';
import { ModalBrandRegisterComponent } from './components/page-brands/modal-brand-register/modal-brand-register.component';
import { ModalBrandEditComponent } from './components/page-brands/modal-brand-edit/modal-brand-edit.component';
import { PageSuppliersComponent } from './components/page-suppliers/page-suppliers.component';
import { ModalSupplierEditComponent } from './components/page-suppliers/modal-supplier-edit/modal-supplier-edit.component';
import { ModalSupplierRegisterComponent } from './components/page-suppliers/modal-supplier-register/modal-supplier-register.component';
import { PageCategoriesComponent } from './components/page-categories/page-categories.component';
import { ModalCategoryRegisterComponent } from './components/page-categories/modals/modal-category-register/modal-category-register.component';
import { ModalCategoryEditComponent } from './components/page-categories/modals/modal-category-edit/modal-category-edit.component';
import { ModalBatchEditComponent } from './components/page-batches/modals/modal-batch-edit/modal-batch-edit.component';
import { ModalBatchRegisterComponent } from './components/page-batches/modals/modal-batch-register/modal-batch-register.component';
import { PageBatchesComponent } from './components/page-batches/page-batches.component';
import { DashCardComponent } from './components/common/dash-card/dash-card.component';
import { CardComponent } from './components/common/card/card.component';
import { WindowTransparentComponent } from './components/common/window-transparent/window-transparent.component';
import { PageUserEditComponent } from './components/page-users/pages/page-user-edit/page-user-edit.component';
import { TabComponent } from './components/common/tab/tab.component';
import { TabBatchTableComponent } from './components/page-batches/tabs/tab-batch-table/tab-batch-table.component';
import { TabBatchNewComponent } from './components/page-batches/tabs/tab-batch-new/tab-batch-new.component';
import { InputImageComponent } from './components/common/forms/input-image/input-image.component';
import { StepBatchProductSelectionComponent } from './components/page-batches/tabs/tab-batch-new/steps/step-batch-product-selection/step-batch-product-selection.component';
import { StepBatchAddressSelectionComponent } from './components/page-batches/tabs/tab-batch-new/steps/step-batch-address-selection/step-batch-address-selection.component';
import { StepBatchSupplierSelectionComponent } from './components/page-batches/tabs/tab-batch-new/steps/step-batch-supplier-selection/step-batch-supplier-selection.component';
import { TabProductTableComponent } from './components/page-products/tabs/tab-product-table/tab-product-table.component';
import { TabProductNewComponent } from './components/page-products/tabs/tab-product-new/tab-product-new.component';
import { AlertDangerComponent } from './components/common/alerts/alert-danger/alert-danger.component';
import { FormBodyComponent } from './components/common/forms/form-body/form-body.component';
import { FormBottomComponent } from './components/common/forms/form-bottom/form-bottom.component';
import { TabUserTableComponent } from './components/page-users/tabs/tab-user-table/tab-user-table.component';
import { TabUserNewComponent } from './components/page-users/tabs/tab-user-new/tab-user-new.component';
import { TabEstablishmentTableComponent } from './components/page-establishments/tabs/tab-establishment-table/tab-establishment-table.component';
import { TabEstablishmentNewComponent } from './components/page-establishments/tabs/tab-establishment-new/tab-establishment-new.component';
import { TabBrandNewComponent } from './components/page-brands/tabs/tab-brand-new/tab-brand-new.component';
import { TabBrandTableComponent } from './components/page-brands/tabs/tab-brand-table/tab-brand-table.component';
import { TabSupplierNewComponent } from './components/page-suppliers/tabs/tab-supplier-new/tab-supplier-new.component';
import { TabSupplierTableComponent } from './components/page-suppliers/tabs/tab-supplier-table/tab-supplier-table.component';
import { TabCategoryTableComponent } from './components/page-categories/tabs/tab-category-table/tab-category-table.component';
import { TabCategoryNewComponent } from './components/page-categories/tabs/tab-category-new/tab-category-new.component';

export const options: Partial<null | IConfig> | (() => Partial<IConfig>) = null;

registerLocaleData(localePt, 'pt');

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
    ModalUserEditComponent,
    PageProductsComponent,
    ProductCardComponent,
    PageBrandsComponent,
    ModalBrandRegisterComponent,
    ModalBrandEditComponent,
    PageSuppliersComponent,
    ModalSupplierEditComponent,
    ModalSupplierRegisterComponent,
    PageCategoriesComponent,
    ModalCategoryRegisterComponent,
    ModalCategoryEditComponent,
    ModalBatchEditComponent,
    ModalBatchRegisterComponent,
    PageBatchesComponent,
    DashCardComponent,
    CardComponent,
    WindowTransparentComponent,
    PageUserEditComponent,
    TabComponent,
    TabBatchTableComponent,
    TabBatchNewComponent,
    InputImageComponent,
    StepBatchProductSelectionComponent,
    StepBatchAddressSelectionComponent,
    StepBatchSupplierSelectionComponent,
    TabProductTableComponent,
    TabProductNewComponent,
    AlertDangerComponent,
    FormBodyComponent,
    FormBottomComponent,
    TabUserTableComponent,
    TabUserNewComponent,
    TabEstablishmentTableComponent,
    TabEstablishmentNewComponent,
    TabBrandNewComponent,
    TabBrandTableComponent,
    TabSupplierNewComponent,
    TabSupplierTableComponent,
    TabCategoryTableComponent,
    TabCategoryNewComponent,
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
    ToastrModule.forRoot({ timeOut: 5000, preventDuplicates: false, autoDismiss: true, progressBar: true, maxOpened: 5 }),
    NgChartsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MiddlewareService,
      multi: true
    },
    {
      provide: LOCALE_ID,
      useValue: 'pt'
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
