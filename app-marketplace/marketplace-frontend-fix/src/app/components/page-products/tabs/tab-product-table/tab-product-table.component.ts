import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FilterDto, Paging, SearchField } from 'src/app/models/DTO/FilterDto';
import { Category } from 'src/app/models/Entities/Category';
import { Product } from 'src/app/models/Entities/Product';
import { Subcategory } from 'src/app/models/Entities/Subcategory';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-tab-product-table',
  templateUrl: './tab-product-table.component.html',
  styleUrls: ['./tab-product-table.component.scss']
})
export class TabProductTableComponent {
  searchField_name :SearchField = {property:"Name", value:null, operator:"like"};
  categoryId :number | null = null;
  searchField_subCategoryId :SearchField = {property:"SubCategoryId", value:null, operator:"=="};

  ddl_categories_options :Category[] = [];
  ddl_subcategories_options :Subcategory[] = [];

  searchFields :SearchField[] = [
    this.searchField_name,
    this.searchField_subCategoryId
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

  products :Product[] = [];

  isLoading :boolean = false;

  modalRef?: BsModalRef;

  constructor(
    private serviceModal :BsModalService, 
    private serviceProduct :ProductService,
    private serviceCategory :CategoryService
  ) { }

  async ngOnInit(){
    this.isLoading = true;
    await this.LoadTableData();
    this.ddl_categories_options = (await this.serviceCategory.AllPaginated({} as  FilterDto)).items;
    console.log(this.ddl_categories_options);
    this.isLoading = false;
  }

  async LoadTableData() :Promise<void>{
    this.isLoading = true;
    var result = await this.serviceProduct.AllPaginated(this.filters);
    this.products = result.items;
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

  LoadSubCategories(){
    if(this.categoryId == null){
      return;
    }

    var category = this.ddl_categories_options.find(x => x.id == this.categoryId);

    if(category != null){
      this.ddl_subcategories_options = category.subCategories;
    }
    else{
      this.ddl_subcategories_options = [];
    }
  }

  Modal_Register() {
    // this.modalRef = this.serviceModal.show(ModalEstablishmentRegisterComponent, {
    //   initialState: {
    //   },
    //   class: "modal-lg modal-dialog-centered"
    // });

    // this.modalRef.onHidden.subscribe(() => {
    //   this.LoadTableData();
    // });
  }

  Modal_Edit(id: number) {
    
  }

  ClearSearch(){
    this.filters.searchFields.forEach(element => {
      element.value = null;
    });

    this.categoryId = null;
  }
}
