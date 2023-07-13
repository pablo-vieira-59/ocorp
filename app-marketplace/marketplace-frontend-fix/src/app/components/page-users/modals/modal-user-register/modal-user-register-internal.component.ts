import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ValidatorField } from 'src/app/helpers/formValidations';
import { Profile } from 'src/app/models/Entities/Profile';
import { AddressService } from 'src/app/services/address.services';
import { ProfileService } from 'src/app/services/profile.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-modal-user-register-internal',
  templateUrl: './modal-user-register-internal.component.html',
  styleUrls: ['./modal-user-register-internal.component.scss']
})
export class ModalUserRegisterInternalComponent {
  loading = false;
  modalRef?: BsModalRef;

  ddl_profile_options = [{id:1, name:"Teste"},{id:2, name:"Teste 2"}] as Profile[];

  validFields :string[] = [];
  val_required = ["name", "documentNumber", "phoneNumber", "email", "reg-password", "zipCode", "number", "addressName", "neighborhood", "state", "city", "profile"];
	val_minSize =  [["documentNumber", "14"], ["phoneNumber", "15"], ["reg-password", "6"],["zipCode","9"]];
	val_email = ["email"];
	val_match = [["confirmPassword", "reg-password"]];
	val_cpf = ["documentNumber"];

  data: any = {
		password: '',
		name: '',
		email: '',
		phoneNumber: '',
		documentNumber: '',
		zipCode: '',
		addressName: '',
		number: '',
		neighborhood: '',
		city: '',
		state: '',
		profileId: undefined,
    confirmPassword:''
	}

  constructor(
    private serviceModal :BsModalService, 
    private serviceNotification :ToastrService,
    private serviceUser :UserService,
    private serviceAddress :AddressService,
    private serviceProfile :ProfileService)
  {  }

  async ngOnInit(){
    this.ddl_profile_options = await this.serviceProfile.GetAll();
  }

  IsFormValid() :boolean{
    return this.val_required.every(x => this.validFields.includes(x));
  }

  async Submit(){
    this.loading = true;
		var isRegistered = await this.serviceUser.CreateUser(this.data);

		this.loading = false;

		if (isRegistered) {
			this.serviceNotification.success("Sucesso", "Usuário cadastrado com sucesso!");
			this.Close();
			return;
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

  ValidateProfile(value :number){
    var idx = this.validFields.indexOf("profile");

    if(value && value != 0){
      if(idx == -1){
        this.validFields.push("profile");
      }
    }
    else{
      if(idx != -1){
        this.validFields.splice(idx, 1);
      }	
    }
  }

	ValidateField(event :Event){
		var validField = ValidatorField.ValidateInputField(event, this.val_required, this.val_email, this.val_match, this.val_minSize, undefined, this.val_cpf);
		var element = event.currentTarget as HTMLInputElement;

    if(!element){
      return;
    }

    if(element.id == "reg-password"){
			var confirmElement = document.getElementById("confirmPassword") as HTMLInputElement;

			confirmElement.value = "";
			this.data.confirmPassword = "";
			ValidatorField.SetElementAsInvalid(confirmElement, "Valor do campo deve ser igual !");
		}

		var idx = this.validFields.indexOf(element.id);

		if(validField != null && idx == -1){
			this.validFields.push(element.id);
		}
		if(validField == null && idx != -1){
			this.validFields.splice(idx, 1);
		}	
	}
}
