import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TabItem } from 'src/app/models/Components/TabItem';
import { PermissionService } from 'src/app/services/permisson.service';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent {
  
  @Input()
  index = 0;

  @Output()
  indexChange = new EventEmitter<number>;

  @Input()
  tabs :TabItem[] = [];

  SetIndex(value :number){
    this.index = value;
    this.indexChange.emit(this.index);
  }

  constructor(
    private servicePermission :PermissionService)
  { }

  async ngOnInit(){
    this.tabs.forEach(async x => {
      if(x.permissions == null || x.permissions.length == 0){
        return;
      }

      var hasPermission = await this.servicePermission.CurrentUserHasPermission(x.permissions);
      if(!hasPermission){
        x.isVisible = false;
      }
    });

  }
}
