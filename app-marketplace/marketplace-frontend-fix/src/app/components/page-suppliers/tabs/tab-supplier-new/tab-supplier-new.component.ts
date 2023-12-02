import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ValidatorField } from 'src/app/helpers/formValidations';
import { Supplier } from 'src/app/models/Entities/Supplier';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-tab-supplier-new',
  templateUrl: './tab-supplier-new.component.html',
  styleUrls: ['./tab-supplier-new.component.scss']
})
export class TabSupplierNewComponent {
  isLoading = false;
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
    this.isLoading = true;

    var isRegistered = await this.serviceSupplier.Create(this.data);

    this.isLoading = false;

    if (isRegistered) {
      this.serviceNotification.success("Sucesso !", "Fornecedor cadastrado com sucesso!");
      return;
    }
  }

  ValidateField(inputId: string) {
    this.validFields = ValidatorField.ValidateInputField(this.validFields, inputId, this.val_required, undefined, undefined, this.val_minSize, this.val_cnpj);
  }
}
