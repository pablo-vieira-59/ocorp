import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { FilterDto } from '../models/DTO/FilterDto';
import { lastValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { PaginatedResultDTO } from '../models/DTO/PaginatedResultDTO';
import { Establishment } from '../models/Entities/Establishment';
import { Product } from '../models/Entities/Product';
import { Brand } from '../models/Entities/Brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  base_url = environment.localUrl + "brands/";

  constructor(
    private http: HttpClient,
    private serviceNotification :ToastrService,
  ) { }

  async AllPaginated(filters :FilterDto){
    var data = {
      items: [],
      totalCount: 0
    } as PaginatedResultDTO<Brand>;

    var request = this.http.post<PaginatedResultDTO<Brand>>(this.base_url + "all-paginated", filters);

    await lastValueFrom(await request)
    .then((payload) => {
      data = payload;
    })
    .catch((e) => {
      if(e.error != null){
        this.serviceNotification.error(e.error);
      }
      else{
        this.serviceNotification.error("Erro ao carregar Marcas.");
      }
    });

    return data;
  }

  async Create(data :any){
    var request = this.http.post<boolean>(this.base_url + "new", data);
    var result = false;

    await lastValueFrom(await request)
    .then((response) => {
      result = response;
    })
    .catch((e) => {
      if(e.error != null){
        this.serviceNotification.error(e.error);
      }
      else{
        this.serviceNotification.error("Erro ao cadastrar marca.");
      }
    });

    return result;
  }

  async Edit(data :any){
    var request = this.http.post<boolean>(this.base_url + "edit/" + data.id, data);
    var result = false;

    await lastValueFrom(await request)
    .then((response) => {
      result = response;
    })
    .catch((e) => {
      if(e.error != null){
        this.serviceNotification.error(e.error);
      }
      else{
        this.serviceNotification.error("Erro ao editar marca.");
      }
    });

    return result;
  }

  async GetById(brandId :number){
    var request = this.http.get<Brand>(this.base_url + brandId);
    var result = {} as Brand;

    await lastValueFrom(await request)
    .then((response) => {
      result = response;
    })
    .catch((e) => {
      if(e.error != null){
        this.serviceNotification.error(e.error);
      }
      else{
        this.serviceNotification.error("Erro ao obter marca.");
      }
    });

    return result;
  }
}