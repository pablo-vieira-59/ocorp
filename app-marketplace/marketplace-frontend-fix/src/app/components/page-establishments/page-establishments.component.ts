import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FilterDto, Paging, SearchField } from 'src/app/models/DTO/FilterDto';
import { Establishment } from 'src/app/models/Entities/Establishment';
import { EstablishmentService } from 'src/app/services/establishment.service';
import { ModalEstablishmentRegisterComponent } from './modals/modal-establishment-register/modal-establishment-register.component';
import { TabItem } from 'src/app/models/Components/TabItem';

@Component({
  selector: 'app-page-establishments',
  templateUrl: './page-establishments.component.html',
  styleUrls: ['./page-establishments.component.scss']
})
export class PageEstablishmentsComponent {

  tabIndex = 0;

  tabs :TabItem[] = [
    {name:"Consulta", icon:"bi bi-search", isVisible:true, permissions:[]},
    {name:"Adicionar", icon:"bi bi-plus-lg", isVisible:true, permissions:[]},
    {name:"Editar", icon:"bi bi-pencil", isVisible:false, permissions:[]},
  ];
}
