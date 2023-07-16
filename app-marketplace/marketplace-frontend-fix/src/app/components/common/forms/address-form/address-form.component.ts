import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ValidatorField } from 'src/app/helpers/formValidations';
import { Address } from 'src/app/models/Entities/Address';
import { AddressService } from 'src/app/services/address.services';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent {

  @Input()
  data = {} as Address;

  @Output()
  dataChange = new EventEmitter<Address>();

  validFields :string[] = [];
  val_required = ["zipCode", "addressName", "number", "neighborhood", "city", "state"];
  val_minSize = [["zipCode","9"]];

  @Input()
  isFormValid = false;

  @Output()
  isFormValidChange = new EventEmitter<boolean>();


  constructor(
    private serviceAddress :AddressService)
  {  }

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
		this.validFields = ValidatorField.ValidateInputField(this.validFields, inputId, this.val_required, undefined, undefined, this.val_minSize, undefined);

    this.isFormValid = this.val_required.every(x => this.validFields.includes(x));

    this.isFormValidChange.emit(this.isFormValid);
    this.dataChange.emit(this.data);
	}

}
