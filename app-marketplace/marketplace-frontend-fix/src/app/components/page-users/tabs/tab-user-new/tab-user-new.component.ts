import { Component, EventEmitter, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ValidatorField } from 'src/app/helpers/formValidations';
import { Address } from 'src/app/models/Entities/Address';
import { Profile } from 'src/app/models/Entities/Profile';
import { ProfileService } from 'src/app/services/profile.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tab-user-new',
  templateUrl: './tab-user-new.component.html',
  styleUrls: ['./tab-user-new.component.scss']
})
export class TabUserNewComponent {
  @Output()
  OnSuccess = new EventEmitter<any>();

  isLoading  = false;

  ddl_profile_options = [] as Profile[];
	isAddressValid = false;
	address = {} as Address;
	validFields: string[] = [];
	val_required = ["name", "documentNumber", "phoneNumber", "email", "reg-password", "birthdayDate"];
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
		confirmPassword: '',
		birthdayDate:'',
		isNewClient:false,
		clientName:''
	}

	constructor(
		private serviceNotification: ToastrService,
		private serviceUser: UserService,
		private serviceProfile: ProfileService) { }

	async ngOnInit() {
		this.isLoading = true;
		this.ddl_profile_options = await this.serviceProfile.GetAllAvailable();
		this.isLoading = false;
	}

	IsFormValid(): boolean {
		return this.val_required.every(x => this.validFields.includes(x)) && this.isAddressValid;
	}

	async Submit() {
		this.isLoading = true;
		this.data.zipCode = this.address.zipCode;
		this.data.addressName = this.address.addressName;
		this.data.number = this.address.number;
		this.data.neighborhood = this.address.neighborhood;
		this.data.city = this.address.city;
		this.data.state = this.address.state;

		var isRegistered = await this.serviceUser.CreateUser(this.data);

		this.isLoading = false;

		if (isRegistered) {
			this.serviceNotification.success("Sucesso", "Usuário cadastrado com sucesso!");
			this.OnSuccess.emit();
			return;
		}
	}

	ValidateField(inputId: string) {
		this.validFields = ValidatorField.ValidateInputField(this.validFields, inputId, this.val_required, this.val_email, this.val_match, this.val_minSize, undefined, this.val_cpf);
	}
}
