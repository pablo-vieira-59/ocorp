import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ValidatorField } from 'src/app/helpers/formValidations';
import { Supplier } from 'src/app/models/Entities/Supplier';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-modal-supplier-register',
  templateUrl: './modal-supplier-register.component.html',
  styleUrls: ['./modal-supplier-register.component.scss']
})
export class ModalSupplierRegisterComponent {
  loading = false;
  modalRef?: BsModalRef;

  id = 0;

  validFields: string[] = [];
  val_required = ["documentNumber","fantasyName", "email", "phoneNumber"];
  val_minSize = [["phoneNumber", "14"]];
  val_cnpj = ["documentNumber"]

  data: Supplier = {} as Supplier;

  constructor(
    private serviceModal: BsModalService,
    private serviceNotification: ToastrService,
    private serviceSupplier: SupplierService
  ) { }

  async ngOnInit() {

  }

  IsFormValid(): boolean {
    return this.val_required.every(x => this.validFields.includes(x));
  }

  async Submit() {
    this.loading = true;

    var isRegistered = await this.serviceSupplier.Create(this.data);

    this.loading = false;

    if (isRegistered) {
      this.serviceNotification.success("Sucesso !", "Fornecedor cadastrado com sucesso!");
      this.Close();
      return;
    }
  }

  Close() {
    this.serviceModal.hide();
  }

  ValidateField(inputId: string) {
    this.validFields = ValidatorField.ValidateInputField(this.validFields, inputId, this.val_required, undefined, undefined, this.val_minSize, this.val_cnpj);
  }
}
