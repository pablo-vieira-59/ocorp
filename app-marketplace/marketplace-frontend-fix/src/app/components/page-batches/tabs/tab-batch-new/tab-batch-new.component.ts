import { Component, EventEmitter, Output } from '@angular/core';
import { ValidatorField } from 'src/app/helpers/formValidations';
import { BatchCreateDTO } from 'src/app/models/DTO/BatchCreateDTO';
import { BatchService } from 'src/app/services/batch.service';

@Component({
  selector: 'app-tab-batch-new',
  templateUrl: './tab-batch-new.component.html',
  styleUrls: ['./tab-batch-new.component.scss']
})
export class TabBatchNewComponent {
  @Output()
  OnSuccess = new EventEmitter<any>();

  isLoading = false;

  currentStep = 0;

  model = {} as BatchCreateDTO;

  invoiceImageUrl :string = '';
  paymentProofImageUrl :string = '';

  totalPrice = 0;

  validFields :string[] = [];
  valRequired :string[] = ["serial", "fabricatedAt", "totalUnits", "unitPrice", "freightPrice", "imageNoteGuid", "imagePaymentGuid"];

  constructor(
    private serviceBatch:BatchService
  ){ }

  NextStep() {
		this.currentStep++;
	}

	PreviousStep() {
		this.currentStep--;
	}

  async Submit(){
    this.isLoading = true;
    var result = await this.serviceBatch.Create(this.model);
    if(result){
      this.OnSuccess.emit();
    }

    this.isLoading = false;
  }

  IsStepValid(idx :number){
    if(idx == 0){
      if(this.model.productId && this.model.productId != 0){
        return true;
      }
      return false;
    }

    if(idx == 1){
      if(this.model.productId && this.model.supplierId != 0){
        return true;
      }
      return false;
    }

    if(idx == 2){
      return this.valRequired.every(x => this.validFields.includes(x));
    }

    if(idx == 3){
      if(this.model.addressId != 0 && this.model.productId){
        return true;
      }
  
      return false;
    }

    return false;
  }

  IsFormValid(){
    if(this.model.addressId == 0){
      return false;
    }

    return true;
  }

  ValidateField(inputId: string) {
    this.totalPrice = Number(this.model.totalUnits * this.model.unitPrice) + Number(this.model.freightPrice);

    this.validFields = ValidatorField.ValidateInputField(this.validFields, inputId, this.valRequired, undefined, undefined, undefined, undefined, undefined);
  }
}
