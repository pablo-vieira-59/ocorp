import { Component } from '@angular/core';
import { TabItem } from 'src/app/models/Components/TabItem';

@Component({
  selector: 'app-page-suppliers',
  templateUrl: './page-suppliers.component.html',
  styleUrls: ['./page-suppliers.component.scss']
})
export class PageSuppliersComponent {
  tabIndex = 0;

  tabs :TabItem[] = [
    {name:"Consulta", icon:"bi bi-search", isVisible:true, permissions:[]},
    {name:"Adicionar", icon:"bi bi-plus-lg", isVisible:true, permissions:[]},
    {name:"Editar", icon:"bi bi-pencil", isVisible:false, permissions:[]},
  ];
}
