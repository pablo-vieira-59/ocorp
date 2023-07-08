import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxMaskModule } from 'ngx-mask';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';


@Component({
  selector: 'app-livro-editar-modal',
  templateUrl: './livro-editar-modal.component.html',
  styleUrls: ['./livro-editar-modal.component.scss']
})
export class LivroEditarModalComponent {
  mainForm! :FormGroup;
  loading = false;
  actionType = 0;

  ddl_autores_options :any[] = [];
  ddl_genero_options :any[] = [];
  ddl_editora_options :any[] = [];

  current_editora! :string;
  current_genero! :string;
  current_autor! :string;

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
        edicao: ['', [Validators.required, Validators.min(1)]],
        anoPublicacao: ['', [Validators.required, Validators.min(1)]],
        urlCapa: ['',[Validators.required, Validators.minLength(3)]],
        valor: ['',[Validators.required, Validators.min(0.1)]],
        avaliacao: ['',[Validators.required, Validators.min(1), Validators.max(5)]],
        idGenero: ['',[Validators.required, Validators.min(1)]],
        idEditora: ['',[Validators.required, Validators.min(1)]],
        idAutor: ['',[Validators.required, Validators.min(1)]],
      }
    );
  }

  get f(): any{
    return this.mainForm.controls;
  }

  async Submit(){
    // console.log(this.mainForm.controls);
    // this.loading = true;
    // this.serviceSpinner.show();
    // lastValueFrom(await this.serviceLivro.Editar(this.livro))
    // .then(e => {
    //   console.log(e);
    //   this.serviceNotification.success("Livro Editado com sucesso !" + " ID:" + e.id);
    //   this.serviceModal.hide();
    // })
    // .catch(e => {
    //   console.log(e);
    //   this.serviceNotification.error(e.error);
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
