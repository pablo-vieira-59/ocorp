import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-spinner-white',
  templateUrl: './spinner-white.component.html',
  styleUrls: ['./spinner-white.component.scss']
})
export class SpinnerWhiteComponent {
  constructor(private serviceSpinner :NgxSpinnerService) { }

  ngOnInit(): void {
    this.serviceSpinner.show();
  }
}
