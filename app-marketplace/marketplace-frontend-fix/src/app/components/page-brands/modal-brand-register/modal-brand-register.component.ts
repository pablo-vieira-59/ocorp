import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ValidatorField } from 'src/app/helpers/formValidations';
import { Address } from 'src/app/models/Entities/Address';
import { Profile } from 'src/app/models/Entities/Profile';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-modal-brand-register',
  templateUrl: './modal-brand-register.component.html',
  styleUrls: ['./modal-brand-register.component.scss']
})
export class ModalBrandRegisterComponent {
  	loading = false;
	modalRef?: BsModalRef;

	validFields: string[] = [];
	val_required = ["brand", "description"];

	data: any = {
		name: '',
		description: '',
		color: '#294566'
	}

	constructor(
		private serviceModal: BsModalService,
		private serviceNotification: ToastrService,
		private serviceBrand: BrandService
    ) { }

	async ngOnInit() {

	}

	IsFormValid(): boolean {
		return this.val_required.every(x => this.validFields.includes(x));
	}

	async Submit() {
		this.loading = true;

		var isRegistered = await this.serviceBrand.Create(this.data);

		this.loading = false;

		if (isRegistered) {
			this.serviceNotification.success("Sucesso !", "Marca cadastrada com sucesso!");
			this.Close();
			return;
		}
	}

	Close() {
		this.serviceModal.hide();
	}

	ValidateField(inputId: string) {
		this.validFields = ValidatorField.ValidateInputField(this.validFields, inputId, this.val_required, undefined, undefined, undefined, undefined, undefined);
	}
}
