import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-window-transparent',
  templateUrl: './window-transparent.component.html',
  styleUrls: ['./window-transparent.component.scss']
})
export class WindowTransparentComponent {
  @Input()
  class = "";
}
