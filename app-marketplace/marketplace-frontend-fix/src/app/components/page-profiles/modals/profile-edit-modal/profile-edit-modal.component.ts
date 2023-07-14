import { Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { FilterDto, Paging, SearchField } from 'src/app/models/DTO/FilterDto';
import { Permission } from 'src/app/models/Entities/Permission';
import { Profile } from 'src/app/models/Entities/Profile';
import { PermissionService } from 'src/app/services/permisson.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile-edit-modal',
  templateUrl: './profile-edit-modal.component.html',
  styleUrls: ['./profile-edit-modal.component.scss']
})
export class ProfileEditModalComponent {

  public profileId :number = 0;

  profile :Profile = {} as Profile;
  permissions :Permission[] = [];
  profilePermissions :Permission[] = [];
  isLoading : boolean = false;
  profilePermissionsModel :ProfilePermissionAux[] = [];

  constructor(
    private serviceModal :BsModalService, 
    private serviceNotification :ToastrService,
    private serviceProfile :ProfileService,
    private servicePermission :PermissionService)
  {  }

  async ngOnInit(){
    this.isLoading = true;
    this.profile = await this.serviceProfile.GetById(this.profileId);
    this.permissions = await this.servicePermission.AllDetails();
    this.profilePermissions = await this.servicePermission.GetByProfile(this.profileId);

    this.permissions.sort((a, b) => a.name.localeCompare(b.name));

    this.MapData();

    this.isLoading = false;
  }

  MapData(){
    var enabledPermissions = this.profilePermissions.map(x => x.id);

    for (let i = 0; i < this.permissions.length; i++) {
      var isEnabled = enabledPermissions.includes(this.permissions[i].id);
      
      var currentPermission = {
        id : this.permissions[i].id ,
        name : this.permissions[i].name,
        isEnabled : isEnabled
      }
      
      this.profilePermissionsModel.push(currentPermission);
    }
  }

  Close() {
		this.serviceModal.hide();
	}

  async Submit(){
    this.isLoading = true;
    var permissionsToSend = this.profilePermissionsModel.filter(x => x.isEnabled);
    var requestPermissions = permissionsToSend.map(x => {return {id : x.id, name : x.name}}) as Permission[];
    var result = await this.servicePermission.EditProfilePermission(this.profileId, requestPermissions);
    this.isLoading = false;

    if(result){
      this.serviceNotification.success("Permissões editadas com sucesso !");
      this.Close();
    }
  }
}

export interface ProfilePermissionAux {
  id :number;
  name :string;
  isEnabled :boolean;
}
