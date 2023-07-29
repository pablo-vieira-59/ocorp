import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ValidatorField } from 'src/app/helpers/formValidations';
import { Brand } from 'src/app/models/Entities/Brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-modal-brand-edit',
  templateUrl: './modal-brand-edit.component.html',
  styleUrls: ['./modal-brand-edit.component.scss']
})
export class ModalBrandEditComponent {
  loading = false;
	modalRef?: BsModalRef;

  brandId = 0;

	validFields: string[] = ["brand", "description"];
	val_required = ["brand", "description"];

	data: Brand = {
		name: '',
		description: '',
		color: '#294566'
	} as Brand;

	constructor(
		private serviceModal: BsModalService,
		private serviceNotification: ToastrService,
		private serviceBrand: BrandService
    ) { }

	async ngOnInit() {
    this.loading = true;
    this.data = await this.serviceBrand.GetById(this.brandId);
    this.loading = false;
	}

	IsFormValid(): boolean {
		return this.val_required.every(x => this.validFields.includes(x));
	}

	async Submit() {
		this.loading = true;

		var isRegistered = await this.serviceBrand.Edit(this.data);

		this.loading = false;

		if (isRegistered) {
			this.serviceNotification.success("Sucesso !", "Marca editada com sucesso!");
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
