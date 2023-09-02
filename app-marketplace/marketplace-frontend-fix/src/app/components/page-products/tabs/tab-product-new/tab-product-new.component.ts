import { Component, EventEmitter, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ValidatorField } from 'src/app/helpers/formValidations';
import { FilterDto } from 'src/app/models/DTO/FilterDto';
import { ProductCreateDTO } from 'src/app/models/DTO/ProductCreateDTO';
import { Brand } from 'src/app/models/Entities/Brand';
import { Category } from 'src/app/models/Entities/Category';
import { Subcategory } from 'src/app/models/Entities/Subcategory';
import { BrandService } from 'src/app/services/brand.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-tab-product-new',
  templateUrl: './tab-product-new.component.html',
  styleUrls: ['./tab-product-new.component.scss']
})
export class TabProductNewComponent {
  @Output()
  OnSuccess = new EventEmitter<any>();

  isLoading = false;

  selectedBrands :number[] = [];

  model = {
    name: '',
    price: '0.0',
    subcategoryId: '',
    brandIds: this.selectedBrands
  } as ProductCreateDTO;

  errors :string[] = [];

  productImageUrl: string = '';
  selectedCategoryId: string = '';

  ddlBrandsOptions: Brand[] = [];
  ddlCategoriesOptions: Category[] = [];
  ddlSubCategoriesOptions: Subcategory[] = [];

  validFields: string[] = [];
  valRequired: string[] = ["subcategoryId", "name", "price", "imageGuid"];

  constructor(
    private serviceProduct: ProductService,
    private categoryService: CategoryService,
    private brandService: BrandService,
    private serviceNotificiation :ToastrService
  ) { }

  async ngOnInit() {
    this.isLoading = true;
    this.ddlCategoriesOptions = (await this.categoryService.AllPaginated({} as FilterDto)).items;
    this.ddlBrandsOptions = (await this.brandService.AllPaginated({} as FilterDto)).items;
    this.isLoading = false;
  }

  UpdateSubcategories(){
    var category = this.ddlCategoriesOptions.find(x => x.id == Number(this.selectedCategoryId));
    if(category != null){
      this.ddlSubCategoriesOptions = category!.subCategories;
    }
    else{
      this.model.subcategoryId = '';
      this.ddlSubCategoriesOptions = [];
    }
  }

  async Submit() {
    this.isLoading = true;

    if(this.model.brandIds.length == 0){
      this.errors = ["É necessário selecionar pelo menos uma marca."];
      this.isLoading = false;
      return;
    }
    else{
      this.errors = [];
    }

    var result = await this.serviceProduct.Create(this.model);
    if (result) {
      this.serviceNotificiation.success("Produto Adicionado com sucesso !");
      this.OnSuccess.emit();
    }

    this.isLoading = false;
  }

  IsFormValid() {
    return this.valRequired.every(x => this.validFields.includes(x));
  }

  ValidateField(inputId: string) {
    this.validFields = ValidatorField.ValidateInputField(this.validFields, inputId, this.valRequired, undefined, undefined, undefined, undefined, undefined);
  }
}
