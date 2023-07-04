import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { FilterDto } from '../models/DTO/FilterDto';
import { Profile } from '../models/Entities/Profile';
import { lastValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

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
    var data :Profile[] = [];

    var request = this.http.post<Profile[]>(this.base_url + "all-details", filters);

    await lastValueFrom(await request)
    .then((payload :Profile[]) => {
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

  async GetAll(){
    var data :Profile[] = [];

    var request = this.http.get<Profile[]>(this.base_url + "get-all");

    await lastValueFrom(await request)
    .then((payload :Profile[]) => {
      data = payload;
    })
    .catch((error) => {
      this.serviceNotification.error("Erro ao carregar dados.");
    });

    return data;
  }
}
