import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LoginDto, LoginResponseDto } from '../models/DTO/LoginDto';
import { UserAccess } from '../models/Entities/UserAccess';
import { User } from '../models/Entities/User';
import { FilterDto } from '../models/DTO/FilterDto';
import { Observable, lastValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { PermissionEnum } from '../models/Entities/Permission';
import { PermissionService } from './permisson.service';
import { PaginatedResultDTO } from '../models/DTO/PaginatedResultDTO';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  base_url = environment.localUrl + "users/";

  constructor(
    private http: HttpClient,
    private serviceNotification :ToastrService,
  ) { }

  async AllDetails(filters :FilterDto){
    var data :PaginatedResultDTO<User> = {} as PaginatedResultDTO<User>;

    var request = this.http.post<PaginatedResultDTO<User>>(this.base_url + "all-details", filters);

    await lastValueFrom(await request)
    .then((payload) => {
      data = payload;
    })
    .catch((error) => {
      data = {
        items: [],
        totalCount: 0
      } as PaginatedResultDTO<User>;
      this.serviceNotification.error("Erro ao carregar dados.");
    });

    return data;
  }

  async Login(loginData: LoginDto) :Promise<boolean>{
    var request = this.http.post<LoginResponseDto>(this.base_url + "login/", loginData);

    var result = false;

    await lastValueFrom(await request)
    .then(e => {
      localStorage.setItem('token', e.token);
      localStorage.setItem('guid', e.guid);
      result = true;
    })
    .catch(e => {
      this.serviceNotification.error("Falha ao Realizar Login");
      result = false;
    });

    return result;
  }

  async IsLoggedIn() :Promise<boolean>{
    var request = this.http.get<boolean>(this.base_url + "is-logged-in/");

    var result = false;

    await lastValueFrom(await request)
    .then(e => {
      result = true;
    })
    .catch(e => {
      //this.serviceNotification.error(e.error);
      result = false;
    });

    return result;
  }

  async CreateUser(user :any) :Promise<boolean>{
    var request = this.http.post<boolean>(this.base_url + "new-user", user);
    var result = false;

    await lastValueFrom(await request)
    .then(e => {
      result = true;
    })
    .catch(e => {
      if(e.error != null){
        this.serviceNotification.error(e.error);
      }
      else{
        this.serviceNotification.error(e.message);
      }
      
      result = false;
    });

    return result;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    if (await this.userService.IsLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private permissionService: PermissionService, 
    private router: Router,
    private notificationService: ToastrService) 
  {}

  async canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    var permissions = next.data['permissions'] as PermissionEnum[];
    
    var hasPermission = await this.permissionService.CurrentUserHasPermission([PermissionEnum.Componente_MenuLateral]);
    var nav = document.getElementById("navbar");
    if(nav)
    {
      if(hasPermission){
        nav.style.display = "block";
      }
      else{
        nav.style.display = "none";
      }
    }
    

    hasPermission = await this.permissionService.CurrentUserHasPermission(permissions);

    if(hasPermission){
      return true;
    }

    this.notificationService.error("Você não tem permissão para acessar esta página.");
    this.router.navigate(['/login']);

    return false;
  }
}