import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ValidatorField } from 'src/app/helpers/formValidations';
import { Address } from 'src/app/models/Entities/Address';
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

	ddl_profile_options = [] as Profile[];
	isAddressValid = false;
	address = {} as Address;
	validFields: string[] = [];
	val_required = ["name", "documentNumber", "phoneNumber", "email", "reg-password"];
	val_minSize = [["documentNumber", "14"], ["phoneNumber", "15"], ["reg-password", "6"]];
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
		profileId: '',
		confirmPassword: ''
	}

	constructor(
		private serviceModal: BsModalService,
		private serviceNotification: ToastrService,
		private serviceUser: UserService,
		private serviceProfile: ProfileService) { }

	async ngOnInit() {
		this.loading = true;
		this.ddl_profile_options = await this.serviceProfile.GetAllAvailable();
		this.loading = false;
	}

	IsFormValid(): boolean {
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

	Close() {
		this.serviceModal.hide();
	}

	ValidateField(inputId: string) {
		this.validFields = ValidatorField.ValidateInputField(this.validFields, inputId, this.val_required, this.val_email, this.val_match, this.val_minSize, undefined, this.val_cpf);
	}
}
