import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Permission, PermissionEnum } from 'src/app/models/Entities/Permission';
import { User } from 'src/app/models/Entities/User';
import { AttachmentService } from 'src/app/services/attachment.services';
import { PermissionService } from 'src/app/services/permisson.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {
  public ambient = "Teste";

  pageItem = '/dashboard';

  permissions :number[]= [];

  user = {} as User;

  imageUrl :string = "";

  constructor(
    private router: Router,
    private servicePermission :PermissionService,
    private serviceNotificiation :ToastrService,
    private activatedRoute :ActivatedRoute,
    private serviceUser :UserService,
    private serviceAttachment :AttachmentService
  ){}

  async ngOnInit(){
    var currentRoute = this.router.url;
    
    this.pageItem = '';

    await this.router.events.subscribe(async e => {
      if (e instanceof NavigationEnd) {
    
        var userGuid = localStorage.getItem('guid');
        
        if(userGuid == null){
          return;
        }
        this.user = await this.serviceUser.GetByGuid(userGuid);
        this.permissions = (await this.servicePermission.GetByUser(userGuid)).map(e => e.id); 

        if(this.user.imageGuid != null){
          this.imageUrl = await this.serviceAttachment.GetAttachmentUrl(this.user.imageGuid);
        }
        
      }
    });

    this.ambient = environment.ambient;
  }
  
  HasPermission(permissionId :PermissionEnum){
    if(this.permissions == null)
      return false;

    return this.permissions.includes(permissionId);
  }

  Button_EditProfile(){
    var userGuid = localStorage.getItem('guid');
    this.router.navigate(['users/' + userGuid + '/edit']);
  }

  Button_Logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('guid');
    this.router.navigate(['/login'])
  }
  
  GotoRoute(route :string){
    this.pageItem = route;
    this.router.navigate([route])
  }
}