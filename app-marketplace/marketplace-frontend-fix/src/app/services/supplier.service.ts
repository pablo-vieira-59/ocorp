import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { FilterDto } from '../models/DTO/FilterDto';
import { lastValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { PaginatedResultDTO } from '../models/DTO/PaginatedResultDTO';
import { Brand } from '../models/Entities/Brand';
import { Supplier } from '../models/Entities/Supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  base_url = environment.backendUrl + "suppliers/";

  constructor(
    private http: HttpClient,
    private serviceNotification :ToastrService,
  ) { }

  async AllPaginated(filters :FilterDto){
    var data = {
      items: [],
      totalCount: 0
    } as PaginatedResultDTO<Supplier>;

    var request = this.http.post<PaginatedResultDTO<Supplier>>(this.base_url + "all-paginated", filters);

    await lastValueFrom(await request)
    .then((payload) => {
      data = payload;
    })
    .catch((e) => {
      if(e.error != null){
        this.serviceNotification.error(e.error);
      }
      else{
        this.serviceNotification.error("Erro ao carregar Fornecedores.");
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
        this.serviceNotification.error("Erro ao cadastrar Fornecedor.");
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
        this.serviceNotification.error("Erro ao editar Fornecedor.");
      }
    });

    return result;
  }

  async GetById(brandId :number){
    var request = this.http.get<Supplier>(this.base_url + brandId);
    var result = {} as Supplier;

    await lastValueFrom(await request)
    .then((response) => {
      result = response;
    })
    .catch((e) => {
      if(e.error != null){
        this.serviceNotification.error(e.error);
      }
      else{
        this.serviceNotification.error("Erro ao obter Fornecedor.");
      }
    });

    return result;
  }
}