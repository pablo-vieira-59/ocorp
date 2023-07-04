import { Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
//import { LivroService } from 'src/app/services/livro.service';

@Component({
  selector: 'app-livro-deletar-modal',
  templateUrl: './livro-deletar-modal.component.html',
})
export class LivroDeletarModalComponent {
  livro! :any
  isLoading = false;

  serviceModal :BsModalService;
  serviceSpinner :NgxSpinnerService;
  //serviceLivro :LivroService;
  serviceNotification :ToastrService;

  constructor(
    serviceModal :BsModalService, 
    serviceSpinner :NgxSpinnerService, 
    serviceNotification :ToastrService,
    //serviceLivro :LivroService
    )
  {
    //this.serviceLivro = serviceLivro;
    this.serviceModal = serviceModal;
    this.serviceSpinner = serviceSpinner;
    this.serviceNotification = serviceNotification;
  }

  Close(){
    this.serviceModal.hide();
  }

  async Submit(){
    // this.isLoading = true;
    // this.serviceSpinner.show();
    // lastValueFrom(await this.serviceLivro.Deletar(this.livro))
    // .then(e => {
    //   console.log(e);
    //   this.serviceNotification.success("Livro deletado com sucesso !");
    //   this.serviceModal.hide();
    // })
    // .catch(e => {
    //   console.log(e);
    //   this.serviceNotification.error(e.message);
    // })
    // .finally(() => {
    //   this.isLoading = false;
    //   this.serviceSpinner.hide();
    // });
  }
}
