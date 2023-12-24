import { Component, EventEmitter, Output } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FilterDto, Paging, SearchField } from 'src/app/models/DTO/FilterDto';
import { Batch } from 'src/app/models/Entities/Batch';
import { BatchService } from 'src/app/services/batch.service';
import { ModalBatchEditComponent } from '../../modals/modal-batch-edit/modal-batch-edit.component';
import { Product } from 'src/app/models/Entities/Product';
import { ProductService } from 'src/app/services/product.service';
import { TableActionEvent } from 'src/app/models/Components/TableActionEvent';

@Component({
  selector: 'app-tab-batch-table',
  templateUrl: './tab-batch-table.component.html',
  styleUrls: ['./tab-batch-table.component.scss']
})
export class TabBatchTableComponent {
  @Output()
  OnAction = new EventEmitter<TableActionEvent>();

  searchField_name :SearchField = {property:"Name", value:null, operator:"like"};
  searchField_productId :SearchField = {property:"ProductId", value:null, operator:"=="};

  ddl_product_options :Product[] = [];

  searchFields :SearchField[] = [
    this.searchField_productId
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

  data :Batch[] = [];

  isLoading :boolean = false;

  modalRef?: BsModalRef;

  constructor(
    private serviceBatch :BatchService,
    private serviceModal :BsModalService, 
    private serviceProduct :ProductService
  ) { }

  async ngOnInit(){
    this.isLoading = true;
    await this.LoadTableData();
    await this.DDL_LoadProducts();
    this.isLoading = false;
  }

  async DDL_LoadProducts(){
    this.ddl_product_options = (await this.serviceProduct.AllPaginated({} as FilterDto)).items;
  }

  async LoadTableData() :Promise<void>{
    this.isLoading = true;
    console.log(this.filters);
    var result = await this.serviceBatch.AllPaginated(this.filters);

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
    this.modalRef = this.serviceModal.show(ModalBatchEditComponent,{
      initialState: {
        id : id
      },
      class: "modal-lg modal-dialog-centered"
    });

    this.modalRef.onHidden.subscribe(() => {
      this.LoadTableData();
    });
  }

  SelectAction(actionId:number, batchId :number){
    var event = {actionId:actionId, entityId:batchId} as  TableActionEvent;
    this.OnAction.emit(event);
  }

  ClearSearch(){
    this.searchField_name.value = null;
  }
}
