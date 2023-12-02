import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FilterDto, Paging, SearchField } from 'src/app/models/DTO/FilterDto';
import { Batch } from 'src/app/models/Entities/Batch';
import { Category } from 'src/app/models/Entities/Category';
import { BatchService } from 'src/app/services/batch.service';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TabItem } from 'src/app/models/Components/TabItem';

@Component({
  selector: 'app-page-batches',
  templateUrl: './page-batches.component.html',
  styleUrls: ['./page-batches.component.scss']
})
export class PageBatchesComponent {
  tabIndex = 0;

  tabs :TabItem[] = [
    {name:"Consulta", icon:"bi bi-search", isVisible:true, permissions:[]},
    {name:"Adicionar", icon:"bi bi-plus-lg", isVisible:true, permissions:[]},
    {name:"Edtar", icon:"bi bi-pencil", isVisible:false, permissions:[]},
  ];
}
