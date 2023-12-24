import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ValidatorField } from 'src/app/helpers/formValidations';
import { Batch } from 'src/app/models/Entities/Batch';
import { BatchStatus } from 'src/app/models/Entities/BatchStatus';
import { BatchService } from 'src/app/services/batch.service';

@Component({
  selector: 'app-tab-batch-edit',
  templateUrl: './tab-batch-edit.component.html',
  styleUrls: ['./tab-batch-edit.component.scss']
})
export class TabBatchEditComponent {
  @Output()
  OnSuccess = new EventEmitter<any>();

  isLoading = false;

  @Input()
  batchId: number = 0;

  batch = {} as Batch;

  model = {
    batchStatusId : 0,
    batchId : 0,
    message : ""
  };

  ddlBatchStatusOptions :BatchStatus[] = [];

  validFields: string[] = [];
  valRequired: string[] = ["batchStatus"];

  constructor(
    private serviceNotification: ToastrService,
    private serviceBatch: BatchService) { }

  async ngOnInit() {
    this.isLoading = true;

    this.batch = await this.serviceBatch.GetById(this.batchId);
    this.ddlBatchStatusOptions = await this.serviceBatch.GetStatusList();
    this.model.batchStatusId = this.batch.batchStatusId;
    this.isLoading = false;
  }

  IsFormValid(): boolean {
    return this.valRequired.every(x => this.validFields.includes(x));
  }

  async Submit() {
    this.isLoading = true;

    this.model.batchId = this.batchId;

    var isEdited = await this.serviceBatch.Edit(this.model);

    this.isLoading = false;

    if (isEdited) {
    	this.serviceNotification.success("Sucesso", "Lote editado com sucesso!");
      this.OnSuccess.emit();
    	return;
    }
  }

  ValidateField(inputId: string) {
    this.validFields = ValidatorField.ValidateInputField(this.validFields, inputId, this.valRequired, undefined, undefined, undefined, undefined, undefined);
  }
}
