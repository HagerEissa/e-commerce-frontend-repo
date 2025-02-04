import { Component, Input } from '@angular/core';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-product-card',
  standalone: false,

  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  constructor(private _customerS:CustomerService){}
  imageURL= ''
  ngOnInit(){
  this .imageURL =this._customerS.uploadURL;
  }
  @Input() product: any; // Accepts product details as input
}
