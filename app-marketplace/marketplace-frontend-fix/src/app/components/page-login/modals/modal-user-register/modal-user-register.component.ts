import { Component } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ValidatorField } from 'src/app/helpers/formValidations';
import { AttachmentCreateDTO } from 'src/app/models/DTO/AttachmentCreateDTO';
import { UserCreateDTO } from 'src/app/models/DTO/UserCreateDTO';
import { Address } from 'src/app/models/Entities/Address';
import { AddressService } from 'src/app/services/address.services';
import { AttachmentService } from 'src/app/services/attachment.services';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-modal-user-register',
	templateUrl: './modal-user-register.component.html',
	styleUrls: ['./modal-user-register.component.scss']
})
export class ModalUserRegisterComponent {
	loading = false;
	validFields: string[] = [];

	isAddressValid = false;
	address = {} as Address;
	data: UserCreateDTO = {
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
		profileId: 0,
		birthdayDate: '',
		isNewClient: true,
		clientName: '',
		imageGuid: '',
	} as UserCreateDTO;

	val_required = ["name", "documentNumber", "phoneNumber", "email", "reg-password", "clientName", "birthdayDate"];
	val_minSize = [["documentNumber", "14"], ["phoneNumber", "15"], ["reg-password", "6"]];
	val_email = ["email"];
	val_match = [["confirmPassword", "reg-password"]];
	val_cpf = ["documentNumber"];

	steps: string[] = ["Dados Pessoais", "Dados de Acesso", "Foto de Perfil", "Endereço", "Empresa"];
	currentStep: number = 0;
	confirmPassword = "";
	currentImage = '';

	modalRef?: BsModalRef;

	constructor(
		private serviceModal: BsModalService,
		private serviceNotification: ToastrService,
		private serviceUser: UserService,
		private serviceAttachment: AttachmentService) { }

	ngOnInit() {

	}

	IsFormValid() {
		return this.val_required.every(x => this.validFields.includes(x)) && this.isAddressValid;
	}

	async Submit() {
		this.loading = true;

		this.data.zipCode = this.address.zipCode;
		this.data.addressName = this.address.addressName;
		this.data.number = this.address.number;
		this.data.neighborhood = this.address.neighborhood;
		this.data.city = this.address.city;
		this.data.state = this.address.state;

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

	ValidateField(inputId: string) {
		this.validFields = ValidatorField.ValidateInputField(this.validFields, inputId, this.val_required, this.val_email, this.val_match, this.val_minSize, undefined, this.val_cpf);
	}

	IsStepValid(stepId: number): boolean {
		if (stepId == 0) {
			var elements = ["name", "documentNumber", "phoneNumber", "birthdayDate"]
			return elements.every(x => this.validFields.includes(x));
		}
		if (stepId == 1) {
			var elements = ["email", "reg-password", "confirmPassword"]
			return elements.every(x => this.validFields.includes(x));
		}
		if (stepId == 2) {
			return true;
		}
		if (stepId == 3) {
			return this.isAddressValid;
		}
		if (stepId == 4) {
			var elements = ["clientName"];
			return elements.every(x => this.validFields.includes(x));
		}
		return false;
	}

	async UpdateImage(event: Event) {
		const target = event.target as HTMLInputElement;
		const files = target.files as FileList;

		if (files && files[0]) {
			const file = files[0];

			// const reader = new FileReader();
			// reader.onload = e => this.currentImage = (reader.result as string);

			// reader.readAsDataURL(file);

			var attachment = {
				file: file,
				attachmentTypeId: 1
			} as AttachmentCreateDTO;

			var result = await this.serviceAttachment.UploadAttachment(attachment);
			this.data.imageGuid = result;
			this.currentImage = this.serviceAttachment.GetAttachmentUrl(result);
		}
	}
}


