import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-searchfield',
  templateUrl: './searchfield.component.html',
  styleUrls: ['./searchfield.component.scss']
})
export class SearchfieldComponent {
  @Output()
  OnFilter: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  OnClear: EventEmitter<any> = new EventEmitter<any>();

  ddl_settings = {
    idField:'id',
    textField:'nome',
    selectAllText:'Marcar Todos',
    unSelectAllText:'Desmarcar Todos',
    itemsShowLimit: 1,
    allowSearchFilter: true,
    searchPlaceholderText:'Pesquisar ...',
    noDataAvailablePlaceholderText:'Sem dados disponiveis',
    maxHeight:200
  }

  ngOnInit(){

  }

  Filter() {
    this.OnFilter.emit();
  }

  Clear() {
    this.OnClear.emit();
  }
}
