import { formatDate } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/Entities/Product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input()
  public product :Product = {} as Product;

  ngOnInit(){
    
  }
}
