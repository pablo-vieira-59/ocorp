import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { FilterDto } from '../models/DTO/FilterDto';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import { Permission } from '../models/Entities/Permission';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  base_url = environment.localUrl + "permissions/";

  constructor(
    private http: HttpClient,
    private serviceNotification :ToastrService,
  ) { }

  async AllDetails(filters? :FilterDto){
    var data :Permission[] = [];

    if(filters == null || filters == undefined){
      filters = {} as FilterDto;
    }

    var request = this.http.post<Permission[]>(this.base_url + "all-details", filters);

    await lastValueFrom(await request)
    .then((payload :Permission[]) => {
      data = payload;
    })
    .catch((e) => {
      if(e.error != null){
        this.serviceNotification.error("Erro ao carregar dados.");
      }
      else{
        this.serviceNotification.error(e.message);
      }
    });

    return data;
  }

  async GetByUser(userGuid :string){
    var data :Permission[] = [];

    var request = this.http.get<Permission[]>(this.base_url + "user/" + userGuid);

    await lastValueFrom(await request)
    .then((payload :Permission[]) => {
      data = payload;
    })
    .catch((e) => {
      if(e.error != null){
        this.serviceNotification.error("Erro ao carregar permissões.");
      }
      else{
        this.serviceNotification.error(e.message);
      }
    });

    return data;
  }

  async GetByProfile(profileId :number){
    var data :Permission[] = [];

    var request = this.http.get<Permission[]>(this.base_url + "profile/" + profileId);

    await lastValueFrom(await request)
    .then((payload :Permission[]) => {
      data = payload;
    })
    .catch((e) => {
      if(e.error != null){
        this.serviceNotification.error("Erro ao carregar permissões.");
      }
      else{
        this.serviceNotification.error(e.message);
      }
    });

    return data;
  }

  async CurrentUserHasPermission(permissions :number[]) :Promise<boolean>{
    var user = localStorage.getItem('guid');
    if (user == null) 
    {
      return false;
    }

    var userPermissions = (await this.GetByUser(user)).map(e => e.id);

    for (let i = 0; i < permissions.length; i++) 
    {
      if (userPermissions.includes(permissions[i])) 
      {
        return true;
      }
    }

    return false;
  }

  async EditProfilePermission(profileId :number, permissions :Permission[]){
    var data = {
      profileId : profileId,
      permissions : permissions
    }

    var result = false;

    var request = this.http.post<boolean>(this.base_url + "profile/edit-permissions", data);

    await lastValueFrom(await request)
    .then((payload :boolean) => {
      result = payload;
    })
    .catch((e) => {
      if(e.error != null){
        this.serviceNotification.error("Erro ao editar permissões.");
      }
      else{
        this.serviceNotification.error(e.message);
      }
    });

    return result;
  }
}
