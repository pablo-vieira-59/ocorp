import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FilterDto, Paging, SearchField } from 'src/app/models/DTO/FilterDto';
import { Brand } from 'src/app/models/Entities/Brand';
import { Category } from 'src/app/models/Entities/Category';
import { BrandService } from 'src/app/services/brand.service';
import { CategoryService } from 'src/app/services/category.service';
import { ModalCategoryRegisterComponent } from './modals/modal-category-register/modal-category-register.component';
import { ModalCategoryEditComponent } from './modals/modal-category-edit/modal-category-edit.component';
import { TabItem } from 'src/app/models/Components/TabItem';

@Component({
  selector: 'app-page-categories',
  templateUrl: './page-categories.component.html',
  styleUrls: ['./page-categories.component.scss']
})
export class PageCategoriesComponent {
  tabIndex = 0;

  tabs :TabItem[] = [
    {name:"Consulta", icon:"bi bi-search", isVisible:true, permissions:[]},
    {name:"Adicionar", icon:"bi bi-plus-lg", isVisible:true, permissions:[]},
    {name:"Editar", icon:"bi bi-pencil", isVisible:false, permissions:[]},
  ];
}
