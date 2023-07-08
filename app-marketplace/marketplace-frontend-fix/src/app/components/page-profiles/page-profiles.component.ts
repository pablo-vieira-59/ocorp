import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import { FilterDto, Paging } from 'src/app/models/DTO/FilterDto';
import { Profile } from 'src/app/models/Entities/Profile';
import { ProfileService } from 'src/app/services/profile.service';
import { ProfileEditModalComponent } from './modals/profile-edit-modal/profile-edit-modal.component';

@Component({
  selector: 'app-page-profiles',
  templateUrl: './page-profiles.component.html',
  styleUrls: ['./page-profiles.component.scss']
})
export class PageProfilesComponent {
  isLoading = false;
  data :Profile[] = [];
  totalItems = 0;

  modalRef?: BsModalRef;
  
  pagination :Paging = {
    page: 1, 
    itemsPerPage: 10, 
    orderBy: "id", 
    descending: false
  };

  filters :FilterDto = {
    searchFields: [], 
    paging: this.pagination
  };

  constructor(
    private serviceNotification :ToastrService,
    private serviceProfile :ProfileService,
    private serviceModal :BsModalService
  ) { }

  async ngOnInit(): Promise<void> {
    this.isLoading = true;

    await this.LoadTableData();

    this.isLoading = false;
  }

  async LoadTableData(){
    var result = await this.serviceProfile.AllDetails(this.filters);
    this.data = result.items;
    this.totalItems = result.totalCount;
  }
  
  Modal_Register(){
    console.log("Modal_Register");
  }

  Modal_Edit(id: number){
    this.modalRef = this.serviceModal.show(ProfileEditModalComponent,{
      initialState: {
        profileId : id
      },
      class: "modal-lg modal-dialog-centered"
    });
  }

  async ChangePage(page: number){
    this.filters.paging.page = page;
    await this.LoadTableData();
  }

  async ChangePageSize(itemsPerPage: number){
    this.filters.paging.itemsPerPage = itemsPerPage;
    await this.LoadTableData();
  }
}
