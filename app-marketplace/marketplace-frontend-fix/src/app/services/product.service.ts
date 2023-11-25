import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { FilterDto } from '../models/DTO/FilterDto';
import { lastValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { PaginatedResultDTO } from '../models/DTO/PaginatedResultDTO';
import { Establishment } from '../models/Entities/Establishment';
import { Product } from '../models/Entities/Product';
import { ProductCreateDTO } from '../models/DTO/ProductCreateDTO';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  base_url = environment.backendUrl + "products/";

  constructor(
    private http: HttpClient,
    private serviceNotification :ToastrService,
  ) { }

  async AllPaginated(filters :FilterDto){
    var data = {
      items: [],
      totalCount: 0
    } as PaginatedResultDTO<Product>;

    var request = this.http.post<PaginatedResultDTO<Product>>(this.base_url + "all-paginated", filters);

    await lastValueFrom(await request)
    .then((payload) => {
      data = payload;
    })
    .catch((e) => {
      if(e.error != null){
        this.serviceNotification.error(e.error);
      }
      else{
        this.serviceNotification.error("Erro ao carregar produtos.");
      }
    });

    return data;
  }

  async Create(data :ProductCreateDTO){
    var request = this.http.post<boolean>(this.base_url + "new", data);
    var result = false;
    console.log(data);

    await lastValueFrom(await request)
    .then((payload) => {
      result = payload;
    })
    .catch((e) => {
      if(e.error != null){
        this.serviceNotification.error(e.error);
        console.log(e);
      }
      else{
        this.serviceNotification.error("Erro ao cadastrar produto.");
      }
    });

    return result;
  }
}