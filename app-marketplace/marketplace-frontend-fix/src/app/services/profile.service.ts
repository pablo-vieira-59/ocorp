import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { FilterDto } from '../models/DTO/FilterDto';
import { Profile } from '../models/Entities/Profile';
import { lastValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { PaginatedResultDTO } from '../models/DTO/PaginatedResultDTO';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  base_url = environment.localUrl + "profiles/";

  constructor(
    private http: HttpClient,
    private serviceNotification :ToastrService,
  ) { }

  async AllDetails(filters :FilterDto){
    var data = {
      items: [],
      totalCount: 0
    } as PaginatedResultDTO<Profile>;

    var request = this.http.post<PaginatedResultDTO<Profile>>(this.base_url + "all-details", filters);

    await lastValueFrom(await request)
    .then((payload) => {
      data = payload;
    })
    .catch((e) => {
      if(e.error != null){
        this.serviceNotification.error("Falha ao obter perfils.");
      }
      else{
        this.serviceNotification.error(e.message);
      }
    });

    return data;
  }

  async GetAllAvailable(){
    var data :Profile[] = [];

    var request = this.http.get<Profile[]>(this.base_url + "get-all-available");

    await lastValueFrom(await request)
    .then((payload :Profile[]) => {
      data = payload;
    })
    .catch((e) => {
      if(e.error != null){
        this.serviceNotification.error("Falha ao obter perfils disponiveis para cadastro.");
      }
      else{
        this.serviceNotification.error(e.message);
      }
    });

    return data;
  }

  async GetAll(){
    var data :Profile[] = [];

    var request = this.http.get<Profile[]>(this.base_url + "get-all");

    await lastValueFrom(await request)
    .then((payload :Profile[]) => {
      data = payload;
    })
    .catch((e) => {
      if(e.error != null){
        this.serviceNotification.error("Falha ao obter perfils.");
      }
      else{
        this.serviceNotification.error(e.message);
      }
    });

    return data;
  }

  async GetById(profileId :number) : Promise<Profile>{
    var data :Profile = {} as Profile;

    var request = this.http.get<Profile>(this.base_url + "get-by-id/" + profileId);

    await lastValueFrom(await request)
    .then((payload) => {
      data = payload;
    })
    .catch((e) => {
      if(e.error != null){
        this.serviceNotification.error("Falha ao obter perfil.");
      }
      else{
        this.serviceNotification.error(e.message);
      }
    });

    return data;
  }
}
