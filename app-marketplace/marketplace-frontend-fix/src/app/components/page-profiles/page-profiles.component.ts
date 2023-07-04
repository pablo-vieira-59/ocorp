import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import { FilterDto, Paging } from 'src/app/models/DTO/FilterDto';
import { Profile } from 'src/app/models/Entities/Profile';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-page-profiles',
  templateUrl: './page-profiles.component.html',
  styleUrls: ['./page-profiles.component.scss']
})
export class PageProfilesComponent {
  isLoading = false;
  data :Profile[] = [];
  totalItems = 0;
  
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
  ) { }

  async ngOnInit(): Promise<void> {
    this.isLoading = true;

    await this.LoadTableData();
    await this.LoadTableDataCount();

    this.isLoading = false;
  }

  async LoadTableData(){
    this.data = await this.serviceProfile.AllDetails(this.filters);
  }

  async LoadTableDataCount(){
    this.totalItems = await this.serviceProfile.AllDetailsCount(this.filters);
  }
  
  Modal_Register(){
    console.log("Modal_Register");
  }

  Modal_Edit(id: number){
    console.log("Modal_Edit");
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
