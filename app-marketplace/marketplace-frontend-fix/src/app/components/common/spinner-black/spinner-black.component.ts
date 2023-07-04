import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-spinner-black',
  templateUrl: './spinner-black.component.html',
  styleUrls: ['./spinner-black.component.scss']
})
export class SpinnerBlackComponent {
  constructor(private serviceSpinner :NgxSpinnerService) { }

  ngOnInit(): void {
    this.serviceSpinner.show();
  }
}
