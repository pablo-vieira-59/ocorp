import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input()
  totalItems: number = 0;

  @Output()
  OnPageChange = new EventEmitter<any>();

  @Output()
  OnMaxItensChange = new EventEmitter<any>();

  @Input()
  itemsPerPage: number = 10;
  
  page: number = 1;
  totalPages: number = 1;

  itemsPerPage_ddl: string = "10";
  pageList :number[] = [];

  ngOnInit(){
    if(this.itemsPerPage != null){
      this.itemsPerPage_ddl = String(this.itemsPerPage);
    }
    else{
      this.itemsPerPage = 10;
    }
    
  }

  ngOnChanges() {
    this.CalculateTotalPages();
  }

  CalculateTotalPages() :string{
    try{
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      var start = this.page - 2;
      var end = this.page + 2;
      
      if(start < 1){
        end += 1 - start;
        start = 1;
      }

      if(end > this.totalPages){
        start -= end - this.totalPages;
        end = this.totalPages;
      }

      this.pageList = Array(this.totalPages).fill(0).map((x,i)=>i+1).filter(x=>x>=start && x<=end);
      return this.totalPages.toString();
    }
    catch (e){
      return "0";
    }
  }

  DDL_ChangeMaxItens() {
    this.page = 1;
    this.itemsPerPage = Number(this.itemsPerPage_ddl);
    this.CalculateTotalPages();
    this.OnMaxItensChange.emit(this.itemsPerPage);
  }

  Button_Page(page: number) {
    this.page = page;
    this.OnPageChange.emit(this.page);
  }

  Button_First() {
    this.page = 1;
    this.OnPageChange.emit(this.page);
  }

  Button_Next() {
    if(this.page < this.totalPages){
      this.page += 1;
      this.OnPageChange.emit(this.page);
    }
  }

  Button_Previous() {
    if(this.page > 1){
      this.page -= 1;
      this.OnPageChange.emit(this.page);
    }
  }

  Button_Last() {
    this.page = this.totalPages;
    this.OnPageChange.emit(this.page);
  }
}
