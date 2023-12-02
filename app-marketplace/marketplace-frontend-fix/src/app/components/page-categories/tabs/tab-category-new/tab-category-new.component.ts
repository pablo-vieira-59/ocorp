import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ValidatorField } from 'src/app/helpers/formValidations';
import { Subcategory } from 'src/app/models/Entities/Subcategory';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-tab-category-new',
  templateUrl: './tab-category-new.component.html',
  styleUrls: ['./tab-category-new.component.scss']
})
export class TabCategoryNewComponent {
  isLoading = false;
  
	modalRef?: BsModalRef;

	validFields: string[] = [];
	val_required = ["category"];

	errors: string[] = [];

	data: any = {
		name: '',
		color: '#294566',
		subcategories: [{ id: 0, name: '', color: '#000000' } as Subcategory]
	}

	constructor(
		private serviceModal: BsModalService,
		private serviceNotification: ToastrService,
		private serviceCategory: CategoryService
	) { }

	async ngOnInit() {

	}

	IsFormValid(): boolean {

		for (let i = 0; i < this.data.subcategories.length; i++) {
			if (!this.validFields.includes("subcategory_" + i.toString())) {
				return false;
			}
		}

		return this.val_required.every(x => this.validFields.includes(x));
	}

	async Submit() {
		this.isLoading = true;

		var isRegistered = await this.serviceCategory.Create(this.data);

		this.isLoading = false;

		if (isRegistered) {
			this.serviceNotification.success("Sucesso !", "Marca cadastrada com sucesso!");
			return;
		}
	}

	ValidateField(inputId: string) {
		this.validFields = ValidatorField.ValidateInputField(this.validFields, inputId, this.val_required, undefined, undefined, undefined, undefined, undefined);
	}

	AddSubcategoryField() {
		this.errors = [];
		var newSub = { id: 0, name: '', color: '' } as Subcategory;
		this.data.subcategories.push(newSub);
	}

	RemoveSubcategoryField(id: number) {
		if (this.data.subcategories.length == 1) {
			this.errors = ["É necessário cadastrar ao menos 1 subcategoria."];
			return;
		}
		this.errors = [];
		this.data.subcategories.splice(id, 1);
	}
}
