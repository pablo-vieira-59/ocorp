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
  base_url = environment.localUrl + "establishments/";

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
    .catch((error) => {
      this.serviceNotification.error("Erro ao carregar dados.");
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
    .catch((error) => {
      console.log(error);
      this.serviceNotification.error("Erro ao cadastrar estabelecimento." + "\n" + error.error);
    });

    return result;
  }

}