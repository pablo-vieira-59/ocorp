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
  pageList: number[] = [];

  ngOnInit() {
    if (this.itemsPerPage != null) {
      this.itemsPerPage_ddl = String(this.itemsPerPage);
    }
    else {
      this.itemsPerPage = 10;
    }
  }

  ngOnChanges() {
    this.UpdateTotalPages();
    this.UpdatePagination();
  }

  UpdateTotalPages() {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
  }

  UpdatePagination() {
    this.pageList = [];
    
    var start = this.page;
    var end = this.page;

    for (let i = 0; i < 1; i++) {
      if(start - 1 > 0){
        start -= 1;
      }

      if(end + 1 <= this.totalPages){
        end += 1;
      }
    }

    for (let i = start; i <= end; i++) {
      this.pageList.push(i);
    }
  }

  DDL_ChangeMaxItens() {
    this.page = 1;
    this.itemsPerPage = Number(this.itemsPerPage_ddl);
    this.UpdateTotalPages();
    this.UpdatePagination();
    this.OnMaxItensChange.emit(this.itemsPerPage);
  }

  Button_Page(page: number) {
    this.page = page;
    this.UpdatePagination();
    this.OnPageChange.emit(this.page);
  }
}
