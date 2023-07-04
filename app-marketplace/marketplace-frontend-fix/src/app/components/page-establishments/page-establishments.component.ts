import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FilterDto, Paging, SearchField } from 'src/app/models/DTO/FilterDto';
import { Establishment } from 'src/app/models/Entities/Establishment';
import { EstablishmentService } from 'src/app/services/establishment.service';
import { ModalEstablishmentRegisterComponent } from './modals/modal-establishment-register/modal-establishment-register.component';

@Component({
  selector: 'app-page-establishments',
  templateUrl: './page-establishments.component.html',
  styleUrls: ['./page-establishments.component.scss']
})
export class PageEstablishmentsComponent {

  searchField_name :SearchField = {property:"CorporateName", value:null, operator:"like"};
  searchField_fantasyName :SearchField = {property:"FantasyName", value:null, operator:"like"};
  searchField_email :SearchField = {property:"Email", value:null, operator:"like"};
  searchField_document :SearchField = {property:"DocumentNumber", value:null, operator:"like"};

  searchFields :SearchField[] = [
    this.searchField_name,
    this.searchField_fantasyName, 
    this.searchField_email, 
    this.searchField_document
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

  establishments :Establishment[] = [];

  isLoading :boolean = false;

  modalRef?: BsModalRef;

  constructor(
    private serviceEstablishment :EstablishmentService,
    private serviceModal :BsModalService, 
  ) { }

  async ngOnInit(){
    this.isLoading = true;
    await this.LoadTableData();
    this.isLoading = false;
  }

  async LoadTableData() :Promise<void>{
    this.isLoading = true;
    var result = await this.serviceEstablishment.AllDetails(this.filters);

    this.establishments = result.items;
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

  Modal_Register() {
    this.modalRef = this.serviceModal.show(ModalEstablishmentRegisterComponent, {
      initialState: {
      },
      class: "modal-lg modal-dialog-centered"
    });

    this.modalRef.onHidden.subscribe(() => {
      this.LoadTableData();
    });
  }

  Modal_Edit(id: number) {
    // this.modalRef = this.serviceModal.show(LivroEditarModalComponent,{
    //   initialState: {
    //     ddl_editora_options : this.ddl_editora_options,
    //     ddl_genero_options : this.ddl_genero_options,
    //     ddl_autores_options : this.ddl_autores_options,
    //     livro:livro
    //   },
    //   class: "modal-lg modal-dialog-centered"
    // });
  }
}
