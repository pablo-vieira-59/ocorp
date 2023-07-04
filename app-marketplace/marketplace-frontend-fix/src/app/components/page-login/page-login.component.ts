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
    private router: Router)
  {}

  ngOnInit(){
    this.loginData = {username:"", password:""};
    this.serviceSpinner.show();
  }

  async Submit(){
    this.isLoading = true;
    this.serviceSpinner.show();
    
    var result = await this.serviceUser.Login(this.loginData);

    this.isLoading = false;
    this.serviceSpinner.hide();

    if(result){
      this.serviceNotification.success("Login efetuado com sucesso!");
      this.router.navigate(['/dashboard']);
    }
  }

  Modal_Register() {
    this.modalRef = this.serviceModal.show(ModalUserRegisterComponent, {
      initialState: {
      },
      class: "modal-md modal-dialog-centered"
    });

    this.modalRef.onHidden.subscribe(() => {
      //this.LoadLivros();
    });
  }

  ValidateField(event :Event){
		var validField = ValidatorField.ValidateInputField(event, this.val_required);
		var element = event.currentTarget as HTMLInputElement;

		var idx = this.validFields.indexOf(element.id);

		if(validField != null && idx == -1){
			this.validFields.push(element.id);
		}
		if(validField == null && idx != -1){
			this.validFields.splice(idx, 1);
		}	
	}

  IsFormValid() :boolean{
    if(this.validFields.length == this.val_required.length){
      return true;
    }

    return false;
  }
}
