import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ValidatorField } from 'src/app/helpers/formValidations';
import { Supplier } from 'src/app/models/Entities/Supplier';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-modal-supplier-edit',
  templateUrl: './modal-supplier-edit.component.html',
  styleUrls: ['./modal-supplier-edit.component.scss']
})
export class ModalSupplierEditComponent {
  loading = false;
  modalRef?: BsModalRef;

  id = 0;

  validFields: string[] = ["fantasyName", "email", "phoneNumber"];
  val_required = ["fantasyName", "email", "phoneNumber"];
  val_minSize = [["phoneNumber", "14"]];

  data: Supplier = {} as Supplier;

  constructor(
    private serviceModal: BsModalService,
    private serviceNotification: ToastrService,
    private serviceSupplier: SupplierService
  ) { }

  async ngOnInit() {
    this.loading = true;
    this.data = await this.serviceSupplier.GetById(this.id);
    this.loading = false;
  }

  IsFormValid(): boolean {
    return this.val_required.every(x => this.validFields.includes(x));
  }

  async Submit() {
    this.loading = true;

    var isRegistered = await this.serviceSupplier.Edit(this.data);

    this.loading = false;

    if (isRegistered) {
      this.serviceNotification.success("Sucesso !", "Fornecedor editado com sucesso!");
      this.Close();
      return;
    }
  }

  Close() {
    this.serviceModal.hide();
  }

  ValidateField(inputId: string) {
    this.validFields = ValidatorField.ValidateInputField(this.validFields, inputId, this.val_required, undefined, undefined, this.val_minSize, undefined, undefined);
  }
}
