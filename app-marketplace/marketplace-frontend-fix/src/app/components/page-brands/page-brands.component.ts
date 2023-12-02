import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FilterDto, Paging, SearchField } from 'src/app/models/DTO/FilterDto';
import { Brand } from 'src/app/models/Entities/Brand';
import { Establishment } from 'src/app/models/Entities/Establishment';
import { BrandService } from 'src/app/services/brand.service';
import { ModalBrandRegisterComponent } from './modal-brand-register/modal-brand-register.component';
import { ModalBrandEditComponent } from './modal-brand-edit/modal-brand-edit.component';
import { TabItem } from 'src/app/models/Components/TabItem';

@Component({
  selector: 'app-page-brands',
  templateUrl: './page-brands.component.html',
  styleUrls: ['./page-brands.component.scss']
})
export class PageBrandsComponent {
  tabIndex = 0;

  tabs :TabItem[] = [
    {name:"Consulta", icon:"bi bi-search", isVisible:true, permissions:[]},
    {name:"Adicionar", icon:"bi bi-plus-lg", isVisible:true, permissions:[]},
    {name:"Editar", icon:"bi bi-pencil", isVisible:false, permissions:[]},
  ];
}
