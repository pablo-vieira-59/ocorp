import { Component } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ValidatorField } from 'src/app/helpers/formValidations';
import { AddressService } from 'src/app/services/address.services';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-modal-user-register',
	templateUrl: './modal-user-register.component.html',
	styleUrls: ['./modal-user-register.component.scss']
})
export class ModalUserRegisterComponent {
	loading = false;
	validFields :string[] = [];

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
		profileId: 4
	}

	val_required = ["name", "documentNumber", "phoneNumber", "email", "reg-password", "zipCode", "number", "addressName", "neighborhood", "state", "city"];
	val_minSize =  [["documentNumber", "14"], ["phoneNumber", "15"], ["reg-password", "6"],["zipCode","9"]];
	val_email = ["email"];
	val_match = [["confirmPassword", "reg-password"]];
	val_cpf = ["documentNumber"];

	steps: string[] = ["Dados Pessoais", "Dados de Acesso", "Endereço"];
	currentStep: number = 0;
	confirmPassword = "";

	modalRef?: BsModalRef;

	constructor(
		private serviceModal: BsModalService,
		private serviceNotification: ToastrService,
		private serviceUser: UserService,
		private serviceAddress: AddressService) { }

	ngOnInit() {

	}

	IsFormValid(){
		if(this.val_required.length == this.validFields.length){
			return true;
		}

		return false;
	}

	async Submit() {
		this.loading = true;
		var isRegistered = await this.serviceUser.CreateUser(this.data);

		this.loading = false;

		if (isRegistered) {
			this.serviceNotification.success("Sucesso", "Usuário cadastrado com sucesso!");
			this.Close();
			return;
		}
	}

	NextStep() {
		this.currentStep++;
	}

	PreviousStep() {
		this.currentStep--;
	}

	Close() {
		this.serviceModal.hide();
	}

	ChangeStep(stepIdx: any) {
		this.currentStep = stepIdx;
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
		this.validFields = ValidatorField.ValidateInputField(this.validFields, inputId, this.val_required, this.val_email, this.val_match, this.val_minSize, undefined, this.val_cpf);
	}

	IsStepValid(stepId :number): boolean{
		if(stepId == 0){
			var elements = ["name","documentNumber", "phoneNumber"]
			return elements.every(x => this.validFields.includes(x));
		}
		if(stepId == 1){
			var elements = ["name","documentNumber", "phoneNumber","email","reg-password", "confirmPassword"]
			return elements.every(x => this.validFields.includes(x));
		}
		if(stepId == 2){
			var elements = ["name","documentNumber", "phoneNumber","email","reg-password","zipCode", "number", "addressName", "neighborhood", "state", "city"]
			return elements.every(x => this.validFields.includes(x));
		}
		return false;
	}
}


