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
import { UserEditDTO } from '../models/DTO/UserEditDTO';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  base_url = environment.backendUrl + "users/";

  constructor(
    private http: HttpClient,
    private serviceNotification: ToastrService,
  ) { }

  async AllDetails(filters: FilterDto) {
    var data = {
      items: [],
      totalCount: 0
    } as PaginatedResultDTO<User>;

    var request = this.http.post<PaginatedResultDTO<User>>(this.base_url + "all-details", filters);

    await lastValueFrom(await request)
      .then((payload) => {
        data = payload;
      })
      .catch((e) => {
        if (e.error != null) {
          this.serviceNotification.error(e.error);
        }
        else {
          console.log(e);
          this.serviceNotification.error("Erro ao carregar dados.");
        }
      });

    return data;
  }

  async Login(loginData: LoginDto): Promise<LoginResponseDto|null> {
    var request = this.http.post<LoginResponseDto>(this.base_url + "login/", loginData);

    var result :LoginResponseDto | null = null;

    await lastValueFrom(await request)
      .then(e => {
        localStorage.setItem('token', e.token);
        localStorage.setItem('guid', e.guid);
        localStorage.setItem('email', e.email);
        localStorage.setItem('name', e.name);
        localStorage.setItem('client', e.clientName);
        localStorage.setItem('image', e.image);
        result = e;
      })
      .catch(e => {
        if (e.error != null) {
          this.serviceNotification.error(e.error);
        }
        else {
          console.log(e);
          this.serviceNotification.error("Falha ao realizar login.");
        }
      });

    return result;
  }

  async IsLoggedIn(): Promise<boolean> {
    var request = this.http.get<boolean>(this.base_url + "is-logged-in/");

    var result = false;

    await lastValueFrom(await request)
      .then(e => {
        result = true;
      })
      .catch(e => {
        if (e.error != null) {
          this.serviceNotification.error(e.error);
        }
        else {
          console.log(e);
          this.serviceNotification.error("Erro ao verificar login.");
        }
        result = false;
      });

    return result;
  }

  async CreateUser(user: any): Promise<boolean> {
    var request = this.http.post<boolean>(this.base_url + "new-user", user);
    var result = false;

    await lastValueFrom(await request)
      .then(e => {
        result = true;
      })
      .catch(e => {
        if (e.error != null) {
          this.serviceNotification.error(e.error);
        }
        else {
          console.log(e);
          this.serviceNotification.error("Erro ao criar usuário.");
        }

        result = false;
      });

    return result;
  }

  async GetById(userId: number): Promise<User> {
    var request = this.http.get<User>(this.base_url + userId);
    var result = {} as User;

    await lastValueFrom(await request)
      .then(e => {
        result = e;
      })
      .catch(e => {
        if (e.error != null) {
          console.log(e);
          this.serviceNotification.error(e.error);
        }
        else {
          console.log(e);
          this.serviceNotification.error("Erro ao obter usuário.");
        }

        return null;
      });

    return result;
  }

  async GetCurrentUser(): Promise<User|null> {
    var result = {} as User;

    var userGuid = localStorage.getItem('guid');

    if (userGuid == null) 
    {
      this.serviceNotification.error("Erro ao obter usuário atual.");
      return null;
    }

    return await this.GetByGuid(userGuid);
  }

  async GetByGuid(userGuid: string): Promise<User> {
    var request = this.http.get<User>(this.base_url + 'guid/' + userGuid);
    var result = {} as User;

    await lastValueFrom(await request)
      .then(e => {
        result = e;
      })
      .catch(e => {
        if (e.error != null) {
          console.log(e);
          this.serviceNotification.error(e.error);
        }
        else {
          console.log(e);
          this.serviceNotification.error("Erro ao obter usuário.");
        }

        return null;
      });

    return result;
  }

  async EditUser(user: UserEditDTO): Promise<boolean> {
    var request = this.http.post<boolean>(this.base_url + "edit/" + user.id, user);
    var result = false;

    await lastValueFrom(await request)
      .then(e => {
        result = true;
        this.serviceNotification.success("Usuario editado com sucesso !");
      })
      .catch(e => {
        if (e.error != null) {
          this.serviceNotification.error(e.error);
        }
        else {
          console.log(e);
          this.serviceNotification.error("Erro ao editar usuário.");
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
  constructor(private userService: UserService, private router: Router) { }

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
    private notificationService: ToastrService) { }

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    var permissions = next.data['permissions'] as PermissionEnum[];

    var hasPermission = await this.permissionService.CurrentUserHasPermission([PermissionEnum.Componente_MenuLateral]);
    var nav = document.getElementById("navbar");
    if (nav) {
      if (hasPermission) {
        nav.style.display = "block";
      }
      else {
        nav.style.display = "none";
      }
    }

    if(permissions.length == 0){
      return true;
    }

    hasPermission = await this.permissionService.CurrentUserHasPermission(permissions);

    if (hasPermission) {
      return true;
    }

    this.notificationService.error("Você não tem permissão para acessar esta página.");
    this.router.navigate(['/login']);

    return false;
  }
}