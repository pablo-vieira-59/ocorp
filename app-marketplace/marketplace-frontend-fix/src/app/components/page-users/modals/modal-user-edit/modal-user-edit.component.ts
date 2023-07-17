import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ValidatorField } from 'src/app/helpers/formValidations';
import { Address } from 'src/app/models/Entities/Address';
import { Profile } from 'src/app/models/Entities/Profile';
import { User } from 'src/app/models/Entities/User';
import { ProfileService } from 'src/app/services/profile.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-modal-user-edit',
  templateUrl: './modal-user-edit.component.html',
  styleUrls: ['./modal-user-edit.component.scss']
})
export class ModalUserEditComponent {
  loading = false;
  modalRef?: BsModalRef;
  public userId = 0;

  ddl_profile_options = [] as Profile[];

  valid_fields = ["name", "phoneNumber", "profile", "reg-password"];
  val_required = ["name", "phoneNumber", "profile", "reg-password"];
  val_minSize = [["phoneNumber", "15"], ["reg-password", "6"]];

  model = {} as User;

  constructor(
    private serviceModal: BsModalService,
    private serviceNotification: ToastrService,
    private serviceUser: UserService,
    private serviceProfile: ProfileService) { }

  async ngOnInit() {
    this.loading = true;
    this.ddl_profile_options = await this.serviceProfile.GetAllAvailable();
    this.model = await this.serviceUser.GetById(this.userId);
    this.model.id = this.userId;
    
    if (this.model == null) {
      this.Close();
    }

    this.loading = false;
  }

  IsFormValid(): boolean {
    return this.val_required.every(x => this.valid_fields.includes(x));
  }

  async Submit() {
    this.loading = true;

    var isEdited = await this.serviceUser.EditUser(this.model);

    this.loading = false;

    if (isEdited) {
    	this.serviceNotification.success("Sucesso", "Usuário editado com sucesso!");
    	this.Close();
    	return;
    }
  }

  Close() {
    this.serviceModal.hide();
  }

  ValidateField(inputId: string) {
    this.valid_fields = ValidatorField.ValidateInputField(this.valid_fields, inputId, this.val_required, undefined, undefined, this.val_minSize, undefined, undefined);
  }
}
