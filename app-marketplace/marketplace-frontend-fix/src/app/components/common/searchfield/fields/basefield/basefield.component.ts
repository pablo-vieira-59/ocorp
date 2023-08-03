import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FieldType } from '../FieldType';

@Component({
  selector: 'app-basefield',
  templateUrl: './basefield.component.html',
  styleUrls: ['./basefield.component.scss']
})
export class BasefieldComponent {
  @Input()
  fieldType :FieldType = FieldType.Text;

  @Input()
  label :string = "";

  @Input()
  placeholder :string = "";

  @Input()
  notFoundText :string = "";

  @Input()
  items :any[] = [];

  @Input()
  selected_item :any = {};
  @Output()
  selected_itemChange = new EventEmitter<any>();

  @Input()
  selected_items :any[] = [];
  @Output()
  selected_itemsChange = new EventEmitter<any[]>();

  @Input()
  isChecked :boolean = false;
  @Output()
  isCheckedChange = new EventEmitter<boolean>();

  @Input()
  text_value :string = "";
  @Output()
  text_valueChange = new EventEmitter<string>();

  @Input()
  mask :string = "";

  updateSelected_item(){
    this.selected_itemChange.emit(this.selected_item);
  }

  updateText(){
    this.text_valueChange.emit(this.text_value);
  }

  updateIsChecked(){
    this.isCheckedChange.emit(this.isChecked);
  }

  updateSelected_items(){
    this.selected_itemsChange.emit(this.selected_items);
  }

  get fieldTypeNames(){
    return FieldType;
  }
}
