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
	      //this.serviceNotification.error("Erro ao carregar endereço da api.");
		  result = {"erro":true} as ApiAddressDto;
	    });

	    return result;
	}

}