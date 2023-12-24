import { Component } from '@angular/core';
import { TabItem } from 'src/app/models/Components/TabItem';
import { TableActionEvent } from 'src/app/models/Components/TableActionEvent';

@Component({
  selector: 'app-page-batches',
  templateUrl: './page-batches.component.html',
  styleUrls: ['./page-batches.component.scss']
})
export class PageBatchesComponent {
  tabIndex = 0;
  selectedId = 0;

  tabs :TabItem[] = [
    {name:"Consulta", icon:"bi bi-search", isVisible:true, permissions:[]},
    {name:"Adicionar", icon:"bi bi-plus-lg", isVisible:true, permissions:[]},
    {name:"Editar", icon:"bi bi-pencil", isVisible:false, permissions:[]},
    {name:"Histórico", icon:"bi bi-clock-history", isVisible:false, permissions:[]}
  ];

  LoadAction(event :TableActionEvent){
    this.tabs[event.actionId].isVisible = true;
    
    this.selectedId = event.entityId;
    this.tabIndex = event.actionId;
  }
}
