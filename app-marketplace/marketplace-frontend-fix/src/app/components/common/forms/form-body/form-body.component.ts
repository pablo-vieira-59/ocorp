import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-body',
  templateUrl: './form-body.component.html',
  styleUrls: ['./form-body.component.scss']
})
export class FormBodyComponent {
  
  @Input()
  errors :string[] = [];

  
}
