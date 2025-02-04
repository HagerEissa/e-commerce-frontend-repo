import { Component, Input } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: false,

  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  // product = {
  //   name: 'Cable-knit Cardigan',
  //   price: 2199.00,
  //   currency: 'EGP',
  //   sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  //   selectedSize: 'M',
  //   images: [
  //     'assets/images/product1.jpg',
  //     'assets/images/product2.jpg',
  //     'assets/images/product3.jpg',
  //     'assets/images/product4.jpg'
  //   ],
  //   description: 'A stylish and comfortable cable-knit cardigan, perfect for casual wear.',
  //   details: [
  //     'Material: 100% Cotton',
  //     'Color: Cream',
  //     'Short sleeves with a cropped fit',
  //     'Button-up front',
  //     'Machine washable'
  //   ]
  // };

  // selectedImage: string = this.product.images[0];
  // isFavorite: boolean = false;

  // selectImage(image: string) {
  //   this.selectedImage = image;
  // }

  // selectSize(size: string) {
  //   this.product.selectedSize = size;
  // }

  // toggleFavorite() {
  //   this.isFavorite = !this.isFavorite;
  // }



  constructor(private _customerS:CustomerService,private _route:ActivatedRoute){}
    imageURL= ''
    product!:any;
    discountedPrice: number = 0;
    discountAmount: number = 0;
    discountPercentage: number = 0;
    ngOnInit(){
      this.imageURL =this._customerS.uploadURL;
      const id = this._route.snapshot.params["id"];
      this._customerS.getProductById(id).subscribe(data=>{
      this.product = data;
      this.calculateDiscountedPrice();
      console.log(this.product);


      })

    }

    calculateDiscountedPrice() {
      if (this.product?.discount > 0) {
        this.discountAmount = (this.product?.price * this.product?.discount) / 100;
        this.discountedPrice = this.product?.price - this.discountAmount;
        this.discountPercentage = this.product?.discount;
      } else {
        this.discountedPrice = this.product?.price;
        this.discountAmount = 0;
        this.discountPercentage = 0;
      }
    }
}
