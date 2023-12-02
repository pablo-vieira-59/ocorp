import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { FilterDto, Paging, SearchField } from 'src/app/models/DTO/FilterDto';
import { User } from 'src/app/models/Entities/User';
import { ProfileService } from 'src/app/services/profile.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tab-user-table',
  templateUrl: './tab-user-table.component.html',
  styleUrls: ['./tab-user-table.component.scss']
})
export class TabUserTableComponent {
  users: User[] = [];

  ddl_profile_options = [{id:1, name:"Teste"},{id:2, name:"Teste 2"}]

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

    this.ddl_profile_options = profiles.map((x) => ({ id : x.id, name: x.name }));
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
  
  GetSpanClass(profileId :number){

    if(profileId == 1){
      return 'bg-danger'
    }
    if(profileId == 2){
      return 'bg-warning'
    }
    if(profileId == 3){
      return 'bg-secondary'
    }
    if(profileId == 4){
      return 'bg-success'
    }
    if(profileId == 5){
      return 'bg-dark'
    }

    return 'bg-white-ddd'
  }

  ClearSearch(){
    this.filters.searchFields.forEach(element => {
      element.value = null;
    });
  }

  // Modal_Register() {
  //   this.modalRef = this.serviceModal.show(ModalUserRegisterInternalComponent, {
  //     initialState: {
  //     },
  //     class: "modal-lg modal-dialog-centered"
  //   });

  //   this.modalRef.onHidden.subscribe(() => {
  //     this.LoadTableData();
  //   });
  // }

  // Modal_Edit(id: number) {
  //   this.modalRef = this.serviceModal.show(ModalUserEditComponent,{
  //     initialState: {
  //       user_id : id
  //     },
  //     class: "modal-lg modal-dialog-centered"
  //   });

  //   this.modalRef.onHidden.subscribe(() => {
  //     this.LoadTableData();
  //   });
  // }
}
