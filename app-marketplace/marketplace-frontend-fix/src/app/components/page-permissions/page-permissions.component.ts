import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FilterDto, Paging } from 'src/app/models/DTO/FilterDto';
import { Permission } from 'src/app/models/Entities/Permission';
import { Profile } from 'src/app/models/Entities/Profile';
import { PermissionService } from 'src/app/services/permisson.service';

@Component({
  selector: 'app-page-permissions',
  templateUrl: './page-permissions.component.html',
  styleUrls: ['./page-permissions.component.scss']
})
export class PagePermissionsComponent {
  isLoading = false;
  data :Permission[] = [];
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
    private servicePermission :PermissionService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.isLoading = true;
    await this.LoadTableData();
    await this.LoadTableDataCount();
    this.isLoading = false;
  }

  async LoadTableData(){
    this.data = await this.servicePermission.AllDetails(this.filters);
  }

  async LoadTableDataCount(){
    this.totalItems = await this.servicePermission.AllDetailsCount(this.filters);
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
