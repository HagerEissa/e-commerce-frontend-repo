import { Component } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-home',
  standalone: false,

  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private _customerS:CustomerService,private _categoryS:CategoryService){}
  categoryList:any[]=[];
  newProductes :any[]=[];
  trendProductes:any[]=[];

  imageURL= ''
  ngOnInit(){
    this .imageURL =this._customerS.uploadURL
    this._customerS.geNewtProductS().subscribe(data=>{
      this.newProductes=data;
      console.log(this.newProductes);

      this._categoryS.getCategories().subscribe(data=>{
        this.categoryList=data;
      })
    })

    this._customerS.getTrendProducts().subscribe(data=>{
      this.trendProductes=data;
      console.log(this.trendProductes);
    })
  }
  scrollLeft() {
    const carouselInner = document.querySelector('.carousel-inner') as HTMLElement;
    carouselInner.scrollBy({ left: -200, behavior: 'smooth' });
  }

  scrollRight() {
    const carouselInner = document.querySelector('.carousel-inner') as HTMLElement;
    carouselInner.scrollBy({ left: 200, behavior: 'smooth' });
  }
}
