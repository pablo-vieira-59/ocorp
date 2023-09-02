import { formatDate } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/Entities/Product';
import { AttachmentService } from 'src/app/services/attachment.services';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input()
  public product :Product = {} as Product;

  constructor(
    private serviceAttachment :AttachmentService
  ){}

  ngOnInit(){
    this.product.imageGuid = this.serviceAttachment.GetAttachmentUrl(this.product.imageGuid)
  }
}
