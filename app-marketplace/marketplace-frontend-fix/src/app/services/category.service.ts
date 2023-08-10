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
import { Category } from '../models/Entities/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  base_url = environment.localUrl + "categories/";

  constructor(
    private http: HttpClient,
    private serviceNotification :ToastrService,
  ) { }

  async AllPaginated(filters :FilterDto){
    var data = {
      items: [],
      totalCount: 0
    } as PaginatedResultDTO<Category>;

    var request = this.http.post<PaginatedResultDTO<Category>>(this.base_url + "all-paginated", filters);

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
        this.serviceNotification.error("Erro ao cadastrar categoria.");
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
        this.serviceNotification.error("Erro ao editar categoria.");
      }
    });

    return result;
  }

  async GetById(id :number){
    var request = this.http.get<Category>(this.base_url + id);
    var result = {} as Category;

    await lastValueFrom(await request)
    .then((response) => {
      result = response;
    })
    .catch((e) => {
      if(e.error != null){
        this.serviceNotification.error(e.error);
      }
      else{
        this.serviceNotification.error("Erro ao obter categoria.");
      }
    });

    return result;
  }
}