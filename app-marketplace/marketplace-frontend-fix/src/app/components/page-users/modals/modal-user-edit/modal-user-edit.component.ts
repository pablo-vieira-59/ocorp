import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ValidatorField } from 'src/app/helpers/formValidations';
import { UserEditDTO } from 'src/app/models/DTO/UserEditDTO';
import { Address } from 'src/app/models/Entities/Address';
import { Establishment } from 'src/app/models/Entities/Establishment';
import { Profile } from 'src/app/models/Entities/Profile';
import { User } from 'src/app/models/Entities/User';
import { EstablishmentService } from 'src/app/services/establishment.service';
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
  public user_id = 0;

  current_establishments = [] as EstablishmentAux[];
  user_establishments = [] as  Establishment[];
  all_establishments = [] as  Establishment[];
  ddl_profile_options = [] as Profile[];

  valid_fields = ["name", "phoneNumber", "profile", "reg-password", "date"];
  val_required = ["name", "phoneNumber", "profile", "reg-password", "date"];
  val_minSize = [["phoneNumber", "15"], ["reg-password", "6"]];

  model = {} as UserEditDTO;

  establishmentId = '';

  constructor(
    private serviceModal: BsModalService,
    private serviceNotification: ToastrService,
    private serviceUser: UserService,
    private serviceProfile: ProfileService,
    private serviceEstablishment: EstablishmentService) { }

  async ngOnInit() {
    this.loading = true;

    var user = await this.serviceUser.GetById(this.user_id);
    if (user == null) {
      this.Close();
    }

    this.model.id = user.id;
    this.model.name = user.name;
    this.model.password = user.password;
    this.model.phoneNumber = user.phoneNumber;
    this.model.profileId = user.profileId;
    this.model.email = user.email;
    this.model.documentNumber = user.documentNumber;
    this.model.birthdayDate = formatDate(user.birthdayDate, "yyyy-MM-dd", "en-US");

    this.ddl_profile_options = await this.serviceProfile.GetAllAvailable();
    this.all_establishments = await this.serviceEstablishment.GetAllAvailable();
    this.user_establishments = await this.serviceEstablishment.GetUserEstablishment(this.user_id);
  
    this.MapData();

    this.loading = false;
  }

  MapData(){
    var enabled_establishments = this.user_establishments.map(x => x.id);

    for (let i = 0; i < this.all_establishments.length; i++) {
      var isEnabled = enabled_establishments.includes(this.all_establishments[i].id);
      
      var selectedEstablishment = {
        id : this.all_establishments[i].id ,
        name : this.all_establishments[i].corporateName,
        documentNumber : this.all_establishments[i].documentNumber,
        isEnabled : isEnabled
      }
      
      this.current_establishments.push(selectedEstablishment);
    }
  }

  IsFormValid(): boolean {
    return this.val_required.every(x => this.valid_fields.includes(x));
  }

  async Submit() {
    this.loading = true;

    var selected = this.current_establishments.filter(x => x.isEnabled);
    this.model.userEstablishments = selected.map(x => {return {id : x.id, corporateName : x.name}}) as Establishment[];

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

export interface EstablishmentAux {
  id :number;
  name :string;
  documentNumber :string;
  isEnabled :boolean;
}
