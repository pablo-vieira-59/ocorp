import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-slide-button',
  templateUrl: './slide-button.component.html',
  styleUrls: ['./slide-button.component.scss']
})
export class SlideButtonComponent {
  @Input()
  span_text :string = "";

  @Input()
  title_text :string = "";

  @Input()
  description_text :string = "";

  @Input()
  button_text :string = "";

  @Input()
  background_image :any = "";
}
