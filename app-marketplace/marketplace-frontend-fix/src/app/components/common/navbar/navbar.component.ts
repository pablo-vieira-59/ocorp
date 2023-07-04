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

  profiles :number[]= [];

  @Output()
  OnNavBarInit = new EventEmitter<any>();

  constructor(
    private router: Router,
    private servicePermission :PermissionService,
    private serviceNotificiation :ToastrService
  ){}

  async ngOnInit(){
    var currentRoute = this.router.url;

    await this.router.events.subscribe(async e => {
      if (e instanceof NavigationEnd) {
        currentRoute = this.router.url;

        if(currentRoute == "/" || currentRoute == "/login"){
          this.OnNavBarInit.emit("width: 0px;display: none;");
          return;
        }
    
        var user = localStorage.getItem('guid');
        
        if(user == null){
          return;
        }
        
        this.profiles = (await this.servicePermission.GetByUser(user)).map(e => e.id); 
    
        var navStyle = "width: 0px;display: none;"
        if(this.HasPermission(PermissionEnum.Componente_MenuLateral)){
          navStyle = "max-width: 300px;display: block;"
        }
    
        this.OnNavBarInit.emit(navStyle);
      }
    });

    this.ambient = environment.ambient;
  }
  
  HasPermission(permissionId :PermissionEnum){
    if(this.profiles == null)
      return false;

    return this.profiles.includes(permissionId);
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
