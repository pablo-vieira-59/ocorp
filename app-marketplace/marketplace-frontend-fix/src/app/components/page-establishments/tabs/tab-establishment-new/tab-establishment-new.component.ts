import { Component, EventEmitter, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ValidatorField } from 'src/app/helpers/formValidations';
import { Address } from 'src/app/models/Entities/Address';
import { EstablishmentService } from 'src/app/services/establishment.service';

@Component({
  selector: 'app-tab-establishment-new',
  templateUrl: './tab-establishment-new.component.html',
  styleUrls: ['./tab-establishment-new.component.scss']
})
export class TabEstablishmentNewComponent {
  @Output()
  OnSuccess = new EventEmitter<any>();

  isLoading  = false;

  address = {} as Address;
  isAddressValid = false;
  validFields :string[] = [];
  val_required = ["corporateName", "fantasyName", "documentNumber", "email", "phoneNumber"];
  val_email = ["email"];
  val_minSize = [["zipCode","9"]];
  val_cnpj = ["documentNumber"];

  data :any = {
    corporateName: '',
    fantasyName: '',
    documentNumber: '',
    url: '',
    email: '',
    phoneNumber: '',
    zipCode: '',
    addressName: '',
    number: '',
    neighborhood: '',
    city: '',
    state: '',
  }

  constructor(
    private serviceNotification :ToastrService,
    private serviceEstablishment :EstablishmentService)
  {  }

  ngOnInit(){

  }

  IsFormValid() :boolean{
    var requiredIsvalid = this.val_required.every(x => this.validFields.includes(x));

    if(requiredIsvalid && this.isAddressValid){
      return true;
    } 

    return false;
  }

  async Submit(){
    this.data.zipCode = this.address.zipCode;
    this.data.addressName = this.address.addressName;
    this.data.number = this.address.number;
    this.data.neighborhood = this.address.neighborhood;
    this.data.city = this.address.city;
    this.data.state = this.address.state;

    var hasAdded = await this.serviceEstablishment.AddEstablishment(this.data);

    if(hasAdded){
      this.serviceNotification.success("Sucesso", "Estabelecimento cadastrado com sucesso!");
      this.OnSuccess.emit();
			return;
    }
  }

  ValidateField(inputId :string){
		this.validFields = ValidatorField.ValidateInputField(this.validFields, inputId, this.val_required, this.val_email, undefined, this.val_minSize, this.val_cnpj);
	}
}
