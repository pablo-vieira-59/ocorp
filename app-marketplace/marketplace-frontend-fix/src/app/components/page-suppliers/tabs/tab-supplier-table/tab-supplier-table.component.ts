import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FilterDto, Paging, SearchField } from 'src/app/models/DTO/FilterDto';
import { Supplier } from 'src/app/models/Entities/Supplier';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-tab-supplier-table',
  templateUrl: './tab-supplier-table.component.html',
  styleUrls: ['./tab-supplier-table.component.scss']
})
export class TabSupplierTableComponent {
  searchField_name :SearchField = {property:"FantasyName", value:null, operator:"like"};
  searchField_email :SearchField = {property:"Email", value:null, operator:"like"};
  searchField_document :SearchField = {property:"DocumentNumber", value:null, operator:"like"};

  searchFields :SearchField[] = [
    this.searchField_name,
    this.searchField_email, 
    this.searchField_document
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

  data :Supplier[] = [];

  isLoading :boolean = false;

  modalRef?: BsModalRef;

  constructor(
    private serviceSupplier :SupplierService,
    private serviceModal :BsModalService, 
  ) { }

  async ngOnInit(){
    this.isLoading = true;
    await this.LoadTableData();
    this.isLoading = false;
  }

  async LoadTableData() :Promise<void>{
    var result = await this.serviceSupplier.AllPaginated(this.filters);

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
    // this.modalRef = this.serviceModal.show(ModalSupplierRegisterComponent, {
    //   initialState: {
    //   },
    //   class: "modal-lg modal-dialog-centered"
    // });

    // this.modalRef.onHidden.subscribe(() => {
    //   this.LoadTableData();
    // });
  }

  Modal_Edit(id: number) {
    // this.modalRef = this.serviceModal.show(ModalSupplierEditComponent,{
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
    this.searchField_document.value = null,
    this.searchField_email.value = null
    this.searchField_name.value = null;
  }
}
