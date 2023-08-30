import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterDto, Paging } from 'src/app/models/DTO/FilterDto';
import { Product } from 'src/app/models/Entities/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-step-batch-product-selection',
  templateUrl: './step-batch-product-selection.component.html',
  styleUrls: ['./step-batch-product-selection.component.scss']
})
export class StepBatchProductSelectionComponent {
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

  data :Product[] = [];

  filters :FilterDto = {
    paging: this.pagination
  } as FilterDto;

  constructor(
    private serviceProduct:ProductService
  ){ }

  async ngOnInit(){
    await this.LoadTableData();
  }

  async LoadTableData(){
    this.isLoading = true;
    var result = await this.serviceProduct.AllPaginated(this.filters);
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
