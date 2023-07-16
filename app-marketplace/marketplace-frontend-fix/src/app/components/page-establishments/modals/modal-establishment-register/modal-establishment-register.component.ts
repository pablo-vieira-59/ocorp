import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ValidatorField } from 'src/app/helpers/formValidations';
import { EstablishmentService } from 'src/app/services/establishment.service';
import { AddressService } from 'src/app/services/address.services';

@Component({
  selector: 'app-modal-establishment-register',
  templateUrl: './modal-establishment-register.component.html',
  styleUrls: ['./modal-establishment-register.component.scss']
})
export class ModalEstablishmentRegisterComponent {
  
  loading = false;
  modalRef?: BsModalRef;

  validFields :string[] = [];
  val_required = ["corporateName", "fantasyName", "documentNumber", "email", "phoneNumber", "zipCode", "addressName", "number", "neighborhood", "city", "state"];
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
    hasAddress: true,
  }

  constructor(
    private serviceModal :BsModalService, 
    private serviceNotification :ToastrService,
    private serviceEstablishment :EstablishmentService,
    private serviceAddress :AddressService)
  {  }

  ngOnInit(){

  }

  IsFormValid() :boolean{
    return this.val_required.every(x => this.validFields.includes(x));
  }

  async Submit(){
    var hasAdded = await this.serviceEstablishment.AddEstablishment(this.data);

    if(hasAdded){
      this.Close();
    }
  }

  Close() {
		this.serviceModal.hide();
	}

  async GetAddress(value: string) {
		var address = await this.serviceAddress.GetAddressFromCep(value);

		if(address.erro == true) {
			address.logradouro = "";
			address.bairro = "";
			address.localidade = "";
			address.uf = "";
		}

		var element = document.getElementById("addressName") as HTMLInputElement;
		element.value = address.logradouro;
		this.data.addressName = address.logradouro;
		var event = new Event("change");
		element!.dispatchEvent(event);

		element = document.getElementById("neighborhood") as HTMLInputElement;
		element.value = address.bairro;
		this.data.neighborhood = address.bairro;
		event = new Event("change");
		element!.dispatchEvent(event);

		element = document.getElementById("city") as HTMLInputElement;
		element.value = address.localidade;
		this.data.city = address.localidade;
		event = new Event("change");
		element!.dispatchEvent(event);

		element = document.getElementById("state") as HTMLInputElement;
		element.value = address.uf;
		this.data.state = address.uf;
		event = new Event("change");
		element!.dispatchEvent(event);
	}

	ValidateField(inputId :string){
		this.validFields = ValidatorField.ValidateInputField(this.validFields, inputId, this.val_required, this.val_email, undefined, this.val_minSize, this.val_cnpj);
	}
}
