import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AttachmentCreateDTO } from '../models/DTO/AttachmentCreateDTO';
import { lastValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class AttachmentService {
    constructor(
        private http: HttpClient,
        private serviceNotification: ToastrService
    ) { }

    base_url = environment.cdnUrl + "attachment";

    async UploadAttachment(data: AttachmentCreateDTO): Promise<string> {
        const headers = new HttpHeaders({
            'enctype': 'multipart/form-data'
        });

        const formData = new FormData();
        formData.append('file', data.file);
        formData.append('attachmentTypeId', data.attachmentTypeId.toString());

        var result: string = ""
        var request = this.http.post<any>(`${this.base_url}/upload`, formData, { headers });

        await lastValueFrom(await request)
            .then((payload) => {
                result = payload.guid;
            })
            .catch((error) => {
                console.log(error)
                this.serviceNotification.error("Erro ao carregar imagem.");
            });

        return result;
    }

    GetAttachmentUrl(guid: string): string {
        return this.base_url + "/" + guid;
    }
}