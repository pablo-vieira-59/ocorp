import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterDto, Paging } from 'src/app/models/DTO/FilterDto';
import { Address } from 'src/app/models/Entities/Address';
import { Product } from 'src/app/models/Entities/Product';
import { AddressService } from 'src/app/services/address.services';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-step-batch-address-selection',
  templateUrl: './step-batch-address-selection.component.html',
  styleUrls: ['./step-batch-address-selection.component.scss']
})
export class StepBatchAddressSelectionComponent {
  totalItems :number = 0;

  @Input()
  selectedItem = 0;

  @Output()
  selectedItemChange = new EventEmitter<any>();

  isLoading = false;

  pagination :Paging = {
    page: 1, 
    itemsPerPage: 5, 
    orderBy: "id", 
    descending: false
  };

  data :Address[] = [];

  filters :FilterDto = {
    paging: this.pagination
  } as FilterDto;

  constructor(
    private serviceAddress:AddressService
  ){ }

  async ngOnInit(){
    await this.LoadTableData();
  }

  async LoadTableData(){
    this.isLoading = true;
    var result = await this.serviceAddress.AllPaginated(this.filters);
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
