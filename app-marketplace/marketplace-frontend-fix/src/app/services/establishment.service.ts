import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { FilterDto } from '../models/DTO/FilterDto';
import { lastValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { PaginatedResultDTO } from '../models/DTO/PaginatedResultDTO';
import { Establishment } from '../models/Entities/Establishment';

@Injectable({
  providedIn: 'root'
})
export class EstablishmentService {
  base_url = environment.backendUrl + "establishments/";

  constructor(
    private http: HttpClient,
    private serviceNotification :ToastrService,
  ) { }

  async AllDetails(filters :FilterDto){
    var data = {
      items: [],
      totalCount: 0
    } as PaginatedResultDTO<Establishment>;

    var request = this.http.post<PaginatedResultDTO<Establishment>>(this.base_url + "all-details", filters);

    await lastValueFrom(await request)
    .then((payload) => {
      data = payload;
    })
    .catch((e) => {
      if(e.error != null){
        this.serviceNotification.error(e.error);
      }
      else{
        this.serviceNotification.error("Erro ao carregar dados.");
      }
    });

    return data;
  }

  async AddEstablishment(data :any) :Promise<boolean>{
    var request = this.http.post<PaginatedResultDTO<Establishment>>(this.base_url + "add", data);

    var result = false;

    await lastValueFrom(await request)
    .then((payload) => {
      result = true;
      this.serviceNotification.success("Estabelecimento adicionado com sucesso !");
    })
    .catch((e) => {
      if(e.error != null){
        this.serviceNotification.error(e.error);
      }
      else{
        this.serviceNotification.error("Erro ao adicionar estabelecimento.");
      }
    });

    return result;
  }

  async GetClientEstablishments(clientId :number) :Promise<Establishment[]>{
    var request = this.http.get<Establishment[]>(this.base_url + "client/" + clientId);

    var result = [] as Establishment[];

    await lastValueFrom(await request)
    .then((payload) => {
      result = payload;
    })
    .catch((e) => {
      if(e.error != null){
        this.serviceNotification.error(e.error);
      }
      else{
        console.log(e);
        this.serviceNotification.error("Erro ao obter estabelecimentos do cliente.");
      }
    });

    return result;
  }

  async GetUserEstablishments(userId :number) :Promise<Establishment[]>{
    var request = this.http.get<Establishment[]>(this.base_url + "user/" + userId);

    var result = [] as Establishment[];

    await lastValueFrom(await request)
    .then((payload) => {
      result = payload;
    })
    .catch((e) => {
      if(e.error != null){
        this.serviceNotification.error(e.error);
      }
      else{
        console.log(e);
        this.serviceNotification.error("Erro ao obter estabelecimentos do usuário.");
      }
    });

    return result;
  }

}