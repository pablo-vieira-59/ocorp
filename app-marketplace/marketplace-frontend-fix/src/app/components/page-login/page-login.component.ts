import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import { LoginDto } from 'src/app/models/DTO/LoginDto';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ModalUserRegisterComponent } from './modals/modal-user-register/modal-user-register.component';
import { ValidatorField } from 'src/app/helpers/formValidations';
import { AttachmentService } from 'src/app/services/attachment.services';


@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.scss']
})
export class PageLoginComponent {
  modalRef?: BsModalRef;

  public isLoading = false;
  public loginData!: LoginDto;

  validFields :string[] = [];
  val_required :string[] = ["username", "password"];

  constructor(
    private serviceModal :BsModalService, 
    private serviceSpinner :NgxSpinnerService, 
    private serviceUser :UserService,
    private serviceNotification :ToastrService,
    private router: Router,
    private serviceAttachment:AttachmentService)
  {}

  ngOnInit(){
    this.loginData = {username:"", password:""};

    var nav = document.getElementById("navbar");
    if(nav)
    {
      nav.style.display = "none";
    }

    
  }

  async Submit(){
    this.isLoading = true;
    this.serviceSpinner.show();
    
    var result = await this.serviceUser.Login(this.loginData);

    this.isLoading = false;
    this.serviceSpinner.hide();

    if(result == null){
      return;
    }

    this.serviceNotification.success("Login efetuado com sucesso!");

    var navImage = document.getElementById("navbarImage") as HTMLImageElement;
    var navName = document.getElementById("nav_name") as HTMLLabelElement;
    var navEmail = document.getElementById("nav_email") as HTMLLabelElement;
    var navClient = document.getElementById("nav_client") as HTMLLabelElement;

    if(result.image != null){
      navImage.src = this.serviceAttachment.GetAttachmentUrl(result.image);
    }
    
    navName.textContent = result.name;
    navEmail.textContent = result.email;
    navClient.textContent = result.clientName;

    this.router.navigate(['/dashboard']);
  }

  Modal_Register() {
    this.modalRef = this.serviceModal.show(ModalUserRegisterComponent, {
      initialState: {
      },
      class: "modal-lg modal-dialog-centered"
    });

    this.modalRef.onHidden.subscribe(() => {
      //this.LoadLivros();
    });
  }

  ValidateField(inputId :string){
		this.validFields = ValidatorField.ValidateInputField(this.validFields, inputId, this.val_required);
	}

  IsFormValid() :boolean{
    if(this.validFields.length == this.val_required.length){
      return true;
    }

    return false;
  }
}
