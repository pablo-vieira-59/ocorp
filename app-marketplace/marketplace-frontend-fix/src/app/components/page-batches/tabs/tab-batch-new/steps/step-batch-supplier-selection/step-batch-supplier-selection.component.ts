import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterDto, Paging } from 'src/app/models/DTO/FilterDto';
import { Product } from 'src/app/models/Entities/Product';
import { Supplier } from 'src/app/models/Entities/Supplier';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-step-batch-supplier-selection',
  templateUrl: './step-batch-supplier-selection.component.html',
  styleUrls: ['./step-batch-supplier-selection.component.scss']
})
export class StepBatchSupplierSelectionComponent {
  totalItems :number = 0;

  isLoading = false;

  @Input()
  selectedItem = 0;

  @Output()
  selectedItemChange = new EventEmitter<any>();

  pagination :Paging = {
    page: 1, 
    itemsPerPage: 5, 
    orderBy: "id", 
    descending: false
  };

  data :Supplier[] = [];

  filters :FilterDto = {
    paging: this.pagination
  } as FilterDto;

  constructor(
    private serviceSupplier:SupplierService
  ){ }

  async ngOnInit(){
    await this.LoadTableData();
  }

  async LoadTableData(){
    this.isLoading = true;
    var result = await this.serviceSupplier.AllPaginated(this.filters);
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

  async SelectItem(idx :number){
    this.selectedItem = idx;
    this.selectedItemChange.emit(this.selectedItem);
  }
}
