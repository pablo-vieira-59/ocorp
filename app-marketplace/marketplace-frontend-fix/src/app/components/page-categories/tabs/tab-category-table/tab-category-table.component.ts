import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FilterDto, Paging, SearchField } from 'src/app/models/DTO/FilterDto';
import { Category } from 'src/app/models/Entities/Category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-tab-category-table',
  templateUrl: './tab-category-table.component.html',
  styleUrls: ['./tab-category-table.component.scss']
})
export class TabCategoryTableComponent {
  searchField_name :SearchField = {property:"Name", value:null, operator:"like"};

  searchFields :SearchField[] = [
    this.searchField_name,
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

  data :Category[] = [];

  isLoading :boolean = false;

  modalRef?: BsModalRef;

  constructor(
    private serviceCategory :CategoryService,
    private serviceModal :BsModalService, 
  ) { }

  async ngOnInit(){
    this.isLoading = true;
    await this.LoadTableData();
    this.isLoading = false;
  }

  async LoadTableData() :Promise<void>{
    this.isLoading = true;
    var result = await this.serviceCategory.AllPaginated(this.filters);

    this.data = result.items;
    this.totalItems = result.totalCount;
    this.isLoading = false;
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
    // this.modalRef = this.serviceModal.show(ModalCategoryRegisterComponent, {
    //   initialState: {
    //   },
    //   class: "modal-lg modal-dialog-centered"
    // });

    // this.modalRef.onHidden.subscribe(() => {
    //   this.LoadTableData();
    // });
  }

  Modal_Edit(id: number) {
    // this.modalRef = this.serviceModal.show(ModalCategoryEditComponent,{
    //   initialState: {
    //     id : id
    //   },
    //   class: "modal-lg modal-dialog-centered"
    // });

    // this.modalRef.onHidden.subscribe(() => {
    //   this.LoadTableData();
    // });
  }

  ClearSearch(){
    this.searchField_name.value = null;
  }
}
