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

  async AllDetails(filters :FilterDto){
    var data :Permission[] = [];

    var request = this.http.post<Permission[]>(this.base_url + "all-details", filters);

    await lastValueFrom(await request)
    .then((payload :Permission[]) => {
      data = payload;
    })
    .catch((error) => {
      this.serviceNotification.error("Erro ao carregar dados.");
    });

    return data;
  }

  async AllDetailsCount(filters :FilterDto){
    var data :number = 0;

    var request = this.http.post<number>(this.base_url + "all-details/count", filters);

    await lastValueFrom(await request)
    .then((payload :number) => {
      data = payload;
    })
    .catch((error) => {
      this.serviceNotification.error("Erro ao carregar dados.");
    });

    return data;
  }

  async GetByUser(userId :string){
    var data :Permission[] = [];

    var request = this.http.get<Permission[]>(this.base_url + "user/" + userId);

    await lastValueFrom(await request)
    .then((payload :Permission[]) => {
      data = payload;
    })
    .catch((error) => {
      //this.serviceNotification.error("Erro ao carregar dados.");
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
}
