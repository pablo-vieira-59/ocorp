import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { FilterDto } from '../models/DTO/FilterDto';
import { lastValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { PaginatedResultDTO } from '../models/DTO/PaginatedResultDTO';
import { Establishment } from '../models/Entities/Establishment';
import { ApiAddressDto } from '../models/DTO/ApiAddressDTO';

@Injectable({
	providedIn: 'root'
})
export class AddressService {
	base_url = environment.localUrl + "address/";

	constructor(
		private http: HttpClient,
		private serviceNotification: ToastrService,
	) { }

	async GetAddressFromCep(cep :any):Promise<ApiAddressDto>{
		var apiUrl = "https://viacep.com.br/ws/" + String(cep) + "/json";

		var request = this.http.get<ApiAddressDto>(apiUrl);
		var result :ApiAddressDto = {} as ApiAddressDto;

		await lastValueFrom(await request)
	    .then((payload) => {
			result = payload;
	    })
	    .catch((error) => {
	      console.log(error);
	      this.serviceNotification.error("Erro ao carregar endereço da api.");
		  result = {"erro":true} as ApiAddressDto;
	    });

	    return result;
	}


	//   async AllDetails(filters :FilterDto){
	//     var data :PaginatedResultDTO<Establishment> = {} as PaginatedResultDTO<Establishment>;

	//     var request = this.http.post<PaginatedResultDTO<Establishment>>(this.base_url + "all-details", filters);

	//     await lastValueFrom(await request)
	//     .then((payload) => {
	//       data = payload;
	//     })
	//     .catch((error) => {
	//       console.log(error);
	//       data = {
	//         items: [],
	//         totalCount: 0
	//       } as PaginatedResultDTO<Establishment>;
	//       this.serviceNotification.error("Erro ao carregar dados.");
	//     });

	//     return data;
	//   }

}