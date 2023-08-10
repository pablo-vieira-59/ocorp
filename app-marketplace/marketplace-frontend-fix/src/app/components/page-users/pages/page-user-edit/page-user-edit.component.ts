import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidatorField } from 'src/app/helpers/formValidations';
import { AttachmentCreateDTO } from 'src/app/models/DTO/AttachmentCreateDTO';
import { UserEditDTO } from 'src/app/models/DTO/UserEditDTO';
import { Profile } from 'src/app/models/Entities/Profile';
import { User } from 'src/app/models/Entities/User';
import { AttachmentService } from 'src/app/services/attachment.services';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-page-user-edit',
  templateUrl: './page-user-edit.component.html',
  styleUrls: ['./page-user-edit.component.scss']
})
export class PageUserEditComponent {
  valid_fields = ["name", "phoneNumber", "profile", "reg-password", "date"];
  val_required = ["name", "phoneNumber", "profile", "reg-password", "date"];
  val_minSize = [["phoneNumber", "15"], ["reg-password", "6"]];

  ddl_profile_options = [] as Profile[];

  page = 0;

  user = {} as User;
  model = {} as UserEditDTO;

  currentImage: any = null;

  constructor(
    private serviceAttachment: AttachmentService,
    private router: Router,
    private route: ActivatedRoute,
    private serviceUser: UserService) {
  }

  async ngOnInit(): Promise<void> {
    var userGuid = this.route.snapshot.paramMap.get('guid');
    this.user = await this.serviceUser.GetByGuid(userGuid!);

    if (this.user.imageGuid != null) {
      this.currentImage = this.serviceAttachment.GetAttachmentUrl(this.user.imageGuid);
    }

    this.model = {
      id: this.user.id,
      email: this.user.email,
      documentNumber: this.user.documentNumber,
      birthdayDate: formatDate(this.user.birthdayDate, "yyyy-MM-dd", "en-US"),
      name: this.user.name,
      phoneNumber: this.user.phoneNumber,
      profileId: this.user.profileId,
      imageGuid : this.user.imageGuid
    } as UserEditDTO;
  }

  ValidateField(inputId: string) {
    this.valid_fields = ValidatorField.ValidateInputField(this.valid_fields, inputId, this.val_required, undefined, undefined, this.val_minSize, undefined, undefined);
  }

  SelectPage(idx: number) {
    this.page = idx;
  }

  async UpdateImage(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;

    if (files && files[0]) {
      const file = files[0];

      // const reader = new FileReader();
      // reader.onload = e => this.currentImage = (reader.result as string);

      // reader.readAsDataURL(file);

      var attachment = {
        file: file,
        attachmentTypeId: 1
      } as AttachmentCreateDTO;

      var result = await this.serviceAttachment.UploadAttachment(attachment);
      this.model.imageGuid = result;
      this.currentImage = this.serviceAttachment.GetAttachmentUrl(result);
    }
  }

  async UpdateUserInfo() {
    var hasEdited = await this.serviceUser.EditUser(this.model);

    if(!hasEdited){
      return;
    }

    var navbarImage = document.getElementById("navbarImage") as HTMLImageElement;

    if (navbarImage == null) {
      return;
    }

    navbarImage.src = this.currentImage;
  }

  async UpdateUserAddress() {
    //this.serviceUser.EditUser(this.model);
  }

  async UpdateUserPassword() {
    //this.serviceUser.EditUser(this.model);
  }
}
