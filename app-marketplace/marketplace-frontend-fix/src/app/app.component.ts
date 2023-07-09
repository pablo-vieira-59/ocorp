import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PermissionEnum } from './models/Entities/Permission';
import { PermissionService } from './services/permisson.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title:string = "Frontend";
  
  constructor(
  ){}

  async ngOnInit(){
  }
}
