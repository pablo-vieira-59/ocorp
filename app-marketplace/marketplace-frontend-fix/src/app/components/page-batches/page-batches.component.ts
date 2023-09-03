import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FilterDto, Paging, SearchField } from 'src/app/models/DTO/FilterDto';
import { Batch } from 'src/app/models/Entities/Batch';
import { Category } from 'src/app/models/Entities/Category';
import { BatchService } from 'src/app/services/batch.service';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-page-batches',
  templateUrl: './page-batches.component.html',
  styleUrls: ['./page-batches.component.scss']
})
export class PageBatchesComponent {
  tabIndex = 0;
}
