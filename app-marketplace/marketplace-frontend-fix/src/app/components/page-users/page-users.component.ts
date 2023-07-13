import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/Entities/User';
import { FilterDto, SearchField, Paging } from 'src/app/models/DTO/FilterDto';
import { ProfileService } from 'src/app/services/profile.service';
import { ModalUserRegisterInternalComponent } from './modals/modal-user-register/modal-user-register-internal.component';

@Component({
  selector: 'app-page-users',
  templateUrl: './page-users.component.html',
  styleUrls: ['./page-users.component.scss']
})
export class PageUsersComponent {
  users: User[] = [];

  ddl_profile_options = [{id:1, value:"Teste"},{id:2, value:"Teste 2"}]

  searchField_name :SearchField = {property:"Name", value:null, operator:"like"};
  searchField_email :SearchField = {property:"Email", value:null, operator:"like"};
  searchField_document :SearchField = {property:"DocumentNumber", value:null, operator:"like"};
  searchField_profile_id :SearchField = {property:"ProfileId", value:null, operator:"=="};
  searchField_phoneNumber :SearchField = {property:"PhoneNumber", value:null, operator:"like"};

  searchFields :SearchField[] = [
    this.searchField_name, 
    this.searchField_email, 
    this.searchField_document, 
    this.searchField_profile_id,
    this.searchField_phoneNumber
  ];

  totalItems :number = 0;

  pagination :Paging = {
    page: 1, 
    itemsPerPage: 10, 
    orderBy: "id", 
    descending: false
  };

  filters :FilterDto = {
    searchFields: this.searchFields, 
    paging: this.pagination
  };

  isLoading :boolean = false;

  modalRef?: BsModalRef;

  constructor(
    private serviceUser :UserService,
    private serviceNotification :ToastrService,
    private serviceModal: BsModalService,
    private serviceProfile :ProfileService)
  { }

  async ngOnInit(){
    this.isLoading = true;

    await this.LoadTableData();
    await this.LoadProfileOptions();
  
    this.isLoading = false;
  }

  async LoadProfileOptions(){
    var profiles = await this.serviceProfile.GetAll();

    this.ddl_profile_options = profiles.map((x) => ({ id : x.id, value: x.name }));
  }

  async LoadTableData() :Promise<void>{
    var result = await this.serviceUser.AllDetails(this.filters);

    this.users = result.items;
    this.totalItems = result.totalCount;
  } 

  async ChangePage(page :number){
    this.filters.paging.page = page;
    await this.LoadTableData();
  }

  async ChangePageSize(itemsPerPage :number){
    this.filters.paging.page = 1;
    this.filters.paging.itemsPerPage = itemsPerPage;
    await this.LoadTableData();
  }
  
  Modal_Register() {
    this.modalRef = this.serviceModal.show(ModalUserRegisterInternalComponent, {
      initialState: {
      },
      class: "modal-lg modal-dialog-centered"
    });

    this.modalRef.onHidden.subscribe(() => {
      this.LoadTableData();
    });
  }

  Modal_Edit(id: number) {
    // this.modalRef = this.serviceModal.show(LivroEditarModalComponent,{
    //   initialState: {
    //     ddl_editora_options : this.ddl_editora_options,
    //     ddl_genero_options : this.ddl_genero_options,
    //     ddl_autores_options : this.ddl_autores_options,
    //     livro:livro
    //   },
    //   class: "modal-lg modal-dialog-centered"
    // });
  }
}
