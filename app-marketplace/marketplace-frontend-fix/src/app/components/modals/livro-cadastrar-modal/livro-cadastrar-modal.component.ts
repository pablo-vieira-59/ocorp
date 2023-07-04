import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
//import { LivroService } from 'src/app/services/livro.service';

@Component({
  selector: 'app-livro-cadastrar-modal',
  templateUrl: './livro-cadastrar-modal.component.html',
  styleUrls: ['./livro-cadastrar-modal.component.scss']
})
export class LivroCadastrarModalComponent {
  mainForm! :FormGroup;
  loading = false;

  ddl_autores_options :any[] = [];
  ddl_genero_options :any[] = [];
  ddl_editora_options :any[] = [];

  livro! :any;

  defaultImage = "../../../../assets/Default_Book.jpg";
  templateImage = "../../../../assets/Default_Book.jpg";

  fb : FormBuilder;

  modalRef?: BsModalRef;

  serviceModal :BsModalService;
  serviceSpinner :NgxSpinnerService;
  //serviceLivro :LivroService;
  serviceNotification :ToastrService;

  constructor(
    fb :FormBuilder, 
    serviceModal :BsModalService, 
    serviceSpinner :NgxSpinnerService, 
    //serviceLivro :LivroService,
    serviceNotification :ToastrService)
  {
    this.fb = fb;
    this.serviceModal = serviceModal;
    //this.livro = new Livro();
    //this.livro.livro_Autores = [new Livro_Autor()];
    this.serviceSpinner = serviceSpinner;
    //this.serviceLivro = serviceLivro;
    this.serviceNotification = serviceNotification;
  }

  ngOnInit(){
    this.mainForm = this.fb.group(
      {
        nome: ['', [Validators.required, Validators.minLength(3)]],
        descricao: ['', [Validators.required, Validators.minLength(3)]],
        edicao: ['', [Validators.required]],
        anoPublicacao: ['', [Validators.required]],
        urlCapa: ['',[Validators.required, Validators.minLength(3)]],
        valor: ['',[Validators.required, Validators.minLength(3)]],
        avaliacao: ['',[Validators.required]],
        idGenero: ['',[Validators.required]],
        idEditora: ['',[Validators.required]],
        idAutor: ['',[Validators.required]],
      }
    );
  }

  get f(): any{
    return this.mainForm.controls;
  }

  async Submit(){
    // this.loading = true;
    // this.serviceSpinner.show();
    // lastValueFrom(await this.serviceLivro.Adicionar(this.livro))
    // .then(e => {
    //   console.log(e);
    //   this.serviceNotification.success("Livro adicionado com sucesso !" + " ID:" + e.id);
    //   this.serviceModal.hide();
    // })
    // .catch(e => {
    //   console.log(e);
    //   this.serviceNotification.error(e);
    // })
    // .finally(() => {
    //   this.loading = false;
    //   this.serviceSpinner.hide();
    // });
  }

  UpdateImage(){
    if(this.livro.urlCapa != null && (this.livro.urlCapa .includes(".jpg")||this.livro.urlCapa .includes(".png"))){
      this.templateImage = this.livro.urlCapa ;
      return;
    }
    this.templateImage = this.defaultImage;
  }

  Close(){
    this.serviceModal.hide();
  }
}
