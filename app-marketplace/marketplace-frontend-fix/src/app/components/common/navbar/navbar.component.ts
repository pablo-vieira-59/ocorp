import { Component, EventEmitter, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Permission, PermissionEnum } from 'src/app/models/Entities/Permission';
import { PermissionService } from 'src/app/services/permisson.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {
  public ambient = "Teste";

  permissions :number[]= [];

  constructor(
    private router: Router,
    private servicePermission :PermissionService,
    private serviceNotificiation :ToastrService
  ){}

  async ngOnInit(){
    var currentRoute = this.router.url;

    await this.router.events.subscribe(async e => {
      if (e instanceof NavigationEnd) {
    
        var user = localStorage.getItem('guid');
        
        if(user == null){
          return;
        }
        
        this.permissions = (await this.servicePermission.GetByUser(user)).map(e => e.id); 
      }
    });

    this.ambient = environment.ambient;
  }
  
  HasPermission(permissionId :PermissionEnum){
    if(this.permissions == null)
      return false;

    return this.permissions.includes(permissionId);
  }

  Button_Logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('guid');
    this.router.navigate(['/login'])
  }
  
  GotoRoute(route :string){
    this.router.navigate([route])
  }
}