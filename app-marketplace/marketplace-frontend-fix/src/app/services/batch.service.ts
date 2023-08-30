import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { FilterDto } from '../models/DTO/FilterDto';
import { lastValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { PaginatedResultDTO } from '../models/DTO/PaginatedResultDTO';
import { Batch } from '../models/Entities/Batch';
import { BatchCreateDTO } from '../models/DTO/BatchCreateDTO';
import { BatchStatus } from '../models/Entities/BatchStatus';

@Injectable({
  providedIn: 'root'
})
export class BatchService {
  base_url = environment.localUrl + "batches/";

  constructor(
    private http: HttpClient,
    private serviceNotification :ToastrService,
  ) { }

  async AllPaginated(filters :FilterDto){
    var data = {
      items: [],
      totalCount: 0
    } as PaginatedResultDTO<Batch>;

    var request = this.http.post<PaginatedResultDTO<Batch>>(this.base_url + "all-paginated", filters);

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

  async Create(data :BatchCreateDTO){
    var request = this.http.post<boolean>(this.base_url + "new", data);
    var result = false;
    console.log(data);

    await lastValueFrom(await request)
    .then((response) => {
      result = response;
      this.serviceNotification.success("Cadastrado com sucesso !");
    })
    .catch((e) => {
      if(e.error != null){
        this.serviceNotification.error(e.error);
        console.log(e);
      }
      else{
        this.serviceNotification.error("Erro ao cadastrar lote.");
      }
    });

    return result;
  }

  async Edit(data :any){
    var request = this.http.post<boolean>(this.base_url + "edit", data);
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
        this.serviceNotification.error("Erro ao editar lote.");
      }
    });

    return result;
  }

  async GetById(id :number){
    var request = this.http.get<Batch>(this.base_url + id);
    var result = {} as Batch;

    await lastValueFrom(await request)
    .then((response) => {
      result = response;
    })
    .catch((e) => {
      if(e.error != null){
        this.serviceNotification.error(e.error);
      }
      else{
        this.serviceNotification.error("Erro ao obter lote.");
      }
    });

    return result;
  }

  async GetStatusList(){
    var request = this.http.get<BatchStatus[]>(this.base_url + "status");
    var result = {} as BatchStatus[];

    await lastValueFrom(await request)
    .then((response) => {
      result = response;
    })
    .catch((e) => {
      if(e.error != null){
        this.serviceNotification.error(e.error);
      }
      else{
        this.serviceNotification.error("Erro ao obter status dos lotes.");
      }
    });

    return result;
  }
}