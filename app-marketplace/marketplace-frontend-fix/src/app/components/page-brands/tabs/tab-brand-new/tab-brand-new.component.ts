import { Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ValidatorField } from 'src/app/helpers/formValidations';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-tab-brand-new',
  templateUrl: './tab-brand-new.component.html',
  styleUrls: ['./tab-brand-new.component.scss']
})
export class TabBrandNewComponent {
  validFields: string[] = [];
	val_required = ["brand", "description"];

  isLoading = false;

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
		this.isLoading = true;

		var isRegistered = await this.serviceBrand.Create(this.data);

		this.isLoading = false;

		if (isRegistered) {
			this.serviceNotification.success("Sucesso !", "Marca cadastrada com sucesso!");
			return;
		}
	}
  
  ValidateField(inputId: string) {
		this.validFields = ValidatorField.ValidateInputField(this.validFields, inputId, this.val_required, undefined, undefined, undefined, undefined, undefined);
	}
}
