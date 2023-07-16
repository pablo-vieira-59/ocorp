import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ValidatorField } from 'src/app/helpers/formValidations';
import { EstablishmentService } from 'src/app/services/establishment.service';
import { AddressService } from 'src/app/services/address.services';
import { Address } from 'src/app/models/Entities/Address';

@Component({
  selector: 'app-modal-establishment-register',
  templateUrl: './modal-establishment-register.component.html',
  styleUrls: ['./modal-establishment-register.component.scss']
})
export class ModalEstablishmentRegisterComponent {
  
  loading = false;
  modalRef?: BsModalRef;

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
    private serviceModal :BsModalService, 
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
      this.Close();
    }
  }

  Close() {
		this.serviceModal.hide();
	}

	ValidateField(inputId :string){
		this.validFields = ValidatorField.ValidateInputField(this.validFields, inputId, this.val_required, this.val_email, undefined, this.val_minSize, this.val_cnpj);
	}
}
