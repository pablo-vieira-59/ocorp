import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent {
  
  @Input()
  index = 0;
  @Output()
  indexChange = new EventEmitter<number>;

  @Input()
  tabs :string[] = [];

  @Input()
  icons :string[] = [];

  SetIndex(value :number){
    this.index = value;
    this.indexChange.emit(this.index);
  }
}
