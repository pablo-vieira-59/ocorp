import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FilterDto, Paging, SearchField } from 'src/app/models/DTO/FilterDto';
import { Brand } from 'src/app/models/Entities/Brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-tab-brand-table',
  templateUrl: './tab-brand-table.component.html',
  styleUrls: ['./tab-brand-table.component.scss']
})
export class TabBrandTableComponent {
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

  data :Brand[] = [];

  isLoading :boolean = false;

  modalRef?: BsModalRef;

  constructor(
    private serviceBrand :BrandService,
    private serviceModal :BsModalService, 
  ) { }

  async ngOnInit(){
    this.isLoading = true;
    await this.LoadTableData();
    this.isLoading = false;
  }

  async LoadTableData() :Promise<void>{
    var result = await this.serviceBrand.AllPaginated(this.filters);

    this.data = result.items;
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
    // this.modalRef = this.serviceModal.show(ModalBrandRegisterComponent, {
    //   initialState: {
    //   },
    //   class: "modal-lg modal-dialog-centered"
    // });

    // this.modalRef.onHidden.subscribe(() => {
    //   this.LoadTableData();
    // });
  }

  Modal_Edit(id: number) {
    // this.modalRef = this.serviceModal.show(ModalBrandEditComponent,{
    //   initialState: {
    //     brandId : id
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
