import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert-danger',
  templateUrl: './alert-danger.component.html',
  styleUrls: ['./alert-danger.component.scss']
})
export class AlertDangerComponent {
  @Input()
  title :string = '';

  @Input()
  errors : string[] = []
}
