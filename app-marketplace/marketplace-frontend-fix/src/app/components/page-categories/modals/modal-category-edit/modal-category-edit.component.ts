import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ValidatorField } from 'src/app/helpers/formValidations';
import { Category } from 'src/app/models/Entities/Category';
import { Subcategory } from 'src/app/models/Entities/Subcategory';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-modal-category-edit',
  templateUrl: './modal-category-edit.component.html',
  styleUrls: ['./modal-category-edit.component.scss']
})
export class ModalCategoryEditComponent {
  id :number = 0;

  loading = false;
	modalRef?: BsModalRef;

	validFields: string[] = ["category"];
	val_required = ["category"];

	errors: string[] = [];

  category = {subCategories:[] as Subcategory[]} as Category;

	constructor(
		private serviceModal: BsModalService,
		private serviceNotification: ToastrService,
		private serviceCategory: CategoryService
	) { }

	async ngOnInit() {
    	this.category = await this.serviceCategory.GetById(this.id);

		for (let i = 0; i < this.category.subCategories.length; i++) {
			this.validFields.push("subcategory_"+i.toString());
			this.val_required.push("subcategory_"+i.toString());
		}
	}

	IsFormValid(): boolean {
		console.log(this.validFields);

		for (let i = 0; i < this.category.subCategories.length; i++) {
			if (!this.validFields.includes("subcategory_" + i.toString())) {
				return false;
			}
		}

		return this.val_required.every(x => this.validFields.includes(x));
	}

	async Submit() {
		this.loading = true;

		var isRegistered = await this.serviceCategory.Edit(this.category);

		this.loading = false;

		if (isRegistered) {
			this.serviceNotification.success("Sucesso !", "Categoria editada com sucesso!");
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
